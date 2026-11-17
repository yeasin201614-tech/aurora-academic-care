import { HelpCircle } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Aurora Academic Care",
  description: "Get answers to common queries regarding admission, batch routines, fee structures, online classes, and scholarships at Aurora Academic Care.",
};

const FAQS = [
  {
    category: "Admission & Enrollment",
    items: [
      {
        q: "How can I apply for admission?",
        a: "You can apply directly through our online Admission form. Complete the 4-step wizard, submit your application, and track review status using your unique Application Reference Number.",
      },
      {
        q: "What happens after submitting the online admission form?",
        a: "Your application is set to PENDING status. Our administrative board verifies previous marks and background. Once APPROVED, you will receive an SMS and can complete fee payment online or at our campus counter.",
      },
      {
        q: "Can I transfer between batches or branches?",
        a: "Yes. Students may request a batch transfer within the first 14 days of enrollment, subject to seat availability in the desired batch.",
      },
    ],
  },
  {
    category: "Payment & Fees",
    items: [
      {
        q: "What online payment methods do you accept?",
        a: "We integrate official SSLCOMMERZ gateway supporting bKash, Nagad, Rocket, Upay, Visa, Mastercard, AMEX, and Bangladeshi internet banking.",
      },
      {
        q: "Are installment plans available for course fees?",
        a: "Yes. Full-year HSC programs can be paid in 2 or 3 structured term installments. Details are clearly shown in the student's digital fee invoice.",
      },
      {
        q: "Do you offer scholarships for Golden GPA 5.0 holders?",
        a: "Yes! Students with Golden GPA 5.0 in SSC or previous exams receive up to 25% tuition waiver. Underprivileged students may also apply for full financial aid.",
      },
    ],
  },
  {
    category: "Classes & Learning Modes",
    items: [
      {
        q: "What is the difference between Offline and Hybrid modes?",
        a: "Offline students attend physical lectures at our campuses and have access to the online portal. Hybrid students have the flexibility to attend either in person or watch live 1080p Google Meet/Zoom streams with real-time mic permission.",
      },
      {
        q: "How soon are class recordings uploaded?",
        a: "All online live classes are recorded in 1080p and uploaded to the Student Portal within 2 hours of lecture completion.",
      },
      {
        q: "How do guardians track student attendance and test results?",
        a: "Guardians receive automatic SMS alerts when students enter the campus and after every model test. Guardians can also log into the dedicated Parent Portal to monitor attendance percentages, marks, and teacher remarks.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="space-y-12 py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <section className="text-center space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-brandBlue-600 bg-blue-50 px-3 py-1 rounded-full">
          Help Centre
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy-900">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto">
          Everything you need to know about academic routines, admissions, payments, and student life.
        </p>
      </section>

      {/* FAQ Categories */}
      <div className="space-y-10">
        {FAQS.map((sec, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-lg font-bold text-navy-900 border-l-4 border-gold-500 pl-3">
              {sec.category}
            </h2>
            <div className="space-y-3">
              {sec.items.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft space-y-2"
                >
                  <h3 className="text-sm font-bold text-navy-900 flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-brandBlue-600 flex-shrink-0 mt-0.5" />
                    <span>{item.q}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pl-6">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
