"use client";

/**
 * Site.tsx
 * ─────────────────────────────────────────────
 * Single-page website for IRON 9 GYM, Aqaba, Jordan.
 *
 * Sections:
 *  1. Sticky navbar (logo, nav links, lang toggle, Join Now CTA)
 *  2. Hero (full-screen photo background, headline, CTA buttons)
 *  3. About (story, animated stats counter)
 *  4. Facilities (icon cards)
 *  5. Supplements Store (3-D product cards via ProductScene)
 *  6. Memberships (pricing cards)
 *  7. Gallery (masonry grid + lightbox)
 *  8. Testimonials (carousel)
 *  9. Contact (info, WhatsApp form, embedded map)
 * 10. Footer
 *     + floating WhatsApp button
 *
 * ── Edit guide ──────────────────────────────────────────────────────
 *  • Text / translations → `copy` object below
 *  • Phone number        → `PHONE` constant
 *  • Placeholder stats   → `targets` array inside the stats useEffect
 *  • Membership prices   → `copy.en.plans` / `copy.ar.plans`
 *  • Gallery images      → `gallery` array (filenames inside /public/assets/)
 * ────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Dumbbell,
  Menu,
  X,
  Zap,
  HeartPulse,
  Shield,
  UserRound,
  Shirt,
  Instagram,
  MessageCircle,
  MapPin,
  Clock3,
  ChevronDown,
  Star,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

/* ── Constants ──────────────────────────────────────────────────────── */
// ✏️  Edit this to change the WhatsApp number used throughout the site
const PHONE = "962793100014";

