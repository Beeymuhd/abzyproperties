'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, Heart, Bed, Bath, Award } from 'lucide-react'

const allProperties = [
  {
    id: 1,
    title: 'Modern Duplex in Abuja',
    location: 'Lekki, Abuja',
    price: 45000000,
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    beds: 4,
    baths: 3,
    size: '5,000 sqft',
    verified: true,
    type: 'residential',
    description: 'Beautiful modern duplex with excellent facilities',
  },
  {
    id: 2,
    title: 'Premium Office Space',
    location: 'Victoria Island, Lagos',
    price: 120000000,
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    beds: 10,
    baths: 8,
    size: '15,000 sqft',
    verified: true,
    type: 'commercial',
    description: 'State-of-the-art commercial space for businesses',
  },
  {
    id: 3,
    title: 'Residential Land Plot',
    location: 'Ikoyi, Lagos',
    price: 35000000,
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    beds: 0,
    baths: 0,
    size: '1,200 sqft',
    verified: true,
    type: 'land',
    description: 'Prime land location in premium area',
  },
  {
    id: 4,
    title: 'Luxury Apartment Complex',
    location: 'Banana Island, Ikoyi',
    price: 250000000,
    image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    beds: 5,
    baths: 4,
    size: '8,500 sqft',
    verified: true,
    type: 'residential',
    description: 'Exclusive luxury apartment in sought-after location',
  },
  {
    id: 5,
    title: 'Commercial Complex',
    location: 'Wuse 2, Abuja',
    price: 180000000,
    image: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    beds: 8,
    baths: 6,
    size: '12,000 sqft',
    verified: false,
    type: 'commercial',
    description: 'Modern commercial complex with multiple units',
  },
  {
    id: 6,
    title: 'Residential Estate Plot',
    location: 'Asokoro, Abuja',
    price: 65000000,
    image: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    beds: 0,
    baths: 0,
    size: '2,500 sqft',
    verified: true,
    type: 'land',
    description: 'Spacious land plot in secure residential estate',
  },
  {
    id: 7,
    title: 'Penthouse Apartment',
    location: 'Abuja City Center',
    price: 95000000,
    image: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    beds: 3,
    baths: 3,
    size: '4,500 sqft',
    verified: true,
    type: 'residential',
    description: 'Stunning penthouse with panoramic city views',
  },
  {
    id: 8,
    title: 'Business Hub Space',
    location: 'Marina, Lagos',
    price: 150000000,
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    beds: 6,
    baths: 5,
    size: '10,000 sqft',
    verified: true,
    type: 'commercial',
    description: 'Prime business hub in central location',
  },
]

export default function PropertiesPage() {
  const [properties, setProperties] = useState(allProperties)
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [savedListings, setSavedListings] = useState<number[]>([])

  const filtered = properties.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === 'all' || p.type === typeFilter
    return matchesSearch && matchesType
  })

  const toggleSaved = (id: number) => {
    setSavedListings((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    )
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Browse Properties</h1>
            <p className="text-lg text-muted-foreground">
              Discover {properties.length} verified listings across Abuja and Lagos
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
                    style={{ backgroundImage: property.image }}
                  >
                    <div className="absolute top-3 right-3">
                      <Button
                        size="icon"
                        variant="secondary"
                        className="backdrop-blur-sm"
                        onClick={() => toggleSaved(property.id)}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            savedListings.includes(property.id)
                              ? 'fill-current text-red-500'
                              : ''
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
                      {property.beds > 0 && (
                        <span className="flex items-center gap-1">
                          <Bed className="w-3 h-3" />
                          {property.beds}
                        </span>
                      )}
                      {property.baths > 0 && (
                        <span className="flex items-center gap-1">
                          <Bath className="w-3 h-3" />
                          {property.baths}
                        </span>
                      )}
                      <span>{property.size}</span>
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
