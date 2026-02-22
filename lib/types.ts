// User Types
export interface User {
  id: string
  email: string
  password_hash: string
  name: string
  phone?: string
  role: 'user' | 'admin'
  created_at: Date
  updated_at: Date
}

export interface AdminUser extends User {
  role: 'admin'
}

// Property Types
export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  latitude: number
  longitude: number
  land_size: number
  property_type: 'residential' | 'commercial' | 'land'
  amenities: string[]
  verified: boolean
  created_by: string
  created_at: Date
  updated_at: Date
}

export interface PropertyImage {
  id: string
  property_id: string
  image_url: string
  is_primary: boolean
  created_at: Date
}

export interface PropertyVideo {
  id: string
  property_id: string
  video_url: string
  created_at: Date
}

// Communication Types
export interface Inquiry {
  id: string
  property_id: string
  user_id: string
  message: string
  contact_method: 'whatsapp' | 'call' | 'email'
  phone?: string
  email?: string
  status: 'pending' | 'responded' | 'closed'
  created_at: Date
  updated_at: Date
}

export interface Inspection {
  id: string
  property_id: string
  user_id: string
  preferred_date: Date
  time_slot: 'morning' | 'afternoon' | 'evening'
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: Date
  updated_at: Date
}

export interface ChatMessage {
  id: string
  sender_id: string
  receiver_id: string
  message: string
  is_read: boolean
  created_at: Date
}

// User Features Types
export interface SavedListing {
  id: string
  user_id: string
  property_id: string
  created_at: Date
}

export interface Testimonial {
  id: string
  user_name: string
  user_email?: string
  rating: number
  message: string
  approved: boolean
  created_at: Date
}

// CEO & CAC Types
export interface CEOInfo {
  id: string
  ceo_name: string
  position: 'CEO' | 'Co-CEO'
  cac_image_url?: string
  created_at: Date
  updated_at: Date
}

// Analytics Types
export interface AnalyticsEvent {
  id: string
  event_type: string
  user_id?: string
  property_id?: string
  metadata: Record<string, unknown>
  created_at: Date
}

// Auth Session
export interface Session {
  user_id: string
  email: string
  role: 'user' | 'admin'
  created_at: Date
  expires_at: Date
}
