'use client'

import React from "react"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { setSession } from '@/lib/auth'
import type { Session } from '@/lib/types'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('admin@abzy.com')
  const [password, setPassword] = useState('admin123')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error || 'Login failed')
        return
      }

      const session: Session = await response.json()
      setSession(session)
      toast.success('Logged in successfully')

      if (session.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      toast.error('An error occurred during login')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md backdrop-blur-xl bg-background/80 border-border/50 p-8">
        <div className="space-y-8">
          {/* Header */}
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your Abzy Properties account
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-sm">
            <p className="font-semibold text-accent mb-2">Demo Credentials:</p>
            <p className="text-muted-foreground">
              <strong>Admin:</strong> admin@abzy.com / admin123
            </p>
            <p className="text-muted-foreground">
              <strong>User:</strong> demo@example.com / demo123
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input/50 border-border/50 focus:border-primary transition"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-input/50 border-border/50 focus:border-primary transition"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
