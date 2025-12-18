import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const DATA_PATH = path.join(process.cwd(), 'src/data/portfolio.json')

export async function POST(request) {
    try {
        const { page, referrer } = await request.json()
        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
        const userAgent = request.headers.get('user-agent') || 'unknown'

        // Read current data
        const fileData = fs.readFileSync(DATA_PATH, 'utf8')
        const data = JSON.parse(fileData)

        // Add new visitor log
        const newVisitor = {
            timestamp: new Date().toISOString(),
            ip,
            userAgent,
            page,
            referrer
        }

        if (!data.visitors) data.visitors = []
        data.visitors.push(newVisitor)

        // Keep only last 1000 visitors to save space
        if (data.visitors.length > 1000) {
            data.visitors = data.visitors.slice(-1000)
        }

        fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Tracking error:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
