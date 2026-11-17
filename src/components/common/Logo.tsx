import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export function Logo({ variant = "dark", size = "md", showTagline = false }: LogoProps) {
  const height = size === "sm" ? 36 : size === "md" ? 48 : 64;

  return (
    <Link href="/" className="inline-flex items-center gap-3 group focus:outline-none">
      <div className="relative flex items-center justify-center">
        {/* Official uploaded logo image */}
        <Image
          src="/logo.png"
          alt="Aurora Academic Care Logo"
          width={height * 1.5}
          height={height}
          priority
          className="object-contain h-auto max-h-[52px] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      {showTagline && (
        <span className="hidden lg:inline-block border-l border-slate-300 pl-3 text-xs font-medium text-slate-500">
          Learn Today. Lead Tomorrow.
        </span>
      )}
    </Link>
  );
}
