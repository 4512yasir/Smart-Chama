import { motion } from "framer-motion";
import {
  Users,
  ShieldCheck,
  Lightbulb,
  Target,
  TrendingUp,
  Rocket,
  Wallet,
  BarChart3,
  Smartphone,
  CreditCard,
  LineChart,
} from "lucide-react";

import heroImg from "../assets/smartchamalogo.jpeg";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-green-50 to-green-100 text-gray-800">
      {/* HERO SECTION */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 md:py-28 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-green-600/10 via-transparent to-green-600/10" />

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-green-700"
        >
          About <span className="text-green-500">Smart Chama</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="mt-6 max-w-3xl text-gray-600 text-base sm:text-lg md:text-xl leading-relaxed"
        >
          Building Africa’s most trusted platform for savings groups — blending
          innovation, community, and transparency to empower financial growth.
        </motion.p>
      </section>

      {/* COMPANY STORY */}
      <section className="max-w-6xl mx-auto py-20 px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.img
          src={heroImg}
          alt="Smart Chama team"
          className="rounded-3xl shadow-xl object-contain w-full max-h-[360px] md:max-h-[400px]"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Smart Chama began with a simple idea — helping savings groups manage
            their finances seamlessly. From manual record-keeping to full
            automation, our goal is to bring simplicity, transparency, and trust
            to every Chama.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We believe in the power of community-driven finance. Our platform
            gives members the tools to save, invest, and track progress in
            real-time — empowering economic growth across the continent.
          </p>
        </motion.div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-white/70 backdrop-blur-md py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-4 sm:px-6">
          {[
            {
              title: "Our Mission",
              icon: <Lightbulb className="w-8 h-8 text-green-600" />,
              text:
                "To empower communities with smarter financial tools that make group savings transparent, accessible, and rewarding.",
            },
            {
              title: "Our Vision",
              icon: <Target className="w-8 h-8 text-green-600" />,
              text:
                "To become Africa’s most trusted financial collaboration platform — enabling groups to grow wealth collectively and sustainably.",
            },
          ].map(({ title, icon, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="rounded-3xl p-10 border border-green-100 bg-white shadow-lg hover:shadow-2xl transition"
            >
              <div className="flex items-center gap-3 mb-4">{icon}</div>
              <h2 className="text-2xl font-semibold text-green-700 mb-3">
                {title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto text-center py-20 px-4 sm:px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-green-700 mb-12"
        >
          What Smart Chama Offers
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {[
            { icon: <Users className="w-10 h-10 text-green-600" />, title: "Group Management", text: "Create and manage Chamas, members, and roles with clarity." },
            { icon: <Wallet className="w-10 h-10 text-green-600" />, title: "Digital Wallets", text: "Secure tracking of funds, contributions, and withdrawals." },
            { icon: <CreditCard className="w-10 h-10 text-green-600" />, title: "Auto Contributions", text: "Automated payments and reminders for accountability." },
            { icon: <BarChart3 className="w-10 h-10 text-green-600" />, title: "Expense & Loans", text: "Track spending, loans, and repayments easily." },
            { icon: <LineChart className="w-10 h-10 text-green-600" />, title: "Real-Time Reports", text: "Visual insights to support smart financial decisions." },
            { icon: <Smartphone className="w-10 h-10 text-green-600" />, title: "Mobile Friendly", text: "Access your Chama anywhere on any device." },
          ].map(({ icon, title, text }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="rounded-2xl bg-white border border-green-100 p-8 shadow-md hover:shadow-xl hover:-translate-y-1 transition"
            >
              <div className="flex flex-col items-center">
                {icon}
                <h3 className="text-xl font-semibold text-green-700 mt-4">
                  {title}
                </h3>
                <p className="text-gray-600 mt-3">{text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-r from-green-600 to-green-500 py-24 text-white text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Ready to Join the Future of Group Finance?
        </motion.h2>

        <p className="text-green-100 mb-10 max-w-2xl mx-auto">
          Organize savings, automate contributions, and empower your community.
        </p>

        <a
          href="/create"
          className="inline-flex items-center gap-2 bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-100 transition"
        >
          <Rocket className="w-5 h-5" />
          Create Your Chama
        </a>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Smart Chama — Empowering Communities Financially.
      </footer>
    </main>
  );
}
