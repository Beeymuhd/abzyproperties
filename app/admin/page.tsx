'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Building2, MessageSquare, Users, BarChart3 } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {

  const [stats, setStats] = useState({
   properties: 0,
   users: 0,
   inquiries: 0,
 })

 const [recentActivities, setRecentActivities] = useState<any[]>([])

 const fetchDashboard = async () => {
  try {
    const response = await fetch('/api/dashboard')
    const data = await response.json()

    setStats({
      properties: data.properties,
      users: data.users,
      inquiries: data.inquiries,
    })

    setRecentActivities(data.recentActivities)
  } catch (error) {
    console.error(error)
  }
 }

 useEffect(() => {
  fetchDashboard()
 }, [])
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
        <Card className="p-6">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm text-muted-foreground">
        Total Properties
      </p>
      <p className="text-3xl font-bold">
        {stats.properties}
      </p>
    </div>
    <Building2 className="w-8 h-8 text-blue-500" />
  </div>
</Card>

<Card className="p-6">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm text-muted-foreground">
        Total Inquiries
      </p>
      <p className="text-3xl font-bold">
        {stats.inquiries}
      </p>
    </div>
    <MessageSquare className="w-8 h-8 text-amber-500" />
  </div>
</Card>

<Card className="p-6">
  <div className="flex items-start justify-between">
    <div>
      <p className="text-sm text-muted-foreground">
        Total Users
      </p>
      <p className="text-3xl font-bold">
        {stats.users}
      </p>
    </div>
    <Users className="w-8 h-8 text-green-500" />
  </div>
</Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Recent Activity</h2>
            </div>

            <div className="space-y-3">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                     Inquiry from {activity.name} about{' '}
                     {activity.property_title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                     {new Date(activity.created_at).toLocaleString()}
                    </p>
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
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
