'use client'

import { useState, useEffect } from 'react'
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

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

import {
  Star,
  MessageSquare,
  User,
  Quote,
  CheckCircle2,
} from 'lucide-react'

import { toast } from 'sonner'

interface Testimonial {
  id: string
  name: string
  email: string
  rating: number
  service_used: string
  message: string
  status: 'pending' | 'approved'
  created_at: string
}

export default function TestimonialsPage() {
  const [loading, setLoading] = useState(true)

  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  const [showForm, setShowForm] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: '5',
    service_used: '',
    message: '',
  })

  useEffect(() => {
    loadTestimonials()
  }, [])

  const [filterApproved, setFilterApproved] = useState("approved")

const filtered = testimonials.filter((t) => {
  if (filterApproved === "approved")
    return t.status === "approved"

  if (filterApproved === "pending")
    return t.status === "pending"

  return true
})

  async function loadTestimonials() {
    try {
      const response = await fetch('/api/testimonials')

      const data = await response.json()

      setTestimonials(data || [])
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (
      !formData.name ||
      !formData.email ||
      !formData.message ||
      !formData.service_used
    ) {
      toast.error('Please complete all fields.')
      return
    }

    if (formData.message.length < 20) {
      toast.error('Message must contain at least 20 characters.')
      return
    }

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          rating: Number(formData.rating),
        }),
      })

      if (!response.ok) {
        throw new Error()
      }

      toast.success(
        'Thank you! Your testimonial has been submitted for review.'
      )

      setFormData({
        name: '',
        email: '',
        rating: '5',
        service_used: '',
        message: '',
      })

      setShowForm(false)

      loadTestimonials()
    } catch {
      toast.error('Unable to submit testimonial.')
    }
  }

  function RatingStars({
    rating,
    size = 18,
  }: {
    rating: number
    size?: number
  }) {
    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={
              i < rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            }
          />
        ))}
      </div>
    )
  }

  const average =
  filtered.length === 0
    ? 0
    : filtered.reduce((sum, t) => sum + t.rating, 0) / filtered.length

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="max-w-6xl mx-auto py-32 text-center">
          Loading testimonials...
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-32 space-y-36">

        {/* Hero */}

        <section className="py-10 text-center">

  <div className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-2 text-sm font-medium mb-6">
    ⭐ Trusted by Property Buyers
  </div>

  <h1 className="text-5xl font-bold tracking-tight mb-6">
    What Our Clients Say
  </h1>

  <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-8">
    Real experiences from buyers who trusted Abzy Properties to help them
    find their perfect home.
  </p>

</section>

{/* STATS */}
<section className="py-6">
  <div className="grid gap-6 md:grid-cols-3">

<Card className="rounded-2xl p-8 text-center">

<h2 className="text-5xl font-bold text-primary">
{filtered.length}
</h2>

<p className="mt-2 text-muted-foreground">
Happy Clients
</p>

</Card>

<Card className="rounded-2xl p-8 text-center">

<h2 className="text-5xl font-bold text-primary">
{average.toFixed(1)}
</h2>

<div className="flex justify-center mt-3">
<RatingStars rating={5}/>
</div>

<p className="mt-2 text-muted-foreground">
Average Rating
</p>

</Card>

<Card className="rounded-2xl p-8 text-center">

<h2 className="text-5xl font-bold text-primary">
100%
</h2>

<p className="mt-2 text-muted-foreground">
Verified Reviews
</p>

</Card>
</div>

</section>

      
        
     {/* WRITE REVIEW */}
      <section className="py-4">
  <div className="flex justify-center">

<Button
size="lg"
onClick={()=>setShowForm(true)}
>

<MessageSquare className="mr-2 h-4 w-4"/>

Share Your Experience

</Button>

</div>
</section>

{/* TESTIMONIAL GRID */}

<section>

