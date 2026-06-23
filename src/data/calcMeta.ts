// Metadata VISUAL de cada calculadora: ícono + categoría granular.
// Se mantiene separado de calculadoras.ts para NO tocar la lógica de cálculo.
// La clave es el id de la calculadora (F1, V3, M7, E2, ...).

import type { LucideIcon } from 'lucide-react'
import {
  TrendingUp,
  Tag,
  Layers,
  PieChart,
  Scale,
  Target,
  ArrowRightLeft,
  ShieldCheck,
  Rocket,
  CalendarDays,
  Banknote,
  AlertCircle,
  FileText,
  UserPlus,
  RefreshCw,
  Receipt,
  Repeat,
  HandCoins,
  LineChart,
  Tags,
  ArrowUpRight,
  Megaphone,
  Coins,
  Gauge,
  Wallet,
  Filter,
  Users,
  Briefcase,
  Clock,
  Activity,
} from 'lucide-react'

export interface CalcMeta {
  Icon: LucideIcon
  categoria: string
}

export const CALC_META: Record<string, CalcMeta> = {
  // ---- Finanzas ----
  F1: { Icon: TrendingUp, categoria: 'Rentabilidad' },
  F2: { Icon: PieChart, categoria: 'Rentabilidad' },
  F3: { Icon: Tag, categoria: 'Pricing' },
  F4: { Icon: Layers, categoria: 'Rentabilidad' },
  F5: { Icon: Layers, categoria: 'Rentabilidad' },
  F6: { Icon: Scale, categoria: 'Punto de equilibrio' },
  F7: { Icon: Target, categoria: 'Proyecciones' },
  F8: { Icon: ArrowRightLeft, categoria: 'Proyecciones' },
  F9: { Icon: ShieldCheck, categoria: 'Rentabilidad' },
  F10: { Icon: Rocket, categoria: 'Crecimiento' },
  F11: { Icon: CalendarDays, categoria: 'Costos' },
  F12: { Icon: Banknote, categoria: 'Caja' },
  F13: { Icon: AlertCircle, categoria: 'Caja' },
  F14: { Icon: FileText, categoria: 'Rentabilidad' },
  F15: { Icon: UserPlus, categoria: 'Equipo' },
  F16: { Icon: RefreshCw, categoria: 'Costos' },

  // ---- Ventas ----
  V1: { Icon: Receipt, categoria: 'Ventas' },
  V2: { Icon: Target, categoria: 'Ventas' },
  V3: { Icon: Repeat, categoria: 'Ventas' },
  V4: { Icon: HandCoins, categoria: 'Crecimiento' },
  V5: { Icon: LineChart, categoria: 'Proyecciones' },
  V6: { Icon: ArrowUpRight, categoria: 'Pricing' },
  V7: { Icon: Rocket, categoria: 'Crecimiento' },
  V8: { Icon: Tags, categoria: 'Pricing' },
  V9: { Icon: TrendingUp, categoria: 'Ventas' },
  V10: { Icon: Target, categoria: 'Ventas' },

  // ---- Marketing ----
  M1: { Icon: Megaphone, categoria: 'Adquisición' },
  M2: { Icon: Wallet, categoria: 'Adquisición' },
  M3: { Icon: Coins, categoria: 'Adquisición' },
  M4: { Icon: Filter, categoria: 'Adquisición' },
  M5: { Icon: PieChart, categoria: 'Adquisición' },
  M6: { Icon: Wallet, categoria: 'Adquisición' },
  M7: { Icon: Filter, categoria: 'Adquisición' },
  M8: { Icon: LineChart, categoria: 'Proyecciones' },
  M9: { Icon: Gauge, categoria: 'Adquisición' },

  // ---- Equipo ----
  E1: { Icon: Briefcase, categoria: 'Equipo' },
  E2: { Icon: Users, categoria: 'Equipo' },
  E3: { Icon: UserPlus, categoria: 'Equipo' },
  E4: { Icon: HandCoins, categoria: 'Equipo' },
  E5: { Icon: Activity, categoria: 'Equipo' },
  E6: { Icon: Clock, categoria: 'Equipo' },
  E7: { Icon: Megaphone, categoria: 'Equipo' },
}

// Ícono por defecto si faltara alguno
export const DEFAULT_ICON: LucideIcon = Activity
