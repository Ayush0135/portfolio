'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-tech-dark/95 backdrop-blur-md shadow-lg cyber-border' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <motion.a
                        href="#home"
                        className="text-2xl font-bold text-gradient"
                        whileHover={{ scale: 1.05 }}
                    >
                        &lt;AK /&gt;
                    </motion.a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                className="text-gray-300 hover:text-tech-blue transition-colors duration-300 font-medium"
                                whileHover={{ scale: 1.1 }}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {item.name}
                            </motion.a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-tech-blue text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="md:hidden mt-4 space-y-4"
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="block text-gray-300 hover:text-tech-blue transition-colors duration-300"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    )
}
