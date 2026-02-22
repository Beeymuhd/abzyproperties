'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getSession, isAuthenticated } from '@/lib/auth'
import { Heart, MapPin, Home, Calendar, Settings } from 'lucide-react'
import Link from 'next/link'

export default function UserDashboard() {
  const router = useRouter()
  const [session, setSession] = useState(getSession())
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (!isAuthenticated()) {
      router.push('/auth/login')
    }
  }, [router])

  if (!mounted || !session) {
    return null
  }

  const savedListings = [
    {
      id: 1,
      title: 'Modern Duplex in Abuja',
      location: 'Lekki',
      price: '₦45,000,000',
    },
    {
      id: 2,
      title: 'Premium Office Space',
      location: 'Victoria Island',
      price: '₦120,000,000',
    },
  ]

  const inquiries = [
    {
      id: 1,
      property: 'Modern Duplex in Abuja',
      status: 'pending',
      date: '2 hours ago',
    },
    {
      id: 2,
      property: 'Premium Office Space',
      status: 'responded',
      date: '1 day ago',
    },
  ]

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-bold">Welcome back, {session.email}!</h1>
          <p className="text-lg text-muted-foreground">
            Manage your saved properties, inquiries, and inspections
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Saved Listings</p>
                <p className="text-3xl font-bold">{savedListings.length}</p>
              </div>
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Active Inquiries</p>
                <p className="text-3xl font-bold">{inquiries.length}</p>
              </div>
              <Home className="w-8 h-8 text-primary" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Scheduled Inspections</p>
                <p className="text-3xl font-bold">1</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Saved Listings */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Saved Listings</h2>
                <Link href="/properties">
                  <Button variant="outline">Browse More</Button>
                </Link>
              </div>

              {savedListings.length === 0 ? (
                <Card className="p-12 text-center">
                  <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    No saved listings yet
                  </p>
                  <Link href="/properties">
                    <Button>Start Browsing Properties</Button>
                  </Link>
                </Card>
              ) : (
                <div className="space-y-3">
                  {savedListings.map((listing) => (
                    <Card
                      key={listing.id}
                      className="p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <h3 className="font-bold">{listing.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {listing.location}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="font-bold text-primary">
                            {listing.price}
                          </p>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Active Inquiries */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Inquiries</h2>

              {inquiries.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No inquiries yet</p>
                </Card>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inquiry) => (
                    <Card
                      key={inquiry.id}
                      className="p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-2 flex-1">
                          <h3 className="font-bold">{inquiry.property}</h3>
                          <p className="text-xs text-muted-foreground">
                            {inquiry.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded ${
                              inquiry.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-green-100 text-green-800'
                            }`}
                          >
                            {inquiry.status === 'pending'
                              ? 'Pending'
                              : 'Responded'}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Info */}
            <Card className="p-6">
              <div className="space-y-4">
                <h3 className="font-bold">Account Information</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{session.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Account Type</p>
                    <p className="font-medium capitalize">{session.role}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </Button>
              </div>
            </Card>

            {/* Quick Links */}
            <Card className="p-6">
              <div className="space-y-3">
                <h3 className="font-bold">Quick Links</h3>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Heart className="w-4 h-4 mr-2" />
                  My Saved Listings
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Home className="w-4 h-4 mr-2" />
                  Browse Properties
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Calendar className="w-4 h-4 mr-2" />
                  My Inspections
                </Button>
              </div>
            </Card>

            {/* Help */}
            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="space-y-3">
                <h3 className="font-bold">Need Help?</h3>
                <p className="text-sm text-muted-foreground">
                  Have questions about properties? Contact our support team.
                </p>
                <Button className="w-full">Contact Support</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
