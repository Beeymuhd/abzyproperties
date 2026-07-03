'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import { getSession, isAuthenticated } from '@/lib/auth'

import {
  Heart,
  Home,
  MapPin,
  MessageSquare,
  Settings,
  ArrowRight,
} from 'lucide-react'

export default function UserDashboard() {
  const router = useRouter()

  const [mounted, setMounted] = useState(false)
  const [session, setSession] = useState(getSession())

  const [savedProperties, setSavedProperties] = useState<any[]>([])
  const [inquiries, setInquiries] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)

    if (!isAuthenticated()) {
      router.push('/auth/login')
      return
    }

    loadDashboard()
  }, [router])

  const loadDashboard = async () => {
    const currentSession = getSession()

    if (!currentSession) return

    setSession(currentSession)

    try {
      const savedResponse = await fetch(
        `/api/saved-properties?userId=${currentSession.user_id}`
      )

      const savedData = await savedResponse.json()

      setSavedProperties(Array.isArray(savedData) ? savedData : [])

      const inquiryResponse = await fetch(
        `/api/inquiries/user?userId=${currentSession.user_id}`
      )

      const inquiryData = await inquiryResponse.json()

      setInquiries(Array.isArray(inquiryData) ? inquiryData : [])
    } catch (error) {
      console.error(error)
    }
  }

  if (!mounted || !session) return null

  return (
    <>
      <Navbar />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* Hero */}

          <section className="py-12">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <div className="space-y-6">

                <div className="space-y-2">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                    Dashboard
                  </p>

                  <h1 className="text-5xl font-bold">
                    Welcome back,
                    <span className="block">
                      {session.name || session.username}
                    </span>
                  </h1>

                  <p className="text-xl text-muted-foreground max-w-2xl">
                    Manage your saved properties, monitor your inquiries,
                    and keep your account information up to date from one
                    organized dashboard.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/properties">
                    <Button size="lg">
                      Browse Properties
                    </Button>
                  </Link>

                  <Link href="/dashboard/account">
                    <Button
                      size="lg"
                      variant="outline"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Account Settings
                    </Button>
                  </Link>
                </div>

              </div>
            </Card>
          </section>

          {/* Stats */}

          <section className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <Card className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">
                      Saved Listings
                    </p>

                    <h2 className="text-4xl font-bold">
                      {savedProperties.length}
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-primary" />
                  </div>

                </div>
              </Card>

              <Card className="p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">

                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground uppercase tracking-wide">
                      Inquiries
                    </p>

                    <h2 className="text-4xl font-bold">
                      {inquiries.length}
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>

                </div>
              </Card>

            </div>
          </section>

          {/* Main Content */}

          <section className="py-12">
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] gap-12">

              {/* Left Content */}

              <div className="space-y-12"> 
                {/* ===========================
    Saved Listings
=========================== */}

