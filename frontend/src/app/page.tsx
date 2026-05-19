import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  BookOpenText,
  CheckCircle2,
  ChevronRight,
  CircleCheck,
  FileCheck2,
  Gauge,
  Layers3,
  LineChart,
  LockKeyhole,
  Medal,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Timer,
  Zap
} from "lucide-react";
import { Badge, ButtonLink } from "@/components/ui";
import { cn } from "@/lib/utils";

const providers = ["AWS", "Microsoft Azure", "Google Cloud", "Salesforce", "Cisco", "Kubernetes"];

const features = [
  {
    icon: Target,
    title: "Exam-grade practice",
    text: "Mock exams are structured around real certification domains, timed pressure, flagged review, and confidence scoring."
  },
  {
    icon: BarChart3,
    title: "Readiness analytics",
    text: "Track score trends, weak objectives, retake history, and domain-level readiness before you schedule the real exam."
  },
  {
    icon: FileCheck2,
    title: "Certification paths",
    text: "Plan AWS, Azure, GCP, Salesforce, Cisco, and cloud engineering tracks from foundation to professional level."
  },
  {
    icon: Gauge,
    title: "Study velocity",
    text: "See streaks, completion rhythm, target dates, and recommended next sessions without spreadsheet busywork."
  },
  {
    icon: BookOpenText,
    title: "Knowledge base",
    text: "Turn missed questions into concise explanations, provider notes, architecture patterns, and review collections."
  },
  {
    icon: Smartphone,
    title: "Mobile-ready learning",
    text: "Review questions, explanations, and progress on any screen with responsive layouts built for daily repetition."
  },
  {
    icon: Layers3,
    title: "Enterprise dashboard",
    text: "Give teams a polished operating view across learners, exams, certifications, and readiness trends."
  },
  {
    icon: LockKeyhole,
    title: "Professional controls",
    text: "A scalable foundation for subscriptions, team access, certificate verification, and profile-level persistence."
  }
];

const analyticsBars = [
  ["IAM", 86],
  ["VPC", 72],
  ["EC2", 91],
  ["S3", 78],
  ["RDS", 68],
  ["Cost", 84]
] as const;

const pricing = [
  {
    cta: "Start Free",
    description: "For individuals validating the platform and building a weekly practice rhythm.",
    name: "Starter",
    price: "$0",
    points: ["Limited mock exams", "Basic score history", "Certification catalog", "Knowledge base previews"]
  },
  {
    cta: "Choose Pro",
    description: "For serious certification prep across providers with deeper analytics and tracking.",
    featured: true,
    name: "Pro",
    price: "$19",
    points: ["Unlimited mock exams", "Readiness analytics", "Certificate generation", "Study plans and saved reviews"]
  },
  {
    cta: "Contact Sales",
    description: "For teams that need shared visibility, learner progress, and enterprise-grade controls.",
    name: "Team",
    price: "Custom",
    points: ["Team dashboard", "Role-based access", "Provider path reporting", "Priority onboarding"]
  }
];

const testimonials = [
  {
    name: "Maya R.",
    role: "Cloud Platform Engineer",
    quote:
      "AceCloudCert feels closer to an engineering readiness tool than a course site. The analytics made it obvious which domains were actually holding me back."
  },
  {
    name: "Daniel K.",
    role: "Solutions Architect",
    quote:
      "The mock exam experience is calm, focused, and fast. I could practice in short windows and still see how each session moved my certification readiness."
  },
  {
    name: "Priya S.",
    role: "Enablement Lead",
    quote:
      "This is the kind of interface I would be comfortable rolling out to a professional cloud team. It looks credible from the first screen."
  }
];

const faqs = [
  {
    answer:
      "AceCloudCert is being built for AWS, Azure, Google Cloud, Salesforce, Cisco, and adjacent cloud engineering certifications.",
    question: "Which certification providers are supported?"
  },
  {
    answer:
      "No. The product is positioned around practice, analytics, readiness tracking, knowledge review, and certificate workflows rather than passive video courses.",
    question: "Is this another course marketplace?"
  },
  {
    answer:
      "Mock exams are designed around timed sessions, objective tagging, result calculation, flagged questions, and post-test review patterns.",
    question: "How do mock exams work?"
  },
  {
    answer:
      "The interface is already structured for teams, subscriptions, profiles, certification tracking, and future enterprise controls.",
    question: "Can teams use it?"
  },
  {
    answer:
      "Yes. The landing page and product foundation are responsive, with mobile-friendly navigation and learning previews.",
    question: "Does it work on mobile?"
  }
];

