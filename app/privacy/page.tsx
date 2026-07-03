import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Eye, Phone, Mail, MapPin } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <section className="py-12 space-y-4">
          <h1 className="text-5xl font-bold">
            Privacy Policy
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl">
            At Abzy Properties, your privacy is important to us. This
            Privacy Policy explains how we collect, use, protect, and
            manage your personal information whenever you use our
            website or services.
          </p>

          <p className="text-sm text-muted-foreground">
            Effective Date: January 1, 2026
          </p>
        </section>

        {/* Introduction */}
        <section className="pb-12">
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
            <div className="space-y-4">
              <Shield className="w-10 h-10 text-primary" />

              <h2 className="text-2xl font-bold">
                Your Privacy Matters
              </h2>

              <p className="leading-relaxed text-muted-foreground">
                We are committed to protecting your personal
                information and ensuring transparency about how your
                data is collected and used. By accessing Abzy
                Properties, you agree to the practices outlined in
                this Privacy Policy.
              </p>
            </div>
          </Card>
        </section>

        {/* Privacy Sections */}
        <section className="space-y-8">

          <Card className="p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Information We Collect
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                We may collect the following information:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Your full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Property inquiries and messages</li>
                <li>Saved properties and account preferences</li>
                <li>
                  Technical information such as browser type, IP
                  address, operating system, and device information
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                How We Use Your Information
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Your information helps us provide better services and
                improve your overall experience.
              </p>

              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Respond to property inquiries.</li>
                <li>Connect buyers with property owners.</li>
                <li>Improve our website and services.</li>
                <li>Send important account notifications.</li>
                <li>Maintain platform security.</li>
                <li>Prevent fraudulent activities.</li>
              </ul>

              <p className="text-muted-foreground leading-relaxed">
                We never sell your personal information to third
                parties.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Cookies
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Our website may use cookies to improve your browsing
                experience, remember your preferences, and analyze
                website performance. You may disable cookies through
                your browser settings, although some features of the
                website may not function properly.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Information Sharing
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                We only share information when necessary to:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Facilitate property transactions.</li>
                <li>Respond to inquiries.</li>
                <li>Comply with applicable laws.</li>
                <li>Protect the rights and security of our users.</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Lock className="w-7 h-7 text-primary" />

                <h2 className="text-2xl font-bold">
                  Data Security
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational
                security measures to safeguard your information against
                unauthorized access, misuse, or disclosure. While we
                strive to maintain a secure platform, no internet
                transmission can be guaranteed to be completely
                secure.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Eye className="w-7 h-7 text-primary" />

                <h2 className="text-2xl font-bold">
                  Your Rights
                </h2>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-muted-foreground leading-relaxed">
                <li>Access your personal information.</li>
                <li>Correct inaccurate information.</li>
                <li>Request deletion of your account.</li>
                <li>Request deletion of your personal data where legally permitted.</li>
              </ul>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Third-Party Links
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to external websites.
                Abzy Properties is not responsible for the privacy
                practices or content of third-party websites.
              </p>
            </div>
          </Card>

          <Card className="p-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">
                Changes to This Privacy Policy
              </h2>

              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy periodically to
                reflect changes in our services, legal requirements,
                or business operations. Any updates will be posted on
                this page together with the revised effective date.
              </p>
            </div>
          </Card>

        </section>

        {/* Contact */}
        <section className="py-12">
          <Card className="p-8 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20">
            <div className="space-y-8">

              <div className="space-y-2">
                <h2 className="text-3xl font-bold">
                  Contact Us
                </h2>

                <p className="text-muted-foreground">
                  If you have questions regarding this Privacy Policy
                  or how your information is handled, please contact
                  us through our official communication channels.
                </p>
              </div>

            </div>
          </Card>
        </section>

      </main>
    </>
  )
}