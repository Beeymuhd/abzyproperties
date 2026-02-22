import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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

const featuredListings = [
  {
    id: 1,
    title: 'Modern Duplex in Abuja',
    location: 'Lekki, Abuja',
    price: '₦45,000,000',
    image:
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    beds: 4,
    baths: 3,
    size: '5,000 sqft',
    verified: true,
  },
  {
    id: 2,
    title: 'Premium Office Space',
    location: 'Victoria Island, Lagos',
    price: '₦120,000,000',
    image:
      'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    beds: 10,
    baths: 8,
    size: '15,000 sqft',
    verified: true,
  },
  {
    id: 3,
    title: 'Residential Land Plot',
    location: 'Ikoyi, Lagos',
    price: '₦35,000,000',
    image:
      'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    beds: 2,
    baths: 2,
    size: '1,200 sqft',
    verified: true,
  },
  {
    id: 4,
    title: 'Luxury Apartment Complex',
    location: 'Banana Island, Ikoyi',
    price: '₦250,000,000',
    image:
      'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    beds: 5,
    baths: 4,
    size: '8,500 sqft',
    verified: true,
  },
]

const testimonials = [
  {
    name: 'Chioma Obi',
    role: 'Real Estate Investor',
    message:
      'Abzy Properties made finding my dream property so easy. The verified listings and instant communication tools saved me months of searching.',
    rating: 5,
  },
  {
    name: 'Ibrahim Abubakar',
    role: 'Business Owner',
    message:
      'Best platform for commercial real estate in Abuja. Professional, transparent, and highly responsive.',
    rating: 5,
  },
  {
    name: 'Fiona Adeleke',
    role: 'Property Developer',
    message:
      'The admin dashboard is a game-changer for managing multiple listings. I love the analytics features.',
    rating: 5,
  },
]

export default function HomePage() {
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

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/properties">
                  <Button size="lg" className="w-full">
                    Browse Properties
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <p className="text-2xl font-bold text-primary">2,500+</p>
                  <p className="text-sm text-muted-foreground">Properties</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">10,000+</p>
                  <p className="text-sm text-muted-foreground">Happy Buyers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">100%</p>
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
            {featuredListings.map((listing) => (
              <Card
                key={listing.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
              >
                <div
                  className="h-48 bg-gradient-to-br group-hover:scale-105 transition-transform duration-300"
                  style={{ backgroundImage: listing.image }}
                />
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
                      {listing.price}
                    </p>
                    <div className="flex gap-3 text-xs text-muted-foreground">
                      <span>{listing.beds} Beds</span>
                      <span>{listing.baths} Baths</span>
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
                  description: 'Real-time filters and Google Maps integration',
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
              Join thousands of satisfied property buyers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 border-border/50 bg-card/50 backdrop-blur"
              >
                <div className="flex gap-1 mb-4">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400">
                        ★
                      </span>
                    ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "{testimonial.message}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Find Your Property?</h2>
          <p className="text-lg text-muted-foreground">
            Join Abzy Properties today and get access to thousands of verified listings
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
      <footer className="bg-card/30 border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Abzy Properties</h3>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for premium real estate in Abuja
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Quick Links</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/properties" className="hover:text-primary">
                    Browse Properties
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-primary">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Company</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-sm">Legal</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-primary">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-primary">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/30 pt-8 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Abzy Properties. All rights reserved.
            </p>
            <p className="mt-2">
              Founded by Ibrahim Shahid Ahmad & Abubakar Abba Muhammad
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
