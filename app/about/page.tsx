import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Award, MapPin, Users, TrendingUp, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase-admin'
import Image from 'next/image'


export default async function AboutPage() {
  const { data: cac } = await supabaseAdmin
  .from('cac_registration')
  .select('*')
  .limit(1)
  .single()

  


  const ceos = [
    {
      name: 'Ibrahim Shahid Ahmad',
      position: 'Chief Executive Officer',
      bio: 'Visionary leader with years of experience in real estate development. Ibrahim founded Abzy Properties with a mission to revolutionize property transactions in Abuja.',
      expertise: ['Real Estate', 'Business Strategy'],
    },
    {
      name: 'Abubakar Abba Habib',
      position: 'Co-Chief Executive Officer',
      bio: 'Strategic partner and operational expert with extensive background in property development. Abubakar ensures every client receives exceptional service and support.',
      expertise: ['Property Development', 'Client Relations', 'Operations'],
    },
  ]

  const features = [
    {
      icon: Award,
      title: 'Verified Listings',
      description:
        'Every property on our platform is carefully verified to ensure authenticity and quality',
    },
    {
      icon: TrendingUp,
      title: 'Market Leadership',
      description:
        'We lead the digital real estate revolution with innovative solutions and transparent practices',
    },
    {
      icon: Users,
      title: 'Client Focused',
      description:
        'Our team is dedicated to providing exceptional service and support to every client',
    },
    {
      icon: MapPin,
      title: 'Wide Coverage',
      description:
        'Access our properties across Abuja',
    },
  ]



  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <section className="py-12 space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">About Abzy Properties</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Transforming the real estate market with innovative solutions,
              verified listings, and exceptional client service. Your trusted partner
              for reliable properties and lands in Nigeria.
            </p>
          </div>
        </section>

      

        {/* Mission & Vision */}
        <section className="py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To revolutionize the real estate industry by providing a transparent,
                user-friendly platform that connects property buyers and sellers 
                with verified listings and exceptional service. We're committed to 
                eliminating barriers to property discovery and enabling informed decisions.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20">
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Abzy Properties, our vision is to redefine real estate by delivering seamless, easy, and stress-free experiences for every client. We are committed to making property ownership simple, accessible and fulfilling.
              </p>
            </Card>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-12 space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">Leadership Team</h2>
            <p className="text-lg text-muted-foreground">
              Meet the visionaries driving Abzy Properties forward
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ceos.map((ceo, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-64 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-4xl font-bold text-primary">
                        {ceo.name.split(' ')[0][0]}{ceo.name.split(' ')[1][0]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">{ceo.name}</h3>
                    <p className="text-primary font-semibold">{ceo.position}</p>
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {ceo.bio}
                  </p>

                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Areas of Expertise:</p>
                    <div className="flex flex-wrap gap-2">
                      {ceo.expertise.map((exp, j) => (
                        <span
                          key={j}
                          className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CAC Registration */}
        <section className="py-12">
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Corporate Registration</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Abzy Properties is a fully registered and licensed real estate
                  company operating with full transparency and compliance with Nigerian
                  regulatory standards. Our CAC registration ensures accountability and
                  legitimacy in all our operations.
                </p>
                <div className="space-y-2">
                  <p className="font-semibold">Registration Details:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>✓ CAC Registration: Verified</li>
                    <li>✓ Business Name: Abzy Properties Limited</li>
                    <li>✓ Headquarters: Abuja, Nigeria</li>
                    <li>✓ License Type: Real Estate Management</li>
                  </ul>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border bg-muted">

  {cac?.document_url ? (
  <div className="flex justify-center bg-muted rounded-xl p-6">
  <Image
    src={cac.document_url}
    alt="CAC Registration Certificate"
    width={700}
    height={1000}
    className="max-w-full h-auto object-contain"
  />
</div>
  ) : (

    <div className="h-72 flex flex-col items-center justify-center">

      <Award className="w-16 h-16 text-primary mb-4" />

      <p className="font-semibold">
        CAC Certificate
      </p>

      <p className="text-sm text-muted-foreground">
        Certificate not uploaded yet
      </p>

    </div>

  )}

</div>
            </div>
          </Card>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 space-y-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold">Why Choose Abzy Properties</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <Card key={i} className="p-6 hover:shadow-lg transition-shadow">
                  <Icon className="w-10 h-10 text-primary mb-4" />
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8">
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
              <p className="text-muted-foreground">
                Have questions? We'd love to hear from you. Contact us today.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6">
                <Phone className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <p className="text-muted-foreground">+234 (0) 706 182 8549</p>
              </Card>

              <Card className="p-6">
                <MapPin className="w-8 h-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Location</h3>
                <p className="text-muted-foreground">No 105 Chinyeaka ohaa Street Wuye, Abuja.</p>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button size="lg">Browse Properties</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
