import * as Lucide from 'lucide-react';
import { iconFromKey } from './contentFromSettings';

/**
 * Service icon keys from AdminIconSelect → Lucide components.
 * Keep in sync with `components/admin/ui/AdminIconSelect.jsx`.
 */
const SERVICE_ICON_MAP = {
  briefcase: Lucide.Briefcase,
  target: Lucide.Target,
  palette: Lucide.Palette,
  code: Lucide.Code2,
  settings: Lucide.Settings,
  users: Lucide.Users,
  zap: Lucide.Zap,
  star: Lucide.Star,
  heart: Lucide.Heart,
  shield: Lucide.Shield,
  globe: Lucide.Globe,
  truck: Lucide.Truck,
  clock: Lucide.Clock,
  award: Lucide.Award,
  camera: Lucide.Camera,
  chart: Lucide.BarChart2,
  mic: Lucide.Mic,
  book: Lucide.Book,
  coffee: Lucide.Coffee,
  scissors: Lucide.Scissors,
  wrench: Lucide.Wrench,
  tool: Lucide.Wrench,
  stethoscope: Lucide.Stethoscope,
  smile: Lucide.Smile,
  home: Lucide.Home,
  scale: Lucide.Scale,
  building: Lucide.Building2,
  calculator: Lucide.Calculator,
  sparkles: Lucide.Sparkles,
  layers: Lucide.Layers,
  // Legacy / seed keys
  'heart-pulse': Lucide.HeartPulse,
  baby: Lucide.Baby,
  bone: Lucide.Bone,
  microscope: Lucide.Microscope,
  ambulance: Lucide.Siren,
  eye: Lucide.Eye,
  droplet: Lucide.Droplet,
  droplets: Lucide.Droplets,
  spa: Lucide.Droplets,
  hair: Lucide.Scissors,
  compass: Lucide.Compass,
  'dollar-sign': Lucide.IndianRupee,
  dollar: Lucide.IndianRupee,
  rupee: Lucide.IndianRupee,
  'indian-rupee': Lucide.IndianRupee,
};

export function serviceIconFromKey(key) {
  if (!key || typeof key !== 'string') return Lucide.Briefcase;
  const normalized = key.trim().toLowerCase();
  return SERVICE_ICON_MAP[normalized] || iconFromKey(key) || Lucide.Briefcase;
}
