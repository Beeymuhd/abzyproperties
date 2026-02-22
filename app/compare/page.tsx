'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { X, Check, Award, MapPin, Bed, Bath } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

const allProperties = [
  {
    id: 1,
    title: 'Modern Duplex in Abuja',
    location: 'Lekki',
    price: 45000000,
    beds: 4,
    baths: 3,
    size: '5,000 sqft',
    verified: true,
    type: 'residential',
    amenities: [
      'Air Conditioning',
      'Garden',
      'Parking',
      'Swimming Pool',
      'Generator',
    ],
  },
  {
    id: 2,
    title: 'Premium Office Space',
    location: 'Victoria Island',
    price: 120000000,
    beds: 10,
    baths: 8,
    size: '15,000 sqft',
    verified: true,
    type: 'commercial',
    amenities: ['CCTV', 'Generator', 'Elevator', 'Reception', 'Cafeteria'],
  },
  {
    id: 3,
    title: 'Residential Land Plot',
    location: 'Ikoyi',
    price: 35000000,
    beds: 0,
    baths: 0,
    size: '1,200 sqft',
    verified: true,
    type: 'land',
    amenities: ['Good Road Access', 'Flat Terrain', 'Clear Title'],
  },
  {
    id: 4,
    title: 'Luxury Apartment',
    location: 'Banana Island',
    price: 250000000,
    beds: 5,
    baths: 4,
    size: '8,500 sqft',
    verified: true,
    type: 'residential',
    amenities: ['Garden', 'Pool', 'Gym', 'Security', 'Maid Room'],
  },
]

export default function ComparePage() {
  const [selected, setSelected] = useState<number[]>([])
  const [newSelectionId, setNewSelectionId] = useState<string>('')

  const selectedProperties = selected
    .map((id) => allProperties.find((p) => p.id === id))
    .filter((p) => p !== undefined) as typeof allProperties

  const handleAddProperty = () => {
    if (!newSelectionId) {
      toast.error('Please select a property')
      return
    }
    const id = Number(newSelectionId)
    if (selected.includes(id)) {
      toast.error('Property already selected')
      return
    }
    if (selected.length >= 4) {
      toast.error('Maximum 4 properties can be compared')
      return
    }
    setSelected([...selected, id])
    setNewSelectionId('')
  }

  const handleRemove = (id: number) => {
    setSelected(selected.filter((p) => p !== id))
  }

  const handleClearAll = () => {
    setSelected([])
  }

  const getUniqueAmenities = () => {
    const all = new Set<string>()
    selectedProperties.forEach((p) => {
      p.amenities.forEach((a) => all.add(a))
    })
    return Array.from(all).sort()
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Compare Properties</h1>
            <p className="text-lg text-muted-foreground">
              Compare up to 4 properties side-by-side to make the best decision
            </p>
          </div>

          {/* Property Selector */}
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={newSelectionId} onValueChange={setNewSelectionId}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select property to compare..." />
                </SelectTrigger>
                <SelectContent>
                  {allProperties
                    .filter((p) => !selected.includes(p.id))
                    .map((property) => (
                      <SelectItem key={property.id} value={String(property.id)}>
                        {property.title} - ₦{property.price.toLocaleString()}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Button onClick={handleAddProperty}>Add Property</Button>
            </div>
          </Card>
        </div>

        {/* Selected Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {selected.length} of 4 properties selected
          </p>
          {selected.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleClearAll}>
              Clear All
            </Button>
          )}
        </div>

        {selected.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">
              Select properties above to start comparing
            </p>
            <Link href="/properties">
              <Button>Browse Properties</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Price Comparison */}
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-4">Price Comparison</h3>
              <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selected.length}, 1fr)` }}>
                {selectedProperties.map((property) => (
                  <div key={property.id} className="space-y-2">
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {property.title}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      ₦{property.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ₦{(property.price / parseInt(property.size)).toFixed(0)}/sqft
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Details Comparison */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="px-6 py-3 bg-muted/50 font-semibold w-32 sm:w-48">
                        Property
                      </td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="px-6 py-3 border-l border-border">
                          <div className="space-y-2">
                            <p className="font-semibold line-clamp-2">
                              {p.title}
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemove(p.id)}
                              className="w-full text-destructive"
                            >
                              <X className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border">
                      <td className="px-6 py-3 bg-muted/50 font-semibold">Location</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="px-6 py-3 border-l border-border">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            {p.location}
                          </div>
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border">
                      <td className="px-6 py-3 bg-muted/50 font-semibold">Verified</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="px-6 py-3 border-l border-border">
                          {p.verified ? (
                            <div className="flex items-center gap-2 text-green-600">
                              <Check className="w-4 h-4" />
                              Verified
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Pending</span>
                          )}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border">
                      <td className="px-6 py-3 bg-muted/50 font-semibold">Type</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="px-6 py-3 border-l border-border capitalize">
                          {p.type}
                        </td>
                      ))}
                    </tr>

                    <tr className="border-b border-border">
                      <td className="px-6 py-3 bg-muted/50 font-semibold">Size</td>
                      {selectedProperties.map((p) => (
                        <td key={p.id} className="px-6 py-3 border-l border-border">
                          {p.size}
                        </td>
                      ))}
                    </tr>

                    {selectedProperties.some((p) => p.beds > 0) && (
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 bg-muted/50 font-semibold flex items-center gap-2">
                          <Bed className="w-4 h-4" />
                          Bedrooms
                        </td>
                        {selectedProperties.map((p) => (
                          <td
                            key={p.id}
                            className="px-6 py-3 border-l border-border text-center"
                          >
                            {p.beds || '-'}
                          </td>
                        ))}
                      </tr>
                    )}

                    {selectedProperties.some((p) => p.baths > 0) && (
                      <tr className="border-b border-border">
                        <td className="px-6 py-3 bg-muted/50 font-semibold flex items-center gap-2">
                          <Bath className="w-4 h-4" />
                          Bathrooms
                        </td>
                        {selectedProperties.map((p) => (
                          <td
                            key={p.id}
                            className="px-6 py-3 border-l border-border text-center"
                          >
                            {p.baths || '-'}
                          </td>
                        ))}
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Amenities Comparison */}
            {selectedProperties.some((p) => p.amenities.length > 0) && (
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Amenities</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {getUniqueAmenities().map((amenity) => (
                        <tr key={amenity} className="border-b border-border">
                          <td className="px-4 py-3 bg-muted/50 font-medium">
                            {amenity}
                          </td>
                          {selectedProperties.map((p) => (
                            <td
                              key={p.id}
                              className="px-4 py-3 border-l border-border text-center"
                            >
                              {p.amenities.includes(amenity) ? (
                                <Check className="w-5 h-5 text-green-600 mx-auto" />
                              ) : (
                                <span className="text-muted-foreground">—</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 flex-wrap">
              {selectedProperties.map((p) => (
                <Link key={p.id} href={`/properties/${p.id}`}>
                  <Button variant="outline">{p.title}</Button>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
