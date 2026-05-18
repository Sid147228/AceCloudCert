import {
  Boxes,
  CheckCircle2,
  CloudCog,
  Compass,
  FileCheck2,
  Gauge,
  Layers3,
  LayoutDashboard,
  LockKeyhole,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Table2,
  TerminalSquare,
  UserRound
} from "lucide-react";
import { ActivityCard, AnalyticsCard, ProgressCard, QuickActionCard, StatCard } from "@/components/dashboard";
import { AppShell, DashboardLayout, PageContainer } from "@/components/layout";
import {
  Badge,
  Button,
  ButtonLink,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  Input,
  Modal,
  Select,
  SkeletonLoader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Toast
} from "@/components/ui";
import { brand, typography } from "@/lib/theme";

const colorTokens = [
  ["Primary Orange", brand.primary],
  ["Background", brand.background],
  ["Surface", brand.surface],
  ["Card", brand.card],
  ["Border", brand.border],
  ["Secondary Text", brand.secondaryText],
  ["Success", brand.success],
  ["Danger", brand.danger],
  ["Accent Blue", brand.accentBlue]
] as const;

const componentRows = [
  ["Button", "Primary, secondary, outline, ghost, danger, link"],
  ["Card", "Depth, headers, content blocks, footers"],
  ["Input / Select", "Keyboard-first controls with dark focus states"],
  ["Modal / Dropdown / Tooltip", "Radix-backed overlays with accessible triggers"],
  ["Tabs / Progress / Table", "Data surfaces for later product workflows"],
  ["EmptyState / Skeleton / Toast", "Operational feedback and loading states"]
] as const;

const analyticsData = [
  { label: "Tokens", value: 88 },
  { label: "Shell", value: 96 },
  { label: "Nav", value: 90 },
  { label: "Mobile", value: 84 },
  { label: "States", value: 78 }
];

const activityItems = [
  {
    description: "Official AceCloudCert palette is mapped into Tailwind v4 theme tokens and reusable exports.",
    label: "Theme contract established",
    tone: "orange" as const
  },
  {
    description: "Desktop sidebar, top navbar, mobile menu, and mobile bottom navigation share one navigation source.",
    label: "Navigation model unified",
    tone: "accent" as const
  },
  {
    description: "Business workflows remain intentionally out of scope, so product phases can attach cleanly.",
    label: "Feature boundary protected",
    tone: "success" as const
  }
];

