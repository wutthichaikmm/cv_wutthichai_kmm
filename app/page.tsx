"use client";

import { useState } from "react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Download,
  Code2,
  Briefcase,
  GraduationCap,
  User,
  Layers,
  Languages,
  Copy,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Lang = "en" | "th";
type SkillCat = "Frontend" | "Backend" | "Database" | "Others" | "AI";
type Project = {
  name: string;
  year: string;
  role: string;
  tech: string[];
  link?: string;
};

// ─── Translations ─────────────────────────────────────────────────────────────

const translations = {
  en: {
    badge: "CV / Portfolio",
    title: "Software Engineer",
    tagline:
      "Dynamic Software Engineer with a proven track record specializing in scalable code and exceptional user experiences.",
    download: "Download PDF",
    copyEmail: "Copy Email",
    aboutLabel: "About Me",
    skillsLabel: "Skills",
    experienceLabel: "Experience",
    educationLabel: "Education",
    projectsLabel: "Key Projects",
    footer: "Built with Next.js · Neobrutalism Style",
    aboutText:
      "Dynamic Software Engineer with a proven track record at G-able, specializing in developing scalable code and enhancing user experiences. Skilled in Agile methodologies and team collaboration, I have successfully integrated new technologies and implemented reusable components, significantly improving project efficiency and software reliability. Proficient in applying AI tools to enhance workflow automation, optimize processes, and reduce project turnaround time.",
    skillCats: {
      Frontend: "Frontend",
      Backend: "Backend",
      Database: "Database",
      Others: "Others",
      AI: "AI",
    },
    expRole: "Software Engineer",
    expLocation: "Bangkok, Thailand",
    expPeriod: "February 2020 – March 2025",
    expBullets: [
      "Developed scalable and maintainable code, ensuring long-term stability of the software.",
      "Integrated new technologies into existing systems, increasing capabilities and improving overall performance.",
      "Enhanced user experience by implementing responsive web designs and optimizing application performance.",
      "Developed reusable components to facilitate faster development timelines and improve overall code quality.",
    ],
    eduDegree: "Bachelor of Science in Computer Engineering",
    eduInstitution: "Panyapiwat Institute of Management — Nonthaburi, Thailand",
    eduPeriod: "May 2016 – March 2020",
    projectDescs: [
      "Expense and budget management system built with React + Ant Design.",
      "EV Station admin system for log monitoring and dashboard using Next.js + Ant Design.",
      "City infrastructure management system developed with Vue 2.",
      "Pawnshop management web platform built with Next.js + Ant Design.",
      "PDPA consent management system developed with Next.js.",
      "Admin platform for TAGTHAi developed with Angular.",
      "Leasing and financing management system built with React.",
      "PDPA, Cookie Banner, and Consent management platform using Next.js + Ant Design.",
      "Incident tracking system for SEC built with Vue.",
      "Core broking management system for Lockton built with Angular.",
      "Mobile banking application for TCRB developed with React Native.",
      "EV station management dashboard developed with Next.js.",
      "Serialized novel marketplace and admin system with full-stack Next.js + Apollo + MongoDB.",
      "Escrow-based trading platform and payment flow system built with Next.js + Supabase.",
    ],
  },
  th: {
    badge: "ประวัติย่อ / ผลงาน",
    title: "วิศวกรซอฟต์แวร์",
    tagline:
      "วิศวกรซอฟต์แวร์ที่มีประสบการณ์ เชี่ยวชาญด้านการพัฒนาโค้ดที่รองรับการขยายตัวและประสบการณ์ผู้ใช้ที่ยอดเยี่ยม",
    download: "ดาวน์โหลด PDF",
    copyEmail: "คัดลอกอีเมล",
    aboutLabel: "เกี่ยวกับฉัน",
    skillsLabel: "ทักษะ",
    experienceLabel: "ประสบการณ์ทำงาน",
    educationLabel: "การศึกษา",
    projectsLabel: "โครงการหลัก",
    footer: "สร้างด้วย Next.js · สไตล์ Neobrutalism",
    aboutText:
      "วิศวกรซอฟต์แวร์ที่มีประวัติการทำงานที่ประสบความสำเร็จที่ G-able เชี่ยวชาญในการพัฒนาโค้ดที่รองรับการขยายตัวและยกระดับประสบการณ์ผู้ใช้ มีทักษะในวิธีการ Agile และการทำงานเป็นทีม สามารถบูรณาการเทคโนโลยีใหม่เข้ากับระบบที่มีอยู่ได้อย่างสำเร็จ รวมถึงนำ reusable components มาใช้งาน ปรับปรุงประสิทธิภาพโครงการและความน่าเชื่อถือของซอฟต์แวร์อย่างมีนัยสำคัญ และมีความชำนาญในการใช้เครื่องมือ AI เพื่อเพิ่มประสิทธิภาพการทำงานอัตโนมัติ ปรับปรุงกระบวนการ และลดระยะเวลาในการดำเนินโครงการ",
    skillCats: {
      Frontend: "ส่วนหน้า",
      Backend: "ส่วนหลัง",
      Database: "ฐานข้อมูล",
      Others: "อื่นๆ",
      AI: "AI",
    },
    expRole: "วิศวกรซอฟต์แวร์",
    expLocation: "กรุงเทพมหานคร ประเทศไทย",
    expPeriod: "กุมภาพันธ์ 2563 – มีนาคม 2568",
    expBullets: [
      "พัฒนาโค้ดที่รองรับการขยายตัวและบำรุงรักษาได้ เพื่อความมั่นคงระยะยาวของซอฟต์แวร์",
      "บูรณาการเทคโนโลยีใหม่เข้ากับระบบที่มีอยู่ เพิ่มความสามารถและปรับปรุงประสิทธิภาพโดยรวม",
      "ยกระดับประสบการณ์ผู้ใช้ด้วยการออกแบบเว็บที่ตอบสนองและการเพิ่มประสิทธิภาพแอปพลิเคชัน",
      "พัฒนา reusable components เพื่อเร่งระยะเวลาในการพัฒนาและปรับปรุงคุณภาพโค้ดโดยรวม",
    ],
    eduDegree: "วิทยาศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์",
    eduInstitution: "สถาบันการจัดการปัญญาภิวัฒน์ — นนทบุรี ประเทศไทย",
    eduPeriod: "พฤษภาคม 2559 – มีนาคม 2563",
    projectDescs: [
      "ระบบจัดการค่าใช้จ่ายและงบประมาณ สร้างด้วย React + Ant Design",
      "ระบบแอดมิน EV Station สำหรับ log monitoring และ dashboard ด้วย Next.js + Ant Design",
      "ระบบจัดการโครงสร้างพื้นฐานเมือง พัฒนาด้วย Vue 2",
      "เว็บแพลตฟอร์มจัดการร้านรับจำนำ สร้างด้วย Next.js + Ant Design",
      "ระบบจัดการความยินยอม PDPA พัฒนาด้วย Next.js",
      "แพลตฟอร์มแอดมินสำหรับ TAGTHAi พัฒนาด้วย Angular",
      "ระบบจัดการสินเชื่อและเช่าซื้อ สร้างด้วย React",
      "แพลตฟอร์มจัดการ PDPA, Cookie Banner และ Consent ด้วย Next.js + Ant Design",
      "ระบบติดตามเหตุการณ์สำหรับ ก.ล.ต. สร้างด้วย Vue",
      "ระบบจัดการ core broking สำหรับ Lockton สร้างด้วย Angular",
      "แอปพลิเคชัน mobile banking สำหรับ TCRB พัฒนาด้วย React Native",
      "แดชบอร์ดจัดการสถานีชาร์จ EV พัฒนาด้วย Next.js",
      "ตลาดนิยายซีเรียลพร้อมแอดมิน พัฒนาแบบ full-stack ด้วย Next.js + Apollo + MongoDB",
      "แพลตฟอร์มซื้อขายแบบ escrow และระบบการชำระเงิน สร้างด้วย Next.js + Supabase",
    ],
  },
} as const;

