"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function career() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 py-2 reveal">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="bg-white/80 backdrop-blur-xl border border-green-100 shadow-xl rounded-3xl p-6 md:p-8">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Apply Here
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Please fill in your details carefully
            </p>
          </div>

          <form className="space-y-8">
            {/* Personal Details */}
            <Section title="Personal Details">
              <Grid>
                <Input label="First Name *" required />
                <Input label="Last Name *" required />
                <Input label="Email *" type="email" required />
                <Input label="Mobile No *" required />
              </Grid>

              <Grid>
                <Select
                  label="Gender *"
                  options={["Male", "Female", "Other"]}
                />
                <Input label="Position you are applying for" />
              </Grid>

              <Grid>
                <Input label="Date of Birth (DD/MM/YYYY) *" required />
                <Input label="Highest Qualification" />
              </Grid>
            </Section>

            {/* Professional Details */}
            <Section title="Professional Details">
              <Grid>
                <Input label="Portfolio Website" placeholder="http://" />
                <FileInput label="Upload Resume * (Max size 1 MB)" />
              </Grid>

              <Grid>
                <Input label="Last company you worked for" />

                <div>
                  <label className="label">Years of Experience</label>
                  <div className="grid grid-cols-2 gap-3">
                    <select className="input">
                      <option>Select Year</option>
                      {[...Array(21)].map((_, i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                    <select className="input">
                      <option>Select Month</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i}>{i}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </Grid>
            </Section>

            {/* Comments */}
            <Section title="Reference / Comments / Questions">
              <textarea
                rows="4"
                className="input resize-none"
                placeholder="Write your comments here..."
              />
            </Section>

            {/* Submit */}
            <div className="flex justify-center pt-2">
              <button
                type="submit"
                className="px-8 py-2 rounded-lg bg-green-600 text-sm text-white font-medium
                hover:bg-green-700 hover:shadow-md active:scale-95 transition"
              >
                Send Application
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
    <Footer/>
    </>
    
  );
}

/* ---------- Reusable Components ---------- */

function Section({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      <h2 className="text-base font-semibold text-gray-800 mb-4 border-l-4 border-green-600 pl-2">
        {title}
      </h2>
      {children}
    </motion.div>
  );
}

function Grid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      {children}
    </div>
  );
}

function Input({ label, type = "text", required, placeholder }) {
  return (
    <div>
      <label className="label">
        {label}
      </label>
      <input
        type={type}
        required={required}
        placeholder={placeholder}
        className="input"
      />
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div>
      <label className="label">{label}</label>
      <select className="input">
        <option value="">Select..</option>
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

function FileInput({ label }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input type="file" className="input file:bg-white file:border-0" />
    </div>
  );
}
