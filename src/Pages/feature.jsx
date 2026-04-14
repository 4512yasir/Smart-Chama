import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Wallet,
  BarChart3,
  ShieldCheck,
  Bell,
  Cloud,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Contribution Tracking",
    desc: "Track all member contributions in real-time with clear records.",
  },
  {
    icon: Users,
    title: "Member Management",
    desc: "Add, manage, and organize members with ease.",
  },
  {
    icon: BarChart3,
    title: "Smart Reports",
    desc: "Get instant insights into your chama finances.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data",
    desc: "Enterprise-grade security keeps your data safe.",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Automated reminders for payments and updates.",
  },
  {
    icon: Cloud,
    title: "Cloud Access",
    desc: "Access your chama anytime from any device.",
  },
];

const Features = () => {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="relative text-center py-24 px-6 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Built for Modern Chamas
          <br />
          <span className="text-green-600">
            Simple. Powerful. Reliable.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg"
        >
          Manage your group finances with tools designed for clarity,
          transparency, and growth.
        </motion.p>

        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-200 opacity-30 blur-3xl rounded-full"></div>
      </section>

      {/* FEATURE GRID */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Icon size={22} />
                </div>

                <h3 className="mt-4 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-gray-600 text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* FEATURE SHOWCASE */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto space-y-24">

          {/* Block 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Real-Time Contribution Tracking
              </h2>
              <p className="mt-4 text-gray-600">
                Instantly see who has paid and who hasn't. No more confusion,
                everything is updated live.
              </p>
            </motion.div>

            <div className="h-72 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-inner"></div>
          </div>

          {/* Block 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="h-72 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-inner order-2 md:order-1"></div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Easy Member Management
              </h2>
              <p className="mt-4 text-gray-600">
                Add members, assign roles, and keep your chama organized without
                effort.
              </p>
            </motion.div>
          </div>

          {/* Block 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold">
                Smart Financial Insights
              </h2>
              <p className="mt-4 text-gray-600">
                Get powerful reports and analytics that help you make better
                decisions.
              </p>
            </motion.div>

            <div className="h-72 rounded-2xl bg-gradient-to-br from-green-100 to-emerald-200 shadow-inner"></div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to Transform Your Chama?
        </h2>

        <p className="mt-4 text-gray-600">
          Start managing your finances smarter today.
        </p>

        <Link
          to="/create"
          className="inline-block mt-8 px-8 py-3 rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transition"
        >
          Get Started
        </Link>
      </section>

    </div>
  );
};

export default Features;