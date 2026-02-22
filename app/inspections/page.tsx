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
  Calendar,
  Clock,
  MapPin,
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Trash2,
} from 'lucide-react'
import { toast } from 'sonner'

interface Inspection {
  id: string
  property: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  agent: string
  location: string
}

const mockInspections: Inspection[] = [
  {
    id: '1',
    property: 'Modern Duplex in Abuja',
    date: '2024-02-10',
    time: '10:00 AM',
    status: 'scheduled',
    agent: 'Chinedu Okonkwo',
    location: 'Lekki, Abuja',
  },
  {
    id: '2',
    property: 'Premium Office Space',
    date: '2024-02-15',
    time: '2:00 PM',
    status: 'scheduled',
    agent: 'Amara Obi',
    location: 'Victoria Island, Lagos',
  },
  {
    id: '3',
    property: 'Luxury Apartment',
    date: '2024-01-28',
    time: '3:00 PM',
    status: 'completed',
    agent: 'Ibrahim Hassan',
    location: 'Banana Island, Ikoyi',
  },
]

const availableProperties = [
  'Modern Duplex in Abuja',
  'Premium Office Space',
  'Residential Land Plot',
  'Luxury Apartment Complex',
]

const availableTimes = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
]

export default function InspectionsPage() {
  const [inspections, setInspections] = useState(mockInspections)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    property: '',
    date: '',
    time: '',
    name: '',
    email: '',
    phone: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.property || !formData.date || !formData.time || !formData.name) {
      toast.error('Please fill in all required fields')
      return
    }

    const newInspection: Inspection = {
      id: Date.now().toString(),
      property: formData.property,
      date: formData.date,
      time: formData.time,
      status: 'scheduled',
      agent: 'Assigned Agent',
      location: 'Property Location',
    }

    setInspections([newInspection, ...inspections])
    toast.success('Inspection scheduled successfully!')
    setFormData({
      property: '',
      date: '',
      time: '',
      name: '',
      email: '',
      phone: '',
    })
    setShowForm(false)
  }

  const handleCancel = (id: string) => {
    setInspections(
      inspections.map((i) =>
        i.id === id ? { ...i, status: 'cancelled' } : i
      )
    )
    toast.success('Inspection cancelled')
  }

  const handleDelete = (id: string) => {
    setInspections(inspections.filter((i) => i.id !== id))
    toast.success('Inspection deleted')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />
      case 'completed':
        return <CheckCircle className="w-4 h-4" />
      case 'cancelled':
        return <AlertCircle className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <>
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">Property Inspections</h1>
            <p className="text-lg text-muted-foreground">
              Schedule and manage your property viewing appointments
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Inspection
          </Button>
        </div>

        {/* Booking Form */}
        {showForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">Schedule Property Inspection</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="property" className="font-semibold">
                    Property *
                  </Label>
                  <Select
                    value={formData.property}
                    onValueChange={(value) =>
                      setFormData({ ...formData, property: value })
                    }
                  >
                    <SelectTrigger id="property">
                      <SelectValue placeholder="Select a property" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableProperties.map((prop) => (
                        <SelectItem key={prop} value={prop}>
                          {prop}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date" className="font-semibold">
                    Preferred Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time" className="font-semibold">
                    Preferred Time *
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) =>
                      setFormData({ ...formData, time: value })
                    }
                  >
                    <SelectTrigger id="time">
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableTimes.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="font-semibold">
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Full name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-semibold">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-semibold">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+234 801 234 5678"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button type="submit">Schedule Inspection</Button>
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

        {/* Inspections List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">
            Your Inspections ({inspections.length})
          </h2>

          {inspections.length === 0 ? (
            <Card className="p-12 text-center">
              <Calendar className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                No scheduled inspections yet
              </p>
              <Button onClick={() => setShowForm(true)}>
                Schedule Your First Inspection
              </Button>
            </Card>
          ) : (
            inspections.map((inspection) => (
              <Card
                key={inspection.id}
                className="p-6 hover:shadow-md transition-shadow"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {/* Property Info */}
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold">{inspection.property}</h3>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {inspection.location}
                      </p>
                      <p className="text-muted-foreground flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Agent: {inspection.agent}
                      </p>
                    </div>
                  </div>

                  {/* Inspection Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-6">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Date</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {new Date(inspection.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Time</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Clock className="w-4 h-4 text-primary" />
                          {inspection.time}
                        </p>
                      </div>
                    </div>

                    <div>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          inspection.status
                        )}`}
                      >
                        {getStatusIcon(inspection.status)}
                        {inspection.status.charAt(0).toUpperCase() +
                          inspection.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-border pt-4">
                  {inspection.status === 'scheduled' && (
                    <>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCancel(inspection.id)}
                      >
                        Cancel Inspection
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(inspection.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </>
  )
}
