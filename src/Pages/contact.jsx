import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-linear-to-b from-white via-green-50 to-green-100 text-gray-800">
      {/* HERO SECTION */}
      <section className="text-center py-20 px-6 bg-linear-to-r from-green-600 to-green-500 text-white">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl font-bold mb-4"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-green-50 text-lg max-w-2xl mx-auto"
        >
          We’d love to hear from you! Whether you have a question, feedback, or
          partnership idea — our team is here to help.
        </motion.p>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="max-w-6xl mx-auto py-20 px-6 grid md:grid-cols-2 gap-12 items-start">
        {/* LEFT - INFO */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold text-green-700 mb-6">
            Contact Information
          </h2>
          <p className="text-gray-600 mb-8">
            Feel free to reach out through any of the channels below or send us
            a message directly — we’ll get back to you as soon as possible.
          </p>

          <ul className="space-y-5">
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-green-600" />
              <span>support@smartchama.africa</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-green-600" />
              <span>+254 712 345 678</span>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <span>Nairobi, Kenya</span>
            </li>
          </ul>

          {/* SOCIAL LINKS */}
          <div className="flex gap-4 mt-8">
            {[
              { Icon: Facebook, link: "https://facebook.com/smartchama" },
              { Icon: Twitter, link: "https://twitter.com/smartchama" },
              { Icon: Linkedin, link: "https://linkedin.com/company/smartchama" },
            ].map(({Icon,link }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white border border-green-100 shadow hover:bg-green-100 transition"
              >
                <Icon className="w-5 h-5 text-green-600" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* RIGHT - FORM */}
        <motion.form
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl shadow-lg p-8 border border-green-100"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Message sent! (You can integrate backend later)");
          }}
        >
          <h2 className="text-2xl font-semibold text-green-700 mb-6">
            Send a Message
          </h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="Type your message here..."
                required
                className="w-full p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            <Send className="w-4 h-4" /> Send Message
          </button>
        </motion.form>
      </section>

      {/* MAP SECTION */}
      <section className="max-w-6xl mx-auto mb-20 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="rounded-3xl overflow-hidden shadow-lg border border-green-100"
        >
          <iframe
            title="Smart Chama Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.85701260564!2d36.82194631535454!3d-1.292065699062486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173000000001%3A0x1d01010101010101!2sNairobi!5e0!3m2!1sen!2ske!4v0000000000000"
            width="100%"
            height="350"
            allowFullScreen=""
            loading="lazy"
            className="border-0 w-full"
          ></iframe>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        © {new Date().getFullYear()} Smart Chama — Empowering Communities
        Financially.
      </footer>
    </main>
  );
}
