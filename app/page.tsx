import { supabaseAdmin } from '@/lib/supabase-admin'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import { FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa'
import {
  MapPin,
  Zap,
  Shield,
  MessageSquare,
  TrendingUp,
  Users,
  Search,
  Award,
} from 'lucide-react'

export const metadata = {
  title: 'Abzy Properties | Buy & Sell Real Estate in Nigeria',
  description:
    'Find verified houses and lands properties across Nigeria.',
}

export default async function HomePage() {
  const { data: featuredListings } = await supabaseAdmin
  .from('properties')
  .select('*')
  .eq('verified', true)
  .eq('status', 'active')
  .order('created_at', { ascending: false })
  .limit(4)

const { data: testimonials } = await supabaseAdmin
  .from('testimonials')
  .select('*')
  .eq('approved', true)
  .order('created_at', { ascending: false })
  .limit(3)

  const { data: ceos } = await supabaseAdmin
  .from('ceo_info')
  .select('ceo_name')
  .order('order_number', { ascending: true })

  const { count: propertiesCount } = await supabaseAdmin
  .from('properties')
  .select('*', { count: 'exact', head: true })
  .eq('verified', true)
  .eq('status', 'active')

const { count: verifiedCount } = await supabaseAdmin
  .from('properties')
  .select('*', { count: 'exact', head: true })
  .eq('verified', true)

const { count: usersCount } = await supabaseAdmin
  .from('users')
  .select('*', { count: 'exact', head: true })

  const { data: settings } = await supabaseAdmin
  .from('settings')
  .select( 'instagram_url, whatsapp_url, tiktok_url')
  .single()

  const verifiedPercentage =
  propertiesCount && propertiesCount > 0
    ? Math.round(((verifiedCount || 0) / propertiesCount) * 100)
    : 0
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                  Find Your Perfect
                  <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                    {' '}
                    Property
                  </span>
                </h1>
                <p className="text-lg text-muted-foreground text-balance">
                  Discover verified property listings across Abuja with real-time
                  search, instant communication, and seamless booking. No app
                  download needed.
                </p>
              </div>

              <div className="space-y-4">
  <div className="flex flex-col sm:flex-row gap-4">
    <Link href="/properties">
      <Button size="lg" className="w-full">
        Browse Properties
      </Button>
    </Link>

    <Link href="/auth/signup">
      <Button
        size="lg"
        variant="outline"
        className="w-full bg-transparent"
      >
        Get Started
      </Button>
    </Link>
  </div>

  <div className="rounded-lg border bg-primary/5 px-4 py-3">
    <p className="text-sm text-muted-foreground">
      Already bought or inspected a property through Abzy Properties?
      <Link
        href="/testimonials"
        className="ml-1 font-semibold text-primary hover:underline"
      >
        Leave a review →
      </Link>
    </p>
  </div>
</div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <p className="text-2xl font-bold text-primary">{propertiesCount || 0}</p>
                  <p className="text-sm text-muted-foreground">Properties</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{usersCount || 0}</p>
                  <p className="text-sm text-muted-foreground">Happy Buyers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{verifiedPercentage}%</p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <div className="relative h-96 lg:h-full min-h-96 rounded-2xl overflow-hidden backdrop-blur">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/10" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MapPin className="w-24 h-24 text-primary/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-bold">Featured Listings</h2>
            <p className="text-muted-foreground text-lg">
              Our most popular verified properties right now
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{(featuredListings || []).map((listing) => (        
        <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div
                  className="h-48 bg-gradient-to-br group-hover:scale-105 transition-transform duration-300"
style={{
  backgroundImage: listing.image_url
    ? `url(${listing.image_url})`
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
                }}                />
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm line-clamp-2 text-balance">
                      {listing.title}
                    </h3>
                    {listing.verified && (
                      <Award className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {listing.location}
                  </p>

                  <div className="space-y-2">
                    <p className="text-xl font-bold text-primary">
₦{Number(listing.price).toLocaleString()}                    </p>
                  <div className="flex gap-3 text-xs text-muted-foreground">
  <span>{listing.property_type}</span>

  {listing.area_sqft ? (
    <span>{listing.area_sqft.toLocaleString()} sqft</span>
  ) : listing.land_size ? (
    <span>{listing.land_size} sqm</span>
  ) : null}
</div>
                  </div>

                  <Link href={`/properties/${listing.id}`}>
                    <Button className="w-full" size="sm">
                      View Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link href="/properties">
              <Button variant="outline" size="lg">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-primary/5 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold">
                Why Choose Abzy Properties?
              </h2>
              <p className="text-muted-foreground text-lg">
                Everything you need for seamless property discovery
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  title: 'Verified Listings',
                  description: 'All properties are verified for authenticity',
                },
                {
                  icon: Search,
                  title: 'Smart Search',
                  description: 'Real-time filters',
                },
                {
                  icon: MessageSquare,
                  title: 'Direct Communication',
                  description: 'WhatsApp, call, or email instantly',
                },
                {
                  icon: Zap,
                  title: 'Fast Booking',
                  description: 'Schedule inspections in seconds',
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur hover:bg-card transition-all"
                >
                  <feature.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="space-y-12">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Join satisfied property buyers
            </p>
          </div>

          <TestimonialsCarousel
  testimonials={testimonials || []}
/>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Find Your Property?</h2>
          <p className="text-lg text-muted-foreground">
            Join Abzy Properties today and get access to verified listings
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/properties">
              <Button size="lg">Start Browsing</Button>
            </Link>
            <Link href="/auth/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-background">
  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
    <div className="grid gap-10 md:grid-cols-3">
      {/* Brand */}
      <div>
        <Link href="/">
          <h2 className="text-xl font-bold tracking-tight">
            Abzy Properties
          </h2>
        </Link>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          Your trusted partner for
        <br/> 
          premium real estate in Abuja.
       </p>

       <div className="mt-5 flex items-center gap-4">

  {settings?.instagram_url && (
    <Link
      href={settings.instagram_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      <FaInstagram size={22} />
    </Link>
  )}

  {settings?.whatsapp_url && (
    <Link
      href={settings.whatsapp_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      <FaWhatsapp size={22} />
    </Link>
  )}

  {settings?.tiktok_url && (
    <Link
      href={settings.tiktok_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-muted-foreground hover:text-primary transition-colors"
    >
      <FaTiktok size={22} />
    </Link>
  )}

</div>

      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          Quick Links
        </h3>

        <div className="mt-4 space-y-3">
          <Link
            href="/properties"
            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Browse Properties
          </Link>

          <Link
            href="/about"
            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            About Us
          </Link>
        </div>
      </div>

      {/* Legal */}
      <div>
        <h3 className="text-sm font-semibold uppercase tracking-wide">
          Legal
        </h3>

        <div className="mt-4 space-y-3">
          <Link
            href="/privacy"
            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="block text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </div>

    <div className="mt-12 border-t pt-8 text-center space-y-2">

  <p className="text-sm text-muted-foreground">
    © {new Date().getFullYear()} Abzy Properties. All rights reserved.
  </p>

  <p className="text-sm text-muted-foreground">
  Founded by{" "}
  <span className="font-semibold text-foreground">
    {ceos?.[0]?.ceo_name}
  </span>{" "}
  and{" "}
  <span className="font-semibold text-foreground">
    {ceos?.[1]?.ceo_name}
  </span>
</p>

</div>
  </div>
</footer>
    </>
  )
}
