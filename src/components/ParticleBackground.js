'use client'

import { useEffect } from 'react'

export default function ParticleBackground() {
    useEffect(() => {
        const createParticle = () => {
            const particle = document.createElement('div')
            particle.className = 'particle'

            const size = Math.random() * 3 + 1
            const startX = Math.random() * window.innerWidth
            const duration = Math.random() * 20 + 10
            const delay = Math.random() * 5

            particle.style.width = `${size}px`
            particle.style.height = `${size}px`
            particle.style.left = `${startX}px`
            particle.style.top = `${Math.random() * window.innerHeight}px`
            particle.style.animationDuration = `${duration}s`
            particle.style.animationDelay = `${delay}s`
            particle.style.opacity = Math.random() * 0.5 + 0.2

            document.querySelector('.particles')?.appendChild(particle)
        }

        // Create initial particles
        for (let i = 0; i < 50; i++) {
            createParticle()
        }
    }, [])

    return <div className="particles" />
}
