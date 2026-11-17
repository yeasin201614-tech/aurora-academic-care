import { Star, Quote, Award } from "lucide-react";

export const metadata = {
  title: "Testimonials & Success Stories | Aurora Academic Care",
  description: "Read real reviews and feedback from board exam toppers, BUET engineers, and medical students who studied at Aurora Academic Care.",
};

const TESTIMONIALS = [
  {
    name: "Riazul Hoque",
    sub: "BUET '25 (CSE) • Ex-Notre Dame College",
    quote: "Aurora's weekly Physics model tests changed my perspective completely. Instead of memorizing equations, Tanvir Sir taught us how to visualize mechanics problems. Secured BUET 84th merit rank!",
    stars: 5,
    tag: "BUET Topper",
  },
  {
    name: "Farzana Akhter",
    sub: "Dhaka Medical College (DMC) • HSC 2025",
    quote: "The Medical Buster batch line-by-line textbook analysis and daily OMR tests gave me supreme confidence in Biology & Chemistry. The mentors were always there even late at night in discussion forums.",
    stars: 5,
    tag: "Medical DMC",
  },
  {
    name: "Tanzim Hasan",
    sub: "Golden GPA 5.0 in SSC 2025 • Dhaka Residential Model College",
    quote: "The creative question (CQ) suggestions and mock tests prepared me so thoroughly that the actual board exams felt easier than our weekly tests at Aurora. Highly recommended!",
    stars: 5,
    tag: "Golden GPA 5.0",
  },
  {
    name: "Md. Ashraful Samad",
    sub: "Guardian of HSC Batch A Student",
    quote: "As a guardian, I appreciate the Parent Portal and immediate SMS attendance alerts. The teachers are always available for consultation during Parent-Teacher meetings.",
    stars: 5,
    tag: "Parent Review",
  },
  {
    name: "Nabila Tabassum",
    sub: "IBA (Dhaka University) • HSC '24",
    quote: "The analytical math and English modules at Aurora gave me the critical edge for the IBA admission exam. Best faculty mentorship in Dhaka.",
    stars: 5,
    tag: "IBA - DU",
  },
  {
    name: "Dr. Nazmul Huda",
    sub: "Guardian & Physician",
    quote: "My daughter attended the hybrid batch from Bogra via the online portal. The live interaction quality and speed of marksheet delivery were truly exceptional.",
    stars: 5,
    tag: "Guardian Review",
  },
];

export default function TestimonialsPage() {
  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full">
            Alumni & Guardian Voices
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Student Testimonials & Reviews
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Discover why thousands of students and parents across Bangladesh trust Aurora Academic Care 
            for board and admission success.
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-7 shadow-soft hover:shadow-card transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold bg-blue-50 text-brandBlue-700 px-2 py-0.5 rounded border border-blue-200">
                    {t.tag}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy-800 text-gold-400 font-bold flex items-center justify-center text-xs">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-900">{t.name}</h4>
                  <p className="text-[11px] text-slate-500">{t.sub}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
