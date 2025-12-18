'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const defaultProjects = [
    {
        title: 'Stock Market Analysis System',
        description: 'Comprehensive stock market analysis platform with real-time data visualization, AI-powered predictions, and portfolio management. Features include technical indicators, sentiment analysis, and automated trading signals.',
        longDescription: 'Built a full-stack application integrating multiple financial APIs, implementing machine learning models for price prediction, and creating interactive dashboards for market insights. Includes paper trading functionality and risk analysis tools.',
        tags: ['Python', 'Flask', 'ML', 'Chart.js', 'Alpaca API', 'yFinance', 'Sentiment Analysis'],
        github: 'https://github.com/Ayush0135/Stock-market-analysis',
        live: null,
        image: '/projects/stock-market.jpg'
    },
    {
        title: 'Multi-Layer Research Agent',
        description: 'Advanced AI research agent system using multiple LLM layers for comprehensive topic analysis. Implements hierarchical agent architecture with Gemini, Groq, and Anthropic APIs for robust research generation.',
        longDescription: 'Developed a sophisticated multi-agent system that decomposes research topics, discovers relevant documents via Google Programmable Search, analyzes content quality, and synthesizes Scopus-quality research papers with proper citations and academic formatting.',
        tags: ['LangChain', 'AI Agents', 'Python', 'Gemini API', 'Groq', 'RAG', 'Research Automation'],
        github: 'https://github.com/Ayush0135/Multi-layer-research-agent',
        live: null,
        image: '/projects/research-agent.jpg'
    },
    {
        title: 'Rainfall Prediction System',
        description: 'Machine learning model for accurate rainfall forecasting using ensemble methods. Implements Random Forest and XGBoost algorithms with extensive feature engineering for improved prediction accuracy.',
        longDescription: 'Processed meteorological data, performed feature engineering, and trained multiple ML models. Achieved significant accuracy improvements through hyperparameter tuning and ensemble methods.',
        tags: ['Python', 'XGBoost', 'Random Forest', 'Scikit-learn', 'Data Analysis', 'Feature Engineering'],
        github: 'https://github.com/Ayush0135/rainfall-prediction',
        live: null,
        image: '/projects/rainfall.jpg'
    },
    {
        title: 'Advanced NLP Text Summarizer',
        description: 'Intelligent text summarization system using transformer models and spaCy. Supports both extractive and abstractive summarization with multi-document processing capabilities.',
        longDescription: 'Leveraged state-of-the-art transformer architectures for context-aware text summarization. Implemented custom preprocessing pipelines and evaluation metrics for summary quality assessment.',
        tags: ['NLP', 'Transformers', 'spaCy', 'BERT', 'Python', 'HuggingFace'],
        github: 'https://github.com/Ayush0135/text-summariser',
        live: null,
        image: '/projects/nlp-summarizer.jpg'
    },
    {
        title: 'OmniChat - Gemini AI Playground',
        description: 'Multimodal AI interface powered by Google Gemini API with Gradio frontend. Supports text, image, and voice interactions for versatile AI-powered conversations and analysis.',
        longDescription: 'Created an intuitive interface for exploring Gemini\'s capabilities across multiple modalities. Implemented conversation history, context management, and custom prompt engineering for enhanced responses.',
        tags: ['Generative AI', 'Gemini API', 'Gradio', 'Python', 'Multimodal AI', 'LLM'],
        github: 'https://github.com/Ayush0135/omnichat-gemini',
        live: null,
        image: '/projects/omnichat.jpg'
    },

]

export default function Projects({ data }) {
    const projectsList = data || defaultProjects
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })

    return (
        <section id="projects" className="py-20 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        Featured <span className="text-gradient">Projects</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-tech-blue to-tech-purple mx-auto mb-12" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                        {projectsList.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative bg-tech-dark/70 rounded-xl overflow-hidden cyber-border hover:glow-box transition-all duration-300 flex flex-col"
                            >
                                {/* Project Image Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-tech-purple/20 to-tech-blue/20 relative overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-6xl opacity-20">
                                            {index === 0 ? '📊' : index === 1 ? '🤖' : index === 2 ? '🌧️' : index === 3 ? '📝' : index === 4 ? '💬' : '♻️'}
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-tech-dark to-transparent opacity-60" />
                                </div>

                                {/* Content */}
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-tech-cyan transition-colors">
                                        {project.title}
                                    </h3>

                                    <p className="text-gray-400 text-sm mb-4 flex-1">
                                        {project.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags?.slice(0, 4).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="text-xs px-2 py-1 bg-tech-purple/20 text-tech-purple rounded border border-tech-purple/30"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                        {project.tags?.length > 4 && (
                                            <span className="text-xs px-2 py-1 bg-tech-blue/20 text-tech-blue rounded">
                                                +{project.tags.length - 4}
                                            </span>
                                        )}
                                    </div>

                                    {/* Links */}
                                    <div className="flex gap-4">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-tech-cyan hover:text-tech-blue transition-colors"
                                        >
                                            <FaGithub />
                                            <span className="text-sm">Code</span>
                                        </a>
                                        {project.live && (
                                            <a
                                                href={project.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-tech-purple hover:text-tech-blue transition-colors"
                                            >
                                                <FaExternalLinkAlt />
                                                <span className="text-sm">Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* View More */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="text-center mt-12"
                    >
                        <a
                            href="https://github.com/Ayush0135"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-8 py-3 border-2 border-tech-cyan text-tech-cyan font-semibold rounded-lg hover:bg-tech-cyan/10 transition-all duration-300"
                        >
                            View All Projects on GitHub
                        </a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}
