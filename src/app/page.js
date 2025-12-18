'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ParticleBackground from '@/components/ParticleBackground'

export default function Home() {
    const [mounted, setMounted] = useState(false)
    const [portfolioData, setPortfolioData] = useState(null)

    useEffect(() => {
        setMounted(true)
        fetch('/api/admin/content')
            .then(res => res.json())
            .then(data => setPortfolioData(data))
            .catch(err => console.error("Error fetching portfolio data:", err))
    }, [])

    if (!mounted) return null

    return (
        <main className="relative min-h-screen">
            <ParticleBackground />
            <Navbar />
            <Hero data={portfolioData?.hero} />
            <About data={portfolioData?.about} />
            <Experience data={portfolioData?.experiences} />
            <Projects data={portfolioData?.projects} />
            <Skills data={portfolioData?.skills} />
            <Contact />
            <Footer />
        </main>
    )
}