/* ── Copy / translations ────────────────────────────────────────────── */
const copy = {
  en: {
    nav: ["Home", "About", "Facilities", "Supplements", "Memberships", "Gallery", "Contact"],
    join: "Join Now",
    kicker: "Aqaba, Jordan · Strength starts here",
    hero1: "Forge your iron.",
    hero2: "Build your best.",
    tagline: "الخيار الأفضل",
    joinWa: "Join on WhatsApp",
    instagram: "Follow on Instagram",
    scroll: "Scroll to explore",

    aboutEyebrow: "The Iron 9 story",
    aboutTitle: "Made for the work.",
    aboutText:
      "In the heart of Aqaba, Iron 9 is a place to show up, put in the work, and become stronger. From your first session to your next personal best, our team and training floor are here to help you move forward.",
    explore: "Explore our facilities",
    built: "Built different",
    stats: ["Members*", "Equipment pieces*", "Trainers*", "Years strong*"],
    statNote: "*Placeholder figures — edit to your current numbers.",

    facilitiesEyebrow: "Train without limits",
    facilitiesTitle: "Built to perform.",
    facilitiesIntro:
      "A focused training environment with the space, equipment and coaching to keep you progressing.",
    facilities: [
      ["Cardio zone", "Treadmills and conditioning equipment to build your engine."],
      ["Free weights", "A serious dumbbell and barbell setup for every strength level."],
      ["Strength machines", "Train with versatile machines designed for controlled progress."],
      ["Boxing & combat", "Punching bags and space to sharpen your conditioning."],
      ["Personal training", "One-to-one support to help you train with purpose."],
      ["Modern locker rooms", "Clean, comfortable changing facilities for your routine."],
    ],

    storeEyebrow: "Fuel your training",
    storeTitle: "Supplements store.",
    storeIntro:
      "Official nutrition available on the gym floor. Featuring Optimum Nutrition Gold Standard 100% Whey — the world's most trusted protein. Contact us on WhatsApp for current stock & pricing.",
    whey: "Optimum Nutrition Gold Standard 100% Whey",
    wheyDesc:
      "The world's #1 best-selling whey protein. Packed with 24g of premium whey protein isolate and 5.5g of BCAAs per scoop to accelerate muscle recovery and lean gains.",
    wheyEyebrow: "WORLD'S #1 WHEY PROTEIN",
    bar: "Grenade Protein Bar",
    barDesc: "Message us to check the current selection.",
    flavors: "Flavors: Double Rich Chocolate · Vanilla Ice Cream · Extreme Milk Chocolate*",
    assorted: "Flavors: assorted selection*",
    from: "From — JOD*",
    order: "Order on WhatsApp",
    note: "Official supplements in stock at the gym floor. Prices and flavors are placeholders — contact us to confirm.",

    memberEyebrow: "Choose your commitment",
    memberTitle: "Earn every rep.",
    memberIntro:
      "Pick the plan that fits your training. Prices below are editable placeholders in JOD.",
    plans: [
      { name: "Monthly",  description: "A strong start, one month at a time.", price: "35" },
      { name: "3 Months", description: "Build a rhythm. Keep the momentum.",   price: "90" },
      { name: "Yearly",   description: "A full year to make your strongest moves.", price: "300" },
    ],
    popular: "Most popular",
    benefits: ["Gym floor access", "Full equipment access", "Locker room access"],
    joinPlan: "Join via WhatsApp",
    priceNote: "*Sample prices only. Replace with current membership rates.",

    galleryEyebrow: "Inside Iron 9",
    galleryTitle: "The training floor.",
    galleryIntro: "A look at the space where Aqaba gets stronger. Select a photo to view it.",

    reviewsEyebrow: "The Iron 9 community",
    reviewsTitle: "Built together.",
    reviews: [
      [
        "Great atmosphere, solid equipment and a team that keeps me motivated. Placeholder review — replace with a real member testimonial.",
        "Member name · Aqaba",
      ],
      [
        "A welcoming place to train and stay consistent. Sample testimonial — replace before publishing.",
        "Member name · Aqaba",
      ],
      [
        "The training floor has everything I need to work toward my goals. Sample review — edit as needed.",
        "Member name · Aqaba",
      ],
    ],

    contactEyebrow: "Make your move",
    contactTitle: "Find your strength.",
    contactIntro:
      "Questions about training, memberships or products? Get in touch and our team will help you out.",
    location: "Aqaba, Jordan",
    directions: "Get directions",
    hours: "Opening hours*",
    hoursText: "Sat–Thu: 7:00 AM–11:00 PM · Fri: 2:00 PM–10:00 PM",
    hoursNote: "*Placeholder hours — please confirm and edit.",
    name: "Name",
    phone: "Phone",
    message: "Message",
    send: "Send via WhatsApp",
    namePlaceholder: "Your name",
    phonePlaceholder: "+962 ...",
    messagePlaceholder: "How can we help?",
    footer: "© 2025 IRON 9 GYM. All rights reserved.",
  },

  ar: {
    nav: ["الرئيسية", "عن النادي", "المرافق", "المكملات", "العضويات", "المعرض", "اتصل بنا"],
    join: "انضم الآن",
    kicker: "العقبة، الأردن · القوة تبدأ هنا",
    hero1: "اصنع قوتك.",
    hero2: "وابنِ أفضل نسخة منك.",
    tagline: "الخيار الأفضل",
    joinWa: "انضم عبر واتساب",
    instagram: "تابعنا على إنستغرام",
    scroll: "اسحب للاستكشاف",

    aboutEyebrow: "قصة آيرون 9",
    aboutTitle: "صُمم للعمل الجاد.",
    aboutText:
      "في قلب العقبة، آيرون 9 هو المكان الذي تبدأ فيه رحلتك وتعمل بجد لتصبح أقوى. من أول حصة تدريبية إلى أفضل إنجازاتك، فريقنا ومرافقنا هنا لدعم تقدمك.",
    explore: "اكتشف مرافقنا",
    built: "قوة مختلفة",
    stats: ["مشترك*", "جهاز ومعدة*", "مدرب*", "سنوات من القوة*"],
    statNote: "*أرقام تجريبية — استبدلها بالأرقام الحالية.",

    facilitiesEyebrow: "تدرب بلا حدود",
    facilitiesTitle: "جاهز للأداء.",
    facilitiesIntro:
      "بيئة تدريب متكاملة بمساحة ومعدات ومدربين يساعدونك على التقدم.",
    facilities: [
      ["منطقة الكارديو", "أجهزة المشي ومعدات اللياقة لبناء قدرتك."],
      ["الأوزان الحرة", "مجموعة متنوعة من الدمبل والبار تناسب جميع المستويات."],
      ["أجهزة القوة", "أجهزة متعددة الاستخدامات لتدريب آمن ومتدرج."],
      ["الملاكمة والقتال", "أكياس ملاكمة ومساحة لتطوير لياقتك."],
      ["التدريب الشخصي", "دعم فردي يساعدك على التدريب بهدف واضح."],
      ["غرف تبديل حديثة", "مرافق نظيفة ومريحة لتكمل روتينك."],
    ],

    storeEyebrow: "غذِّ تمرينك",
    storeTitle: "متجر المكملات.",
    storeIntro:
      "المكملات الأصلية المعتمدة في النادي. نوفر أوبتيموم نيوترشن جولد ستاندرد 100% واي — البروتين الأكثر شهرة وتقييماً عالمياً. راسلنا على واتساب لتأكيد النكهات والأسعار.",
    whey: "أوبتيموم نيوترشن جولد ستاندرد 100% واي",
    wheyDesc:
      "البروتين رقم 1 عالمياً والأكثر مبيعاً. يحتوي على 24 غرام من بروتين مصل اللبن المعزول (Whey Isolate) و 5.5 غرام BCAA في كل حصة للاستشفاء وبناء العضلات.",
    wheyEyebrow: "البروتين رقم 1 عالمياً",
    bar: "جرينيد بروتين بار",
    barDesc: "راسلنا لمعرفة النكهات المتوفرة.",
    flavors: "النكهات: دبل ريتش شوكليت · فانيلا آيس كريم · إكستريم ميلك شوكليت*",
    assorted: "النكهات: تشكيلة متنوعة*",
    from: "يبدأ من — دينار*",
    order: "اطلب عبر واتساب",
    note: "مكملات أصلية متوفرة في النادي. الأسعار والنكهات تجريبية — تواصل معنا للتأكيد.",

    memberEyebrow: "اختر التزامك",
    memberTitle: "كل تكرار يصنع فرقاً.",
    memberIntro:
      "اختر الخطة المناسبة لتدريبك. الأسعار تجريبية بالدينار الأردني.",
    plans: [
      { name: "شهري",       description: "بداية قوية، شهراً بعد شهر.",           price: "35" },
      { name: "ثلاثة أشهر", description: "ابنِ روتينك وحافظ على تقدمك.",         price: "90" },
      { name: "سنوي",       description: "عام كامل لتحقيق أقوى أهدافك.",         price: "300" },
    ],
    popular: "الأكثر طلباً",
    benefits: ["الدخول إلى النادي", "استخدام جميع المعدات", "استخدام غرف التبديل"],
    joinPlan: "انضم عبر واتساب",
    priceNote: "*أسعار تجريبية فقط. استبدلها بالأسعار الحالية.",

    galleryEyebrow: "داخل آيرون 9",
    galleryTitle: "مساحة التدريب.",
    galleryIntro:
      "شاهد المكان الذي تزداد فيه العقبة قوة. اختر صورة لعرضها.",

    reviewsEyebrow: "مجتمع آيرون 9",
    reviewsTitle: "قوة نبنيها معاً.",
    reviews: [
      [
        "أجواء رائعة ومعدات ممتازة وفريق يساعدني على الاستمرار. رأي تجريبي — استبدله برأي حقيقي.",
        "اسم العضو · العقبة",
      ],
      [
        "مكان رائع للتدريب والمحافظة على الاستمرارية. رأي تجريبي — يرجى استبداله قبل النشر.",
        "اسم العضو · العقبة",
      ],
      [
        "تتوفر في النادي المعدات التي أحتاجها لتحقيق أهدافي. رأي تجريبي — يرجى تعديله.",
        "اسم العضو · العقبة",
      ],
    ],

    contactEyebrow: "ابدأ خطوتك",
    contactTitle: "اكتشف قوتك.",
    contactIntro:
      "لديك سؤال عن التدريب أو العضوية أو المنتجات؟ تواصل معنا وسيساعدك فريقنا.",
    location: "العقبة، الأردن",
    directions: "احصل على الاتجاهات",
    hours: "ساعات العمل*",
    hoursText: "السبت–الخميس: 7 صباحاً–11 مساءً · الجمعة: 2–10 مساءً",
    hoursNote: "*ساعات تجريبية — يرجى التأكد والتعديل.",
    name: "الاسم",
    phone: "رقم الهاتف",
    message: "الرسالة",
    send: "أرسل عبر واتساب",
    namePlaceholder: "اسمك",
    phonePlaceholder: "+962 ...",
    messagePlaceholder: "كيف يمكننا مساعدتك؟",
    footer: "© 2025 آيرون 9 جيم. جميع الحقوق محفوظة.",
  },
} as const;

