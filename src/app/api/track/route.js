import { NextResponse } from 'next/server'
import { trackVisitor } from '@/lib/db'

export async function POST(request) {
    try {
        const { page, referrer } = await request.json()
        const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
        const userAgent = request.headers.get('user-agent') || 'unknown'

        // Add new visitor log via helper
        await trackVisitor({
            timestamp: new Date().toISOString(),
            ip,
            userAgent,
            page,
            referrer
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Tracking error:', error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}
