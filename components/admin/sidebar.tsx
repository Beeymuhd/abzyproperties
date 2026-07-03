'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Building2,
  MessageSquare,
  Star,
  Users,
  Settings,
  FileText,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { href: '/admin', icon: Home, label: 'Dashboard', exact: true },
  { href: '/admin/properties', icon: Building2, label: 'Properties' },
  { href: '/admin/inquiries', icon: MessageSquare, label: 'Inquiries' },
  { href: '/admin/ceo-section', icon: FileText, label: 'CEO Section' },
  { href: '/admin/users', icon: Users, label: 'Users' },
  { href: '/admin/testimonials', icon: Star, label: 'Testimonials' },
  { href: '/admin/settings', icon: Settings, label: 'Settings' },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-64 border-r border-border bg-card shadow-xl transition-transform duration-300 lg:static lg:translate-x-0 lg:shadow-none',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">

          {/* Header */}
          <div className="flex items-center justify-between border-b p-6">

            <div>
              <h2 className="text-lg font-bold">
                Admin Panel
              </h2>

              <p className="text-xs text-muted-foreground">
                Abzy Properties
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-md p-2 hover:bg-muted lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>

          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2 p-4">

            {menuItems.map((item) => {
              const Icon = item.icon

              const active = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors',
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}

          </nav>

        </div>
      </aside>
    </>
  )
}