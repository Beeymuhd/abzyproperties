# System Architecture - Abzy Properties

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                               │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  Homepage / Properties / Admin Dashboard / User Dashboard       │  │
│  │  - React Components                                             │  │
│  │  - Dark/Light Mode                                             │  │
│  │  - Glassmorphism UI                                            │  │
│  │  - Responsive Design                                           │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                 ↕ HTTP/HTTPS                           │
│                           (API Calls & Forms)                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                      VERCEL (Deployment Platform)                      │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  Next.js Server (App Router)                                   │  │
│  │  ┌───────────────────────────────────────────────────────────┐ │  │
│  │  │ API Routes (/app/api)                                     │ │  │
│  │  │  • /auth (login, signup, logout)                         │ │  │
│  │  │  • /properties (CRUD, search, filter)                   │ │  │
│  │  │  • /inquiries (manage inquiries)                        │ │  │
│  │  │  • /inspections (book viewings)                         │ │  │
│  │  │  • /saved-listings (bookmarks)                          │ │  │
│  │  │  • /testimonials (reviews)                              │ │  │
│  │  │  • /ceo-info (profiles)                                 │ │  │
│  │  │  • /cac-registration (documents)                        │ │  │
│  │  │  • /analytics (tracking)                                │ │  │
│  │  │  • /upload (file storage)                               │ │  │
│  │  └───────────────────────────────────────────────────────────┘ │  │
│  │  ┌───────────────────────────────────────────────────────────┐ │  │
│  │  │ Utilities (/lib)                                          │ │  │
│  │  │  • db.ts (MySQL connection pool)                        │ │  │
│  │  │  • password.ts (bcrypt hashing)                         │ │  │
│  │  │  • auth.ts (session management)                         │ │  │
│  │  │  • types.ts (TypeScript interfaces)                     │ │  │
│  │  └───────────────────────────────────────────────────────────┘ │  │
│  └─────────────────────────────────────────────────────────────────┘  │
│                                 ↓                                       │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  Vercel Blob Storage (Cloud Files)                            │  │
│  │  • Property Images                                             │  │
│  │  • CEO Photos                                                 │  │
│  │  • CAC Documents                                              │  │
│  │  • Public URLs                                                │  │
│  └─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌─────────────────────────────────────────────────────────────────────────┐
│                    DATABASE (MySQL / PlanetScale)                       │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │  Tables                                                        │  │
│  │  • users (authentication)                                     │  │
│  │  • properties (listings)                                      │  │
│  │  • property_images (photos)                                   │  │
│  │  • inquiries (leads)                                          │  │
│  │  • inspections (bookings)                                     │  │
│  │  • saved_listings (bookmarks)                                 │  │
│  │  • testimonials (reviews)                                     │  │
│  │  • chat_messages (support)                                    │  │
│  │  • ceo_info (profiles)                                        │  │
│  │  • cac_registration (docs)                                    │  │
│  │  • analytics_events (tracking)                                │  │
│  │  • sessions (auth)                                            │  │
│  ���─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

## Development vs Production

### Local Development
```
Client (localhost:3000)
         ↓
Next.js Dev Server (npm run dev)
         ↓
API Routes (local processing)
         ↓
MySQL (localhost:3306)
```

### Production Deployment
```
Client (vercel domain)
         ↓
Vercel (Global Edge Network)
         ↓
API Routes (Vercel Functions)
         ↓
PlanetScale MySQL (Cloud Database)
         ↓
Vercel Blob (Cloud File Storage)
```

## Data Flow Examples

### Authentication Flow
```
User Input (Email/Password)
         ↓
Frontend Form Validation
         ↓
POST /api/auth/login
         ↓
Backend Verification:
  1. Query user from database
  2. Compare password hash
  3. Generate session token
  4. Store in database
  5. Set HTTP-only cookie
         ↓
Return Session Object
         ↓
Store in Frontend SessionStorage
         ↓
Redirect to Dashboard
```

### Property Creation Flow
```
Admin Form Submit
         ↓
Image Upload:
  1. POST /api/upload
  2. File → Vercel Blob
  3. Get Public URL
         ↓
Property Data + Image URL
         ↓
POST /api/properties
         ↓
Backend Processing:
  1. Validate all fields
  2. Parse JSON fields
  3. Insert into database
  4. Return property ID
         ↓
Frontend Success Message
         ↓
Redirect to Properties List
         ↓
Query Properties from Database
         ↓
Display on Screen
```

### Search & Filter Flow
```
User Search Input + Filters
         ↓
GET /api/properties?search=...&type=...&price=...
         ↓
Backend SQL Query:
  1. Build dynamic SQL
  2. Add WHERE clauses
  3. Add ORDER BY
  4. Execute query
  5. Return results
         ↓
Process Results (100 per page)
         ↓
Display in Grid
```

## File Organization

