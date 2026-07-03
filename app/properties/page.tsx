'use client'
import React, { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Heart,  Award } from 'lucide-react'


  const SESSION_STORAGE_KEY = 'abzy_session'


export default function PropertiesPage() {
  const [properties, setProperties] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [savedProperties, setSavedProperties] = useState<number[]>([])
const [userId, setUserId] = useState<string | null>(null)
useEffect(() => {
  fetchProperties()

  const session = sessionStorage.getItem(SESSION_STORAGE_KEY)

  if (session) {
  const parsed = JSON.parse(session)

  setUserId(parsed.user_id)

  fetchSavedProperties(parsed.user_id)
}
}, [])

const fetchProperties = async () => {
  try {
    const response = await fetch('/api/properties')

    if (!response.ok) {
      throw new Error('Failed to fetch properties')
    }

    const data = await response.json()

    setProperties(
      data.filter((property: any) => property.verified === true)
    )
  } catch (error) {
    console.error(error)
  }
}

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
const matchesType =
  typeFilter === 'all' ||
  p.property_type === typeFilter
      return matchesSearch && matchesType
  })

const toggleSaved = async (propertyId: number) => {
  if (!userId) {
    alert("Please login first")
    return
  }

  const isSaved = savedProperties.includes(propertyId)

  try {
    const response = await fetch("/api/saved-properties", {
      method: isSaved ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        property_id: propertyId,
      }),
    })

    if (!response.ok) {
      throw new Error("Request failed")
    }

    // Reload from database instead of guessing
    await fetchSavedProperties(userId)

  } catch (err) {
    console.error(err)
  }
}


const fetchSavedProperties = async (userId: string) => {
  const response = await fetch(
    `/api/saved-properties?userId=${userId}`
  )

  const data = await response.json()

  setSavedProperties(data.map((p: any) => p.id))
}
  console.log('Properties:', properties)


  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="space-y-8">
          <div className="space-y-2">
            <Link
  href="/"
  className="flex items-center gap-2 text-primary hover:underline mb-6"
>
  <ChevronLeft className="w-4 h-4" />
  Back to Homepage
</Link>

            <h1 className="text-4xl font-bold">Browse Properties</h1>
            <p className="text-lg text-muted-foreground">
              Discover {properties.length} verified listings across Abuja.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="Search by title or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Select value={typeFilter} onValueChange={setTypeFilter}>
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
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground">
            Showing {filtered.length} properties
          </p>
        </div>

        {/* Properties Grid */}
        <div className="mt-12">
          {filtered.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">
                No properties found matching your criteria
              </p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('')
                setTypeFilter('all')
              }}>
                Clear Filters
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((property) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Image */}
                  <div
                    className="h-48 bg-gradient-to-br group-hover:scale-105 transition-transform duration-300 relative"
                    style={{
    backgroundImage: property.image_url
      ? `url(${property.image_url})`
      : 'linear-gradient(135deg,#667eea,#764ba2)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
}} >
                    <div className="absolute top-3 right-3">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="backdrop-blur-sm"
                        onClick={() => toggleSaved(property.id)}
                      >
                        <Heart
  className={`w-5 h-5 transition-all duration-200 ${
    savedProperties.includes(property.id)
      ? "fill-red-500 text-red-500 scale-110"
      : "text-gray-500 hover:text-red-400"
  }`}
/>
                      </Button>
                    </div>
                    {property.verified && (
                      <div className="absolute top-3 left-3 flex items-center gap-1 bg-green-500/90 text-white px-2 py-1 rounded text-xs">
                        <Award className="w-3 h-3" />
                        Verified
                      </div>
                    )}
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
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {property.description}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="flex gap-3 text-xs text-muted-foreground py-2 border-y border-border">
                      <span>{property.area_sqft
  ? `${property.area_sqft.toLocaleString()} sqft`
  : property.land_size
  ? `${property.land_size} sqm`
  : 'Property'}</span>
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
      </div>
    </>
  )
}