{testimonials.length===0 ? (

<Card className="rounded-2xl p-8 text-center max-w-lg mx-auto mb-24">

<MessageSquare className="mx-auto h-10 w-10 text-muted-foreground/30"/>

<h3 className="mt-4 text-xl font-semibold">

No testimonials yet

</h3>

<p className="mt-1 text-sm text-muted-foreground">

Be the first client to leave a review.

</p>

</Card>

) : (

<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

{filtered.map((testimonial)=>(

<Card
key={testimonial.id}
className="rounded-2xl p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
>

<div className="flex justify-between items-start mb-7">

<RatingStars rating={testimonial.rating}/>

<span className="text-xs text-muted-foreground">

{new Date(testimonial.created_at).toLocaleDateString()}

</span>

</div>

<div className="mb-7">

<span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">

{testimonial.service_used}

</span>

</div>

<p className="leading-9 text-muted-foreground italic mb-6">

"{testimonial.message}"

</p>

<div className="flex items-center gap-3 border-t mt-5 pt-3">

<div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center">

<User className="h-5 w-5 text-primary"/>

</div>

<div>

<h4 className="font-semibold">

{testimonial.name}

</h4>

<p className="text-xs text-green-600">

Verified Client

</p>

</div>

</div>

</Card>

))}

</div>

)}

</section>

    </main>

    <Dialog open={showForm} onOpenChange={setShowForm}>
  <DialogContent
  className="sm:max-w-xl p-6 max-h-[75vh] overflow-y-auto"
>

    <DialogHeader className="space-y-1">
      <DialogTitle className="text-2xl">
        Share Your Experience
      </DialogTitle>

      <DialogDescription>
        We'd love to hear about your experience with Abzy Properties.
      </DialogDescription>
    </DialogHeader>

    <form
      onSubmit={handleSubmit}
      className="space-y-5 mt-2"
    >

      <div className="grid md:grid-cols-2 gap-4">

        <div className="space-y-2">
          <Label>Your Name</Label>

          <Input
            value={formData.name}
            onChange={(e)=>
              setFormData({
                ...formData,
                name:e.target.value
              })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Email Address</Label>

          <Input
            type="email"
            value={formData.email}
            onChange={(e)=>
              setFormData({
                ...formData,
                email:e.target.value
              })
            }
            required
          />
        </div>

      </div>

      <div className="space-y-2">

        <Label>Rating</Label>

        <Select
          value={formData.rating}
          onValueChange={(value)=>
            setFormData({
              ...formData,
              rating:value
            })
          }
        >
          <SelectTrigger>
            <SelectValue/>
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="5">
              ★★★★★ Excellent
            </SelectItem>

            <SelectItem value="4">
              ★★★★☆ Very Good
            </SelectItem>

            <SelectItem value="3">
              ★★★☆☆ Good
            </SelectItem>

            <SelectItem value="2">
              ★★☆☆☆ Fair
            </SelectItem>

            <SelectItem value="1">
              ★☆☆☆☆ Poor
            </SelectItem>

          </SelectContent>

        </Select>

      </div>

      <div className="space-y-2">

        <Label>Service Used</Label>

        <Select
          value={formData.service_used}
          onValueChange={(value)=>
            setFormData({
              ...formData,
              service_used:value
            })
          }
        >

          <SelectTrigger>
            <SelectValue placeholder="Choose a service"/>
          </SelectTrigger>

          <SelectContent>

            <SelectItem value="Bought Property">
              Bought Property
            </SelectItem>

            <SelectItem value="General Experience">
              General Experience
            </SelectItem>

          </SelectContent>

        </Select>

      </div>

      <div className="space-y-2">

        <Label>Your Review</Label>

        <Textarea
          rows={6}
          placeholder="Tell us about your experience..."
          value={formData.message}
          onChange={(e)=>
            setFormData({
              ...formData,
              message:e.target.value
            })
          }
          required
        />

        <p className="text-xs text-muted-foreground">
          {formData.message.length}/20 minimum characters
        </p>

      </div>

      <div className="rounded-lg border bg-primary/5 px-3 py-2 text-sm text-muted-foreground">

        Your review will be submitted for moderation before it is published.

      </div>

      <div className="flex justify-end gap-3 pt-1">

        <Button
          type="button"
          variant="outline"
          onClick={()=>setShowForm(false)}
        >
          Cancel
        </Button>

        <Button type="submit">
          Submit Review
        </Button>

      </div>

    </form>

  </DialogContent>
</Dialog>
    </>
  )
}
