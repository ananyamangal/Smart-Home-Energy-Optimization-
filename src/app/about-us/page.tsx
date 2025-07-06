"use client"


import Image from "next/image"

export default function AboutUsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* About Project */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 text-gray-800">About Us</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Our platform is designed to revolutionize the way households manage and optimize their energy consumption.
          By leveraging smart meters, real-time data analytics, and intuitive visualizations, we empower users to monitor
          energy usage, identify wastage, and make informed decisions to reduce costs and carbon footprint. Whether
          you're aiming to lower your electricity bills or contribute to a greener planet, our solution provides the tools
          and insights you need—all in one intelligent dashboard.
        </p>
      </section>

      {/* Development Team */}
      <section>
        <h2 className="text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400 mb-10">
          Meet Our Development Team
        </h2>

        <div className="flex justify-center">
          {/* Developer 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300 border border-blue-100">
            <Image
              src="/ananya.jpg"
              alt="Ananya Mangal"
              width={150}
              height={150}
              className="rounded-full mx-auto object-cover shadow-md border-4 border-blue-300"
            />
            <h3 className="mt-6 text-2xl font-semibold text-gray-800">Ananya Mangal</h3>
            <p className="text-gray-500">Full Stack Developer & AI/ML Engineer</p>
          </div>
        </div>
      </section>
    </main>
  )
}
