import { Link } from "react-router-dom";
import heroImg from "../assets/smartchamalogo.jpeg";

export default function LandingPage() {
  return (
    <section className="pt-24 min-h-screen bg-linear-to-b from-green-50 to-white flex flex-col">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 py-16 gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Empower Your{" "}
            <span className="text-green-600">Chama</span>{" "}
            with Smart Financial Tools
          </h1>

          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-xl mx-auto md:mx-0">
            Manage contributions, track goals, and grow your savings together —
            all in one intelligent platform built for trust and simplicity.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-4">
            <Link
              to="/create"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold shadow-md transition"
            >
              Create Your Chama
            </Link>

            <Link
              to="/login"
              className="border border-green-600 text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-green-600 hover:text-white transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end">
          <img
            src={heroImg}
            alt="Smart Chama Dashboard"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-2xl shadow-xl object-contain"
          />
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white border-t border-green-100 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why SmartChama?
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                title: "Automated Contributions",
                desc: "Track and manage member payments with smart reminders and clear logs.",
                icon: "💰",
              },
              {
                title: "Smart Reports",
                desc: "Understand your chama’s progress with visual insights and summaries.",
                icon: "📊",
              },
              {
                title: "Secure Platform",
                desc: "Your financial and member data is protected with bank-grade security.",
                icon: "🔒",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-green-50 rounded-2xl text-center hover:bg-green-100 transition shadow-sm hover:shadow-md"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-20 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to grow your chama the smart way?
        </h2>

        <Link
          to="/create"
          className="inline-block bg-white text-green-700 px-10 py-3 rounded-full font-semibold hover:bg-green-100 transition"
        >
          Get Started Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm px-4">
        <p>
          © {new Date().getFullYear()} SmartChama. All rights reserved. • Built
          with 💚 in Africa
        </p>
      </footer>
    </section>
  );
}
