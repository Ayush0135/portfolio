'use client'

import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaFileDownload } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function Hero({ data }) {
    const name = data?.name || "Ayush Kashyap"
    const role = data?.role || "AI Engineer & Innovator"
    const description = data?.description || "Specializing in Machine Learning, Natural Language Processing, and Intelligent Systems. I build scalable AI solutions that transform data into actionable insights and drive innovation."

    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            {/* Gradient Orbs */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-tech-purple/30 rounded-full filter blur-3xl animate-float" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-tech-blue/20 rounded-full filter blur-3xl animate-float" style={{ animationDelay: '3s' }} />

            <div className="container mx-auto px-4 z-10">
                <div className="text-center">
                    {/* Greeting */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-4"
                    >
                        <span className="text-tech-cyan text-lg font-mono">Hi, my name is</span>
                    </motion.div>

                    {/* Name */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold mb-4"
                    >
                        <span className="text-gradient">{name}</span>
                    </motion.h1>

                    {/* Role */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-3xl md:text-5xl font-bold text-gray-400 mb-6"
                    >
                        {role}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed"
                    >
                        {description}
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex flex-wrap justify-center gap-4 mb-12"
                    >
                        <a
                            href="#contact"
                            className="px-8 py-3 bg-gradient-to-r from-tech-blue to-tech-cyan text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-tech-blue/50 transition-all duration-300 transform hover:-translate-y-1"
                        >
                            Get In Touch
                        </a>
                        <a
                            href="/Ayush_Kashyap_Resume.pdf"
                            download
                            className="px-8 py-3 border-2 border-tech-purple text-tech-purple font-semibold rounded-lg hover:bg-tech-purple/10 transition-all duration-300 flex items-center gap-2"
                        >
                            <FaFileDownload /> Download Resume
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                        className="flex justify-center gap-6"
                    >
                        <a
                            href="https://github.com/Ayush0135"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl text-gray-400 hover:text-tech-blue transition-colors duration-300 transform hover:scale-110"
                        >
                            <FaGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ayush-kashyap-11645626a/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-3xl text-gray-400 hover:text-tech-blue transition-colors duration-300 transform hover:scale-110"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="mailto:ayush.kashyap7155@gmail.com"
                            className="text-3xl text-gray-400 hover:text-tech-blue transition-colors duration-300 transform hover:scale-110"
                        >
                            <HiMail />
                        </a>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <div className="w-6 h-10 border-2 border-tech-cyan rounded-full flex justify-center">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-3 bg-tech-cyan rounded-full mt-2"
                    />
                </div>
            </motion.div>
        </section>
    )
}
