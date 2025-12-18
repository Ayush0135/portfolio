/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                'tech-dark': '#0a0e27',
                'tech-darker': '#060913',
                'tech-blue': '#00d4ff',
                'tech-purple': '#8b5cf6',
                'tech-cyan': '#06b6d4',
                'tech-gray': '#1e293b',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'tech-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                'cyber-gradient': 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 100%)',
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'glow': 'glow 2s ease-in-out infinite alternate',
                'slide-up': 'slideUp 0.5s ease-out',
                'fade-in': 'fadeIn 0.6s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                glow: {
                    '0%': { boxShadow: '0 0 5px #00d4ff, 0 0 10px #00d4ff' },
                    '100%': { boxShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
