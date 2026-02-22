'use client'

import React from "react"

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Star, MessageSquare, User, Mail, CheckCircle, Clock } from 'lucide-react'
import { toast } from 'sonner'

interface Testimonial {
  id: string
  name: string
  email?: string
  rating: number
  message: string
  approved: boolean
  date: Date
}

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Chioma Obi',
    email: 'chioma@example.com',
    rating: 5,
    message:
      'Abzy Properties made finding my dream property so easy. The verified listings and instant communication tools saved me months of searching.',
    approved: true,
    date: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Ibrahim Abubakar',
    email: 'ibrahim@example.com',
    rating: 5,
    message:
      'Best platform for commercial real estate in Abuja. Professional, transparent, and highly responsive to inquiries.',
    approved: true,
    date: new Date('2024-01-10'),
  },
  {
    id: '3',
    name: 'Fiona Adeleke',
    email: 'fiona@example.com',
    rating: 5,
    message:
      'The admin dashboard is a game-changer for managing multiple listings. I love the analytics features and detailed insights.',
    approved: true,
    date: new Date('2024-01-08'),
  },
  {
    id: '4',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    rating: 4,
    message:
      'Great platform overall. Would love to see more filter options for land plots. But the team was very helpful!',
    approved: true,
    date: new Date('2024-01-05'),
  },
  {
    id: '5',
    name: 'Zainab Muhammad',
    email: 'zainab@example.com',
    rating: 5,
    message:
      'Finally, a real estate platform that actually understands what buyers need. The comparison tool helped me make the right decision.',
    approved: false,
    date: new Date('2024-01-20'),
  },
]

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState(mockTestimonials)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '5',
    message: '',
  })
  const [filterApproved, setFilterApproved] = useState('all')

  const filtered = testimonials.filter((t) => {
    if (filterApproved === 'approved') return t.approved
    if (filterApproved === 'pending') return !t.approved
    return true
  })

  const averageRating =
    (testimonials.reduce((sum, t) => sum + t.rating, 0) /
      testimonials.length) || 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    if (formData.message.length < 20) {
      toast.error('Message must be at least 20 characters')
      return
    }

    const newTestimonial: Testimonial = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      rating: Number(formData.rating),
      message: formData.message,
      approved: false,
      date: new Date(),
    }

    setTestimonials([...testimonials, newTestimonial])
    toast.success('Thank you! Your testimonial will be reviewed shortly.')
    setFormData({
      name: '',
      email: '',
      rating: '5',
      message: '',
    })
    setShowForm(false)
  }

  const handleApprove = (id: string) => {
    setTestimonials(
      testimonials.map((t) =>
        t.id === id ? { ...t, approved: true } : t
      )
    )
    toast.success('Testimonial approved')
  }

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter((t) => t.id !== id))
    toast.success('Testimonial deleted')
  }

  const RatingStars = ({ rating }: { rating: number }) => (
    <div className="flex gap-1">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            }`}
          />
        ))}
    </div>
  )

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="space-y-8 mb-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Client Testimonials</h1>
            <p className="text-lg text-muted-foreground">
              Real stories from satisfied property buyers and investors
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">
                {testimonials.length}
              </p>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">
                {testimonials.filter((t) => t.approved).length}
              </p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-3xl font-bold text-primary mb-1">
                {averageRating.toFixed(1)}
              </p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </Card>
          </div>

          {/* Submit Button */}
          <Button
            onClick={() => setShowForm(!showForm)}
            className="gap-2"
            size="lg"
          >
            <MessageSquare className="w-4 h-4" />
            Share Your Experience
          </Button>
        </div>

        {/* Testimonial Form */}
        {showForm && (
          <Card className="p-6 mb-12">
            <h2 className="text-2xl font-bold mb-6">Share Your Story</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating" className="font-semibold">
                  Rating *
                </Label>
                <Select
                  value={formData.rating}
                  onValueChange={(value) =>
                    setFormData({ ...formData, rating: value })
                  }
                >
                  <SelectTrigger id="rating">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">★★★★★ Excellent</SelectItem>
                    <SelectItem value="4">★★★★☆ Very Good</SelectItem>
                    <SelectItem value="3">★★★☆☆ Good</SelectItem>
                    <SelectItem value="2">★★☆☆☆ Fair</SelectItem>
                    <SelectItem value="1">★☆☆☆☆ Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="font-semibold">
                  Your Testimonial * (minimum 20 characters)
                </Label>
                <Textarea
                  id="message"
                  placeholder="Share your experience with Abzy Properties..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={5}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  {formData.message.length} characters
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-900">
                <p>
                  Your testimonial will be reviewed by our team before being published
                  on our platform. This helps us maintain quality and authenticity.
                </p>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Submit Testimonial</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Filter */}
        {testimonials.length > 0 && (
          <div className="mb-8">
            <Select value={filterApproved} onValueChange={setFilterApproved}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Testimonials</SelectItem>
                <SelectItem value="approved">Approved Only</SelectItem>
                <SelectItem value="pending">Pending Review</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Testimonials */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                {testimonials.length === 0
                  ? 'No testimonials yet'
                  : 'No testimonials match your filter'}
              </p>
            </Card>
          ) : (
            filtered.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="p-6 border-l-4 border-l-primary/50"
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <User className="w-5 h-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.date.toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="mb-3">
                        <RatingStars rating={testimonial.rating} />
                      </div>
                    </div>

                    {/* Status */}
                    {!testimonial.approved && (
                      <div className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs">
                        <Clock className="w-3 h-3" />
                        Pending
                      </div>
                    )}
                    {testimonial.approved && (
                      <div className="flex items-center gap-1 bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Approved
                      </div>
                    )}
                  </div>

                  {/* Message */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.message}"
                  </p>

                  {/* Actions */}
                  {!testimonial.approved && (
                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button
                        size="sm"
                        onClick={() => handleApprove(testimonial.id)}
                        className="gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(testimonial.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  )
}
