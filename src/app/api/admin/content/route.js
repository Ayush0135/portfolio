import { NextResponse } from 'next/server'
import { getData, saveData } from '@/lib/db'

export async function GET() {
    try {
        const data = await getData()
        if (!data) return NextResponse.json({ error: 'Data not found' }, { status: 404 })
        return NextResponse.json(data)
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

        // Get current data to preserve visitors if they aren't passed back
        const currentData = await getData() || { visitors: [] }

        // Ensure visitors are preserved
        newData.visitors = currentData.visitors || []

        await saveData(newData)

        console.log('Portfolio content updated successfully via Admin Panel')
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Update failed:', error)
        return NextResponse.json({ error: 'Update failed internal error', details: error.message }, { status: 500 })
    }
}
