import {
  Stethoscope,
  Syringe,
  Pill,
  PillBottle,
  Heart,
  HeartPulse,
  Hospital,
  Microscope,
  Dna,
  TestTube,
  Beaker,
  Bandage,
  Eye,
  Brain,
} from "lucide-react";

const ICON_RULES = [
  { re: /heart|cardio|cardiac|cardi/i, Icon: Heart },
  { re: /eye|vision|ophthalm|retina/i, Icon: Eye },
  { re: /lymphoma|cancer|tumor|oncolog/i, Icon: Dna },
  { re: /vaccine|immun|covid|injection|dose/i, Icon: Syringe },
  { re: /drug|medic|pill|tablet|pharm/i, Icon: Pill },
  { re: /lab|biomarker|patholog|molecul|histopath/i, Icon: Microscope },
  { re: /neuro|brain|cognitive|alzheimer/i, Icon: Brain },
];

interface ConditionIconProps {
  condition: string;
  size: number;
  className?: string;
}

export default function ConditionIcon({
  condition,
  size = 56,
  className = "text-destructive",
}: ConditionIconProps) {
  const c = (condition || "").toLowerCase();
  const rule = ICON_RULES.find((r) => r.re.test(c));
  const Icon = rule ? rule.Icon : Stethoscope;
  return <Icon size={size} className={className} strokeWidth={1.5} />;
}
