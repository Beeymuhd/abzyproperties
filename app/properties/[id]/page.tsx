'use client'

import React from "react"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  MapPin,
  Bed,
  Bath,
  Award,
  MessageSquare,
  Phone,
  Mail,
  Heart,
  Share2,
  ChevronLeft,
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const propertyDetails = {
  1: {
    title: 'Modern Duplex in Abuja',
    location: 'Lekki, Abuja',
    price: 45000000,
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    beds: 4,
    baths: 3,
    size: '5,000 sqft',
    verified: true,
    type: 'residential',
    description:
      'Beautiful modern duplex with excellent facilities and strategic location',
    fullDescription:
      'This stunning modern duplex is located in one of the most sought-after neighborhoods in Abuja. It features spacious bedrooms, modern kitchen, and a beautiful garden. The property is fully furnished and ready for immediate occupancy.',
    amenities: [
      'Air Conditioning',
      'Garden',
      'Parking Space',
      'Modern Kitchen',
      'Swimming Pool',
      'Security System',
      'Backup Generator',
      'Good Road Network',
    ],
    images: [
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    ],
  },
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = propertyDetails[params.id as keyof typeof propertyDetails] || propertyDetails[1]
  const [contactMethod, setContactMethod] = useState('whatsapp')
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [saved, setSaved] = useState(false)

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inquiryForm.name || !inquiryForm.email) {
      toast.error('Please fill in all required fields')
      return
    }
    toast.success('Your inquiry has been sent to the property agent')
    setInquiryForm({ name: '', email: '', phone: '', message: '' })
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
            <div className="space-y-4">
              <div
                className="w-full h-96 rounded-xl bg-gradient-to-br"
                style={{ backgroundImage: property.image }}
              />
              <div className="grid grid-cols-3 gap-4">
                {property.images.map((img, i) => (
                  <div
                    key={i}
                    className="h-20 rounded-lg bg-gradient-to-br cursor-pointer hover:opacity-80 transition"
                    style={{ backgroundImage: img }}
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                    <p className="text-lg text-muted-foreground flex items-center gap-2 mb-4">
                      <MapPin className="w-5 h-5" />
                      {property.location}
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
                  {property.beds > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Bedrooms</p>
                      <p className="text-2xl font-bold">{property.beds}</p>
                    </div>
                  )}
                  {property.baths > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground">Bathrooms</p>
                      <p className="text-2xl font-bold">{property.baths}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="text-2xl font-bold">{property.size}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">About This Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                {property.fullDescription}
              </p>
            </Card>

            {/* Amenities */}
            <Card className="p-6 space-y-4">
              <h2 className="text-2xl font-bold">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{amenity}</span>
                  </div>
                ))}
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
                  onClick={() => {
                    setSaved(!saved)
                    toast.success(saved ? 'Removed from saved' : 'Added to saved')
                  }}
                  variant={saved ? 'default' : 'outline'}
                >
                  <Heart className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
                  {saved ? 'Saved' : 'Save Property'}
                </Button>
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </Card>

            {/* Contact Methods */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-lg">Contact Agent</h3>

              <div className="space-y-3">
                <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button className="w-full gap-2 variant-outline">
                  <Phone className="w-4 h-4" />
                  Call Agent
                </Button>
                <Button className="w-full gap-2 variant-outline">
                  <Mail className="w-4 h-4" />
                  Send Email
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