```
PROJECT ROOT
├── /app                          # Next.js app directory
│   ├── /api                      # 12 API endpoint folders
│   │   ├── /auth
│   │   ├── /properties
│   │   ├── /inquiries
│   │   ├── /inspections
│   │   ├── /saved-listings
│   │   ├── /testimonials
│   │   ├── /ceo-info
│   │   ├── /cac-registration
│   │   ├── /analytics
│   │   └── /upload
│   ├── /admin                    # Admin dashboard
│   │   ├── page.tsx
│   │   ├── /properties
│   │   ├── /inquiries
│   │   ├── /analytics
│   │   ├── /ceo-section
│   │   ├── /settings
│   │   └── /users
│   ├── /auth                     # Authentication pages
│   │   ├── /login
│   │   └── /signup
│   ├── /properties               # Public property pages
│   ├── /dashboard                # User dashboard
│   ├── /chat                     # Chat interface
│   ├── /map                      # Map view
│   ├── /compare                  # Comparison tool
│   ├── /inspections              # Booking system
│   ├── /testimonials             # Reviews
│   ├── /saved-listings           # Bookmarks
│   ├── /about                    # CEO/About section
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   └── providers.tsx             # Theme provider
├── /components                   # Reusable components
│   ├── navbar.tsx
│   ├── /admin
│   └── (other components)
├── /lib                          # Utilities
│   ├── db.ts                     # Database connection
│   ├── password.ts               # Password hashing
│   ├── auth.ts                   # Auth utilities
│   └── types.ts                  # TypeScript types
├── /scripts                      # Scripts
│   ├── init.sql                  # Database schema
│   └── generate-password-hash.js # Utility script
├── /public                       # Static assets
├── .env.example                  # Environment template
├── package.json                  # Dependencies
└── Documentation files (README, SETUP, etc.)
```

## Database Schema

### Users Table
```sql
id (PK)
├── email (UNIQUE)
├── password_hash
├── name
├── phone
├── role (ENUM: user, admin)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)
```

### Properties Table
```sql
id (PK)
├── title
├── description (LONGTEXT)
├── type (ENUM: residential, commercial, land)
├── location
├── price
├── bedrooms
├── bathrooms
├── area_sqft
├── verified (BOOLEAN)
├── agent_name
├── agent_phone
├── agent_email
├── image_url (from Blob)
├── video_url
├── amenities (JSON)
├── created_at
└── updated_at

Indexes:
- type
- location
- price
- FULLTEXT (title, location, description)
```

### Inquiries Table
```sql
id (PK)
├── user_id (FK → users)
├── property_id (FK → properties)
├── name
├── email
├── phone
├── message
├── status (ENUM: new, contacted, scheduled, completed)
├── created_at
└── updated_at

Indexes:
- user_id
- status
- created_at
```

(Similar structure for other tables)

## API Response Format

### Success Response
```json
{
  "id": 1,
  "title": "Property Name",
  "email": "user@example.com",
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "error": "Error message explaining what went wrong"
}
```

### List Response
```json
[
  { "id": 1, "title": "Property 1" },
  { "id": 2, "title": "Property 2" },
  { "id": 3, "title": "Property 3" }
]
```

## Security Layers

```
Layer 1: Client-Side
├── Form validation
├── Input sanitization
└── Session storage (SessionStorage)

Layer 2: Network
├── HTTPS/TLS encryption
└── Secure cookie flags (HttpOnly, Secure, SameSite)

Layer 3: Backend
├── Input validation
├── Parameterized queries
├── Password hashing (bcrypt)
└── Session verification

Layer 4: Database
├── Foreign key constraints
├── Unique constraints
└── Not null constraints
```

## Caching Strategy

```
Browser Cache
├── Static files (CSS, JS)
├── Images (property photos)
└── API responses (short TTL)

Database Cache
├── Connection pooling
├── Query results (via indexes)
└── Session storage
```

## Performance Optimization

```
Database:
├── Indexes on all WHERE columns
├── FULLTEXT index for search
├── Connection pooling (10 connections)
└── Efficient JOINs

Frontend:
├── Code splitting
├── Dynamic imports
├── Image optimization
└── CSS minification

Files:
├── Cloud storage (Vercel Blob)
├── Public CDN URLs
└── Lazy loading
```

## Scaling Considerations

### For 10K Properties
```
✅ No changes needed
- Database indexes handle efficiently
- Pagination on listings
- Search filters reduce results
```

### For 100K+ Users
```
✅ Vercel auto-scales
- Serverless functions scale automatically
- Database read replicas available
- Blob storage auto-scales
```

### For High Traffic
```
✅ Edge caching on Vercel
- Static content cached globally
- API calls routed to nearest region
- Database connection pooling
```

## Disaster Recovery

```
Database Backup:
├── Automated daily backups (PlanetScale)
├── Point-in-time recovery available
└── Replication across regions

File Backup:
├── Vercel Blob versioning
├── Multiple replicas
└── Cross-region redundancy
```

## Monitoring & Logging

```
Vercel Dashboard:
├── Deployment history
├── Build logs
├── Error tracking
├── Performance metrics
└── API analytics
```

---

**This architecture is production-ready and can handle substantial traffic with Vercel's auto-scaling capabilities.**
