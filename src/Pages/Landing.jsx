import { Link } from "react-router-dom";
import heroImg from "../assets/smartchamalogo.jpeg";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-emerald-50 via-white to-teal-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-12">

          {/* TEXT */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Run Your{" "}
              <span className="text-emerald-700">Chama</span>{" "}
              Like a Pro
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-xl mx-auto md:mx-0">
              Track contributions, manage loans, and grow your group savings —
              all in one simple, secure platform built for modern chamas.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
              <Link
                to="/create"
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition transform hover:scale-105"
              >
                Start Your Chama
              </Link>

              <Link
                to="/login"
                className="border border-emerald-700 text-emerald-700 px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 hover:text-white transition"
              >
                Login
              </Link>
            </div>

            {/* TRUST TEXT */}
            <p className="text-sm text-gray-500 pt-2">
              Trusted by growing investment groups across Kenya 🇰🇪
            </p>
          </div>

          {/* IMAGE */}
          <div className="flex-1 flex justify-center">
            <img
              src={heroImg}
              alt="Smart Chama"
              className="w-full max-w-md rounded-3xl shadow-2xl object-contain"
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Everything Your Chama Needs
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {[
              {
                title: "M-Pesa Contributions",
                desc: "Make and track payments instantly with seamless mobile money integration.",
                icon: "📲",
              },
              {
                title: "Loan Management",
                desc: "Request, approve, and monitor loans with built-in interest tracking.",
                icon: "💳",
              },
              {
                title: "Transparent Records",
                desc: "Every transaction is visible and recorded for full accountability.",
                icon: "📖",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create Your Chama",
                desc: "Set up your group and become the admin.",
              },
              {
                step: "2",
                title: "Invite Members",
                desc: "Share your invite link and grow your circle.",
              },
              {
                step: "3",
                title: "Start Saving",
                desc: "Track contributions, loans, and progress easily.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur p-8 rounded-2xl shadow border border-gray-100 hover:shadow-lg transition"
              >
                <div className="text-3xl font-bold text-emerald-700 mb-2">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-700 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Start Your Chama in Minutes 🚀
        </h2>

        <p className="mb-8 text-emerald-100">
          Join others already managing their finances smarter.
        </p>

        <Link
          to="/create"
          className="bg-white text-emerald-700 px-10 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg hover:scale-105 transform"
        >
          Get Started Now
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm px-4">
        <p>
          © {new Date().getFullYear()} SmartChama. All rights reserved. • Built
          with 💚 in Africa
        </p>
      </footer>
    </div>
  );
}