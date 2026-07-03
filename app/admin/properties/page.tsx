'use client'

import React, { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Edit2, Trash2, Plus } from 'lucide-react'
import { toast } from 'sonner'

const featuresList = [
  'Swimming Pool',
  'Gym',
  'Security',
  'Borehole',
  'CCTV',
  'Garden',
  'Balcony',
  'Elevator',
  'Furnished',
]

export default function PropertiesPage() {
const [properties, setProperties] = useState<any[]>([])
const [showForm, setShowForm] = useState(false)
const [imageFile, setImageFile] = useState<File | null>(null)
const [editingId, setEditingId] = useState<number | null>(null)
const fetchProperties = async () => {
  try {
    const response = await fetch('/api/properties')
    const data = await response.json()

    setProperties(data)
  } catch (error) {
    console.error(error)
    toast.error('Failed to load properties')
  }
}
useEffect(() => {
  fetchProperties()
}, [])

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'residential',
    price: '',
    state: '',
    city: '',
    address: '',
    areaSqft: '',
    landSize: '',
    features: [] as string[],
    status: 'active',
    
  })

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleAddProperty = async (e: React.FormEvent) => {
  e.preventDefault()

  if (!formData.title || !formData.price || !formData.city) {
    toast.error('Please complete required fields')
    return
  }

  try {
  const submitData = new FormData()

  submitData.append('title', formData.title)
  submitData.append('description', formData.description)
  submitData.append('propertyType', formData.propertyType)
  submitData.append('price', formData.price)
  submitData.append('state', formData.state)
  submitData.append('city', formData.city)
  submitData.append('address', formData.address)
  submitData.append('areaSqft', formData.areaSqft)
  submitData.append('landSize', formData.landSize)
  submitData.append('status', formData.status)
  submitData.append('amenities',JSON.stringify(formData.features))

 if (imageFile) {
  submitData.append('image', imageFile)
 }

 const response = await fetch(
   editingId
     ? `/api/properties/${editingId}`
     : '/api/properties',
   {
     method: editingId ? 'PUT' : 'POST',
     body: submitData,
   }
 )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create property')
    }

    await fetchProperties()

    toast.success(editingId
    ? 'Property updated successfully'
    : 'Property added successfully')

    setShowForm(false)
    setEditingId(null)

    setFormData({
      title: '',
      description: '',
      propertyType: 'residential',
      price: '',
      state: '',
      city: '',
      address: '',
      areaSqft: '',
      landSize: '',
      features: [],
      status: 'active',
    })
  } catch (error) {
    console.error(error)
    toast.error('Failed to save property')
  }
} 

  const handleDeleteProperty = async (id: number) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this property?'
  )

  if (!confirmed) return

  try {
    const response = await fetch(`/api/properties/${id}`, {
      method: 'DELETE',
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    toast.success('Property deleted')

    await fetchProperties()
  } catch (error) {
    console.error(error)
    toast.error('Failed to delete property')
  }
}

const handleVerifyProperty = async (id: number) => {
  try {
    const response = await fetch('/api/properties', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        verified: true,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    toast.success('Property verified')

    await fetchProperties()
  } catch (error) {
    console.error(error)
    toast.error('Failed to verify property')
  }
 }

  return (
  <div className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">

    {/* Header */}
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div>
        <h1 className="text-2xl md:text-3xl font-bold">
          Properties Management
        </h1>

        <p className="text-muted-foreground">
          Manage all property listings
        </p>
      </div>

      <Button
        onClick={() => setShowForm(!showForm)}
        className="w-full sm:w-auto shrink-0"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Property
      </Button>

    </div>

     <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card className="p-4"><h3>Total</h3><p className="text-2xl font-bold">{properties.length}</p></Card>
        <Card className="p-4"><h3>Active</h3><p className="text-2xl font-bold">{properties.filter(p=>p.status==='active').length}</p></Card>
        <Card className="p-4"><h3>Verified</h3><p className="text-2xl font-bold">{properties.filter(p=>p.verified).length}</p></Card>
        <Card className="p-4"><h3>Pending</h3><p className="text-2xl font-bold">{properties.filter(p=>!p.verified).length}</p></Card>
      </div>

      {showForm && (
        <form
  onSubmit={handleAddProperty}
  className="space-y-6 w-full"
>
          <Card className="p-6 space-y-4">
            <h2 className="font-bold text-xl">Basic Information</h2>
            <Input placeholder="Property Title" value={formData.title}
              onChange={(e)=>setFormData({...formData,title:e.target.value})} />
            <Textarea placeholder="Description"
              value={formData.description}
              onChange={(e)=>setFormData({...formData,description:e.target.value})} />
          </Card>

          <Card className="p-6 grid md:grid-cols-2 gap-4">
            <Input placeholder="Price"
              value={formData.price}
              onChange={(e)=>setFormData({...formData,price:e.target.value})} />
            <Select value={formData.propertyType}
              onValueChange={(value)=>setFormData({...formData,propertyType:value})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="residential">Residential</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="land">Land</SelectItem>
              </SelectContent>
            </Select>
          </Card>

          <Card className="p-6 grid md:grid-cols-3 gap-4">
            <Input placeholder="State" value={formData.state}
              onChange={(e)=>setFormData({...formData,state:e.target.value})} />
            <Input placeholder="City" value={formData.city}
              onChange={(e)=>setFormData({...formData,city:e.target.value})} />
            <Input placeholder="Address" value={formData.address}
              onChange={(e)=>setFormData({...formData,address:e.target.value})} />
            <Input placeholder="Area (sqft)" value={formData.areaSqft}
               onChange={(e) =>setFormData({...formData,areaSqft: e.target.value,})}/>
            <Input placeholder="Land Size" value={formData.landSize}  
               onChange={(e) =>setFormData({...formData,landSize: e.target.value,})}/>
          </Card>

          <Card className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuresList.map((feature)=>(
                <div key={feature} className="flex items-center gap-2">
                  <Checkbox
                    checked={formData.features.includes(feature)}
                    onCheckedChange={()=>toggleFeature(feature)}
                  />
                  <Label>{feature}</Label>
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-2">
           <Label>Property Image</Label>
           <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
            if (e.target.files?.[0]) {
             setImageFile(e.target.files[0])
            }
            }}
           />
          </div>

          <Button
  type="submit"
  className="w-full sm:w-auto"
>{editingId ? 'Update Property' : 'Save Property'}</Button>
        </form>
      )}

      <Card className="overflow-hidden">
  <div className=" w-full overflow-x-auto">
    <table className="min-w-[900px] w-full">
          <thead>
            <tr>
              <th className="p-4 text-left">Property</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Location</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property)=>(
              <tr key={property.id} className="border-t">
                <td className="p-4">
                  <div className="font-medium">{property.title}</div>
                  <div className="text-sm text-muted-foreground">
                   {property.property_type || property.type}</div>
                </td>
                <td className="p-4">₦{Number(property.price || 0).toLocaleString()}</td>               
                <td className="p-4">
  {property.address}
  {property.city ? `, ${property.city}` : ''}
</td>
                <td className="p-4">
  <div className="flex flex-col gap-2">
    <Badge>
      {property.verified ? 'Verified' : 'Pending'}
    </Badge>

    <Badge variant="outline">
      {property.status}
    </Badge>
  </div>
</td>
                <td className="p-4">
  <div className="font-medium">{property.title}</div>

  <div className="flex flex-wrap gap-2">
  {property.amenities?.map((item: string) => (
    <Badge key={item}>
      {item}
    </Badge>
  ))}
</div>


</td>
                <td className="p-4 flex gap-2"> {!property.verified && (
                <Button
                  size="sm"
                  onClick={() => handleVerifyProperty(property.id)} > Verify </Button> )}

  <Button
    size="sm"
    variant="ghost"
    onClick={() => {
      setEditingId(property.id)
      setFormData({
        title: property.title || '',
        description: property.description || '',
        propertyType: property.type || 'residential',
        price: String(property.price || ''),
        state: property.state || '',
        city: property.city || '',
        address: property.address || '',
        areaSqft: String(property.area_sqft || ''),
        landSize: String(property.land_size || ''),
        features: property.amenities || [],
        status: property.status || 'active',
      })
      setShowForm(true)
    }}
  >
    <Edit2 className="h-4 w-4" />
  </Button>

  <Button
    size="sm"
    variant="ghost"
    onClick={() => handleDeleteProperty(property.id)}
  >
    <Trash2 className="h-4 w-4" />
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
