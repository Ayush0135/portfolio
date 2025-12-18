'use client'

import { motion } from 'framer-motion'

export default function Footer() {
    return (
        <footer className="py-12 flex justify-center border-t border-tech-cyan/10">
            <motion.a
                href="#home"
                whileHover={{ y: -5 }}
                className="text-gray-500 hover:text-tech-cyan transition-colors text-sm font-mono flex flex-col items-center gap-2"
            >
                <span className="text-xl">↑</span>
                <span>BACK TO TOP</span>
            </motion.a>
        </footer>
    )
}
