/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        SERVER_URL:"http://localhost:5000/api"
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'randomuser.me'
            }
        ]
    }
};

export default nextConfig;
