'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

export default function About({ data }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    const bio = data?.bio || "I'm a B.Tech student in Artificial Intelligence & Data Science at Vivekananda Global University (2023–2027), driven by a passion for creating intelligent systems that solve real-world problems. My journey in AI has led me through diverse projects ranging from multi-layer research agents to stock market analysis systems."

    return (
        <section id="about" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        About <span className="text-gradient">Me</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-12" />

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Left Column - Bio */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h3 className="text-2xl font-semibold text-tech-cyan mb-4">Who I Am</h3>
                            <p className="text-gray-300 leading-relaxed">
                                {bio}
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                I specialize in building <span className="text-tech-blue font-semibold">end-to-end ML pipelines</span>, from data preprocessing and model training
                                to deployment and monitoring. My tech stack includes Python, Flask, TensorFlow, PyTorch, and modern cloud platforms.
                            </p>
                            <p className="text-gray-300 leading-relaxed">
                                Beyond technical skills, I bring <span className="text-tech-purple font-semibold">strong teamwork and leadership</span> capabilities,
                                honed through hackathons and collaborative projects. I thrive in environments where innovation meets practical application.
                            </p>
                        </motion.div>

                        {/* Right Column - Education & Highlights */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="space-y-6"
                        >
                            {/* Education Card */}
                            <div className="bg-tech-dark/50 p-6 rounded-xl cyber-border hover:glow-box transition-all duration-300">
                                <h3 className="text-xl font-semibold text-tech-cyan mb-3">🎓 Education</h3>
                                <div className="space-y-2">
                                    <p className="text-white font-semibold">Vivekananda Global University</p>
                                    <p className="text-gray-400">B.Tech in AI & Data Science</p>
                                    <p className="text-gray-500 text-sm">2023 - 2027</p>
                                    <div className="mt-3 pt-3 border-t border-gray-700">
                                        <p className="text-sm text-gray-400 mb-2">Relevant Coursework:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Machine Learning', 'Deep Learning', 'NLP', 'Computer Vision', 'Data Engineering', 'Cloud Computing'].map((course) => (
                                                <span key={course} className="text-xs px-2 py-1 bg-tech-purple/20 text-tech-purple rounded">
                                                    {course}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="bg-tech-dark/50 p-6 rounded-xl cyber-border hover:glow-box transition-all duration-300">
                                <h3 className="text-xl font-semibold text-tech-cyan mb-3">🏆 Achievements</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex items-start">
                                        <span className="text-tech-blue mr-2">▹</span>
                                        <span>Active member of University AI Club</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-tech-blue mr-2">▹</span>
                                        <span>Published multiple open-source AI projects on GitHub</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-tech-blue mr-2">▹</span>
                                        <span>Hackathon participant and award winner</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-tech-blue mr-2">▹</span>
                                        <span>Contributor to AI/ML open-source communities</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-tech-blue/10 to-tech-purple/10 p-4 rounded-lg cyber-border text-center">
                                    <p className="text-3xl font-bold text-tech-blue">10+</p>
                                    <p className="text-sm text-gray-400">Projects</p>
                                </div>
                                <div className="bg-gradient-to-br from-tech-purple/10 to-tech-cyan/10 p-4 rounded-lg cyber-border text-center">
                                    <p className="text-3xl font-bold text-tech-purple">2</p>
                                    <p className="text-sm text-gray-400">Internships</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
