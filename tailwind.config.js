module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
        './app/**/*.{js,ts,jsx,tsx}',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class', // or 'media' for system preference
    theme: {
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' }
                },
                shimmer: {
                    '100%': { transform: 'translateX(100%)' }
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.2s ease-out',
                shimmer: 'shimmer 2s infinite'
            },
        },
    },
    plugins: [],
}