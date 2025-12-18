'use client'

import { useEffect } from 'react'

export default function VisitorTracker() {
    useEffect(() => {
        const trackVisit = async () => {
            try {
                await fetch('/api/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        page: window.location.pathname,
                        referrer: document.referrer
                    })
                })
            } catch (e) {
                // Silently fail if tracking is blocked
            }
        }

        // Track on initial load
        trackVisit()
    }, [])

    return null
}
