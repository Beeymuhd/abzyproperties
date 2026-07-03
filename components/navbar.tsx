'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getSession, clearSession, isAdmin } from '@/lib/auth'
import { useState, useEffect } from 'react'

export function Navbar() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState(getSession())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    clearSession()
    setSession(null)
    router.push('/')
  }

  if (!mounted) return null

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl text-primary"
          >
            <span>Abzy Properties</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {!session && (
              <>
                <Button
                  variant="ghost"
                  onClick={() => router.push('/auth/login')}
                >
                  Login
                </Button>
                <Button onClick={() => router.push('/auth/signup')}>
                  Sign Up
                </Button>
              </>
            )}

            {session && (
              <>
                {isAdmin() && (
                  <Button
                    variant="ghost"
                    onClick={() => router.push('/admin')}
                    className="gap-2"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Button>
                )}

                {!isAdmin() && (
                  <Button
                    variant="ghost"
                    onClick={() => router.push('/dashboard')}
                  >
                    Dashboard
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </>
            )}

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {!session && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    router.push('/auth/login')
                    setIsOpen(false)
                  }}
                >
                  Login
                </Button>
                <Button
                  className="w-full justify-start"
                  onClick={() => {
                    router.push('/auth/signup')
                    setIsOpen(false)
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}

            {session && (
              <>
                {isAdmin() && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={() => {
                      router.push('/admin')
                      setIsOpen(false)
                    }}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin Dashboard
                  </Button>
                )}

                {!isAdmin() && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      router.push('/dashboard')
                      setIsOpen(false)
                    }}
                  >
                    Dashboard
                  </Button>
                )}

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