// ─── Static Data ──────────────────────────────────────────────────────────────

const profile = {
  en: {
    name: "Wutthichai Kummala",
    location: "Bangkok, Thailand",
    email: "wutthichai.kmm@gmail.com",
    phone: "095-393-3383",
    github: "github.com/wutthichaikmm",
    linkedin: "linkedin.com/in/wutthichai-kummala-684b85239",
    githubHref: "https://github.com/wutthichaikmm",
    linkedinHref: "https://www.linkedin.com/in/wutthichai-kummala-684b85239/",
  },
  th: {
    name: "วุฒิชัย กุมมาละ",
    location: "กรุงเทพมหานคร ประเทศไทย",
    email: "wutthichai.kmm@gmail.com",
    phone: "095-393-3383",
    github: "github.com/wutthichaikmm",
    linkedin: "linkedin.com/in/wutthichai-kummala-684b85239",
    githubHref: "https://github.com/wutthichaikmm",
    linkedinHref: "https://www.linkedin.com/in/wutthichai-kummala-684b85239/",
  },
};

const skills: Record<SkillCat, string[]> = {
  Frontend: [
    "React",
    "Vue",
    "Angular",
    "Next.js",
    "React Native",
    "TypeScript",
    "JavaScript",
    "Shadcn UI",
  ],
  Backend: ["Node.js", "Express", "Apollo Server", "REST API", "GraphQL"],
  Database: ["MongoDB", "PostgreSQL", "Supabase", "NoSQL"],
  Others: ["Agile", "Scrum", "Software Documentation", "Project Planning"],
  AI: ["GitHub Copilot", "Claude", "AI-assisted development"],
};

