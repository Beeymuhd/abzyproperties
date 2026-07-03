'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MessageCircle, Phone, Mail, CheckCircle, Trash2 } from 'lucide-react'
import { toast } from 'sonner'


export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([])
  const [filter, setFilter] = useState('all')

  const filteredInquiries =
    filter === 'all'
      ? inquiries
      : inquiries.filter((i) => i.status === filter)

  const handleMarkResponded = async (id: number) => {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        status: 'responded',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to update inquiry')
    }

    await fetchInquiries()

    toast.success('Inquiry marked as responded')
  } catch (error) {
    console.error(error)
    toast.error('Failed to update inquiry')
  }
}

  const handleDelete = async (id: number) => {
  try {
    const response = await fetch('/api/inquiries', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })

    if (!response.ok) {
      throw new Error('Failed to delete inquiry')
    }

    await fetchInquiries()

    toast.success('Inquiry deleted')
  } catch (error) {
    console.error(error)
    toast.error('Failed to delete inquiry')
  }
}

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'email':
        return <Mail className="w-4 h-4" />
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />
      case 'call':
        return <Phone className="w-4 h-4" />
      default:
        return null
    }
  }

  const handleContactCustomer = (inquiry: any) => {
  console.log(inquiry)

  if (inquiry.method === 'email') {
  window.open(
    `https://mail.google.com/mail/?view=cm&to=${inquiry.contact}`,
    '_blank'
  )
  return
}
if (inquiry.method === 'email') {
  window.location.href = `mailto:${inquiry.contact}`
  return
}

  if (inquiry.method === 'whatsapp') {
    window.open(
      `https://wa.me/${inquiry.contact.replace(/\D/g, '')}`,
      '_blank'
    )
  }

  if (inquiry.method === 'call') {
    window.location.href = `tel:${inquiry.contact}`
  }
}

  const fetchInquiries = async () => {
   try {
     const response = await fetch('/api/inquiries')
     const data = await response.json()

     console.log('INQUIRIES RESPONSE:', data)
     console.log('IS ARRAY:', Array.isArray(data))

     setInquiries(Array.isArray(data) ? data : [])
   }  catch (error) {
     console.error(error)
   }
  }

  useEffect(() => {
  fetchInquiries()
  }, [])

  

  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Customer Inquiries</h1>
          <p className="text-muted-foreground">
            Manage all property inquiries and customer requests
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All ({inquiries.length})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
          >
            Pending (
            {inquiries.filter((i) => i.status === 'pending').length})
          </Button>
          <Button
            variant={filter === 'responded' ? 'default' : 'outline'}
            onClick={() => setFilter('responded')}
          >
            Responded (
            {inquiries.filter((i) => i.status === 'responded').length})
          </Button>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No inquiries found</p>
          </Card>
        ) : (
          filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <h3 className="font-bold text-lg">{inquiry.property}</h3>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.date}
                    </p>
                  </div>
                  <Badge
                    variant={
                      inquiry.status === 'pending' ? 'default' : 'secondary'
                    }
                  >
                    {inquiry.status === 'pending' ? 'Pending' : 'Responded'}
                  </Badge>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Customer Name
                    </p>
                    <p className="font-medium">{inquiry.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">
                      Contact Method
                    </p>
                    <div className="flex items-center gap-2">
                      {getMethodIcon(inquiry.method)}
                      <span className="font-medium capitalize">
                        {inquiry.method}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-muted-foreground mb-1">Contact Info</p>
                    <p className="font-medium text-primary">{inquiry.contact}</p>
                  </div>
                </div>

                {/* Message */}
                <div className="bg-muted/50 rounded-lg p-4">
                  <p className="text-sm">{inquiry.message}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end">
                  {inquiry.status === 'pending' && (
                    <Button
                      onClick={() => handleMarkResponded(inquiry.id)}
                      className="gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Responded
                    </Button>
                  )}
                  <Button
                  variant="outline" onClick={() => handleContactCustomer(inquiry)}>
                   Contact Customer
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(inquiry.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
