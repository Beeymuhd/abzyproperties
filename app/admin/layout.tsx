'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Menu } from 'lucide-react'

import { Navbar } from '@/components/navbar'
import { Sidebar } from '@/components/admin/sidebar'
import { isAdmin } from '@/lib/auth'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [authorized, setAuthorized] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setMounted(true)

    const admin = isAdmin()

    setAuthorized(admin)

    if (!admin) {
      router.push('/auth/login')
    }
  }, [router])

  if (!mounted || !authorized) {
    return null
  }

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen">

        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 overflow-x-hidden bg-background">

          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b bg-background p-4 lg:hidden">

            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-md border p-2 hover:bg-muted transition"
            >
              <Menu className="h-5 w-5" />
            </button>

            <h2 className="font-semibold">
              Admin Panel
            </h2>

            <div className="w-9" />

          </div>

          <div className="p-4 md:p-6 lg:p-8">
            {children}
          </div>

        </main>

      </div>
    </>
  )
}