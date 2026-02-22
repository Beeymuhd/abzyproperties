'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Phone, Calendar, MoreVertical, Search, Filter } from 'lucide-react'

const mockUsers = [
  {
    id: 1,
    name: 'Chioma Obi',
    email: 'chioma@example.com',
    phone: '+234 801 234 5678',
    joined: '2024-01-15',
    saved: 5,
    inquiries: 3,
    status: 'active',
  },
  {
    id: 2,
    name: 'Ibrahim Abubakar',
    email: 'ibrahim@example.com',
    phone: '+234 901 987 6543',
    joined: '2024-01-10',
    saved: 12,
    inquiries: 8,
    status: 'active',
  },
  {
    id: 3,
    name: 'Fiona Adeleke',
    email: 'fiona@example.com',
    phone: '+234 802 345 6789',
    joined: '2024-01-08',
    saved: 8,
    inquiries: 4,
    status: 'active',
  },
  {
    id: 4,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+234 903 456 7890',
    joined: '2023-12-28',
    saved: 3,
    inquiries: 1,
    status: 'inactive',
  },
]

export default function UsersPage() {
  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage registered users and monitor activity
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Users</p>
          <p className="text-3xl font-bold">{mockUsers.length}</p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Active Users</p>
          <p className="text-3xl font-bold">
            {mockUsers.filter((u) => u.status === 'active').length}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Inquiries</p>
          <p className="text-3xl font-bold">
            {mockUsers.reduce((sum, u) => sum + u.inquiries, 0)}
          </p>
        </Card>
        <Card className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Saved</p>
          <p className="text-3xl font-bold">
            {mockUsers.reduce((sum, u) => sum + u.saved, 0)}
          </p>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left font-semibold">Name</th>
                <th className="px-6 py-3 text-left font-semibold">Email</th>
                <th className="px-6 py-3 text-left font-semibold">Phone</th>
                <th className="px-6 py-3 text-left font-semibold">Joined</th>
                <th className="px-6 py-3 text-left font-semibold">Activity</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {user.phone}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(user.joined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-1">
                      <p>Saved: {user.saved}</p>
                      <p>Inquiries: {user.inquiries}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.status.charAt(0).toUpperCase() +
                        user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Button size="icon" variant="ghost">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
