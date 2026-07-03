'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import {
  getSession,
  isAuthenticated,
  clearSession,
} from '@/lib/auth'

import {
  User,
  Shield,
  MessageCircle,
} from 'lucide-react'

import { toast } from 'sonner'

export default function AccountSettingsPage() {
  const [session, setSession] = useState<any>(null)

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
  })

  const [password, setPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    setSession(getSession())
  }, [])

  useEffect(() => {
    if (session?.user_id) {
      fetchProfile()
    }
  }, [session])

  const fetchProfile = async () => {
    try {
      const response = await fetch(
        `/api/account/profile?userId=${session.user_id}`
      )

      const data = await response.json()

      setProfile({
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const saveProfile = async () => {
    setSaving(true)

    try {
      const response = await fetch('/api/account/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session.user_id,
          name: profile.name,
          phone: profile.phone,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error)
        return
      }

      toast.success('Profile updated successfully')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const updatePassword = async () => {
    if (
      !password.currentPassword ||
      !password.newPassword ||
      !password.confirmPassword
    ) {
      toast.error('Fill all password fields')
      return
    }

    if (password.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    if (password.newPassword !== password.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    try {
      const response = await fetch('/api/account/password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session.user_id,
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        toast.error(result.error)
        return
      }

      toast.success('Password updated successfully')

      setPassword({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    } catch {
      toast.error('Failed to update password')
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          Loading...
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
           <div className="mb-6">
  <Link href="/dashboard">
    <Button
      variant="ghost"
      className="px-0 hover:bg-transparent"
    >
      ← Back to Dashboard
    </Button>
  </Link>
</div>



        {/* Hero */}

        <Card className="rounded-2xl border bg-gradient-to-r from-primary/5 via-background to-background shadow-sm">

          <div className="p-10 lg:p-12">

            <p className="text-sm text-muted-foreground mb-3">
              Account Center
            </p>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Account Settings
            </h1>

            <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
              Update your personal information and keep your
              account secure with a strong password.
            </p>

          </div>

        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 mt-12">

          {/* Right Content */}

          <div className="space-y-8">

            {/* Personal Information */}

            <Card className="rounded-2xl shadow-sm">

              <div className="p-8 space-y-8">

                <div className="space-y-2">

      <div className="flex items-center gap-3">

        <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center">
          <User className="h-5 w-5 text-primary" />
        </div>

                    <div>

                      <h2 className="text-2xl font-semibold">
                        Personal Information
                      </h2>

                      <p className="text-muted-foreground">
                        Update your personal account details.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="space-y-6">

                  <div className="space-y-2">

                    <Label>Name</Label>

                    <Input
                      className="h-11"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          name: e.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="space-y-2">

                    <Label>Phone Number</Label>

                    <Input
                      className="h-11"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile({
                          ...profile,
                          phone: e.target.value,
                        })
                      }
                    />

                  </div>

                  <div className="space-y-2">

                    <Label>Email Address</Label>

                    <Input
                      disabled
                      className="h-11 bg-muted cursor-not-allowed"
                      value={profile.email}
                    />

                    <p className="text-xs text-muted-foreground">
                      Your email address cannot be changed.
                    </p>

                  </div>

                </div>

                <div className="pt-2">

                  <Button
                    size="lg"
                    onClick={saveProfile}
                    disabled={saving}
                  >
                    {saving
                      ? 'Saving...'
                      : 'Save Changes'}
                  </Button>

                </div>

              </div>

            </Card>

            {/* Password Section */}

          <Card className="rounded-2xl shadow-sm">

  <div className="p-8 space-y-8">

    {/* Header */}

    <div className="space-y-2">

      <div className="flex items-center gap-3">

        <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center">
          <Shield className="h-5 w-5 text-primary" />
        </div>

        <div>

          <h2 className="text-2xl font-semibold">
            Security
          </h2>

          <p className="text-muted-foreground">
            Update your password to keep your account protected.
          </p>

        </div>

      </div>

    </div>

    {/* Form */}

    <div className="space-y-6">

      <div className="space-y-2">

        <Label>Current Password</Label>

        <Input
          type="password"
          className="h-11"
          value={password.currentPassword}
          onChange={(e) =>
            setPassword({
              ...password,
              currentPassword: e.target.value,
            })
          }
        />

      </div>

      <div className="space-y-2">

        <Label>New Password</Label>

        <Input
          type="password"
          className="h-11"
          value={password.newPassword}
          onChange={(e) =>
            setPassword({
              ...password,
              newPassword: e.target.value,
            })
          }
        />

        <p className="text-xs text-muted-foreground">
          Use at least 8 characters with a mix of letters, numbers and symbols.
        </p>

      </div>

      <div className="space-y-2">

        <Label>Confirm New Password</Label>

        <Input
          type="password"
          className="h-11"
          value={password.confirmPassword}
          onChange={(e) =>
            setPassword({
              ...password,
              confirmPassword: e.target.value,
            })
          }
        />

      </div>

    </div>

    {/* Action */}

    <div className="pt-2">

      <Button
        size="lg"
        className="h-11"
        onClick={updatePassword}
      >
        Update Password
      </Button>

    </div>

  </div>

</Card>

{/* Danger Zone */}

<Card className="rounded-2xl border-red-200 bg-red-50/40 shadow-sm">

  <div className="p-8">

<div className="flex items-center justify-between gap-8">
      <div className="space-y-3">

  <h2 className="text-2xl font-semibold text-red-600">
    Danger Zone
  </h2>

  <p className="text-muted-foreground leading-7 max-w-xl">
    Permanently delete your account and all associated data.
    This includes your saved properties, inquiries and profile.
    This action cannot be undone.
  </p>

</div>

      <Button
        variant="destructive"
        size="lg"
        onClick={async () => {
          const confirmed = window.confirm(
            'Are you sure you want to permanently delete your account? This action cannot be undone.'
          )

          if (!confirmed) return

          try {
            const response = await fetch('/api/account/delete', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: session.user_id,
  }),
})

const result = await response.json()

if (!response.ok) {
  toast.error(result.error)
  return
}

clearSession()

toast.success('Account deleted successfully.')

window.location.href = '/'

          } catch (error) {
            console.error(error)
            toast.error('Failed to delete account.')
          }
        }}
      >
        Delete Account
      </Button>

    </div>

  </div>

</Card>

</div>

</div>

</div>

</>
)
}