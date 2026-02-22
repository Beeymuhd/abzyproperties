'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MapPin, School, ShoppingCart, Hospital, Bold as Road, Heart, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const properties = [
  {
    id: 1,
    title: 'Modern Duplex in Abuja',
    location: 'Lekki',
    lat: 9.0765,
    lng: 7.398,
    price: 45000000,
  },
  {
    id: 2,
    title: 'Premium Office Space',
    location: 'Victoria Island',
    lat: 6.4281,
    lng: 3.4891,
    price: 120000000,
  },
  {
    id: 3,
    title: 'Residential Land Plot',
    location: 'Ikoyi',
    lat: 6.4669,
    lng: 3.6328,
    price: 35000000,
  },
  {
    id: 4,
    title: 'Luxury Apartment',
    location: 'Banana Island',
    lat: 6.4325,
    lng: 3.6426,
    price: 250000000,
  },
]

const nearbyAmenities = [
  { name: 'Lekki Comprehensive Secondary School', type: 'school', distance: '0.5 km' },
  { name: 'Lekki Shopping Mall', type: 'shopping', distance: '1.2 km' },
  { name: 'National Hospital', type: 'hospital', distance: '2.3 km' },
  { name: 'Lekki-Epe Expressway', type: 'road', distance: '0.8 km' },
]

export default function MapPage() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0])
  const [priceRange, setPriceRange] = useState('all')
  const [showAmenities, setShowAmenities] = useState(true)
  const [saved, setSaved] = useState<number[]>([])

  const filtered = properties.filter((p) => {
    if (priceRange === 'all') return true
    if (priceRange === 'low') return p.price < 50000000
    if (priceRange === 'medium') return p.price >= 50000000 && p.price < 150000000
    if (priceRange === 'high') return p.price >= 150000000
    return true
  })

  const getAmenityIcon = (type: string) => {
    switch (type) {
      case 'school':
        return <School className="w-4 h-4" />
      case 'shopping':
        return <ShoppingCart className="w-4 h-4" />
      case 'hospital':
        return <Hospital className="w-4 h-4" />
      case 'road':
        return <Road className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="space-y-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Property Map View</h1>
            <p className="text-lg text-muted-foreground">
              Explore properties on an interactive map with nearby amenities
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="low">Under ₦50M</SelectItem>
                <SelectItem value="medium">₦50M - ₦150M</SelectItem>
                <SelectItem value="high">Above ₦150M</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant={showAmenities ? 'default' : 'outline'}
              onClick={() => setShowAmenities(!showAmenities)}
            >
              {showAmenities ? 'Hide' : 'Show'} Nearby Amenities
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <Card className="p-6 h-96 lg:h-full min-h-96 flex items-center justify-center bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
              <div className="text-center space-y-4">
                <MapPin className="w-16 h-16 text-primary/30 mx-auto" />
                <div>
                  <h3 className="font-bold text-lg mb-2">Interactive Map View</h3>
                  <p className="text-muted-foreground text-sm mb-4 max-w-xs">
                    Google Maps integration showing {filtered.length} properties
                  </p>
                  {selectedProperty && (
                    <div className="bg-muted/50 rounded-lg p-4 text-left">
                      <p className="font-semibold text-sm mb-1">
                        {selectedProperty.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Coordinates: {selectedProperty.lat.toFixed(4)},
                        {selectedProperty.lng.toFixed(4)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Nearby Amenities */}
            {showAmenities && (
              <Card className="mt-6 p-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-lg">Nearby Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {nearbyAmenities.map((amenity, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition"
                      >
                        <div className="text-primary mt-1">
                          {getAmenityIcon(amenity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">
                            {amenity.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {amenity.distance}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Properties List */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Properties ({filtered.length})</h3>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {filtered.map((property) => (
                <Card
                  key={property.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedProperty?.id === property.id
                      ? 'ring-2 ring-primary bg-muted/50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => setSelectedProperty(property)}
                >
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm line-clamp-2">
                      {property.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {property.location}
                    </p>
                    <p className="font-bold text-primary text-sm">
                      ₦{property.price.toLocaleString()}
                    </p>

                    <div className="flex gap-2 pt-2">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSaved((prev) =>
                            prev.includes(property.id)
                              ? prev.filter((p) => p !== property.id)
                              : [...prev, property.id]
                          )
                          toast.success(
                            saved.includes(property.id)
                              ? 'Removed from saved'
                              : 'Added to saved'
                          )
                        }}
                        variant={saved.includes(property.id) ? 'default' : 'outline'}
                      >
                        <Heart
                          className={`w-3 h-3 ${
                            saved.includes(property.id) ? 'fill-current' : ''
                          }`}
                        />
                      </Button>
                      <Link
                        href={`/properties/${property.id}`}
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="sm" className="w-full">
                          View
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Property Details */}
        {selectedProperty && (
          <Card className="mt-8 p-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  {selectedProperty.title}
                </h3>
                <p className="text-muted-foreground flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5" />
                  {selectedProperty.location}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-y border-border">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Price</p>
                  <p className="text-2xl font-bold text-primary">
                    ₦{selectedProperty.price.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Coordinates</p>
                  <p className="font-mono text-sm">
                    {selectedProperty.lat.toFixed(4)}, {selectedProperty.lng.toFixed(4)}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link href={`/properties/${selectedProperty.id}`}>
                  <Button>View Full Details</Button>
                </Link>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Phone className="w-4 h-4" />
                  Call Agent
                </Button>
                <Button variant="outline" className="gap-2 bg-transparent">
                  <Mail className="w-4 h-4" />
                  Email Agent
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  )
}
