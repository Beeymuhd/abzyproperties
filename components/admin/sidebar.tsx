'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Building2,
  MessageSquare,
  BarChart3,
  Users,
  Settings,
  FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/admin', icon: Home, label: 'Dashboard', exact: true },
  { href: '/admin/properties', icon: Building2, label: 'Properties' },
  { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { href: '/admin/ceo-section', icon: FileText, label: 'CEO Section' },
  { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card/50 backdrop-blur">
      <div className="p-6 space-y-8">
        <div>
          <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Abzy Properties</p>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}
