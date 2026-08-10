import {
  Siren, HeartPulse, Brain, Bone, Stethoscope, Baby, Flower2, Sparkles, Ear,
  ClipboardPlus, Scan, TestTube, Pill, Smile, Activity, Droplets, ScanLine,
  Building2, HeartHandshake, ShieldCheck, Wallet, LayoutGrid, Database, Cpu,
  Image as ImageIcon, FlaskConical, CalendarCheck, Users, Clock3, type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Siren, HeartPulse, Brain, Bone, Stethoscope, Baby, Flower2, Sparkles, Ear,
  ClipboardPlus, Scan, TestTube, Pill, Smile, Activity, Droplets, ScanLine,
  Building2, HeartHandshake, ShieldCheck, Wallet, LayoutGrid, Database, Cpu,
  Image: ImageIcon, FlaskConical, CalendarCheck, Users, Clock3,
};

export const ICON_NAMES = Object.keys(ICONS);

export function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = ICONS[name] ?? Stethoscope;
  return <Cmp className={className} />;
}
