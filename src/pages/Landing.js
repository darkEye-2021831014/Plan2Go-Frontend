import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20">
      {/* Hero Section */}
      <section className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 rounded-full mb-8">
              <span className="text-primary-700 text-sm font-semibold">✨ AI-Powered Travel Planning</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Your Next Adventure
              <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Discover amazing places, get personalized recommendations, and connect with verified local guides.
              <span className="text-primary-600 font-medium"> All in one beautiful Website.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Start Planning Free
                <span className="inline-block ml-2 group-hover:translate-x-1 transition">→</span>
              </Link>
              <Link
                to="/login"
                className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-primary-300 px-8 py-4 rounded-2xl text-lg font-semibold transition-all shadow-sm hover:shadow-md"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to make your travel planning effortless and enjoyable
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized trip plans tailored to your preferences, budget, and travel style.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-400 to-accent-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Packing</h3>
              <p className="text-gray-600 leading-relaxed">
                Never forget essentials! Get weather-based suggestions for what to pack.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nearby Essentials</h3>
              <p className="text-gray-600 leading-relaxed">
                Find hotels, restaurants, transport, and services all on one interactive map.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Guides</h3>
              <p className="text-gray-600 leading-relaxed">
                Book experienced local guides with verified profiles and authentic reviews.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-accent-400 to-accent-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Place Explorer</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover popular destinations and hidden gems with detailed information.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group bg-white/60 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 hover:border-primary-200 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tour Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your active tours and manage bookings in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary-500 to-primary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Explore? 🚀
          </h2>
          <p className="text-xl text-primary-50 mb-10 max-w-2xl mx-auto">
            Join thousands of travelers planning amazing adventures with Plan2Go
          </p>
          <Link
            to="/register"
            className="inline-block bg-white hover:bg-gray-50 text-primary-600 px-10 py-5 rounded-2xl text-lg font-semibold transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Start Your Journey
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">© 2025 Plan2Go. Made with ❤️ for travelers.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
