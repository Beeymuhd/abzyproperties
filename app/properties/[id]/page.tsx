'use client'

import React from "react"
import { useState, useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { getSession } from '@/lib/auth'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MapPin,
  Award,
  MessageSquare,
  Phone,
  Mail,
  Heart,
  ChevronLeft,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function PropertyDetailPage() {
  const params = useParams()

  const [property, setProperty] = useState<any>(null)

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch('/api/properties')

        const data = await response.json()

        const foundProperty = data.find(
          (p: any) => String(p.id) === String(params.id)
        )

        setProperty(foundProperty)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProperty()
    }, [params.id])
   const [contactMethod, setContactMethod] = useState('whatsapp')
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [saved, setSaved] = useState(false)

  const handleInquiry = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!inquiryForm.name || !inquiryForm.email) {
    toast.error('Please fill in all required fields')
    return
  }

  try {
const session = getSession()
    const response = await fetch('/api/inquiries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    user_id: session?.user_id,
    property_id: property.id,
    property_title: property.title,
    name: inquiryForm.name,
    contact:
      contactMethod === 'email'
        ? inquiryForm.email
        : inquiryForm.phone,
    method: contactMethod,
    message: inquiryForm.message,
  }),
})

if (!response.ok) {
  throw new Error('Failed to send inquiry')
}

    toast.success('Inquiry sent successfully')

    setInquiryForm({
      name: '',
      email: '',
      phone: '',
      message: '',
    })

    setContactMethod('whatsapp')
  } catch (error) {
    console.error(error)
    toast.error('Failed to send inquiry')
  }
}

  if (!property) {
  return (
    <>
      <Navbar />
      <div className="p-10 text-center">
        Loading property...
      </div>
    </>
  )
}

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <Link href="/properties" className="flex items-center gap-2 text-primary hover:underline mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Properties
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="overflow-hidden rounded-x1">
             <img
  src={property.image_url}
  alt={property.title}
  className="w-full h-[500px] object-cover"
/>
              
            </div>

            {/* Property Info */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <p className="text-lg text-muted-foreground flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5" />
                     {property.address}, {property.city}   
                    </p>
                  </div>
                  {property.verified && (
                    <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
                      <Award className="w-5 h-5" />
                      <span className="font-semibold">Verified</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-6 py-4 border-y border-border">
                  <div>
<p className="text-sm text-muted-foreground">
  {property.area_sqft ? 'Floor Area' : 'Land Size'}
</p>
  <p className="text-2xl font-bold">
    {property.area_sqft
      ? `${property.area_sqft.toLocaleString()} sqft`
      : property.land_size
      ? `${property.land_size} sqm`
      : ''}
  </p>
</div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed">
             {property.description}              </p>
            </Card>

            {/* Amenities */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities?.length ? (
  property.amenities.map((amenity: string, i: number) => (
    <div
      key={i}
      className="flex items-center gap-2 p-3 bg-muted rounded-lg"
    >
      <div className="w-2 h-2 bg-primary rounded-full" />
      <span>{amenity}</span>
    </div>
  ))
) : (
  <p>No amenities listed</p>
)}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Property Price</p>
                  <p className="text-4xl font-bold text-primary">
                    ₦{property.price.toLocaleString()}
                  </p>
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={async () => {
  const session = getSession()

  if (!session) {
    toast.error('Please login first')
    return
  }

  try {
    if (!saved) {
      await fetch('/api/saved-properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session.user_id,
          property_id: property.id,
        }),
      })

      setSaved(true)
      toast.success('Property saved')
    } else {
      await fetch('/api/saved-properties', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: session.user_id,
          property_id: property.id,
        }),
      })

      setSaved(false)
      toast.success('Property removed')
    }
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong')
  }
}}
                  variant={saved ? 'default' : 'outline'}
                >
                  <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  {saved ? 'Saved' : 'Save Property'}
                </Button>
              </div>
            </Card>

            {/* Quick Inquiry */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-lg">Send Inquiry</h3>

              <form onSubmit={handleInquiry} className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={inquiryForm.name}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={inquiryForm.email}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+234 801 234 5678"
                    value={inquiryForm.phone}
                    onChange={(e) =>
                      setInquiryForm({ ...inquiryForm, phone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="method" className="text-sm">
                    Preferred Contact
                  </Label>
                  <Select value={contactMethod} onValueChange={setContactMethod}>
                    <SelectTrigger id="method">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
  <Label htmlFor="message" className="text-sm">
    Message
  </Label>
  <Textarea
    id="message"
    placeholder="Write your inquiry..."
    value={inquiryForm.message}
    onChange={(e) =>
      setInquiryForm({
        ...inquiryForm,
        message: e.target.value,
      })
    }
  />
</div>

                <Button type="submit" className="w-full">
                  Send Inquiry
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
