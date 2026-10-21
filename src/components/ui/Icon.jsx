// Icons available to the content files (services.js, about.js).
// To add one: find it on https://lucide.dev/icons, add it to the import and to the list below.
import {
  BrainCircuit,
  CircuitBoard,
  CodeXml,
  Cpu,
  Cloud,
  Bot,
  Eye,
  Gauge,
  Globe,
  Handshake,
  Layers,
  Lightbulb,
  Microchip,
  Radio,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Wifi,
  Wrench,
  Zap,
} from 'lucide-react'

const icons = {
  BrainCircuit,
  CircuitBoard,
  CodeXml,
  Cpu,
  Cloud,
  Bot,
  Eye,
  Gauge,
  Globe,
  Handshake,
  Layers,
  Lightbulb,
  Microchip,
  Radio,
  Rocket,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Target,
  Users,
  Wifi,
  Wrench,
  Zap,
}

export default function Icon({ name, ...props }) {
  const Component = icons[name] || Sparkles
  return <Component strokeWidth={1.6} {...props} />
}
