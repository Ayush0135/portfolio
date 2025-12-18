import { Inter } from 'next/font/google'
import './globals.css'
import VisitorTracker from '@/components/VisitorTracker'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Ayush Kashyap | AI Engineer Portfolio',
    description: 'Portfolio of Ayush Kashyap - AI/ML Engineer specializing in Machine Learning, NLP, and intelligent systems. Explore my projects, experience, and get in touch.',
    keywords: 'AI Engineer, Machine Learning, NLP, Data Science, Portfolio, Ayush Kashyap',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <VisitorTracker />
                {children}
            </body>
        </html>
    )
}
