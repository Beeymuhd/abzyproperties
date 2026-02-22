'use client'

import React from "react"

import { useState } from 'react'
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
import { Edit2, Trash2, Plus, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

const mockProperties = [
  {
    id: 1,
    title: 'Modern Duplex in Abuja',
    location: 'Lekki',
    price: 45000000,
    type: 'residential',
    verified: true,
    beds: 4,
    baths: 3,
    status: 'active',
  },
  {
    id: 2,
    title: 'Premium Office Space',
    location: 'Victoria Island',
    price: 120000000,
    type: 'commercial',
    verified: true,
    beds: 10,
    baths: 8,
    status: 'active',
  },
  {
    id: 3,
    title: 'Residential Land Plot',
    location: 'Ikoyi',
    price: 35000000,
    type: 'land',
    verified: true,
    beds: 0,
    baths: 0,
    status: 'active',
  },
]

export default function PropertiesPage() {
  const [properties, setProperties] = useState(mockProperties)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'residential',
    beds: '',
    baths: '',
  })

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.location || !formData.price) {
      toast.error('Please fill in all required fields')
      return
    }

    const newProperty = {
      id: properties.length + 1,
      title: formData.title,
      location: formData.location,
      price: Number(formData.price),
      type: formData.type as 'residential' | 'commercial' | 'land',
      verified: false,
      beds: Number(formData.beds) || 0,
      baths: Number(formData.baths) || 0,
      status: 'active',
    }

    setProperties([...properties, newProperty])
    setFormData({
      title: '',
      location: '',
      price: '',
      type: 'residential',
      beds: '',
      baths: '',
    })
    setShowForm(false)
    toast.success('Property added successfully')
  }

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter((p) => p.id !== id))
    toast.success('Property deleted')
  }

  const handleVerify = (id: number) => {
    setProperties(
      properties.map((p) => (p.id === id ? { ...p, verified: true } : p))
    )
    toast.success('Property verified')
  }

  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Properties Management</h1>
          <p className="text-muted-foreground">
            Manage all property listings and details
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Property
        </Button>
      </div>

      {/* Add Property Form */}
      {showForm && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Add New Property</h2>
          <form onSubmit={handleAddProperty} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Modern Duplex"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g., Lekki, Abuja"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 45000000"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Property Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="beds">Bedrooms</Label>
                <Input
                  id="beds"
                  type="number"
                  placeholder="e.g., 4"
                  value={formData.beds}
                  onChange={(e) =>
                    setFormData({ ...formData, beds: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="baths">Bathrooms</Label>
                <Input
                  id="baths"
                  type="number"
                  placeholder="e.g., 3"
                  value={formData.baths}
                  onChange={(e) =>
                    setFormData({ ...formData, baths: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit">Add Property</Button>
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

      {/* Properties Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left font-semibold">Title</th>
                <th className="px-6 py-3 text-left font-semibold">Location</th>
                <th className="px-6 py-3 text-left font-semibold">Price</th>
                <th className="px-6 py-3 text-left font-semibold">Type</th>
                <th className="px-6 py-3 text-left font-semibold">Details</th>
                <th className="px-6 py-3 text-left font-semibold">Status</th>
                <th className="px-6 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property) => (
                <tr
                  key={property.id}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{property.title}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {property.location}
                  </td>
                  <td className="px-6 py-4 font-semibold text-primary">
                    ₦{property.price.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 capitalize text-sm">
                    {property.type}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {property.beds > 0 && `${property.beds}BD `}
                    {property.baths > 0 && `${property.baths}BA`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {property.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span
                        className={
                          property.verified
                            ? 'text-green-600'
                            : 'text-amber-600'
                        }
                      >
                        {property.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 space-x-2 flex">
                    {!property.verified && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerify(property.id)}
                        className="gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Verify
                      </Button>
                    )}
                    <Button size="sm" variant="ghost">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