const skillColors: Record<SkillCat, string> = {
  Frontend: "bg-yellow-300",
  Backend: "bg-pink-300",
  Database: "bg-blue-300",
  Others: "bg-orange-300",
  AI: "bg-purple-300",
};

const projectColors = [
  "bg-yellow-300",
  "bg-pink-300",
  "bg-blue-300",
  "bg-green-300",
  "bg-orange-300",
  "bg-purple-300",
  "bg-red-300",
  "bg-teal-300",
  "bg-cyan-300",
  "bg-lime-300",
  "bg-fuchsia-300",
  "bg-rose-300",
  "bg-sky-300",
  "bg-amber-300",
];

const projects: Project[] = [
  {
    name: "SCG Expense",
    year: "2020",
    role: "Frontend",
    tech: ["React", "Ant Design", "G-Able"],
  },
  {
    name: "PTTEV Web Admin",
    year: "2021",
    role: "Frontend",
    tech: ["Next.js", "Ant Design", "G-Able"],
  },
  {
    name: "Bangkok Civil Dept",
    year: "2021",
    role: "Frontend",
    tech: ["Vue 2", "G-Able"],
  },
  {
    name: "PawnShop",
    year: "2022",
    role: "Frontend",
    tech: ["Next.js", "Ant Design", "G-Able"],
  },
  {
    name: "G-Consent",
    year: "2022",
    role: "Frontend",
    tech: ["Next.js", "G-Able"],
  },
  {
    name: "TAGTHAi Web Admin",
    year: "2022",
    role: "Frontend",
    tech: ["Angular", "G-Able"],
  },
  {
    name: "Honda Leasing",
    year: "2022",
    role: "Frontend",
    tech: ["React", "G-Able"],
  },
  {
    name: "Whiteface.co",
    year: "2023–2025",
    role: "Frontend",
    tech: ["Next.js", "React", "Ant Design", "G-Able"],
  },
  {
    name: "SEC Incident",
    year: "2023",
    role: "Frontend",
    tech: ["Vue", "G-Able"],
  },
  {
    name: "Lockton Core Broking",
    year: "2024",
    role: "Frontend",
    tech: ["Angular", "G-Able"],
  },
  {
    name: "TCRB eSaving",
    year: "2024",
    role: "Frontend",
    tech: ["React Native", "G-Able"],
  },
  {
    name: "Evall Admin",
    year: "2025",
    role: "Frontend",
    tech: ["Next.js", "Freelance"],
  },
  {
    name: "Readvel",
    year: "2024–2025",
    role: "Full-stack",
    tech: ["Next.js", "Apollo", "MongoDB", "Freelance"],
  },
  {
    name: "FriendTrade MVP",
    year: "2025-2026",
    role: "Full-stack",
    tech: ["Next.js", "Supabase", "Freelance"],
    link: "https://friendtrade.app",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionTitle({
  icon: Icon,
  label,
  accent = "bg-yellow-300",
  isDark,
}: {
  icon: ElementType;
  label: string;
  accent?: string;
  isDark: boolean;
}) {
  return (
    <CardHeader className="px-0 py-0">
      <CardTitle className="flex items-center gap-3">
        <div
          className={cn(accent, "border-2 border-black p-2")}
          style={{ boxShadow: "3px 3px 0px #000" }}
        >
          <Icon size={20} strokeWidth={2.5} className="text-black" />
        </div>
        <span className="text-2xl font-extrabold tracking-tight uppercase">
          {label}
        </span>
        <div
          className={cn("flex-1 h-0.75", isDark ? "bg-white" : "bg-black")}
        />
      </CardTitle>
    </CardHeader>
  );
}

function Tag({
  label,
  isDark,
  isGable,
  isFreelance,
}: {
  label: string;
  isDark: boolean;
  isGable: boolean;
  isFreelance: boolean;
}) {
  return (
    <Badge
      className={cn(
        "border-2 px-2 py-0.5 text-xs font-bold",
        isDark
          ? "bg-zinc-700 text-white border-white"
          : "bg-gray-100 text-black border-black",
        isGable && "bg-yellow-300!",
        isFreelance && "bg-green-300!",
      )}
    >
      {label}
    </Badge>
  );
}

function ContactRow({
  icon: Icon,
  label,
}: {
  icon: ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium">
      <Icon size={14} strokeWidth={2.5} className="shrink-0" />
      <span className="truncate">{label}</span>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [isDark] = useState(false);
  const [lang, setLang] = useState<Lang>("en");

  const tr = translations[lang];

  // Shadow helpers
  const sc = isDark ? "#ffffff" : "#000000";
  const sw = (n = 5) => ({ boxShadow: `${n}px ${n}px 0px ${sc}` });

  // Theme classes
  const root = isDark ? "bg-[#0f0f0f] text-white" : "bg-[#fffbf0] text-black";
  const card = isDark ? "bg-zinc-900 border-white" : "bg-white border-black";
  const bdCls = isDark ? "border-white" : "border-black";
  const subtxt = isDark ? "text-white/60" : "text-black/60";
  const roleBadge = isDark
    ? "border-white bg-zinc-800 text-white"
    : "border-black bg-white text-black";

  const fontStyle = {
    fontFamily:
      lang === "th" ? "var(--font-sarabun)" : "var(--font-space-grotesk)",
  };

  return (
    <div className={cn("min-h-screen", root)} style={fontStyle}>
      {/* ── Fixed Toggle Bar ── */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={() => setLang(lang === "en" ? "th" : "en")}
          className={cn(
            card,
            "border-2 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide flex items-center gap-1.5 transition-transform hover:-translate-y-0.5 active:translate-y-0",
          )}
        >
          <Languages size={13} />
          {lang === "en" ? "ภาษาไทย" : "English"}
        </Button>

        {/* <button
          onClick={() => setIsDark(!isDark)}
          className={`${isDark ? "bg-yellow-300 text-black border-white" : "bg-black text-yellow-300 border-black"} border-2 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide flex items-center gap-1.5 transition-transform hover:-translate-y-0.5 active:translate-y-0`}
          style={{ boxShadow: `3px 3px 0px ${isDark ? "#fff" : "#555"}` }}
        >
          {isDark ? <Sun size={13} /> : <Moon size={13} />}
          {isDark ? "Light" : "Dark"}
        </button> */}
      </div>

      {/* ── Hero ── */}
      <header className={cn("border-b-4 bg-main", bdCls)}>
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Name + title */}
          <div>
            <div className="inline-block bg-black text-yellow-300 text-xs font-bold px-3 py-1 mb-3 uppercase tracking-widest">
              {tr.badge}
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none text-black">
              {profile[lang].name.split(" ")[0]}
              <br />
              <span className="text-black/60">
                {profile[lang].name.split(" ").slice(1).join(" ")}
              </span>
            </h1>
            <div
              className="mt-4 inline-block bg-white border-2 border-black px-4 py-1 text-base font-bold uppercase tracking-wide text-black"
              style={{ boxShadow: "3px 3px 0px #000" }}
            >
              {tr.title}
            </div>
            <p className="mt-4 text-black/70 font-medium max-w-md text-base">
              {tr.tagline}
            </p>
          </div>

          {/* Contact card */}
          <div
            className={cn(card, "border-4 p-5 flex flex-col gap-2 min-w-65")}
            style={sw(6)}
          >
            <a
              href={`mailto:${profile[lang].email}`}
              className="hover:underline"
            >
              <ContactRow icon={Mail} label={profile[lang].email} />
            </a>
            <a href={`tel:0953933383`} className="hover:underline">
              <ContactRow icon={Phone} label={profile[lang].phone} />
            </a>
            <ContactRow icon={MapPin} label={profile[lang].location} />
            <a
              href={profile[lang].githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <ContactRow icon={LinkIcon} label={profile[lang].github} />
            </a>
            <a
              href={profile[lang].linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              <ContactRow icon={LinkIcon} label={profile[lang].linkedin} />
            </a>
            <a
              href="/CV_Wutthichai.pdf"
              download
              className={buttonVariants({
                size: "lg",
                className: "w-full mt-3",
              })}
            >
              <Download size={14} />
              {tr.download}
            </a>
            <Button
              variant="neutral"
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                navigator.clipboard.writeText(profile[lang].email);
                toast.success(tr.copyEmail);
              }}
            >
              <Copy size={14} />
              {tr.copyEmail}
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {/* About */}
        <div className="space-y-6">
          <SectionTitle
            icon={User}
            label={tr.aboutLabel}
            accent="bg-orange-300"
            isDark={isDark}
          />
          <Card>
            <CardContent className="text-base leading-relaxed font-medium">
              {tr.aboutText}
            </CardContent>
          </Card>
        </div>

        {/* Skills */}
        <div className="space-y-6">
          <SectionTitle
            icon={Code2}
            label={tr.skillsLabel}
            accent="bg-pink-300"
            isDark={isDark}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(Object.keys(skills) as SkillCat[]).map((cat) => (
              <Card key={cat} className={cn(skillColors[cat], "p-4")}>
                <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3 border-b-2 border-black pb-1 text-black">
                  {tr.skillCats[cat]}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills[cat].map((s) => (
                    <Badge
                      key={s}
                      className="bg-white border-2 border-black px-2 py-0.5 text-xs font-bold text-black"
                    >
                      {s}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="space-y-6">
          <SectionTitle
            icon={Briefcase}
            label={tr.experienceLabel}
            accent="bg-blue-300"
            isDark={isDark}
          />
          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-extrabold leading-tight">
                    {tr.expRole}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <span
                      className="bg-yellow-300 border-2 border-black px-2 py-0.5 text-xs font-bold uppercase text-black"
                      style={{ boxShadow: "2px 2px 0px #000" }}
                    >
                      G-able
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium flex items-center gap-1",
                        subtxt,
                      )}
                    >
                      <MapPin size={12} />
                      {tr.expLocation}
                    </span>
                  </div>
                </div>
                <span
                  className="bg-black text-white text-xs font-bold px-3 py-1 whitespace-nowrap self-start sm:self-center"
                  style={{ boxShadow: "2px 2px 0px #555" }}
                >
                  {tr.expPeriod}
                </span>
              </div>
              <ul className="space-y-1.5 mt-3">
                {tr.expBullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-2 text-sm leading-relaxed font-medium"
                  >
                    <span
                      className={cn(
                        "mt-1.5 shrink-0 w-2 h-2 inline-block",
                        isDark ? "bg-white" : "bg-black",
                      )}
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Education */}
        <div className="space-y-6">
          <SectionTitle
            icon={GraduationCap}
            label={tr.educationLabel}
            accent="bg-purple-300"
            isDark={isDark}
          />
          <Card className="bg-purple-300 p-6">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h3 className="text-xl font-extrabold text-black">
                    {tr.eduDegree}
                  </h3>
                  <p className="text-sm font-bold mt-1 text-black/70">
                    {tr.eduInstitution}
                  </p>
                </div>
                <span className="bg-black text-white text-xs font-bold px-3 py-1 self-start shrink-0">
                  {tr.eduPeriod}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects */}
        <div className="space-y-6">
          <SectionTitle
            icon={Layers}
            label={tr.projectsLabel}
            accent="bg-green-300"
            isDark={isDark}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, idx) => (
              <Card key={p.name} className="p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <h3
                    className={cn(
                      projectColors[idx % projectColors.length],
                      "border-2 border-black px-3 py-1 text-sm font-extrabold uppercase leading-tight text-black",
                    )}
                    style={{ boxShadow: "3px 3px 0px #000" }}
                  >
                    {p.name}
                  </h3>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge className="bg-black text-white text-xs font-bold px-2 py-0.5">
                      {p.year}
                    </Badge>
                    <Badge
                      className={cn(
                        roleBadge,
                        "border-2 text-xs font-bold px-2 py-0.5",
                      )}
                    >
                      {p.role}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm leading-relaxed font-medium flex-1">
                  {tr.projectDescs[idx]}
                </p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "text-sm font-bold underline",
                      isDark ? "text-yellow-300" : "text-blue-600",
                    )}
                  >
                    View Project →
                  </a>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => {
                    const isGable = t === "G-Able";
                    const isFreelance = t === "Freelance";
                    return (
                      <Tag
                        key={t}
                        label={t}
                        isDark={isDark}
                        isGable={isGable}
                        isFreelance={isFreelance}
                      />
                    );
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer
        className={cn("border-t-4 bg-black text-yellow-300 py-6 mt-8", bdCls)}
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-bold">
          <span>© 2026 {profile[lang].name}</span>
          <span className="opacity-60 uppercase tracking-widest text-xs">
            {tr.footer}
          </span>
        </div>
      </footer>
    </div>
  );
}
