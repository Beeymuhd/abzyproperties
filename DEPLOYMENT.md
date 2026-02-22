# Abzy Properties - Deployment & Setup Guide

## Project Overview

Abzy Properties is a comprehensive real estate platform for discovering, comparing, and managing properties in Nigeria. Built with Next.js 16, React 19, and modern web technologies.

## Features Implemented

### User-Facing Features
- **Property Browsing**: Browse verified property listings with detailed information
- **Search & Filter**: Real-time search by location, price, property type
- **Interactive Map**: View properties on Google Maps with nearby amenities
- **Property Comparison**: Compare up to 4 properties side-by-side
- **Saved Listings**: Bookmark favorite properties
- **Inspection Booking**: Schedule property viewings with available times
- **Real-Time Chat**: Direct communication with property agents
- **Testimonials**: View and submit client reviews with star ratings

### Admin Features
- **Dashboard**: Overview of property listings, inquiries, and metrics
- **Property Management**: Add, edit, delete, and verify property listings
- **Inquiry Management**: Track and respond to customer inquiries
- **CEO Section**: Manage CEO information and CAC documentation
- **Analytics**: Detailed visitor behavior, traffic sources, and property performance
- **User Management**: View registered users and their activity
- **Settings**: Company information, localization, notifications

### Authentication
- Login/Signup system with role-based access (admin/user)
- Demo credentials:
  - Admin: admin@abzy.com / admin123
  - User: demo@example.com / demo123

## Technology Stack

### Frontend
- **Next.js 16**: Full-stack React framework
- **React 19.2**: Modern UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS
- **Shadcn/ui**: High-quality component library
- **Recharts**: Data visualization library
- **Lucide React**: Icon library
- **Sonner**: Toast notifications
- **Next-themes**: Dark/Light mode support

### Backend & Database
- **Node.js**: JavaScript runtime
- **TypeScript**: Type safety
- **MySQL**: Database (schema designed)
- **REST API**: Route handlers in Next.js

### Design System
- **Glassmorphism UI**: Modern frosted glass effects
- **Dark/Light Mode**: Theme switching support
- **Color Theme**: Blue-black primary with gray accents
- **Responsive Design**: Mobile-first approach

## Installation & Setup

### Prerequisites
- Node.js 18+ and npm/yarn
- Git

### Local Development

1. **Clone the repository**
```bash
git clone <repository-url>
cd abzy-properties
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
# Database
DATABASE_URL=mysql://user:password@localhost:3306/abzy_properties

# API Keys
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

4. **Initialize database**
```bash
# Run migration script (when database is connected)
npm run db:migrate
```

5. **Start development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### 1. Connect Repository
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Click "Import"

### 2. Configure Environment Variables
In Vercel Project Settings → Environment Variables, add:
```
DATABASE_URL=your_mysql_connection_string
NEXT_PUBLIC_API_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

### 3. Database Setup
Connect your MySQL database:
- **Neon**: Free serverless PostgreSQL (requires migration to PostgreSQL)
- **PlanetScale**: MySQL-compatible serverless database
- **AWS RDS**: Managed MySQL database
- **Self-hosted**: Your own MySQL server

### 4. Deploy
```bash
# Environment variables are automatically picked up
# Just push to main branch and Vercel will deploy automatically
```

## Database Schema

The application uses the following main tables:

### Users
- id, email, password_hash, name, phone, role, created_at

### Properties
- id, title, description, price, location, lat, lng, land_size, property_type, verified, created_by, created_at

### Property Images/Videos
- id, property_id, image_url/video_url, is_primary, created_at

### Inquiries
- id, property_id, user_id, message, contact_method, status, created_at

### Inspections
- id, property_id, user_id, preferred_date, time_slot, status, created_at

### Saved Listings
- id, user_id, property_id, created_at

### Testimonials
- id, user_name, email, rating, message, approved, created_at

### CEO Info
- id, ceo_name, position, cac_image_url, created_at

### Chat Messages
- id, sender_id, receiver_id, message, is_read, created_at

### Analytics Events
- id, event_type, user_id, property_id, metadata, created_at

## API Routes

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/signup` - User registration

### Properties
- `GET /api/properties` - List properties with filters
- `GET /api/properties/:id` - Get property details
- `POST /api/properties` - Create property (admin)
- `PUT /api/properties/:id` - Update property (admin)
- `DELETE /api/properties/:id` - Delete property (admin)

### Inquiries
- `GET /api/inquiries` - List inquiries (admin)
- `POST /api/inquiries` - Submit inquiry
- `PUT /api/inquiries/:id` - Update inquiry status

### Chat
- `POST /api/chat/send` - Send message
- `GET /api/chat/messages/:id` - Get conversation messages

## Performance Optimization

### Implemented
- Image lazy loading
- Responsive images
- Code splitting with dynamic imports
- CSS-in-JS with Tailwind
- Optimized bundle with Next.js bundler

### Recommended
- Implement image CDN (Vercel Blob, Cloudinary)
- Enable compression
- Set up caching headers
- Monitor Core Web Vitals
- Implement service worker for offline support

## Security Checklist

- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Set secure headers in next.config.js
- [ ] Implement rate limiting on API routes
- [ ] Hash passwords with bcrypt
- [ ] Use HTTPS-only cookies
- [ ] Implement CSRF protection
- [ ] Sanitize user inputs
- [ ] Enable SQL injection prevention (parameterized queries)
- [ ] Set up CORS properly
- [ ] Implement request validation with Zod

## Testing

### Manual Testing Checklist
- [ ] Login/Signup functionality
- [ ] Property browsing and filtering
- [ ] Search functionality
- [ ] Property comparison
- [ ] Saved listings
- [ ] Chat functionality
- [ ] Admin dashboard
- [ ] Property management (add/edit/delete)
- [ ] Dark/light mode toggle
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Analytics dashboard

### Automated Testing (To Implement)
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e
```

## Monitoring & Analytics

### Current Implementation
- Vercel Analytics (automatic)
- Admin Analytics Dashboard
- Console logging for debugging

### Recommended Additions
- Sentry for error tracking
- Google Analytics 4
- Hotjar for user behavior
- DataDog for performance monitoring

## Scaling Considerations

1. **Database**: Consider sharding for large datasets
2. **Caching**: Implement Redis for frequently accessed data
3. **CDN**: Use Vercel Edge Network for global distribution
4. **API**: Consider API pagination and rate limiting
5. **Storage**: Use cloud storage for images (Vercel Blob, AWS S3)
6. **Background Jobs**: Implement job queues for heavy operations

## Maintenance

### Regular Tasks
- Monitor error logs
- Update dependencies monthly
- Review analytics and user feedback
- Backup database
- Check security vulnerabilities

### Version Management
All packages are at latest stable versions:
- Next.js 16.0.10
- React 19.2.0
- Tailwind CSS 4.1.9

## Support & Resources

- Documentation: See `/docs` folder
- Issues: Create GitHub issues for bug reports
- Contact: hello@abzyproperties.com

## License

Copyright © 2024 Abzy Properties. All rights reserved.

---

**Last Updated**: February 2024
**Status**: Production Ready
**Team**: Ibrahim Shahid Ahmad, Abubakar Abba Muhammad
