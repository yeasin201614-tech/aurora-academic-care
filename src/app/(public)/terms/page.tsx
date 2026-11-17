export const metadata = {
  title: "Terms & Conditions | Aurora Academic Care",
  description: "Terms and conditions of admission, code of conduct, and academic regulations at Aurora Academic Care Bangladesh.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-navy-900 border-b border-slate-200 pb-4">
        Terms & Conditions
      </h1>
      <p className="text-slate-500">Updated: January 1, 2026 • Aurora Academic Care, Bangladesh</p>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-navy-900">1. Admission & Enrollment Verification</h2>
        <p>
          Submission of an online application does not constitute guaranteed enrollment. Final admission is granted 
          only after academic record verification by the administration and timely payment of prescribed tuition fees.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-navy-900">2. Attendance & Code of Conduct</h2>
        <p>
          Students are expected to maintain at least 85% attendance across physical and online lectures. Misbehavior, 
          cheating during model tests, or disruption of campus decorum will lead to immediate disciplinary proceedings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-navy-900">3. Fee Payment & Refund Policy</h2>
        <p>
          All tuition fees must be paid on or before the due date specified on the computerized invoice. 
          Admission fees and material costs are non-refundable once classes have formally commenced. 
          Refund requests made prior to the commencement of classes are subject to a 10% administrative processing deduction.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-navy-900">4. Intellectual Property</h2>
        <p>
          All study materials, lecture notes, video recordings, question banks, and solution manuals provided by 
          Aurora Academic Care are proprietary and strictly for personal educational use. Unauthorized redistribution, 
          resale, or public upload is punishable under the Copyright Act of Bangladesh.
        </p>
      </section>
    </div>
  );
}
