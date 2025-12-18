'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'

const defaultExperiences = [
    {
        role: 'AI Innovator Intern',
        company: 'Tensax Technologies',
        location: 'Remote, India',
        duration: '3 months',
        period: 'Oct 2024 - Dec 2024',
        achievements: [
            'Developed innovative AI solutions for real-world business problems, improving operational efficiency by 25%',
            'Implemented multi-agent AI systems for automated research and content generation',
            'Collaborated with cross-functional teams to integrate AI capabilities into existing products',
            'Conducted research on latest LLM architectures and fine-tuning techniques'
        ],
        skills: ['Python', 'LangChain', 'AI Agents', 'GPT APIs', 'Research']
    },
    {
        role: 'Data Scientist Intern',
        company: 'Code Veda',
        location: 'Jaipur, India',
        duration: '2 months',
        period: 'Dec 2024 - Jan 2025',
        achievements: [
            'Designed and deployed ML models improving classification accuracy by approximately 15%',
            'Automated data preprocessing pipelines, reducing processing time by 30%',
            'Implemented feature engineering techniques to enhance model performance',
            'Collaborated with senior data scientists on production-grade ML solutions'
        ],
        skills: ['Python', 'Scikit-learn', 'SQL', 'Pandas', 'Data Visualization']
    }
]

export default function Experience({ data }) {
    const experiencesList = data || defaultExperiences
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section id="experience" className="py-20 bg-tech-dark/30 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Work <span className="text-gradient">Experience</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-12" />

                    <div className="max-w-4xl mx-auto space-y-8">
                        {experiencesList.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative"
                            >
                                <div className="bg-tech-dark/70 p-6 md:p-8 rounded-xl cyber-border hover:glow-box transition-all duration-300">
                                    {/* Header */}
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div className="mb-4 md:mb-0">
                                            <h3 className="text-2xl font-bold text-tech-cyan mb-2">{exp.role}</h3>
                                            <p className="text-xl text-white font-semibold">{exp.company}</p>
                                        </div>
                                        <div className="text-sm text-gray-400 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-tech-purple" />
                                                <span>{exp.period}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-tech-blue" />
                                                <span>{exp.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Achievements */}
                                    <ul className="space-y-3 mb-6">
                                        {exp.achievements?.map((achievement, i) => (
                                            <li key={i} className="flex items-start text-gray-300">
                                                <span className="text-tech-blue mr-3 mt-1">▹</span>
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills?.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 text-sm bg-gradient-to-r from-tech-purple/20 to-tech-blue/20 text-tech-cyan rounded-full border border-tech-cyan/30"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Timeline connector */}
                                {index < experiencesList.length - 1 && (
                                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-gradient-to-b from-tech-blue to-tech-purple"
                                        style={{ top: '100%' }} />
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
