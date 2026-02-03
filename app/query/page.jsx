"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useRef, useState } from "react";

export default function QueryPage() {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handles form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    // Collect form data from event.target
    const form = e.target;
    const data = {
      formType: "query",
      name: form["Name *"]?.value?.trim() || "",
      designation: form["Designation"]?.value?.trim() || "",
      organization: form["Organization"]?.value?.trim() || "",
      officeAddress: form["Office Address"]?.value?.trim() || "",
      city: form["City *"]?.value?.trim() || "",
      email: form["Email Address *"]?.value?.trim() || "",
      telephone: form["Telephone No."]?.value?.trim() || "",
      phone: form["Mobile *"]?.value?.trim() || "",
      otherProfessionalUpdates: form.updates?.value || (form["updates"] ? (form["updates"].value || "") : ""),
      subject: form["Subject of Query *"]?.value || "",
      message: form["Query *"]?.value?.trim() || "",
    };

    // Basic validation
    if (!data.name || !data.email || !data.phone || !data.message) {
      setError("Please fill all required fields.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        setSuccess("Query submitted successfully!");
        form.reset();
      } else {
        setError(result.error || "Submission failed.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  return (
    <>
      <Navbar />
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
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Query Sheet</h1>
              <p className="text-sm text-gray-500 mt-1">Fields marked * are mandatory</p>
            </div>

            {/* Success/Error messages */}
            {success && <div className="text-green-600 text-center mb-4">{success}</div>}
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}

            <form className="space-y-8" ref={formRef} onSubmit={handleSubmit} autoComplete="off">
              {/* Section 1 */}
              <Section title="Personal Information">
                <Grid>
                  <Input label="Name *" required />
                  <Input label="Designation" />
                  <Input label="Organization" />
                  <Input label="Office Address" />
                  <Input label="City *" required />
                </Grid>
              </Section>

              {/* Section 2 */}
              <Section title="Contact Details">
                <Grid>
                  <Input label="Email Address *" type="email" required />
                  <Input label="Telephone No." />
                  <Input label="Mobile *" required />
                </Grid>

                <div className="mt-4">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Other Professional Updates *</label>
                  <div className="flex gap-6">
                    <Radio label="Yes" />
                    <Radio label="No" />
                  </div>
                </div>
              </Section>

              {/* Section 3 */}
              <Section title="Query Details">
                <div>
                  <label className="label">Subject of Query *</label>
                  <select className="input" name="Subject of Query *">
                    <option value="">---- Please Select ----</option>
                    <option>General Enquiry</option>
                    <option>Technical Support</option>
                    <option>Business Proposal</option>
                    <option>Feedback</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="label">Query *</label>
                  <textarea rows="3" className="input resize-none" name="Query *" />
                </div>
              </Section>

              {/* Buttons */}
              <div className="flex justify-center gap-4 pt-2">
                <button
                  type="button"
                  className="px-6 py-2 rounded-lg border border-gray-300 text-sm text-gray-700 hover:bg-gray-100 transition"
                  onClick={() => formRef.current?.reset()}
                  disabled={loading}
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="px-7 py-2 rounded-lg bg-green-600 text-sm text-white font-medium hover:bg-green-700 hover:shadow-md active:scale-95 transition"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

/* ---------- Components ---------- */

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  );
}

function Input({ label, type = "text", required }) {
  return (
    <div>
      <label className="label">{label}</label>
      <input type={type} required={required} className="input" name={label} />
    </div>
  );
}

function Radio({ label }) {
  return (
    <label className="flex items-center gap-2 text-sm cursor-pointer">
      <input type="radio" name="updates" className="accent-green-600" />
      {label}
    </label>
  );
}
