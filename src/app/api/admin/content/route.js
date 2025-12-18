import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'src/data/portfolio.json')

export async function GET() {
    try {
        const fileData = fs.readFileSync(DATA_PATH, 'utf8')
        return NextResponse.json(JSON.parse(fileData))
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        const newData = await request.json()
        const password = request.headers.get('authorization')
        const targetPassword = process.env.ADMIN_PASSWORD || 'ayush-admin'

        if (password !== targetPassword) {
            console.warn(`Unauthorized admin update attempt from ${request.headers.get('x-forwarded-for') || 'unknown'}`)
            return NextResponse.json({ error: 'Unauthorized: Incorrect password' }, { status: 401 })
        }

        // Preserve visitors when updating content
        let currentData = { visitors: [] }
        try {
            const currentFileData = fs.readFileSync(DATA_PATH, 'utf8')
            currentData = JSON.parse(currentFileData)
        } catch (e) {
            console.error('Error reading current data for preservation:', e)
        }

        newData.visitors = currentData.visitors || []

        fs.writeFileSync(DATA_PATH, JSON.stringify(newData, null, 2))
        console.log('Portfolio content updated successfully via Admin Panel')
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Update failed:', error)
        return NextResponse.json({ error: 'Update failed internal error', details: error.message }, { status: 500 })
    }
}
