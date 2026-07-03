'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { Star, Trash2, CheckCircle } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  email: string
  rating: number
  service_used: string
  message: string
  status: 'pending' | 'approved'
  created_at: string
}

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function loadTestimonials() {
    try {
      const res = await fetch('/api/admin/testimonials')
      const data = await res.json()

console.log("Testimonials API:", data)

setTestimonials(Array.isArray(data) ? data : [])
    } finally {
      setLoading(false)
    }
  }

  const [filter, setFilter] = useState('all')

const filteredTestimonials = Array.isArray(testimonials)
  ? filter === 'all'
    ? testimonials
    : testimonials.filter(t => t.status === filter)
  : []

  async function approve(id: number) {
  const res = await fetch(`/api/admin/testimonials/${id}`, {
    method: 'PATCH',
  })

  const data = await res.json()

  console.log(data)

  if (!res.ok) {
    toast.error(data.error || 'Approval failed')
    return
  }

  toast.success('Testimonial approved')

  loadTestimonials()
}

  async function remove(id: number) {
    await fetch(`/api/admin/testimonials/${id}`, {
      method: 'DELETE',
    })

    toast.success('Deleted')

    loadTestimonials()
  }

  if (loading) {
  return (
    <main className="flex-1 p-8">
      <Card className="p-12 text-center">
        Loading testimonials...
      </Card>
    </main>
  )
}

  return (
    <main className="flex-1 p-8 space-y-8">

      <div className="space-y-6">
  <div className="space-y-2">
    <h1 className="text-3xl font-bold">
      Testimonials
    </h1>

    <p className="text-muted-foreground">
      Manage and moderate customer reviews.
    </p>
  </div>

  <div className="flex flex-wrap gap-2">
    <Button
      variant={filter === 'all' ? 'default' : 'outline'}
      onClick={() => setFilter('all')}
    >
      All ({testimonials.length})
    </Button>

    <Button
      variant={filter === 'pending' ? 'default' : 'outline'}
      onClick={() => setFilter('pending')}
    >
      Pending (
{Array.isArray(testimonials)
  ? testimonials.filter(t => t.status === 'pending').length
  : 0}
)
    </Button>

    <Button
      variant={filter === 'approved' ? 'default' : 'outline'}
      onClick={() => setFilter('approved')}
    >
      Approved (
{Array.isArray(testimonials)
  ? testimonials.filter(t => t.status === 'approved').length
  : 0}
)
    </Button>
  </div>
</div>

      <div className="space-y-6">

        {filteredTestimonials.length === 0 ? (
  <Card className="p-12 text-center">
    <p className="text-muted-foreground">
      No testimonials found.
    </p>
  </Card>
) : (
        filteredTestimonials.map((testimonial) => (

          <Card
  key={testimonial.id}
  className="p-6 hover:shadow-md transition-shadow"
>
  <div className="space-y-6">

    {/* Header */}
    <div className="flex items-start justify-between gap-6">

      <div className="space-y-1">

        <h3 className="font-bold text-lg">
          {testimonial.name}
        </h3>

        <p className="text-sm text-muted-foreground break-all">
          {testimonial.email}
        </p>

        <div className="flex gap-1 mt-3">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

      </div>

      <Badge
        variant={
  testimonial.status === 'approved'
    ? 'secondary'
    : 'default'
}
      >
        {testimonial.status}
      </Badge>

    </div>

    {/* Details */}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-y">

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground mb-1">
          Service Used
        </p>

        <p className="font-medium">
          {testimonial.service_used || '—'}
        </p>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-muted-foreground mb-1">
          Submitted
        </p>

        <p className="font-medium">
          {new Date(testimonial.created_at).toLocaleString([], {
  dateStyle: 'medium',
  timeStyle: 'short',
})}
        </p>
      </div>

    </div>

    {/* Review */}

    <div className="rounded-lg bg-muted/50 p-5">

      <p className="text-sm leading-7 text-foreground italic">
        "{testimonial.message}"
      </p>

    </div>

    {/* Actions */}

    <div className="flex justify-end gap-2 pt-4 border-t">

      {testimonial.status === 'pending' && (

        <Button
          onClick={() => approve(testimonial.id)}
          className="gap-2"
        >
          <CheckCircle className="w-4 h-4" />
          Approve
        </Button>

      )}

      <Button
        variant="ghost"
        onClick={() => remove(testimonial.id)}
      >
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>

    </div>

  </div>
</Card>

        ))
      )}
      

    </div>

    </main>
  )
}