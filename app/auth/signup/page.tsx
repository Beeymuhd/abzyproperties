'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { setSession } from '@/lib/auth'
import type { Session } from '@/lib/types'


export default function SignupPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email:'',
    password: '',
    confirmPassword: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
         name: formData.name,
         username: formData.username,
         email: formData.email,
         password: formData.password,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        toast.error(error.error || 'Signup failed')
        return
      }

      const session: Session = await response.json()
      setSession(session)

      toast.success('Account created successfully')

      router.push('/dashboard')
    } catch (error) {
      console.error(error)
      toast.error('An error occurred during signup')
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
            <h1 className="text-3xl font-bold">
              Create Account
            </h1>

            <p className="text-muted-foreground">
              Join Abzy Properties today
            </p>
          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name
              </Label>

              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-input/50 border-border/50 focus:border-primary transition"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">
                Username
              </Label>

              <Input
                id="username"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="bg-input/50 border-border/50 focus:border-primary transition"
              />
            </div>

            <div className="space-y-2">
             <Label htmlFor="email">
               Email Address
             </Label>

             <Input
               id="email"
               name="email"
               type="email"
               placeholder="you@example.com"
               value={formData.email}
               onChange={handleChange}
               required
               className="bg-input/50 border-border/50 focus:border-primary transition"
              />
           </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Password
              </Label>

              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-input/50 border-border/50 focus:border-primary transition"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                Confirm Password
              </Label>

              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="bg-input/50 border-border/50 focus:border-primary transition"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full mt-6"
            >
              {loading
                ? 'Creating account...'
                : 'Create Account'}
            </Button>
          </form>

          {/* Footer */}

          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-primary hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>

        </div>
      </Card>
    </div>
  )
}