'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const defaultSkillCategories = [
    {
        category: 'AI & Machine Learning',
        skills: [
            { name: 'TensorFlow', level: 85 },
            { name: 'PyTorch', level: 80 },
            { name: 'Scikit-learn', level: 90 },
            { name: 'XGBoost', level: 85 },
            { name: 'LangChain', level: 75 },
        ]
    },
    {
        category: 'Programming & Frameworks',
        skills: [
            { name: 'Python', level: 95 },
            { name: 'JavaScript', level: 75 },
            { name: 'Flask', level: 85 },
            { name: 'FastAPI', level: 80 },
            { name: 'React', level: 70 },
        ]
    }
]

export default function Skills({ data }) {
    const skillCategories = data || defaultSkillCategories
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section id="skills" className="py-20 bg-tech-dark/30 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Skills & <span className="text-gradient">Expertise</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-12" />

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {skillCategories.map((category, categoryIndex) => (
                            <motion.div
                                key={categoryIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                                className="bg-tech-dark/70 p-6 rounded-xl cyber-border hover:glow-box transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold text-tech-cyan mb-6">{category.category}</h3>
                                <div className="space-y-4">
                                    {category.skills?.map((skill, skillIndex) => (
                                        <div key={skillIndex}>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-gray-300">{skill.name}</span>
                                                <span className="text-tech-purple font-semibold">{skill.level}%</span>
                                            </div>
                                            <div className="h-2 bg-tech-gray rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={isInView ? { width: `${skill.level}%` } : {}}
                                                    transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                                                    className="h-full bg-gradient-to-r from-tech-blue to-tech-purple rounded-full"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Skills Tags */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-12 text-center"
                    >
                        <h3 className="text-xl font-semibold text-tech-cyan mb-6">Also Experienced With</h3>
                        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                            {[
                                'NLP', 'Computer Vision', 'Deep Learning', 'Neural Networks', 'RAG Systems',
                                'API Development', 'Web Scraping', 'Data Pipeline', 'MLOps', 'Model Deployment',
                                'Gradio', 'Streamlit', 'OpenAI API', 'Gemini API', 'Groq', 'Anthropic',
                                'Fine-tuning', 'Transfer Learning', 'Time Series', 'Sentiment Analysis'
                            ].map((skill, index) => (
                                <motion.span
                                    key={skill}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                    transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
                                    className="px-4 py-2 bg-gradient-to-r from-tech-purple/20 to-tech-blue/20 text-tech-cyan rounded-full border border-tech-cyan/30 text-sm hover:scale-105 transition-transform cursor-default"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
