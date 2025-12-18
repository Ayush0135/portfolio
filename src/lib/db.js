import { kv } from '@vercel/kv'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'src/data/portfolio.json')

// Helper to determine if we should use KV
// We use KV if the environment variables are present
const useKV = process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN

export async function getData() {
    // 1. Try to get from Vercel KV if available
    if (useKV) {
        try {
            const data = await kv.get('portfolio_data')
            if (data) {
                return data
            }
            // If KV is empty (first run), fall back to file seeds
        } catch (error) {
            console.error('KV Read Error:', error)
        }
    }

    // 2. Fallback to local JSON file
    try {
        const fileData = fs.readFileSync(DATA_PATH, 'utf8')
        const json = JSON.parse(fileData)

        // If we have KV but it was empty, seed it now
        if (useKV) {
            await kv.set('portfolio_data', json)
        }

        return json
    } catch (error) {
        return null
    }
}

export async function saveData(newData) {
    let success = false

    // 1. Save to Vercel KV
    if (useKV) {
        try {
            await kv.set('portfolio_data', newData)
            success = true
        } catch (error) {
            console.error('KV Write Error:', error)
        }
    }

    // 2. Always try to save to local file as backup (works in dev)
    try {
        // Ensure visitors are preserved if not in newData (though they should be)
        if (!process.env.VERCEL) { // Only write to FS if NOT on Vercel (avoids read-only error)
            fs.writeFileSync(DATA_PATH, JSON.stringify(newData, null, 2))
            success = true
        } else if (!useKV) {
            // usage on Vercel without KV throws error
            throw new Error('Cannot save: Vercel Read-Only File System and KV not configured.')
        }
    } catch (error) {
        console.error('FS Write Error:', error)
        if (!success) throw error // Throw if both failed
    }

    return success
}

export async function trackVisitor(visitorData) {
    const data = await getData() || { visitors: [] }
    if (!data.visitors) data.visitors = []

    data.visitors.push(visitorData)

    // Limit to 1000
    if (data.visitors.length > 1000) {
        data.visitors = data.visitors.slice(-1000)
    }

    await saveData(data)
}
