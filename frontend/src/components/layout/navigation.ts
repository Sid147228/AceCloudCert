import {
  BarChart3,
  BookOpen,
  Boxes,
  Braces,
  FileCheck2,
  Gauge,
  Home,
  Layers3,
  Settings,
  ShieldCheck,
  Sparkles
} from "lucide-react";

export const primaryNavItems = [
  { href: "#overview", icon: Home, label: "Overview" },
  { href: "#system", icon: Layers3, label: "System" },
  { href: "#components", icon: Boxes, label: "Components" },
  { href: "#navigation", icon: Gauge, label: "Navigation" },
  { href: "#quality", icon: ShieldCheck, label: "Quality" }
] as const;

export const platformNavItems = [
  { href: "#typography", icon: Braces, label: "Typography" },
  { href: "#analytics", icon: BarChart3, label: "Analytics" },
  { href: "#learning", icon: BookOpen, label: "Learning" },
  { href: "#certificates", icon: FileCheck2, label: "Certificates" },
  { href: "#settings", icon: Settings, label: "Settings" }
] as const;

export const mobileNavItems = [
  { href: "#overview", icon: Home, label: "Home" },
  { href: "#components", icon: Boxes, label: "UI" },
  { href: "#navigation", icon: Gauge, label: "Nav" },
  { href: "#quality", icon: Sparkles, label: "Quality" }
] as const;
