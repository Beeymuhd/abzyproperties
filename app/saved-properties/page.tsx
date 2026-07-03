'use client'

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, Filter, MapPin, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'

export default function SavedPropertiesPage() {
const [listings, setListings] = useState<any[]>([])
const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState('recent')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
  fetchSavedProperties()
}, [])

const fetchSavedProperties = async () => {
  try {
    const session = sessionStorage.getItem('abzy_session')

    if (!session) {
      setLoading(false)
      return
    }

    const user = JSON.parse(session)

    const response = await fetch(
      `/api/saved-properties?userId=${user.user_id}`
    )

    const data = await response.json()

    setListings(data || [])
  } catch (error) {
    console.error(error)
  } finally {
    setLoading(false)
  }
}

  const filtered = listings.filter(
    l =>
        filterType === 'all' ||
        l.property_type === filterType
)

  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'recent':
        return b.id - a.id
        default:
        return 0
    }
  })

const handleRemove = async (propertyId: number) => {
  try {
    const session = sessionStorage.getItem('abzy_session')

    if (!session) return

    const user = JSON.parse(session)

    await fetch('/api/saved-properties', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user.user_id,
        property_id: propertyId,
      }),
    })

    setListings((prev) =>
      prev.filter((item) => item.id !== propertyId)
    )

    toast.success('Removed from saved listings')
  } catch (error) {
    console.error(error)
    toast.error('Failed to remove property')
  }
}

  const formatSavedDate = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    if (days < 7) return `${days} days ago`
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`
    return `${Math.floor(days / 30)} months ago`
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Saved Listings</h1>
            <p className="text-lg text-muted-foreground">
              {listings.length} properties saved
            </p>
          </div>

          {/* Filter and Sort */}
          {listings.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Recently Saved</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {/* Listings */}
        {sorted.length === 0 ? (
          <Card className="p-12 text-center">
            <Heart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4 text-lg">
              {listings.length === 0
                ? 'No saved listings yet'
                : 'No listings match your filters'}
            </p>
            {listings.length === 0 && (
              <Link href="/properties">
                <Button>Start Browsing Properties</Button>
              </Link>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div
                  className="h-48 bg-gradient-to-br group-hover:scale-105 transition-transform duration-300 relative"
style={{
  backgroundImage: property.image_url
    ? `url(${property.image_url})`
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}                >
                  <div className="absolute top-3 right-3">
                    <Button
                      size="icon"
                      variant="secondary"
                      className="backdrop-blur-sm"
                      onClick={() => handleRemove(property.id)}
                    >
                      <Heart className="w-4 h-4 fill-current text-red-500" />
                    </Button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <span className="bg-black/60 text-white text-xs px-2 py-1 rounded">
                     Saved
                   </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-bold text-sm line-clamp-2 text-balance mb-1">
                      {property.title}
                    </h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-2">
                      <MapPin className="w-3 h-3" />
                      {property.location}
                    </p>
                    <span className="inline-block bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                     {property.property_type}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="flex gap-3 text-xs text-muted-foreground py-2 border-y border-border">
                   <span>
  {property.area_sqft
    ? `${Number(property.area_sqft).toLocaleString()} sqft`
    : property.land_size
    ? `${property.land_size} sqm`
    : 'Property'}
</span>
                  </div>

                  {/* Footer */}
                  <div className="space-y-2">
                    <p className="text-lg font-bold text-primary">
                      ₦{property.price.toLocaleString()}
                    </p>
                    <Link href={`/properties/${property.id}`}>
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
