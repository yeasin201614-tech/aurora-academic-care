export const metadata = {
  title: "Privacy Policy | Aurora Academic Care",
  description: "Official Privacy Policy of Aurora Academic Care Bangladesh regarding student and guardian data protection.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-navy-900 border-b border-slate-200 pb-4">
        Privacy Policy
      </h1>
      <p className="text-slate-500">Effective Date: January 1, 2026 • Bangladesh Jurisdiction</p>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-navy-900">1. Information We Collect</h2>
        <p>
          Aurora Academic Care collects student and guardian information necessary for educational enrollment, 
          academic performance tracking, and regulatory compliance under Bangladeshi laws. This includes student full name, 
          date of birth, previous institution records, guardian contact phone number, email, and billing records.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-navy-900">2. How We Use Student & Guardian Data</h2>
        <p>
          Collected information is used strictly for:
        </p>
        <ul className="list-disc list-inside space-y-1 pl-2">
          <li>Class batch assignment and scheduling routines</li>
          <li>Sending automated SMS alerts to registered guardians for attendance and exam results</li>
          <li>Processing tuition fee invoices through SSLCOMMERZ payment gateways</li>
          <li>Issuing official computer-generated student ID cards and admit cards</li>
        </ul>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-navy-900">3. Data Security & Storage</h2>
        <p>
          All digital records are securely hosted on PostgreSQL databases with Row Level Security (RLS) policies 
          guaranteeing that students and guardians can only access their authorized records. We never sell or distribute 
          student information to third-party telemarketers.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-navy-900">4. Contact the Data Protection Officer</h2>
        <p>
          If you have questions regarding your data or wish to request corrections, please contact our administrative 
          desk at <strong>info@auroraacademic.com</strong>.
        </p>
      </section>
    </div>
  );
}