function SectionHeader({
  eyebrow,
  title,
  text
}: {
  eyebrow: string;
  text: string;
  title: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold leading-tight text-foreground md:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted-foreground">{text}</p>
    </div>
  );
}

function ProviderMark({ name }: { name: string }) {
  return (
    <div className="flex min-h-20 items-center justify-center rounded-lg border border-border bg-surface/70 px-4 text-center text-sm font-semibold text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground">
      {name}
    </div>
  );
}

function HeroDashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-6 rounded-[2rem] bg-[linear-gradient(135deg,rgba(255,140,0,0.22),rgba(56,189,248,0.18),rgba(34,197,94,0.12))] opacity-80 blur-2xl" />
      <div className="landing-float relative overflow-hidden rounded-lg border border-border bg-background/88 shadow-2xl backdrop-blur">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-accent" />
            <span className="h-2.5 w-2.5 rounded-full bg-success" />
          </div>
          <Badge tone="accent">Live readiness</Badge>
        </div>
        <div className="grid gap-4 p-4 md:grid-cols-[1fr_180px]">
          <div className="space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-foreground">AWS Solutions Architect</p>
                  <p className="mt-1 text-xs text-muted-foreground">Target exam readiness</p>
                </div>
                <span className="text-2xl font-semibold text-success">87%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface">
                <div className="h-full w-[87%] rounded-full bg-gradient-to-r from-primary via-accent to-success" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                ["Mocks", "42"],
                ["Streak", "18d"],
                ["Weakest", "VPC"]
              ].map(([label, value]) => (
                <div className="rounded-lg border border-border bg-surface p-3" key={label}>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
                </div>
              ))}
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Domain performance</p>
                <LineChart className="h-4 w-4 text-accent" />
              </div>
              <div className="flex h-24 items-end gap-2">
                {analyticsBars.map(([label, value]) => (
                  <div className="flex flex-1 flex-col items-center gap-2" key={label}>
                    <div className="flex h-16 w-full items-end rounded-sm bg-white/[0.04]">
                      <div
                        className="w-full rounded-sm bg-gradient-to-t from-primary to-accent"
                        style={{ height: `${value}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-lg border border-border bg-card p-4">
              <Timer className="h-5 w-5 text-primary" />
              <p className="mt-4 text-sm font-semibold text-foreground">Next mock exam</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">65 questions / 130 minutes</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <ShieldCheck className="h-5 w-5 text-success" />
              <p className="mt-4 text-sm font-semibold text-foreground">Certificate path</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Associate track / 3 modules left</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
              <Sparkles className="h-5 w-5 text-accent" />
              <p className="mt-4 text-sm font-semibold text-foreground">Recommended</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Review VPC routing before retake.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-2xl">
      <div className="grid gap-0 lg:grid-cols-[230px_minmax(0,1fr)]">
        <div className="border-b border-border bg-background/65 p-5 lg:border-b-0 lg:border-r">
          <div className="flex items-center gap-3">
            <Image
              alt="AceCloudCert logo"
              className="h-10 w-10 rounded-md border border-border"
              height={42}
              src="/acecloudcert-logo.png"
              width={42}
            />
            <div>
              <p className="text-sm font-semibold text-foreground">AceCloudCert</p>
              <p className="text-xs text-muted-foreground">Workspace</p>
            </div>
          </div>
          <div className="mt-8 space-y-2">
            {["Overview", "Mock exams", "Analytics", "Certificates", "Knowledge base"].map((item, index) => (
              <div
                className={cn(
                  "flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold",
                  index === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                )}
                key={item}
              >
                {item}
                {index === 0 ? <ChevronRight className="h-4 w-4" /> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge tone="orange">Cloud readiness cockpit</Badge>
              <h3 className="mt-3 text-2xl font-semibold text-foreground">Everything serious learners need in one view</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                A premium product surface for practice exams, certification progress, knowledge review, and analytics.
              </p>
            </div>
            <ButtonLink href="#pricing" variant="secondary">
              See pricing
            </ButtonLink>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ["Readiness", "87%", "text-success"],
              ["Avg score", "82%", "text-accent"],
              ["Study plan", "14d", "text-primary"]
            ].map(([label, value, color]) => (
              <div className="rounded-lg border border-border bg-background/50 p-4" key={label}>
                <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
                <p className={cn("mt-3 text-3xl font-semibold", color)}>{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_280px]">
            <div className="rounded-lg border border-border bg-background/50 p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground">Weekly score trajectory</p>
                <Badge tone="success">+11%</Badge>
              </div>
              <div className="flex h-48 items-end gap-3">
                {[44, 52, 58, 67, 71, 76, 82, 87].map((height, index) => (
                  <div className="flex flex-1 flex-col justify-end rounded-sm bg-white/[0.035]" key={height + index}>
                    <div
                      className="rounded-sm bg-gradient-to-t from-primary via-accent to-success"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {[
                ["Exam retake", "Recommended after VPC review"],
                ["Certification", "Azure Fundamentals next"],
                ["Focus area", "Identity and access patterns"]
              ].map(([title, text]) => (
                <div className="rounded-lg border border-border bg-background/50 p-4" key={title}>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockTestPreview() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5">
        <div>
          <Badge tone="accent">Mock test preview</Badge>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">Practice that feels like exam day</h3>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-semibold text-primary">
          <Timer className="h-4 w-4" />
          01:18:42
        </div>
      </div>
      <div className="grid gap-5 lg:grid-cols-[1fr_250px]">
        <div>
          <p className="text-sm font-semibold uppercase text-muted-foreground">Question 24 of 65</p>
          <p className="mt-3 text-lg font-semibold leading-7 text-foreground">
            A production workload needs object storage with lifecycle policies, encryption, and regional durability. Which
            service should be selected?
          </p>
          <div className="mt-5 space-y-3">
            {[
              ["Amazon S3", true],
              ["Amazon EBS", false],
              ["Amazon EFS", false],
              ["Amazon RDS", false]
            ].map(([answer, selected]) => (
              <div
                className={cn(
                  "flex items-center justify-between rounded-lg border px-4 py-3 text-sm",
                  selected ? "border-success/40 bg-success/10 text-foreground" : "border-border bg-background/45 text-muted-foreground"
                )}
                key={String(answer)}
              >
                <span>{answer}</span>
                {selected ? <CircleCheck className="h-4 w-4 text-success" /> : null}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-background/45 p-4">
          <p className="text-sm font-semibold text-foreground">Session controls</p>
          <div className="mt-4 grid grid-cols-5 gap-2">
            {Array.from({ length: 20 }).map((_, index) => (
              <span
                className={cn(
                  "flex h-8 items-center justify-center rounded-sm border text-xs font-semibold",
                  index < 12 && "border-success/30 bg-success/10 text-success",
                  index >= 12 && index < 16 && "border-primary/30 bg-primary/10 text-primary",
                  index >= 16 && "border-border bg-surface text-muted-foreground"
                )}
                key={index}
              >
                {index + 1}
              </span>
            ))}
          </div>
          <div className="mt-5 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              Confidence tracking
            </p>
            <p className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Flagged review
            </p>
            <p className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-accent" />
              Instant explanation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsPreview() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Badge tone="success">Analytics preview</Badge>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">Know exactly when you are ready</h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            Convert every practice session into a visible readiness signal across providers, domains, and exam attempts.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-background/50 p-4 text-right">
          <p className="text-xs uppercase text-muted-foreground">Predicted pass range</p>
          <p className="mt-2 text-3xl font-semibold text-success">84-91%</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_300px]">
        <div className="rounded-lg border border-border bg-background/45 p-4">
          <div className="flex h-64 items-end gap-3">
            {[62, 68, 64, 74, 79, 83, 88, 91].map((height, index) => (
              <div className="flex flex-1 flex-col items-center gap-3" key={height + index}>
                <div className="flex h-48 w-full items-end rounded-sm bg-white/[0.04]">
                  <div
                    className="w-full rounded-sm bg-gradient-to-t from-primary to-accent"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          {analyticsBars.map(([label, value]) => (
            <div className="rounded-lg border border-border bg-background/45 p-3" key={label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">{label}</span>
                <span className="text-muted-foreground">{value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-surface">
                <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CertificationPreview() {
  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-lg border border-border bg-card p-5 shadow-xl">
        <Badge tone="orange">Certification preview</Badge>
        <h3 className="mt-3 text-2xl font-semibold text-foreground">Turn practice into visible progress</h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Track active certification paths, readiness milestones, completion status, and generated certificates from a
          single professional workspace.
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {[
            ["AWS", "Solutions Architect", "87%"],
            ["Azure", "AZ-900", "74%"],
            ["Google Cloud", "Digital Leader", "69%"]
          ].map(([provider, exam, value]) => (
            <div className="rounded-lg border border-border bg-background/45 p-4" key={exam}>
              <p className="text-xs font-semibold uppercase text-primary">{provider}</p>
              <p className="mt-2 text-sm font-semibold text-foreground">{exam}</p>
              <p className="mt-4 text-2xl font-semibold text-accent">{value}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="relative overflow-hidden rounded-lg border border-border bg-[linear-gradient(145deg,rgba(255,140,0,0.22),rgba(56,189,248,0.12),rgba(17,24,39,0.96))] p-5 shadow-2xl">
        <div className="absolute right-4 top-4 h-20 w-20 rounded-full border border-white/10" />
        <Medal className="h-9 w-9 text-primary" />
        <p className="mt-8 text-xs font-semibold uppercase text-muted-foreground">Verified completion</p>
        <h3 className="mt-2 text-2xl font-semibold text-foreground">Cloud Readiness Certificate</h3>
        <p className="mt-4 text-sm leading-6 text-muted-foreground">Issued to Maya R. after completing the AWS readiness path.</p>
        <div className="mt-8 border-t border-white/10 pt-4">
          <p className="text-xs uppercase text-muted-foreground">Certificate ID</p>
          <p className="mt-1 font-mono text-sm text-foreground">ACC-AWS-2026-0148</p>
        </div>
      </div>
    </div>
  );
}

function KnowledgeBasePreview() {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-xl">
      <div className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div>
          <Badge tone="accent">Knowledge base preview</Badge>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">Make every missed question compound</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Study guides, explanations, provider concepts, and weak-domain reviews become a searchable operating system
            for certification prep.
          </p>
          <div className="mt-6 flex items-center gap-2 rounded-lg border border-border bg-background/50 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search IAM policies, VPC routing, exam domains...</span>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {[
            ["IAM least privilege", "AWS / Security", "12 linked questions"],
            ["Azure identity baseline", "Azure / Fundamentals", "8 linked questions"],
            ["Shared VPC patterns", "GCP / Networking", "6 linked questions"],
            ["Cisco routing review", "Cisco / Associate", "9 linked questions"]
          ].map(([title, meta, count]) => (
            <div className="rounded-lg border border-border bg-background/45 p-4" key={title}>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-2 text-xs text-primary">{meta}</p>
              <p className="mt-5 text-sm text-muted-foreground">{count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/82 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6" aria-label="Main">
          <a className="flex min-w-0 items-center gap-3" href="#top" aria-label="AceCloudCert home">
            <Image
              alt="AceCloudCert logo"
              className="h-10 w-10 rounded-md border border-border"
              height={42}
              priority
              src="/acecloudcert-logo.png"
              width={42}
            />
            <span className="truncate text-base font-semibold text-foreground">AceCloudCert</span>
          </a>
          <div className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground lg:flex">
            <a className="transition-colors hover:text-foreground" href="#providers">
              Providers
            </a>
            <a className="transition-colors hover:text-foreground" href="#features">
              Features
            </a>
            <a className="transition-colors hover:text-foreground" href="#preview">
              Platform
            </a>
            <a className="transition-colors hover:text-foreground" href="#pricing">
              Pricing
            </a>
            <a className="transition-colors hover:text-foreground" href="#faq">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-2">
            <ButtonLink className="hidden sm:inline-flex" href="#pricing" variant="secondary">
              See Pricing
            </ButtonLink>
            <ButtonLink href="#start">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </nav>
      </header>

      <section className="relative" id="top">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,140,0,0.18),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(56,189,248,0.16),transparent_28%),linear-gradient(180deg,rgba(11,18,32,0),#0B1220_86%)]" />
        <div className="enterprise-grid relative mx-auto grid max-w-7xl gap-12 px-4 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(460px,0.9fr)] lg:px-6 lg:py-28">
          <div className="flex min-w-0 flex-col justify-center">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <Badge tone="orange">Premium cloud certification platform</Badge>
              <Badge tone="accent">AWS / Azure / GCP / Salesforce / Cisco</Badge>
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold leading-[1.02] text-foreground md:text-7xl">
              Prepare Smarter. Practice Better. Certify With Confidence.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              AceCloudCert helps cloud professionals prepare for AWS, Azure, GCP, Salesforce, and Cisco certifications
              through enterprise-grade mock exams, analytics, and learning tools.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#start" size="lg">
                Start Free
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="#providers" size="lg" variant="secondary">
                Explore Certifications
              </ButtonLink>
            </div>
            <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                ["42k+", "practice sessions modeled"],
                ["91%", "target pass confidence"],
                ["5+", "provider ecosystems"]
              ].map(([value, label]) => (
                <div className="rounded-lg border border-border bg-surface/60 p-4" key={label}>
                  <p className="text-2xl font-semibold text-foreground">{value}</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <HeroDashboardPreview />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 lg:px-6" id="providers">
        <SectionHeader
          eyebrow="Trusted certification providers"
          text="AceCloudCert is designed around the ecosystems cloud professionals actually use at work."
          title="One premium prep platform across the major cloud certification paths"
        />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {providers.map((provider) => (
            <ProviderMark key={provider} name={provider} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6" id="features">
        <SectionHeader
          eyebrow="Features"
          text="Purpose-built for cloud professionals who need measurable readiness, not passive course completion."
          title="A serious certification platform with SaaS-grade product depth"
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, text, title }) => (
            <div
              className="group rounded-lg border border-border bg-card p-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50"
              key={title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary transition-colors group-hover:border-accent/40 group-hover:bg-accent/10 group-hover:text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6" id="preview">
        <SectionHeader
          eyebrow="Dashboard preview"
          text="A calm, enterprise-grade workspace for readiness analytics, mock exams, knowledge review, and certification progress."
          title="A platform experience that feels credible before the first click"
        />
        <div className="mt-10">
          <DashboardPreview />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 lg:grid-cols-2 lg:px-6">
        <MockTestPreview />
        <AnalyticsPreview />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <CertificationPreview />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <KnowledgeBasePreview />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6" id="pricing">
        <SectionHeader
          eyebrow="Pricing preview"
          text="Clear entry points for individuals and teams, with a premium path for serious certification preparation."
          title="Start free, then scale when preparation becomes mission-critical"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {pricing.map((plan) => (
            <div
              className={cn(
                "rounded-lg border bg-card p-6 shadow-xl",
                plan.featured ? "border-primary/60 shadow-[0_0_60px_rgba(255,140,0,0.14)]" : "border-border"
              )}
              key={plan.name}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                {plan.featured ? <Badge tone="orange">Most popular</Badge> : null}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{plan.description}</p>
              <div className="mt-6 flex items-end gap-2">
                <span className="text-4xl font-semibold text-foreground">{plan.price}</span>
                {plan.price.startsWith("$") ? <span className="pb-1 text-sm text-muted-foreground">/month</span> : null}
              </div>
              <ButtonLink className="mt-6 w-full" href="#start" variant={plan.featured ? "primary" : "secondary"}>
                {plan.cta}
              </ButtonLink>
              <div className="mt-6 space-y-3">
                {plan.points.map((point) => (
                  <p className="flex items-center gap-3 text-sm text-muted-foreground" key={point}>
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                    {point}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6">
        <SectionHeader
          eyebrow="Testimonials"
          text="Realistic product expectations from cloud professionals and enablement teams."
          title="Built for people who treat certification as career infrastructure"
        />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure className="rounded-lg border border-border bg-card p-6 shadow-xl" key={testimonial.name}>
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Sparkles className="h-4 w-4" key={index} />
                ))}
              </div>
              <blockquote className="mt-5 text-sm leading-7 text-muted-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{testimonial.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 lg:px-6" id="faq">
        <SectionHeader
          eyebrow="FAQ"
          text="Straight answers for learners and teams evaluating AceCloudCert."
          title="Questions before you start"
        />
        <div className="mt-10 divide-y divide-border rounded-lg border border-border bg-card">
          {faqs.map((faq) => (
            <div className="p-5" key={faq.question}>
              <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-6" id="start">
        <div className="enterprise-grid relative overflow-hidden rounded-lg border border-border bg-surface p-8 text-center shadow-2xl md:p-14">
          <div className="absolute inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <Badge tone="orange">Start preparing with confidence</Badge>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold leading-tight text-foreground md:text-5xl">
            Build a cloud certification routine that actually shows progress.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
            Start with focused mock exams, then use analytics and knowledge review to close the exact gaps between where
            you are and where the exam expects you to be.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="#pricing" size="lg">
              Start Free
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#providers" size="lg" variant="secondary">
              Explore Certifications
            </ButtonLink>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-4 py-10 lg:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image
              alt="AceCloudCert logo"
              className="h-10 w-10 rounded-md border border-border"
              height={42}
              src="/acecloudcert-logo.png"
              width={42}
            />
            <div>
              <p className="font-semibold text-foreground">AceCloudCert</p>
              <p className="text-sm text-muted-foreground">Premium cloud certification readiness.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-semibold text-muted-foreground">
            <a className="hover:text-foreground" href="#features">
              Features
            </a>
            <a className="hover:text-foreground" href="#pricing">
              Pricing
            </a>
            <a className="hover:text-foreground" href="#faq">
              FAQ
            </a>
            <a className="hover:text-foreground" href="#start">
              Start Free
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
