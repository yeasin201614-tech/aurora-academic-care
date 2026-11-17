import Image from "next/image";
import { Sparkles, Camera } from "lucide-react";

export const metadata = {
  title: "Campus Gallery | Aurora Academic Care",
  description: "View photos of Aurora Academic Care campuses, auditoriums, science practicals, and annual merit award ceremonies in Bangladesh.",
};

const GALLERY_IMAGES = [
  {
    title: "Main Auditorium Lecture Session",
    category: "Classroom",
    src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Physics Problem Solving Demonstration",
    category: "Academic",
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "BUET & Medical Toppers Award Ceremony",
    category: "Awards",
    src: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Quiet Study Hall & Reference Library",
    category: "Facilities",
    src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Digital OMR Evaluation & Model Test",
    category: "Examinations",
    src: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Faculty Mentorship & Consultation Hours",
    category: "Mentorship",
    src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800",
  },
];

export default function GalleryPage() {
  return (
    <div className="space-y-12 py-10">
      {/* Header */}
      <section className="bg-navy-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-gold-400 bg-navy-800 border border-gold-500/30 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-gold-400" />
            Campus Life
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Aurora Photo Gallery
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Glimpses into our modern campuses, academic lectures, science practicals, 
            and annual merit receptions.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-soft hover:shadow-card transition-all"
            >
              <div className="relative h-60 w-full bg-navy-800 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-navy-900/80 backdrop-blur-md text-gold-400 text-[10px] font-bold px-2.5 py-1 rounded">
                  {img.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-navy-900 group-hover:text-brandBlue-600 transition-colors">
                  {img.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
