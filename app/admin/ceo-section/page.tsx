'use client'

import React from "react"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload, Trash2, Save } from 'lucide-react'
import { toast } from 'sonner'

const mockCEOs = [
  {
    id: 1,
    name: 'Ibrahim Shahid Ahmad',
    position: 'CEO',
    imageUrl: null,
  },
  {
    id: 2,
    name: 'Abubakar Abba Muhammad',
    position: 'Co-CEO',
    imageUrl: null,
  },
]

export default function CEOSectionPage() {
  const [ceos, setCEOs] = useState(mockCEOs)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editData, setEditData] = useState({ name: '', position: '' })
  const [cacImage, setCacImage] = useState<File | null>(null)

  const handleEdit = (ceo: typeof ceos[0]) => {
    setEditingId(ceo.id)
    setEditData({ name: ceo.name, position: ceo.position })
  }

  const handleSave = (id: number) => {
    if (!editData.name || !editData.position) {
      toast.error('Please fill in all fields')
      return
    }

    setCEOs(
      ceos.map((c) =>
        c.id === id
          ? { ...c, name: editData.name, position: editData.position }
          : c
      )
    )
    setEditingId(null)
    toast.success('CEO information updated')
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB')
        return
      }
      setCacImage(file)
      toast.success('CAC image selected')
    }
  }

  const handleUploadCAC = () => {
    if (!cacImage) {
      toast.error('Please select an image first')
      return
    }
    toast.success('CAC document uploaded successfully')
    setCacImage(null)
  }

  const handleDelete = (id: number) => {
    setCEOs(ceos.filter((c) => c.id !== id))
    toast.success('CEO removed')
  }

  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">CEO Section Management</h1>
        <p className="text-muted-foreground">
          Manage CEO information and CAC registration document
        </p>
      </div>

      {/* CAC Document Section */}
      <Card className="p-6 border-2 border-accent/30">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-bold mb-2">CAC Registration Document</h2>
            <p className="text-sm text-muted-foreground">
              Upload the official CAC registration form image
            </p>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-8 hover:border-primary transition-colors cursor-pointer">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="cac-upload"
            />
            <label htmlFor="cac-upload" className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center space-y-2">
                <Upload className="w-8 h-8 text-muted-foreground" />
                <div className="text-center">
                  <p className="font-medium">
                    {cacImage ? cacImage.name : 'Click to upload CAC image'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>
            </label>
          </div>

          {cacImage && (
            <Button
              onClick={handleUploadCAC}
              className="w-full gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload CAC Document
            </Button>
          )}
        </div>
      </Card>

      {/* CEOs Management */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">CEO Information</h2>

        {ceos.map((ceo) => (
          <Card key={ceo.id} className="p-6">
            {editingId === ceo.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${ceo.id}`}>Full Name</Label>
                    <Input
                      id={`name-${ceo.id}`}
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`position-${ceo.id}`}>Position</Label>
                    <Input
                      id={`position-${ceo.id}`}
                      value={editData.position}
                      onChange={(e) =>
                        setEditData({ ...editData, position: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={() => handleSave(ceo.id)}
                    className="gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setEditingId(null)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{ceo.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {ceo.position}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(ceo)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(ceo.id)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>

                {ceo.imageUrl && (
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-muted">
                    <img
                      src={ceo.imageUrl || "/placeholder.svg"}
                      alt={ceo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Instructions */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <div className="space-y-2">
          <h3 className="font-bold">Instructions</h3>
          <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
            <li>You can edit CEO names and positions at any time</li>
            <li>The CAC registration image will be displayed on the user-facing page</li>
            <li>Supported formats: PNG, JPG (max 5MB)</li>
            <li>Both CEOs are required for the section to display</li>
          </ul>
        </div>
      </Card>
    </div>
  )
}
