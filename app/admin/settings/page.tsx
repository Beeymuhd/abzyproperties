'use client'

import { useState } from 'react'
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
import { Bell, Lock, Globe, Users, Save } from 'lucide-react'
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
    notificationsEnabled: true,
    emailAlerts: true,
  })

  const handleChange = (field: string, value: unknown) => {
    setSettings({ ...settings, [field]: value })
  }

  const handleSave = () => {
    toast.success('Settings updated successfully')
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

      {/* Notifications */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">System Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive alerts about new inquiries and properties
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.notificationsEnabled}
              onChange={(e) =>
                handleChange('notificationsEnabled', e.target.checked)
              }
              className="w-5 h-5 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-medium">Email Alerts</p>
              <p className="text-sm text-muted-foreground">
                Get email notifications for important events
              </p>
            </div>
            <input
              type="checkbox"
              checked={settings.emailAlerts}
              onChange={(e) => handleChange('emailAlerts', e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </Card>

      {/* Security */}
      <Card className="p-6 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-border">
          <Lock className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Security</h2>
        </div>

        <div className="space-y-4">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Change Admin Password
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            View Login History
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Manage API Keys
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
