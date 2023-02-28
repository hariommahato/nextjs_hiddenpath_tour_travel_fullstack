/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_SECRET:
      "adventuremountainmountainhariomadventurehariommahatomahatoadventure",
      NEXTMONGODB_URL:"mongodb+srv://adventure:adventure@cluster0.n7x10dx.mongodb.net/?retryWrites=true&w=majority",
      NEXT_UPLOAD_URL:"https://api.cloudinary.com/v1_1/dijky1jjg/image/upload"
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
