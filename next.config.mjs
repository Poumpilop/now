/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 30,
        },
    },
    serverExternalPackages: ["@node-rs/argon2"],  // A placer ici, au niveau supérieur
};

export default nextConfig;
