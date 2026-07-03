'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Lock, Globe, Save } from 'lucide-react'
import { toast } from 'sonner'


export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Abzy Properties',
    email: 'hello@abzyproperties.com',
    phone: '+234 701 234 5678',
    address: 'Abuja, Nigeria',
    timezone: 'Africa/Lagos',
    currency: 'NGN',
    description: 'Leading real estate platform in Nigeria',
    instagramUrl: '',
    whatsappUrl: '',
    tiktokUrl: '',
  })

  const [currentUsername, setCurrentUsername] =
  useState('')

  const [newUsername, setNewUsername] =
  useState('')

  const [showPassword, setShowPassword] = useState(false)

  const [currentPassword, setCurrentPassword] =
  useState('')

const [newPassword, setNewPassword] =
  useState('')

const [confirmPassword, setConfirmPassword] =
  useState('')

  const handleUsernameChange = async () => {
  try {
    const response = await fetch(
      '/api/auth/change-username',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentUsername,
          newUsername,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    toast.success('Username updated successfully')

    setCurrentUsername('')
    setNewUsername('')
  } catch (error: any) {
    toast.error(error.message)
  }
}

  const handlePasswordChange = async () => {
  if (newPassword !== confirmPassword) {
    toast.error('Passwords do not match')
    return
  }

  try {
    const response = await fetch(
      '/api/auth/change-password',
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    toast.success('Password changed successfully')

    window.location.href = '/auth/login'

    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  } catch (error: any) {
    toast.error(error.message)
  }
}

   const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      const data = await response.json()

      setSettings({
        companyName: data.company_name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        description: data.description || '',
        timezone: data.timezone || 'Africa/Lagos',
        currency: data.currency || 'NGN',
        instagramUrl: data.instagram_url || '',
        whatsappUrl: data.whatsapp_url || '',
        tiktokUrl: data.tiktok_url || '',
      })
    } catch (error) {
      console.error(error)
      toast.error('Failed to load settings')
    }
  }

  // ADD useEffect HERE
  useEffect(() => {
    fetchSettings()
  }, [])

  const handleChange = (field: string, value: unknown) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleSave = async () => {
  try {
    const response = await fetch('/api/settings', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error)
    }

    toast.success('Settings updated successfully')
  } catch (error) {
    console.error(error)
    toast.error('Failed to save settings')
  }
}

  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences
        </p>
      </div>

      {/* Company Information */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Company Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="companyName">Company Name</Label>
            <Input
              id="companyName"
              value={settings.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={settings.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={settings.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Office Address</Label>
            <Input
              id="address"
              value={settings.address}
              onChange={(e) => handleChange('address', e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            value={settings.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
          />
        </div>
      </Card>

      {/* Social Media */}
<Card className="p-6 space-y-6">
  <div className="pb-4 border-b border-border">
    <h2 className="text-xl font-bold">Social Media</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

    <div className="space-y-2">
      <Label>Instagram</Label>
      <Input
        value={settings.instagramUrl}
        onChange={(e) =>
          handleChange('instagramUrl', e.target.value)
        }
        placeholder="https://instagram.com/abzy_properties"
      />
    </div>

    <div className="space-y-2">
      <Label>WhatsApp</Label>
      <Input
        value={settings.whatsappUrl}
        onChange={(e) =>
          handleChange('whatsappUrl', e.target.value)
        }
        placeholder="https://wa.me/234706182854"
      />
    </div>

    <div className="space-y-2">
      <Label>TikTok</Label>
      <Input
        value={settings.tiktokUrl}
        onChange={(e) =>
          handleChange('tiktokUrl', e.target.value)
        }
        placeholder="https://tiktok.com/@abzy_properties"
      />
    </div>

  </div>
</Card>


      {/* Localization */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Globe className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Localization</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select
              value={settings.timezone}
              onValueChange={(value) => handleChange('timezone', value)}
            >
              <SelectTrigger id="timezone">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                <SelectItem value="Africa/Johannesburg">
                  Africa/Johannesburg (SAST)
                </SelectItem>
                <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                <SelectItem value="UTC">UTC</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select
              value={settings.currency}
              onValueChange={(value) => handleChange('currency', value)}
            >
              <SelectTrigger id="currency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN">Nigerian Naira (₦)</SelectItem>
                <SelectItem value="USD">US Dollar ($)</SelectItem>
                <SelectItem value="EUR">Euro (€)</SelectItem>
                <SelectItem value="GBP">British Pound (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 space-y-6">
  <h2 className="text-xl font-bold">Security</h2>

  <div className="space-y-3">

  <div className="space-y-3 border-b pb-6">

  <h3 className="font-semibold">
    Change Username
  </h3>

  <Input
    placeholder="Current Username"
    value={currentUsername}
    onChange={(e) =>
      setCurrentUsername(e.target.value)
    }
  />

  <Input
    placeholder="New Username"
    value={newUsername}
    onChange={(e) =>
      setNewUsername(e.target.value)
    }
  />

  <Button
    type="button"
    onClick={handleUsernameChange}
  >
    Change Username
  </Button>

</div>

  <Input
  type={showPassword ? 'text' : 'password'}
  placeholder="Current Password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)} />

  <Input
  type={showPassword ? 'text' : 'password'}
  placeholder="New Password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)} />

 <Input
  type={showPassword ? 'text' : 'password'}
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)} />

  <Button
  type="button"
  variant="outline"
  onClick={() => setShowPassword(!showPassword)}
>
  {showPassword ? 'Hide Passwords' : 'Show Passwords'}
</Button>

  <Button
    onClick={handlePasswordChange}
    className="w-full"
  >
    Change Password
  </Button>

</div>
</Card>

      {/* Save Button */}
      <div className="flex gap-2">
        <Button onClick={handleSave} className="gap-2">
          <Save className="w-4 h-4" />
          Save Changes
        </Button>
        <Button variant="outline">Cancel</Button>
      </div>
    </div>
  )
}
