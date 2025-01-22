export default function Hero() {
    return (
      <section className="py-20">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold text-white mb-6">
            Secure Your Account with KNOX
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Add an extra layer of security to your account using Two-Factor
            Authentication.
          </p>
          <div className="space-x-4">
            <a
              href="/dashboard"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started
            </a>
            <a
              href="https://github.com/thesushilsharma/Knox"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>
    );
  }