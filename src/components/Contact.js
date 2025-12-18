'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaLinkedin, FaPhone } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const [status, setStatus] = useState({ type: '', message: '' })
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus({ type: '', message: '', mailto: '' })

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await response.json()

            if (response.ok) {
                setStatus({
                    type: 'success',
                    message: 'Message sent successfully! I\'ll get back to you soon.'
                })
                setFormData({ name: '', email: '', subject: '', message: '' })
            } else {
                setStatus({
                    type: 'error',
                    message: data.error || 'Failed to send message.',
                    mailto: data.mailto // Add mailto link if provided by API
                })
            }
        } catch (error) {
            setStatus({
                type: 'error',
                message: 'An error occurred. Please try sending via your email app.',
                mailto: `mailto:ayush.kashyap7155@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Get In <span className="text-gradient">Touch</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-6" />
                    <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                        Let's build something amazing together!
                    </p>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-6"
                        >
                            <div className="bg-tech-dark/70 p-8 rounded-xl cyber-border">
                                <h3 className="text-2xl font-bold text-tech-cyan mb-6">Contact Information</h3>

                                <div className="space-y-4">
                                    <a
                                        href="mailto:ayush.kashyap7155@gmail.com"
                                        className="flex items-center gap-4 text-gray-300 hover:text-tech-blue transition-colors group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-tech-blue/20 to-tech-purple/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <HiMail className="text-2xl text-tech-blue" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Email</p>
                                            <p className="font-semibold">ayush.kashyap7155@gmail.com</p>
                                        </div>
                                    </a>

                                    <a
                                        href="tel:+919693932656"
                                        className="flex items-center gap-4 text-gray-300 hover:text-tech-blue transition-colors group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-tech-purple/20 to-tech-cyan/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FaPhone className="text-xl text-tech-purple" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">Phone</p>
                                            <p className="font-semibold">+91 9693932656</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://github.com/Ayush0135"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 text-gray-300 hover:text-tech-blue transition-colors group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-tech-cyan/20 to-tech-blue/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FaGithub className="text-2xl text-tech-cyan" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">GitHub</p>
                                            <p className="font-semibold">@Ayush0135</p>
                                        </div>
                                    </a>

                                    <a
                                        href="https://www.linkedin.com/in/ayush-kashyap-11645626a/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 text-gray-300 hover:text-tech-blue transition-colors group"
                                    >
                                        <div className="w-12 h-12 bg-gradient-to-br from-tech-blue/20 to-tech-purple/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <FaLinkedin className="text-2xl text-tech-blue" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">LinkedIn</p>
                                            <p className="font-semibold">Ayush Kashyap</p>
                                        </div>
                                    </a>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="bg-gradient-to-br from-tech-purple/10 to-tech-blue/10 p-6 rounded-xl cyber-border">
                                <h4 className="text-lg font-semibold text-tech-cyan mb-4">Let's Collaborate On</h4>
                                <div className="space-y-2 text-gray-300">
                                    <p className="flex items-start gap-2">
                                        <span className="text-tech-blue mt-1">▹</span>
                                        <span>AI/ML Projects & Research</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-tech-blue mt-1">▹</span>
                                        <span>Full-Stack Development</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-tech-blue mt-1">▹</span>
                                        <span>Open Source Contributions</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-tech-blue mt-1">▹</span>
                                        <span>Internship & Job Opportunities</span>
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <form onSubmit={handleSubmit} className="bg-tech-dark/70 p-8 rounded-xl cyber-border space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-tech-gray border border-tech-cyan/30 rounded-lg text-white focus:outline-none focus:border-tech-cyan transition-colors"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-tech-gray border border-tech-cyan/30 rounded-lg text-white focus:outline-none focus:border-tech-cyan transition-colors"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-tech-gray border border-tech-cyan/30 rounded-lg text-white focus:outline-none focus:border-tech-cyan transition-colors"
                                        placeholder="What's this about?"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows="5"
                                        className="w-full px-4 py-3 bg-tech-gray border border-tech-cyan/30 rounded-lg text-white focus:outline-none focus:border-tech-cyan transition-colors resize-none"
                                        placeholder="Your message here..."
                                    />
                                </div>

                                {status.message && (
                                    <div className={`p-4 rounded-lg ${status.type === 'success'
                                        ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                                        : 'bg-red-500/20 border border-red-500/30 text-red-400'
                                        }`}>
                                        <span>{status.message}</span>
                                        {status.mailto && (
                                            <a
                                                href={status.mailto}
                                                className="px-4 py-2 bg-tech-blue/20 hover:bg-tech-blue/30 text-tech-blue text-sm rounded-lg transition-colors text-center font-semibold"
                                            >
                                                Send via Email App Instead
                                            </a>
                                        )}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full px-8 py-3 bg-gradient-to-r from-tech-blue to-tech-purple text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-tech-blue/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
