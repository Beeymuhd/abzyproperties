'use client'

import { useEffect, useMemo, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Mail,
  Phone,
  Calendar,
  Search,
} from 'lucide-react'

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([])
  const [search, setSearch] = useState('')
  

  async function fetchUsers() {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()

      setUsers(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = useMemo(() => {
  if (!search.trim()) return users

  const value = search.toLowerCase()

  return users.filter((user) =>
    user.name?.toLowerCase().includes(value) ||
    user.email?.toLowerCase().includes(value) ||
    user.phone?.toLowerCase().includes(value)
  )
}, [users, search])

  const activeUsers = users.filter(
    (u) => (u.status || 'active') === 'active'
  ).length

  const totalSaved = users.reduce(
    (sum, user) => sum + Number(user.saved_count || 0),
    0
  )

  return (
    <div className="flex-1 p-8 space-y-8">

      <div className="space-y-5">

        <div>
          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="text-muted-foreground">
            Manage registered users and monitor activity.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">

          <div className="relative flex-1">

            <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

            <Input
              className="pl-10"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

        </div>

      </div>

   {/* Stats */}

<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

  <Card className="p-6">
    <p className="text-sm text-muted-foreground">
      Total Users
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      {users.length}
    </h2>
  </Card>

 <Card className="p-6">
  <p className="text-sm text-muted-foreground">
    Active Users
  </p>

  <h2 className="mt-2 text-3xl font-bold">
  {users.length}
</h2>
</Card>

  <Card className="p-6">
    <p className="text-sm text-muted-foreground">
      Saved Properties
    </p>

    <h2 className="mt-2 text-3xl font-bold">
      {totalSaved}
    </h2>
  </Card>

</div>

{/* Users Table */}

<Card className="overflow-hidden">

  <div className="overflow-x-auto">

    <table className="w-full">

      <thead className="bg-muted/40">

        <tr className="border-b">

          <th className="px-6 py-4 text-left font-semibold">
            User
          </th>

          <th className="px-6 py-4 text-left font-semibold">
            Contact
          </th>

          <th className="px-6 py-4 text-left font-semibold">
            Joined
          </th>

          <th className="px-6 py-4 text-center font-semibold">
            Saved
          </th>

        </tr>

      </thead>

      <tbody>

        {filteredUsers.map((user) => {

          return (

     
  <tr
    key={user.id}
    className="border-b hover:bg-muted/30 transition-colors"
  >
    {/* User */}
    <td className="px-6 py-5">
      <div>
        <p className="font-semibold">
          {user.name}
        </p>
      </div>
    </td>

    {/* Contact */}
    <td className="px-6 py-5">
      <div className="space-y-2">

        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 text-primary" />
          {user.email}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Phone className="h-4 w-4" />
          {user.phone || ''}
        </div>

      </div>
    </td>

    {/* Joined */}
    <td className="px-6 py-5">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />

        {user.created_at
          ? new Date(user.created_at).toLocaleDateString()
          : ''}
      </div>
    </td>

    {/* Saved */}
    <td className="px-6 py-5 text-center font-semibold">
      {user.saved_count || 0}
    </td>

    
    

    
    

  </tr>

)
})}

      </tbody>

    </table>

  </div>

</Card>

</div>
)
}