/* ── Gallery items (filename, alt text) ─────────────────────────────── */
// ✏️  Add / remove rows to change the gallery grid
const gallery: [string, string][] = [
  ["gallery-1.jpg", "Gym floor and training equipment"],
  ["treadmills.jpg", "Treadmills in the cardio zone"],
  ["dumbbells.jpg", "Dumbbells and free weights"],
  ["machines.jpg", "Strength machines"],
  ["punching-bags.jpg", "Punching bags in the combat area"],
  ["gallery-2.jpg", "Iron 9 Gym interior"],
];

/* ── Utility: build a wa.me link with a prefilled message ────────────── */
function waLink(message: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

/* ════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════ */
export default function Site() {
  const root         = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLElement>(null);
  const progressRef  = useRef<HTMLDivElement>(null);

  const [lang, setLang]               = useState<"en" | "ar">("en");
  const [menuOpen, setMenuOpen]       = useState(false);
  const [galleryImage, setGalleryImage] = useState<string | null>(null);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [counts, setCounts]           = useState([0, 0, 0, 0]);
  const [scrolled, setScrolled]       = useState(false);
  const t = copy[lang];

  /* ── Update html lang / dir when language changes ──────────────── */
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir  = lang === "ar" ? "rtl" : "ltr";
    document.body.dir             = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  /* ── Header shadow on scroll + progress bar ─────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (progressRef.current) {
        const total  = document.body.scrollHeight - window.innerHeight;
        const ratio  = total > 0 ? window.scrollY / total : 0;
        progressRef.current.style.width = `${ratio * 100}%`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── GSAP scroll-reveal + Lenis smooth scroll ────────────────────── */
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Reveal elements on scroll
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          },
        );
      });

      // Hero entrance
      gsap.fromTo(
        ".hero-content",
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1, delay: 0.15, ease: "power2.out" },
      );

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    },
    { scope: root },
  );

  /* ── Animated counter (stats section) ──────────────────────────────
   * ✏️  Change `targets` to your real numbers                          */
  useEffect(() => {
    const node = document.querySelector("#stats");
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        // ✏️  Edit these placeholder numbers to your real stats
        const targets  = [850, 60, 12, 8];
        const start    = performance.now();
        const duration = 1400;
        const animate  = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased    = 1 - Math.pow(1 - progress, 3);
          setCounts(targets.map((v) => Math.floor(v * eased)));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  /* ── Testimonials navigation ────────────────────────────────────── */
  const changeReview = (dir: number) => {
    setReviewIndex((i) => (i + dir + t.reviews.length) % t.reviews.length);
  };

  /* ── Contact form → WhatsApp ────────────────────────────────────── */
  function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const text =
      lang === "ar"
        ? `مرحباً آيرون 9 جيم،\nالاسم: ${d.get("name")}\nالهاتف: ${d.get("phone")}\nالرسالة: ${d.get("message")}`
        : `Hi Iron 9 Gym,\nName: ${d.get("name")}\nPhone: ${d.get("phone")}\nMessage: ${d.get("message")}`;
    window.open(waLink(text), "_blank", "noopener,noreferrer");
  }

  /* ── Nav section IDs ─────────────────────────────────────────────── */
  const navIds = ["home", "about", "facilities", "supplements", "memberships", "gallery", "contact"];

  return (
    <div ref={root} className={lang === "ar" ? "font-arabic" : ""}>

      {/* ────────────────────────── SCROLL PROGRESS ──────────────────── */}
      <div ref={progressRef} className="nav-progress" aria-hidden="true" />

      {/* ═══════════════════════════════════════════════════════════════
          STICKY NAVBAR
          ═══════════════════════════════════════════════════════════════ */}
      <header
        ref={headerRef}
        className={`fixed inset-x-0 top-0 z-40 border-b transition-all duration-300
          ${scrolled
            ? "border-white/10 bg-[#0b0b0df0] shadow-[0_4px_30px_#00000080] backdrop-blur-xl"
            : "border-transparent bg-transparent backdrop-blur-sm"
          }`}
      >
        <nav
          className="container flex h-[72px] items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a href="#home" aria-label="Iron 9 Gym home" className="shrink-0">
            <img
              src="/assets/iron9-logo.png"
              alt="IRON 9 GYM"
              className="h-12 w-[118px] object-contain"
            />
          </a>

          {/* Desktop + Mobile nav links */}
          <div
            className={`${
              menuOpen ? "flex" : "hidden"
            } nav-menu absolute inset-x-0 top-[72px] flex-col gap-2 border-b border-white/10
              bg-[#0b0b0d] p-5 md:static md:flex md:flex-row md:items-center
              md:gap-5 md:border-0 md:bg-transparent md:p-0`}
          >
            {t.nav.map((label, i) => (
              <a
                key={label}
                href={`#${navIds[i]}`}
                onClick={() => setMenuOpen(false)}
                className="text-xs font-bold uppercase text-white/75 transition hover:text-white"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Language toggle */}
            <button
              type="button"
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="rounded border border-white/15 px-3 py-2 text-xs font-bold
                         transition hover:border-white/40"
              aria-label="Switch language"
            >
              {lang === "en" ? "العربية" : "EN"}
            </button>

            {/* Join Now — hidden on very small screens */}
            <a
              className="btn hidden min-h-10 px-4 sm:inline-flex"
              href={waLink("Hi Iron 9 Gym, I'd like to join.")}
              target="_blank"
              rel="noreferrer"
            >
              {t.join}
            </a>

            {/* Hamburger */}
            <button
              className="p-2 md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </nav>
      </header>

      <main>
        {/* ═══════════════════════════════════════════════════════════
            1. HERO
            ═══════════════════════════════════════════════════════════ */}
        <section id="home" className="hero">
          <div className="container hero-content pt-20">
            <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-white/70">
              {t.kicker}
            </p>

            <h1>
              <span>{t.hero1}</span>
              <span>{t.hero2}</span>
            </h1>

            <p className="hero-arabic" dir="rtl" lang="ar">
              {t.tagline}
            </p>

            <div className="hero-actions">
              <a
                className="btn"
                href={waLink("Hi Iron 9 Gym, I'm interested in joining.")}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={16} />
                {t.joinWa}
              </a>
              <a
                className="btn secondary"
                href="https://instagram.com/iron_9gym"
                target="_blank"
                rel="noreferrer"
              >
                <Instagram size={16} />
                {t.instagram}
              </a>
            </div>

            <p className="mt-8 text-[.68rem] font-bold uppercase tracking-[.2em] text-white/55">
              <span className="text-iron-red">IRON 9</span> / DISCIPLINE. STRENGTH. RESULTS.
            </p>

            {/* Scroll indicator */}
            <div className="mt-14 flex items-center gap-3 text-[.65rem] font-bold uppercase tracking-[.2em] text-white/40">
              <ChevronDown size={14} className="animate-bounce" />
              {t.scroll}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            2. ABOUT
            ═══════════════════════════════════════════════════════════ */}
        <section id="about" className="section">
          <div className="container grid items-center gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            {/* Photo with red accent borders */}
            <div className="reveal">
              <div
                className="about-photo"
                role="img"
                aria-label="Dumbbell rack at Iron 9 Gym"
              >
                <div className="about-badge">{t.built}</div>
              </div>
            </div>

            {/* Text + animated stats */}
            <div className="reveal">
              <div className="eyebrow">{t.aboutEyebrow}</div>
              <h2 className="section-title">{t.aboutTitle}</h2>
              <p className="body-copy">{t.aboutText}</p>
              <a
                href="#facilities"
                className="mt-5 inline-block text-sm font-semibold text-white/70 transition hover:text-white"
              >
                {t.explore}
              </a>

              {/* ✏️  Edit STAT_TARGETS array at top of file to change these numbers */}
              <div id="stats" className="stat-grid">
                {counts.map((count, i) => (
                  <div className="stat" key={i}>
                    <strong>{count}{count > 0 ? "+" : ""}</strong>
                    <span>{t.stats[i]}</span>
                  </div>
                ))}
              </div>
              <small className="mt-3 block text-xs text-white/35">{t.statNote}</small>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            3. FACILITIES
            ═══════════════════════════════════════════════════════════ */}
        <section id="facilities" className="section section-dark">
          <div className="container">
            <div className="reveal eyebrow">{t.facilitiesEyebrow}</div>
            <h2 className="section-title reveal">{t.facilitiesTitle}</h2>
            <p className="body-copy reveal">{t.facilitiesIntro}</p>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {[Dumbbell, HeartPulse, Zap, Shield, UserRound, Shirt].map(
                (Icon, i) => (
                  <article
                    key={t.facilities[i][0]}
                    className="facility-card reveal min-h-[190px]"
                  >
                    <Icon className="facility-icon" size={27} />
                    <h3>{t.facilities[i][0]}</h3>
                    <p>{t.facilities[i][1]}</p>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            4. SUPPLEMENTS STORE (3-D products)
            ═══════════════════════════════════════════════════════════ */}
        <section
          id="supplements"
          className="section supplements-section"
        >
          <div className="container">
            <div className="reveal flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="eyebrow">{t.storeEyebrow}</div>
                <h2 className="section-title">{t.storeTitle}</h2>
              </div>
              <p className="body-copy max-w-lg">{t.storeIntro}</p>
            </div>

            <div className="mt-10 max-w-4xl mx-auto">
              <article className="product-card reveal grid md:grid-cols-2 gap-6 items-center">
                {/* Product photo showcase — left side */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-[#18191e] to-[#0c0d0f] min-h-[380px] md:min-h-[460px] flex items-center justify-center p-3 group">
                  <img
                    src="/assets/whey-protein.jpg"
                    alt="Optimum Nutrition Gold Standard 100% Whey Protein"
                    className="h-full w-full object-cover rounded-lg shadow-2xl transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full bg-iron-red/90 px-3 py-1 text-[0.65rem] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md">
                    100% ORIGINAL
                  </span>
                </div>

                {/* Product info — right side */}
                <div className="product-info flex flex-col justify-center">
                  <div className="eyebrow">{t.wheyEyebrow}</div>
                  <h3 className="text-2xl font-bold">{t.whey}</h3>
                  <p className="mt-2 text-white/70">{t.wheyDesc}</p>

                  {/* Nutrient Highlights */}
                  <div className="mt-4 grid grid-cols-3 gap-2 border-y border-white/10 py-3 text-center">
                    <div>
                      <strong className="block text-lg font-black text-white">24g</strong>
                      <span className="text-[0.68rem] uppercase tracking-wider text-white/50">Protein</span>
                    </div>
                    <div>
                      <strong className="block text-lg font-black text-white">5.5g</strong>
                      <span className="text-[0.68rem] uppercase tracking-wider text-white/50">BCAAs</span>
                    </div>
                    <div>
                      <strong className="block text-lg font-black text-white">4g</strong>
                      <span className="text-[0.68rem] uppercase tracking-wider text-white/50">Glutamine</span>
                    </div>
                  </div>

                  <div className="product-meta mt-3">
                    <span>{t.flavors}</span>
                    <strong>{t.from}</strong>
                  </div>
                  <a
                    className="btn min-h-10 mt-4"
                    href={waLink(
                      lang === "ar"
                        ? "مرحباً آيرون 9 جيم، أود الاستفسار وطلب أوبتيموم نيوترشن جولد ستاندرد 100% واي."
                        : "Hi Iron 9 Gym, I'd like to order Optimum Nutrition Gold Standard 100% Whey.",
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MessageCircle size={14} />
                    {t.order}
                  </a>
                </div>
              </article>
            </div>
            <p className="mt-4 text-xs text-white/45">{t.note}</p>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            5. MEMBERSHIPS
            ═══════════════════════════════════════════════════════════ */}
        <section id="memberships" className="section section-dark">
          <div className="container">
            <div className="reveal eyebrow">{t.memberEyebrow}</div>
            <h2 className="section-title reveal">{t.memberTitle}</h2>
            <p className="body-copy reveal">{t.memberIntro}</p>

            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {t.plans.map((plan, i) => (
                <article
                  key={plan.name}
                  className={`price-card reveal ${i === 1 ? "popular" : ""}`}
                >
                  {i === 1 && (
                    <span className="popular-tag">{t.popular}</span>
                  )}
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                  {/* ✏️  Edit `plan.price` in the `copy` object above */}
                  <div className="price-amount">
                    {plan.price} <small>JOD*</small>
                  </div>
                  <ul>
                    {t.benefits.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <a
                    className={`btn ${i !== 1 ? "secondary" : ""}`}
                    href={waLink(
                      `Hi Iron 9 Gym, I'd like to join the ${plan.name} membership.`,
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t.joinPlan}
                  </a>
                </article>
              ))}
            </div>
            <p className="mt-4 text-xs text-white/45">{t.priceNote}</p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            6. GALLERY
            ═══════════════════════════════════════════════════════════ */}
        <section id="gallery" className="section">
          <div className="container">
            <div className="reveal eyebrow">{t.galleryEyebrow}</div>
            <h2 className="section-title reveal">{t.galleryTitle}</h2>
            <p className="body-copy reveal">{t.galleryIntro}</p>

            {/* Masonry grid — items 0 and 3 span 2 rows for visual interest */}
            {/* ✏️  Edit GALLERY constant at top of file to change photos */}
            <div className="gallery-grid">
              {gallery.map(([file, alt], i) => (
                <button
                  key={file}
                  onClick={() => setGalleryImage(`/assets/${file}`)}
                  aria-label={`View photo: ${alt}`}
                  className={`gallery-item reveal ${i === 0 || i === 3 ? "tall" : ""}`}
                >
                  <img
                    src={`/assets/${file}`}
                    alt={alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            7. TESTIMONIALS
            ═══════════════════════════════════════════════════════════ */}
        <section className="section section-dark">
          <div className="container text-center">
            <div className="reveal eyebrow justify-center">{t.reviewsEyebrow}</div>
            <h2 className="section-title reveal">{t.reviewsTitle}</h2>

            <div className="reveal testimonial-card mx-auto mt-10 max-w-4xl">
              <div className="testimonial-quote">&ldquo;</div>
              <blockquote className="mx-auto my-6 max-w-3xl text-lg font-medium leading-relaxed md:text-xl">
                {t.reviews[reviewIndex][0]}
              </blockquote>
              <div className="mt-4 flex items-center justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#e10600] text-[#e10600]" aria-hidden="true" />
                ))}
              </div>
              <cite className="mt-3 block text-xs font-bold not-italic uppercase tracking-[.18em] text-white/45">
                — {t.reviews[reviewIndex][1]}
              </cite>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                className="grid h-11 w-11 place-items-center border border-white/20 transition hover:border-red-600"
                onClick={() => changeReview(-1)}
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={16} />
              </button>
              <div className="flex items-center gap-2">
                {t.reviews.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    onClick={() => setReviewIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === reviewIndex
                        ? "w-6 bg-iron-red"
                        : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>
              <button
                className="grid h-11 w-11 place-items-center border border-white/20 transition hover:border-red-600"
                onClick={() => changeReview(1)}
                aria-label="Next testimonial"
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <p className="mt-4 text-xs text-white/35">
              Sample testimonials — replace with real member reviews before publishing.
            </p>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            8. CONTACT
            ═══════════════════════════════════════════════════════════ */}
        <section id="contact" className="section">
          <div className="container">
            <div className="reveal eyebrow">{t.contactEyebrow}</div>
            <h2 className="section-title reveal">{t.contactTitle}</h2>

            <div className="grid gap-12 md:grid-cols-[1fr_1.15fr]">
              {/* Contact info */}
              <div className="reveal space-y-6">
                <p className="body-copy">{t.contactIntro}</p>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="contact-icon-wrap"><MessageCircle size={20} /></div>
                  <div>
                    <b className="block text-xs font-bold uppercase tracking-[.12em] text-white">WhatsApp</b>
                    <a className="mt-1 block text-sm text-white/60 transition hover:text-white"
                       href="https://wa.me/962793100014" target="_blank" rel="noreferrer">
                      +962 7 9310 0014
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex gap-4">
                  <div className="contact-icon-wrap"><Instagram size={20} /></div>
                  <div>
                    <b className="block text-xs font-bold uppercase tracking-[.12em] text-white">Instagram</b>
                    <a className="mt-1 block text-sm text-white/60 transition hover:text-white"
                       href="https://instagram.com/iron_9gym" target="_blank" rel="noreferrer">
                      @iron_9gym
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex gap-4">
                  <div className="contact-icon-wrap"><MapPin size={20} /></div>
                  <div>
                    <b className="block text-xs font-bold uppercase tracking-[.12em] text-white">{t.location}</b>
                    <span className="mt-1 block text-sm text-white/60">Aqaba, Jordan</span>
                    <a className="mt-1.5 inline-block text-sm underline decoration-red-600 underline-offset-4 transition hover:text-red-500"
                       href="https://maps.app.goo.gl/ck7B4ZAPRv5JHccp8?g_st=iw" target="_blank" rel="noreferrer">
                      {t.directions}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                {/* ✏️  Edit hours in copy.en.hoursText / copy.ar.hoursText */}
                <div className="flex gap-4">
                  <div className="contact-icon-wrap"><Clock3 size={20} /></div>
                  <div>
                    <b className="block text-xs font-bold uppercase tracking-[.12em] text-white">{t.hours}</b>
                    <span className="mt-1 block text-sm text-white/60">{t.hoursText}</span>
                    <small className="mt-1 block text-xs text-white/35">{t.hoursNote}</small>
                  </div>
                </div>
              </div>

              {/* Contact form → WhatsApp */}
              <form
                onSubmit={submitContact}
                className="contact-form reveal grid gap-5 sm:grid-cols-2"
              >
                <label>
                  {t.name}
                  <input name="name" autoComplete="name" required placeholder={t.namePlaceholder} />
                </label>
                <label>
                  {t.phone}
                  <input name="phone" type="tel" autoComplete="tel" required placeholder={t.phonePlaceholder} />
                </label>
                <label className="sm:col-span-2">
                  {t.message}
                  <textarea name="message" required placeholder={t.messagePlaceholder} />
                </label>
                <div className="sm:col-span-2">
                  <button className="btn" type="submit">
                    <MessageCircle size={15} />
                    {t.send}
                  </button>
                </div>
              </form>
            </div>

            {/* Embedded Google Map */}
            <div className="map-wrap reveal">
              <iframe
                title="Iron 9 Gym location — Aqaba, Jordan"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=Aqaba%2C+Jordan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              />
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════════════════════════════ */}
      <footer className="border-t border-white/10 bg-[#080809] py-10">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <a href="#home">
              <img
                src="/assets/iron9-logo.png"
                alt="IRON 9 GYM"
                className="h-12 w-[118px] object-contain"
              />
            </a>

            <div className="flex flex-wrap gap-4 text-xs text-white/55">
              {t.nav.slice(1).map((label, i) => (
                <a
                  key={label}
                  href={`#${navIds.slice(1)[i]}`}
                  className="transition hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>

            <div className="flex gap-2">
              <a
                className="footer-social-link"
                href="https://instagram.com/iron_9gym"
                target="_blank"
                rel="noreferrer"
                aria-label="Iron 9 Gym on Instagram"
              >
                <Instagram size={17} />
              </a>
              <a
                className="footer-social-link"
                href="https://wa.me/962793100014"
                target="_blank"
                rel="noreferrer"
                aria-label="Iron 9 Gym on WhatsApp"
              >
                <MessageCircle size={17} />
              </a>
            </div>
          </div>

          <div className="mt-7 flex flex-col justify-between gap-2 border-t border-white/10 pt-5 text-xs text-white/40 sm:flex-row">
            <span>{t.footer}</span>
            <span>Aqaba, Jordan · الخيار الأفضل</span>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════════════════════════════════
          FLOATING WHATSAPP BUTTON
          ═══════════════════════════════════════════════════════════════ */}
      <a
        className="whatsapp-float"
        href={waLink("Hi Iron 9 Gym, I'd like to know more.")}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Iron 9 Gym on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

      {/* ═══════════════════════════════════════════════════════════════
          GALLERY LIGHTBOX
          ═══════════════════════════════════════════════════════════════ */}
      {galleryImage && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Gallery photo viewer"
          onClick={() => setGalleryImage(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setGalleryImage(null)}
            aria-label="Close photo"
          >
            ×
          </button>
          <img
            src={galleryImage}
            alt="Iron 9 Gym gallery photo"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
