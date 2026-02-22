'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, MessageSquare, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'

const stats = [
  {
    label: 'Total Properties',
    value: '245',
    icon: Building2,
    href: '/admin/properties',
    color: 'text-blue-500',
  },
  {
    label: 'Pending Inquiries',
    value: '18',
    icon: MessageSquare,
    href: '/admin/inquiries',
    color: 'text-amber-500',
  },
  {
    label: 'Active Users',
    value: '1,234',
    icon: Users,
    href: '/admin/users',
    color: 'text-green-500',
  },
  {
    label: 'Monthly Views',
    value: '5,678',
    icon: BarChart3,
    href: '/admin/analytics',
    color: 'text-purple-500',
  },
]

const recentActivities = [
  {
    id: 1,
    type: 'listing',
    message: 'New property added: Modern Duplex in Lekki',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'inquiry',
    message: 'Inquiry received for Premium Office Space',
    time: '4 hours ago',
  },
  {
    id: 3,
    type: 'user',
    message: 'New user registration: Chioma O.',
    time: '6 hours ago',
  },
  {
    id: 4,
    type: 'inspection',
    message: 'Inspection scheduled for Banana Island Property',
    time: '1 day ago',
  },
]

export default function AdminDashboard() {
  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's your admin overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </Card>
            </Link>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Activity</h2>
              <Link href="/admin/analytics">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold">Quick Actions</h2>

            <div className="space-y-2">
              <Link href="/admin/properties">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  Add New Property
                </Button>
              </Link>
              <Link href="/admin/inquiries">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  View Inquiries
                </Button>
              </Link>
              <Link href="/admin/ceo-section">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  Edit CEO Info
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  View Analytics
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
