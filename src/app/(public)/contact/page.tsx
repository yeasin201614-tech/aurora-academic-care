"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "Admission Inquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const branches = [
    {
      name: "Dhanmondi Main Campus",
      address: "House #42, Road #11, Dhanmondi, Dhaka-1209",
      phone: "+880 1712-345678",
      email: "dhanmondi@auroraacademic.com",
      hours: "Sat - Thu: 8:00 AM - 8:30 PM",
    },
    {
      name: "Uttara Branch",
      address: "Plot #14, Sector #4, Jashimuddin Avenue, Uttara, Dhaka",
      phone: "+880 1812-998877",
      email: "uttara@auroraacademic.com",
      hours: "Sat - Thu: 8:00 AM - 8:00 PM",
    },
    {
      name: "Mirpur Campus",
      address: "Level 4, City Centre, Mirpur 10 Roundabout, Dhaka-1216",
      phone: "+880 1912-445566",
      email: "mirpur@auroraacademic.com",
      hours: "Sat - Thu: 8:30 AM - 8:00 PM",
    },
    {
      name: "Chittagong Branch",
      address: "Equity Central, GEC Circle, CDA Avenue, Chittagong",
      phone: "+880 1612-778899",
      email: "ctg@auroraacademic.com",
      hours: "Sat - Thu: 9:00 AM - 7:30 PM",
    },
  ];

  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full">
            Connect With Us
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Contact & Campus Locations
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Have queries about batch admission, fees, or academic programs? 
            Reach out via phone, email, or visit any of our physical campuses.
          </p>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-soft">
            <h2 className="text-xl font-bold text-navy-900 mb-2">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-500 mb-6">Our academic counselors reply within 24 business hours.</p>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3 animate-fadeIn">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-900">Message Received!</h3>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you for reaching out to Aurora Academic Care. An academic counselor will contact you shortly via phone or email.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="text-xs font-semibold text-emerald-800 underline hover:text-emerald-900 pt-2 block mx-auto"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Tanzim Ahmed"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017xxxxxxxx"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Inquiry Topic</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none bg-white"
                    >
                      <option value="Admission Inquiry">HSC / SSC Admission Inquiry</option>
                      <option value="Medical Buster">Medical Admission Program</option>
                      <option value="BUET Engineering">BUET Engineering Coaching</option>
                      <option value="Fees & Scholarship">Fee Structure & Scholarships</option>
                      <option value="Other">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message / Questions *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what you'd like to learn or inquire about..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-brandBlue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-navy-800 hover:bg-navy-900 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-gold-400" />
                  <span>Send Message to Academic Office</span>
                </button>
              </form>
            )}
          </div>

          {/* Campus Branches List */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-xl font-bold text-navy-900 mb-2">Our Campus Branches</h2>
            {branches.map((b, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-soft space-y-2 text-xs"
              >
                <div className="flex items-center gap-2 text-brandBlue-600 font-bold text-sm">
                  <Building2 className="w-4 h-4" />
                  <span>{b.name}</span>
                </div>
                <div className="flex items-start gap-2 text-slate-600">
                  <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                  <span>{b.address}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                  <span className="font-semibold text-navy-900">{b.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{b.hours}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
