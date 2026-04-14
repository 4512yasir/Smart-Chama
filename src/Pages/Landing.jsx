import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">

      {/* HERO */}
      <section className="relative py-24 px-6 text-center">

        <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-300/30 blur-3xl rounded-full"></div>

        <div className="relative max-w-6xl mx-auto">

          <div className="inline-block mb-6 px-4 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
            Built for Modern Chamas 🇰🇪
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight"
          >
            The Smart Way to <br />
            Manage Your Chama
          </motion.h1>

          <p className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto">
            No more spreadsheets, confusion, or missed contributions.
            SmartChama helps you manage everything in one place.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link className="px-8 py-3 bg-green-600 text-white rounded-xl">
              Get Started
            </Link>
            <Link className="px-8 py-3 border rounded-xl">
              See How It Works
            </Link>
          </div>

        </div>
      </section>

      {/* TRUST STATS */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-green-600">10,000+</h2>
            <p className="text-gray-600">Transactions tracked</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-600">500+</h2>
            <p className="text-gray-600">Chamas using SmartChama</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-600">99%</h2>
            <p className="text-gray-600">Accuracy & transparency</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            {
              step: "1",
              title: "Create Your Chama",
              desc: "Set up your group in seconds as a chairperson.",
            },
            {
              step: "2",
              title: "Invite Members",
              desc: "Share your unique invite link with members.",
            },
            {
              step: "3",
              title: "Track Everything",
              desc: "Monitor contributions and activities in real-time.",
            },
          ].map((item, i) => (
            <div key={i} className="p-6 border rounded-2xl">
              <div className="text-green-600 font-bold text-xl mb-2">
                Step {item.step}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50 px-6 text-center">
        <h2 className="text-3xl font-bold">Why Choose SmartChama?</h2>

        <div className="mt-12 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            "Real-time contribution tracking",
            "Secure and transparent records",
            "Easy member management",
            "Automated financial summaries",
            "Mobile-friendly access",
            "Instant notifications",
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow">
              {feature}
            </div>
          ))}

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">
          What Our Users Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {[
            {
              name: "Mary W.",
              text: "Managing our chama has never been easier!",
            },
            {
              name: "James K.",
              text: "No more confusion about contributions.",
            },
            {
              name: "Amina N.",
              text: "Simple, clean, and very powerful.",
            },
          ].map((t, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl">
              <p className="text-gray-600">"{t.text}"</p>
              <h4 className="mt-4 font-semibold">{t.name}</h4>
            </div>
          ))}

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center bg-green-600 text-white">
        <h2 className="text-3xl font-bold">
          Start Managing Your Chama Today
        </h2>

        <p className="mt-4">
          Join hundreds of groups already using SmartChama.
        </p>

        <Link
          to="/create"
          className="inline-block mt-8 px-10 py-3 bg-white text-green-600 rounded-xl font-semibold"
        >
          Create Your Chama →
        </Link>
      </section>

    </div>
  );
};

export default LandingPage;