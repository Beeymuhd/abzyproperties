import { Navbar } from "@/components/navbar"
import { Card } from "@/components/ui/card"

export default function TermsPage() {
  const sections = [
    {
      title: "Acceptance of Terms",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          By accessing or using Abzy Properties, you acknowledge that you
          have read, understood, and agreed to be bound by these Terms &
          Conditions and all applicable laws and regulations.
        </p>
      ),
    },
    {
      title: "Use of the Website",
      content: (
        <>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You agree to:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Provide accurate and truthful information.</li>
            <li>Use the platform only for lawful purposes.</li>
            <li>Respect the rights of other users and property owners.</li>
            <li>
              Avoid attempting to interfere with the operation or security
              of the platform.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Property Listings",
      content: (
        <>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Abzy Properties strives to ensure that property information is
            accurate and up to date. However:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Property availability may change without prior notice.</li>
            <li>
              Prices, descriptions, and images are supplied by property
              owners or agents.
            </li>
            <li>
              We cannot guarantee that every listing is completely free of
              errors or omissions.
            </li>
          </ul>

          <p className="text-muted-foreground leading-relaxed mt-4">
            Users are encouraged to independently verify all property
            information before making any financial or legal decisions.
          </p>
        </>
      ),
    },
    {
      title: "User Accounts",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          If you create an account, you are responsible for maintaining the
          confidentiality of your login credentials and for all activities
          that occur under your account.
        </p>
      ),
    },
    {
      title: "Intellectual Property",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          All website content, including text, graphics, logos, branding,
          images, layouts, and software, is the property of Abzy Properties
          unless otherwise stated and may not be copied, reproduced,
          distributed, or modified without prior written permission.
        </p>
      ),
    },
    {
      title: "Limitation of Liability",
      content: (
        <>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Abzy Properties serves as a platform connecting property buyers,
            sellers, landlords, tenants, and agents.
          </p>

          <p className="text-muted-foreground leading-relaxed mb-4">
            We are not responsible for:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Agreements or disputes between users and third parties.</li>
            <li>
              Financial losses resulting from property transactions.
            </li>
            <li>
              Errors, delays, interruptions, or temporary unavailability of
              the website.
            </li>
          </ul>
        </>
      ),
    },
    {
      title: "Prohibited Activities",
      content: (
        <>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You must not:
          </p>

          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Upload false or misleading information.</li>
            <li>Impersonate another person or organization.</li>
            <li>
              Attempt unauthorized access to the platform or its data.
            </li>
            <li>
              Engage in fraudulent, illegal, or abusive activities.
            </li>
            <li>Disrupt the normal operation of the website.</li>
          </ul>
        </>
      ),
    },
    {
      title: "Suspension or Termination",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          We reserve the right to suspend or terminate access to any
          account or service if these Terms & Conditions are violated or if
          misuse of the platform is detected.
        </p>
      ),
    },
    {
      title: "Changes to These Terms",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          We may update these Terms & Conditions from time to time. Any
          changes will be published on this page with an updated effective
          date. Continued use of the website after such changes constitutes
          acceptance of the revised Terms.
        </p>
      ),
    },
    {
      title: "Governing Law",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          These Terms & Conditions shall be governed by and construed in
          accordance with the laws of the Federal Republic of Nigeria.
        </p>
      ),
    },
    {
      title: "Contact Us",
      content: (
        <p className="text-muted-foreground leading-relaxed">
          If you have any questions regarding these Terms & Conditions,
          please contact Abzy Properties through our official communication
          channels.
        </p>
      ),
    },
  ]

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <section className="py-12 space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">
              Terms & Conditions
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl">
              Please read these Terms & Conditions carefully before using
              Abzy Properties. By accessing our platform, you agree to
              comply with the terms outlined below.
            </p>

            <p className="text-sm text-muted-foreground">
              Effective Date: January 1, 2026
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-6">
          <Card className="p-8 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-primary/20">
            <p className="text-muted-foreground leading-relaxed text-lg">
              Welcome to <strong>Abzy Properties</strong>. By accessing or
              using our website, you agree to comply with these Terms &
              Conditions. These terms are designed to ensure a safe,
              transparent, and reliable experience for everyone using our
              platform.
            </p>
          </Card>
        </section>

        {/* Sections */}
        <section className="py-12 space-y-6">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-bold mb-4">
                {section.title}
              </h2>

              {section.content}
            </Card>
          ))}
        </section>
      </div>
    </>
  )
}