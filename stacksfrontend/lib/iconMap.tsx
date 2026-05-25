import React from "react";
import {
  Zap,
  CheckCircle,
  Coins,
  TrendingUp,
  Wallet,
  Trophy,
  Medal,
  Unlock,
  Palette,
  Rocket,
  Building2,
  Gem,
  Flame,
  Sprout,
  Star,
  Crown,
  FileText,
  Clock,
  Users,
  Target,
  Bell,
  Settings,
  Shield,
  Gauge,
  LucideIcon,
  ChevronRight,
  BarChart3,
  AlertCircle,
  GitBranch,
  Link,
  Leaf,
  MessageCircle,
  Gamepad2,
  Grid3X3,
  Clipboard,
  Lock,
} from "lucide-react";

export const iconMap: Record<string, LucideIcon> = {
  zap: Zap,
  "check-circle": CheckCircle,
  coins: Coins,
  "trending-up": TrendingUp,
  wallet: Wallet,
  trophy: Trophy,
  medal: Medal,
  unlock: Unlock,
  palette: Palette,
  rocket: Rocket,
  "building-2": Building2,
  gem: Gem,
  flame: Flame,
  sprout: Sprout,
  star: Star,
  crown: Crown,
  "file-text": FileText,
  clock: Clock,
  users: Users,
  target: Target,
  bell: Bell,
  settings: Settings,
  shield: Shield,
  gauge: Gauge,
  "chevron-right": ChevronRight,
  "bar-chart-3": BarChart3,
  "alert-circle": AlertCircle,
  github: GitBranch,
  link: Link,
  leaf: Leaf,
  "message-circle": MessageCircle,
  "gamepad-2": Gamepad2,
  "grid-3x3": Grid3X3,
  clipboard: Clipboard,
  lock: Lock,
};

export function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName] || Zap;
}

export function renderIcon(
  iconName: string,
  className = "w-4 h-4"
): React.ReactNode {
  const Icon = getIcon(iconName);
  return <Icon className={className} />;
}
