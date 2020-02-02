module.exports = ({ file, options, env }) => ({
    plugins: [
        require('tailwindcss'),
        require('autoprefixer')
    ],
});
