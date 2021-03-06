/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

const nextConfig = withPWA({
	reactStrictMode: true,

	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true
	},

	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});

		return config;
	}
})

module.exports = nextConfig