export default function Home() {
  return (
    <AppShell>
      <PageContainer className="space-y-6">
        <section
          className="enterprise-grid panel-depth overflow-hidden rounded-lg border border-border bg-surface"
          id="overview"
        >
          <div className="grid gap-6 p-5 md:p-8 xl:grid-cols-[minmax(0,1fr)_420px]">
            <div className="min-w-0 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="orange">Enterprise foundation</Badge>
                <Badge tone="accent">Next.js</Badge>
                <Badge tone="neutral">TypeScript</Badge>
                <Badge tone="success">ShadCN-ready</Badge>
              </div>
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-semibold uppercase text-primary">AceCloudCert platform rebuild</p>
                <h1 className={typography.display}>Premium cloud certification SaaS foundation</h1>
                <p className="text-base leading-7 text-muted-foreground md:text-lg">
                  A scalable interface layer for AceCloudCert: official brand tokens, responsive app shell, enterprise
                  navigation, and reusable primitives ready for certification workflows in the next phase.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="#system" size="lg">
                  Architecture
                </ButtonLink>
                <ButtonLink href="#components" size="lg" variant="secondary">
                  Component system
                </ButtonLink>
                <ButtonLink href="#navigation" size="lg" variant="outline">
                  Navigation
                </ButtonLink>
              </div>
            </div>
            <div className="rounded-lg border border-border bg-background/70 p-4">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Foundation command center</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Reusable systems before product logic.</p>
                </div>
                <Badge tone="accent">Phase 1</Badge>
              </div>
              <div className="grid gap-3 pt-4">
                {[
                  ["Theme", "Official color tokens and typography scale"],
                  ["Shell", "Collapsible desktop sidebar and mobile bottom nav"],
                  ["Primitives", "Button, Card, Input, Select, Modal, Tabs, Table"],
                  ["States", "Empty, loading, progress, toast, hover, focus"]
                ].map(([label, description]) => (
                  <div className="flex items-start gap-3 rounded-md border border-border bg-surface p-3" key={label}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{label}</p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 md:grid-cols-3" aria-label="Foundation metrics">
          <StatCard
            delta="12 primitives"
            helper="Reusable UI controls with consistent states."
            icon={Boxes}
            label="Design system"
            tone="orange"
            value="Ready"
          />
          <StatCard
            delta="3 layouts"
            helper="App, dashboard, and auth layout contracts."
            icon={LayoutDashboard}
            label="Layout system"
            tone="accent"
            value="Stable"
          />
          <StatCard
            delta="All breakpoints"
            helper="Desktop sidebar and mobile bottom navigation."
            icon={Smartphone}
            label="Responsive UX"
            tone="success"
            value="Covered"
          />
        </section>

        <DashboardLayout
          aside={
            <>
              <ProgressCard
                description="The platform foundation is scoped to systems, not certification business logic."
                icon={ShieldCheck}
                progress={94}
                steps={[
                  "Official brand palette implemented",
                  "Responsive shell composed",
                  "Reusable primitives exported",
                  "Product routes reserved for later phases"
                ]}
                title="Foundation readiness"
              />
              <ActivityCard
                description="System work completed in this rebuild phase."
                items={activityItems}
                title="Implementation log"
              />
              <Toast title="Enterprise boundary" tone="info">
                This build intentionally avoids mock business features while still providing production-grade surfaces.
              </Toast>
            </>
          }
        >
          <section className="space-y-5" id="system">
            <Card>
              <CardHeader>
                <CardTitle>Architecture</CardTitle>
                <CardDescription>
                  A Next.js App Router foundation with tokenized styling, reusable components, and layout boundaries.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    icon: CloudCog,
                    label: "Theme architecture",
                    text: "Official AceCloudCert colors live in Tailwind tokens and a typed brand export."
                  },
                  {
                    icon: Layers3,
                    label: "Layout architecture",
                    text: "AppShell, DashboardLayout, PageContainer, and AuthLayout define repeatable page structure."
                  },
                  {
                    icon: Compass,
                    label: "Navigation architecture",
                    text: "Desktop, mobile, and top-nav controls are generated from shared navigation definitions."
                  },
                  {
                    icon: LockKeyhole,
                    label: "Feature boundary",
                    text: "Authentication and learning workflows are represented as surfaces, not implemented business logic."
                  }
                ].map(({ icon: Icon, label, text }) => (
                  <div className="rounded-md border border-border bg-background/45 p-4" key={label}>
                    <Icon className="h-5 w-5 text-primary" />
                    <p className="mt-3 text-sm font-semibold text-foreground">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Color System</CardTitle>
                <CardDescription>
                  The official AceCloudCert palette is applied as the single source for surfaces, states, and accents.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {colorTokens.map(([name, value]) => (
                  <div className="rounded-md border border-border bg-background/45 p-3" key={name}>
                    <div
                      className="h-12 rounded-md border border-white/10"
                      style={{
                        backgroundColor: value
                      }}
                    />
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <p className="truncate text-sm font-semibold text-foreground">{name}</p>
                      <code className="text-xs text-muted-foreground">{value}</code>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5" id="components">
            <Card>
              <CardHeader>
                <CardTitle>Component System</CardTitle>
                <CardDescription>
                  Enterprise primitives built with predictable spacing, accessible focus states, and dark SaaS polish.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex flex-wrap gap-3">
                  <Button>Primary action</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button aria-label="Polished interaction specimen" size="icon" variant="ghost">
                    <Sparkles className="h-4 w-4" />
                  </Button>
                  <Modal
                    description="Modal content inherits the foundation token system and Radix accessibility behavior."
                    title="Foundation modal"
                    triggerLabel="Open modal"
                  >
                    <p className="text-sm leading-6 text-muted-foreground">
                      This overlay is ready for future account, exam, and certificate flows without changing the visual
                      language.
                    </p>
                  </Modal>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  <Input aria-label="Example search input" placeholder="Search cloud providers, exams, or UI surfaces" />
                  <Select
                    aria-label="Example provider select"
                    defaultValue="aws"
                    options={[
                      { label: "AWS foundation surface", value: "aws" },
                      { label: "Azure foundation surface", value: "azure" },
                      { label: "Google Cloud foundation surface", value: "gcp" }
                    ]}
                  />
                </div>
                <Tabs
                  defaultValue="controls"
                  items={[
                    {
                      content: (
                        <div className="rounded-md border border-border bg-background/45 p-4 text-sm leading-6 text-muted-foreground">
                          Buttons, inputs, selects, dropdowns, tooltips, modals, badges, progress, tables, empty states,
                          skeletons, and toasts are exported from the UI layer.
                        </div>
                      ),
                      label: "Controls",
                      value: "controls"
                    },
                    {
                      content: (
                        <div className="grid gap-3 rounded-md border border-border bg-background/45 p-4 sm:grid-cols-2">
                          <SkeletonLoader className="h-16" />
                          <EmptyState
                            description="Empty states are concise, calm, and prepared for real product copy."
                            icon={Table2}
                            title="No records for this surface"
                          />
                        </div>
                      ),
                      label: "States",
                      value: "states"
                    }
                  ]}
                />
                <div className="overflow-x-auto rounded-md border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Component</TableHead>
                        <TableHead>Foundation Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {componentRows.map(([component, role]) => (
                        <TableRow key={component}>
                          <TableCell className="font-semibold">{component}</TableCell>
                          <TableCell className="text-muted-foreground">{role}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5" id="typography">
            <Card>
              <CardHeader>
                <CardTitle>Typography Scale</CardTitle>
                <CardDescription>
                  Geist typography with restrained hierarchy inspired by Linear, Vercel, and Stripe product surfaces.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  ["Display", typography.display, "Prepare smarter. Practice better. Certify with confidence."],
                  ["H1", typography.h1, "Certification workspace foundation"],
                  ["H2", typography.h2, "Cloud learning surface"],
                  ["H3", typography.h3, "Reusable component contract"],
                  ["Body", typography.body, "Readable product copy with generous line height and no decorative excess."],
                  ["Muted", typography.muted, "Secondary context stays quiet without losing contrast."]
                ].map(([name, className, sample]) => (
                  <div className="rounded-md border border-border bg-background/45 p-4" key={name}>
                    <p className="text-xs font-semibold uppercase text-primary">{name}</p>
                    <p className={className}>{sample}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5" id="navigation">
            <Card>
              <CardHeader>
                <CardTitle>Navigation System</CardTitle>
                <CardDescription>
                  Desktop, mobile, and top-level navigation share one product-aware structure with route-safe anchors.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                {[
                  {
                    icon: PanelLeftClose,
                    label: "Desktop sidebar",
                    text: "Collapsible rail for enterprise workspaces and high-frequency navigation."
                  },
                  {
                    icon: Search,
                    label: "Top navbar",
                    text: "Search placeholder, current certification selector, notifications, and profile menu."
                  },
                  {
                    icon: Smartphone,
                    label: "Mobile bottom nav",
                    text: "Thumb-friendly bottom navigation with compact labels and consistent touch targets."
                  }
                ].map(({ icon: Icon, label, text }) => (
                  <div className="rounded-md border border-border bg-background/45 p-4" key={label}>
                    <Icon className="h-5 w-5 text-accent" />
                    <p className="mt-3 text-sm font-semibold text-foreground">{label}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>

          <section className="space-y-5" id="quality">
            <AnalyticsCard
              data={analyticsData}
              description="Coverage map for the UI systems created in this phase."
              metric="94%"
              title="Foundation quality map"
            />
          </section>
        </DashboardLayout>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4" aria-label="Reserved product surfaces">
          <div id="analytics">
            <QuickActionCard
              description="Prepared for future cohort, exam, and learning analytics without adding feature logic now."
              href="#quality"
              icon={Gauge}
              label="Analytics surface"
              tone="accent"
            />
          </div>
          <div id="learning">
            <QuickActionCard
              description="Reserved for provider tracks, lessons, knowledge base, and practice modules."
              href="#components"
              icon={TerminalSquare}
              label="Learning surface"
              tone="orange"
            />
          </div>
          <div id="certificates">
            <QuickActionCard
              description="Reserved for certificate issuance, verification states, and learner achievements."
              href="#system"
              icon={FileCheck2}
              label="Certificates surface"
              tone="success"
            />
          </div>
          <div id="settings">
            <QuickActionCard
              description="Reserved for profile, workspace preferences, plan controls, and security settings."
              href="#navigation"
              icon={UserRound}
              label="Settings surface"
              tone="accent"
            />
          </div>
        </section>
      </PageContainer>
    </AppShell>
  );
}
