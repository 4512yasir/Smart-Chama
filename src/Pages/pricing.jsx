import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "Free",
    desc: "Perfect for small chamas just getting started.",
    features: [
      "Up to 10 members",
      "Track contributions",
      "Basic reports",
    ],
    highlight: false,
  },
  {
    name: "Growth",
    price: "KES 499/mo",
    desc: "Best for active chamas managing multiple contributions.",
    features: [
      "Up to 50 members",
      "Advanced tracking",
      "Automated reports",
      "SMS/Email reminders",
    ],
    highlight: true,
  },
  {
    name: "Pro",
    price: "KES 1,499/mo",
    desc: "For large chamas & investment groups.",
    features: [
      "Unlimited members",
      "Everything in Growth",
      "Advanced analytics",
      "Priority support",
    ],
    highlight: false,
  },
];

const Pricing = () => {
  return (
    <div className="bg-white text-gray-900">

      {/* HERO */}
      <section className="text-center py-24 px-6">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold"
        >
          Simple Pricing for Every Chama
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          transition={{ delay: 0.2 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg"
        >
          Affordable plans designed for Kenyan groups. No hidden costs.
        </motion.p>
      </section>

      {/* PRICING CARDS */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl border ${
                plan.highlight
                  ? "border-green-500 shadow-xl scale-105"
                  : "border-gray-200 shadow-sm"
              } bg-white`}
            >
              {/* Badge */}
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-green-600 text-white text-xs px-3 py-1 rounded-bl-xl rounded-tr-2xl">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-semibold">{plan.name}</h3>
              <p className="mt-2 text-gray-600 text-sm">{plan.desc}</p>

              <div className="mt-6 text-4xl font-bold">
                {plan.price}
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-600">
                    <Check className="text-green-600" size={18} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/auth/register"
                className={`block mt-8 text-center px-6 py-3 rounded-xl transition ${
                  plan.highlight
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg hover:from-green-600 hover:to-emerald-700"
                    : "border border-gray-300 hover:border-green-500 hover:text-green-600"
                }`}
              >
                Get Started
              </Link>
            </motion.div>
          ))}

        </div>
      </section>

      {/* LOCAL TRUST SECTION */}
      <section className="py-20 bg-gray-50 text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold">
          Built for Kenyan Chamas 🇰🇪
        </h2>

        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Designed to work seamlessly with how chamas operate in Kenya —
          from contributions to member management.
        </p>
      </section>

      {/* CTA */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Managing Your Chama Today
        </h2>

        <p className="mt-4 text-gray-600">
          Join hundreds of Kenyan groups already using SmartChama.
        </p>

        <Link
          to="/auth/register"
          className="inline-block mt-8 px-8 py-3 rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg transition"
        >
          Create Your Chama
        </Link>
      </section>

    </div>
  );
};

export default Pricing;