import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            Manage Your Chama <br />
            <span className="text-green-600">Smartly & Effortlessly</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Track contributions, manage members, and automate your group
            finances — all in one powerful platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Link
              to="/auth/register"
              className="px-6 py-3 rounded-xl text-white bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transition"
            >
              Get Started
            </Link>

            <Link
              to="/features"
              className="px-6 py-3 rounded-xl border border-gray-300 hover:border-green-500 hover:text-green-600 transition"
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-200 opacity-30 blur-3xl rounded-full"></div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Run Your Chama
          </h2>

          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Simple tools designed to make group finance management seamless.
          </p>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            
            {[
              {
                title: "Track Contributions",
                desc: "Monitor member payments in real-time with clear records.",
              },
              {
                title: "Manage Members",
                desc: "Easily add, remove, and organize your chama members.",
              },
              {
                title: "Automated Reports",
                desc: "Get instant financial summaries and insights.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold text-green-600">
                  {feature.title}
                </h3>
                <p className="mt-3 text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-6">
          
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Upgrade Your Chama?
          </h2>

          <p className="mt-4 text-gray-600">
            Join now and start managing your finances like a pro.
          </p>

          <Link
            to="/auth/register"
            className="inline-block mt-8 px-8 py-3 rounded-xl text-white bg-linear-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transition"
          >
            Create Your Chama
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;