<section className="py-12 space-y-8">

  <div className="space-y-2">

    <h2 className="text-4xl font-bold">
      Saved Listings
    </h2>

    <p className="text-lg text-muted-foreground max-w-2xl">
      Easily revisit every property you've saved and continue your
      search whenever you're ready.
    </p>

  </div>

  {savedProperties.length === 0 ? (

    <Card className="p-8">

      <div className="py-8 flex flex-col items-center text-center space-y-6">

        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">

          <Heart className="w-10 h-10 text-primary" />

        </div>

        <div className="space-y-2">

          <h3 className="text-2xl font-bold">
            Nothing saved yet
          </h3>

          <p className="text-muted-foreground max-w-lg">
            When you discover properties you love, save them here so
            they're always one click away.
          </p>

        </div>

        <Link href="/properties">

          <Button size="lg">
            Browse Properties
          </Button>

        </Link>

      </div>

    </Card>

  ) : (

    <div className="space-y-8">

      {savedProperties.map((listing) => (

        <Card
          key={listing.id}
          className="overflow-hidden hover:shadow-lg transition-shadow"
        >

          <div className="grid lg:grid-cols-[300px_1fr]">

            <div
              className="h-72 lg:h-full bg-muted"
              style={{
                backgroundImage: listing.image_url
                  ? `url(${listing.image_url})`
                  : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            <div className="p-8 flex flex-col justify-between">

              <div className="space-y-6">

                <div className="space-y-3">

                  <h3 className="text-2xl font-bold">
                    {listing.title}
                  </h3>

                  <div className="flex items-center gap-2 text-muted-foreground">

                    <MapPin className="w-5 h-5" />

                    <span>
                      {listing.location}
                    </span>

                  </div>

                </div>

                <p className="leading-7 text-muted-foreground line-clamp-3">
                  {listing.description}
                </p>

              </div>

              <div className="mt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">

                <div className="space-y-1">

                  <p className="text-sm text-muted-foreground">
                    Price
                  </p>

                  <h3 className="text-3xl font-bold text-primary">
                    ₦{Number(listing.price).toLocaleString()}
                  </h3>

                </div>

                <Link href={`/properties/${listing.id}`}>

                  <Button size="lg">
                    View Property
                  </Button>

                </Link>

              </div>

            </div>

          </div>

        </Card>

      ))}

    </div>

  )}

</section>

{/* ===========================
    Inquiries
=========================== */}

<section
  id="inquiries"
  className="py-12 space-y-8"
>

  <div className="space-y-2">

    <h2 className="text-4xl font-bold">
      Your Inquiries
    </h2>

    <p className="text-lg text-muted-foreground max-w-2xl">
      Track every enquiry you've sent and stay updated on responses
      from our team.
    </p>

  </div>

  {inquiries.length === 0 ? (

    <Card className="p-8">

      <div className="py-8 flex flex-col items-center text-center space-y-6">

        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">

          <MessageSquare className="w-10 h-10 text-primary" />

        </div>

        <div className="space-y-2">

          <h3 className="text-2xl font-bold">
            No inquiries yet
          </h3>

          <p className="text-muted-foreground max-w-lg">
            Once you contact us about a property, you'll be able to
            follow every conversation from here.
          </p>

        </div>

        <Link href="/properties">
          <Button size="lg">
            Browse Properties
          </Button>
        </Link>

      </div>

    </Card>

  ) : (

    <div className="space-y-6">

      {inquiries.map((inquiry) => (

        <Card
          key={inquiry.id}
          className="p-8 hover:shadow-lg transition-shadow"
        >

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div className="space-y-2">

              <h3 className="text-2xl font-bold">
                {inquiry.property_title}
              </h3>

              <p className="text-muted-foreground">
                Submitted on {inquiry.date}
              </p>

            </div>

            <span
              className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-semibold ${
                inquiry.status === 'pending'
                  ? 'bg-amber-100 text-amber-700'
                  : 'bg-green-100 text-green-700'
              }`}
            >
              {inquiry.status === 'pending'
                ? 'Pending'
                : 'Responded'}
            </span>

          </div>

        </Card>

      ))}

    </div>

  )}

</section>

              </div>

                            {/* ===========================
                  Sidebar
              =========================== */}

              <div className="xl:sticky xl:top-28 self-start space-y-6">

                {/* Profile */}

                <Card className="overflow-hidden">

                  <div className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-b">

                    <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-4xl font-bold">

                      {(session.name || session.username || 'U')
                        .charAt(0)
                        .toUpperCase()}

                    </div>

                    <div className="space-y-2 mt-6">

                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Account
                      </p>

                      <h3 className="text-2xl font-bold">
                        {session.name || session.username}
                      </h3>

                      <p className="text-muted-foreground break-all">
                        {session.email}
                      </p>

                    </div>

                  </div>

                  <div className="p-8">

                    <Link href="/dashboard/account">

                      <Button className="w-full" size="lg">

                        <Settings className="mr-2 h-4 w-4" />

                        Manage Account

                      </Button>

                    </Link>

                  </div>

                </Card>

                                {/* Quick Navigation */}

                <Card className="p-8">

                  <div className="space-y-2">

                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                      Dashboard
                    </p>

                    <h3 className="text-2xl font-bold">
                      Quick Navigation
                    </h3>

                    <p className="text-muted-foreground">
                      Access the most important areas of your account.
                    </p>

                  </div>

                  <div className="mt-8 space-y-3">

                    <Link href="/saved-properties">

                      <Button
                        variant="ghost"
                        className="w-full justify-between h-12"
                      >

                        <span className="flex items-center">

                          <Heart className="mr-3 h-5 w-5 text-primary" />

                          Saved Listings

                        </span>

                        <ArrowRight className="h-4 w-4" />

                      </Button>

                    </Link>

                    <Link href="/properties">

                      <Button
                        variant="ghost"
                        className="w-full justify-between h-12"
                      >

                        <span className="flex items-center">

                          <Home className="mr-3 h-5 w-5 text-primary" />

                          Browse Properties

                        </span>

                        <ArrowRight className="h-4 w-4" />

                      </Button>

                    </Link>

                    <Button
                      variant="ghost"
                      className="w-full justify-between h-12"
                      onClick={() =>
                        document
                          .getElementById('inquiries')
                          ?.scrollIntoView({
                            behavior: 'smooth',
                          })
                      }
                    >

                      <span className="flex items-center">

                        <MessageSquare className="mr-3 h-5 w-5 text-primary" />

                        My Inquiries

                      </span>

                      <ArrowRight className="h-4 w-4" />

                    </Button>

                  </div>

                </Card>

                                {/* Premium Support */}

                <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">

                  <div className="space-y-6">

                    <div className="space-y-2">

                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Premium Support
                      </p>

                      <h3 className="text-2xl font-bold">
                        Need help finding your next property?
                      </h3>

                      <p className="text-muted-foreground">
                        Our property consultants are available to answer your
                        questions, schedule inspections, recommend listings and
                        guide you through every step of your property journey.
                      </p>

                    </div>

                    <Button
                      size="lg"
                      className="w-full"
                      onClick={() =>
                        window.open(
                          'https://wa.me/2347061828549',
                          '_blank'
                        )
                      }
                    >
                      Chat on WhatsApp
                    </Button>

                  </div>

                </Card>

              </div>

            </div>

          </section>

        </div>

      </main>

    </>
  )
}