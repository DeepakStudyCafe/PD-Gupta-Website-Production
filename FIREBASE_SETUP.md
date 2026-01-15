# Firebase Initial Data Setup

This document shows how to initialize your Firestore database with default content.

## Option 1: Using Firebase Console

1. Go to Firebase Console > Firestore Database
2. Create the following collections and documents:

### Collection: `siteContent`

#### Document: `home`
```json
{
  "hero": {
    "title": "PD Gupta & CO — Chartered Accountants",
    "subtitle": "Trusted Financial Partners for Businesses and Individuals",
    "description": "We provide expert financial consulting, tax filing, audit services, and comprehensive accounting solutions for startups, SMEs, and large enterprises across India.",
    "cta1": "Book Consultation",
    "cta2": "Know More"
  },
  "services": [
    {
      "id": 1,
      "title": "Tax Planning & Filing",
      "description": "Comprehensive income tax planning, return filing, and advisory services for individuals and businesses.",
      "icon": "calculator"
    },
    {
      "id": 2,
      "title": "GST Registration & Returns",
      "description": "Complete GST compliance solutions including registration, monthly/quarterly returns, and refund claims.",
      "icon": "file-text"
    },
    {
      "id": 3,
      "title": "Business Auditing",
      "description": "Statutory audit, internal audit, tax audit, and stock audit services with detailed reporting.",
      "icon": "search"
    },
    {
      "id": 4,
      "title": "Financial Consulting",
      "description": "Strategic financial planning, investment advisory, and business valuation services.",
      "icon": "trending-up"
    },
    {
      "id": 5,
      "title": "Startup Advisory",
      "description": "End-to-end support for startups including incorporation, funding, and compliance management.",
      "icon": "rocket"
    },
    {
      "id": 6,
      "title": "Accounting & Bookkeeping",
      "description": "Accurate bookkeeping, financial statement preparation, and MIS reporting services.",
      "icon": "book-open"
    }
  ],
  "updatedAt": "2026-01-06T00:00:00Z"
}
```

#### Document: `testimonials`
```json
{
  "list": [
    {
      "id": 1,
      "name": "Rajesh Kumar",
      "company": "Tech Innovations Pvt Ltd",
      "message": "PD Gupta & CO has been instrumental in managing our company's finances. Their proactive approach to tax planning saved us significant costs. Highly professional and reliable!",
      "rating": 5
    },
    {
      "id": 2,
      "name": "Anita Desai",
      "company": "Fashion Hub",
      "message": "As a small business owner, I was overwhelmed with GST compliance. The team made everything simple and stress-free. Their expertise is unmatched!",
      "rating": 5
    },
    {
      "id": 3,
      "name": "Vikram Singh",
      "company": "Manufacturing Solutions",
      "message": "Excellent audit services! The team is thorough, detail-oriented, and always available for queries. They've been our trusted partners for 5 years.",
      "rating": 5
    },
    {
      "id": 4,
      "name": "Priya Malhotra",
      "company": "Startup Founder",
      "message": "From incorporation to funding support, PD Gupta & CO guided us every step. Their startup advisory services are exceptional!",
      "rating": 5
    }
  ]
}
```

### Collection: `blogs`

#### Document: `understanding-gst-compliance-2026`
```json
{
  "slug": "understanding-gst-compliance-2026",
  "title": "Understanding GST Compliance in 2026: A Complete Guide",
  "summary": "Stay updated with the latest GST regulations and learn how to maintain 100% compliance for your business in 2026.",
  "content": "<h2>Introduction to GST Compliance</h2><p>Goods and Services Tax (GST) compliance is crucial for every business operating in India. This comprehensive guide will help you understand the essentials of GST compliance in 2026.</p><h2>Key Compliance Requirements</h2><ul><li>Regular GST return filing</li><li>Maintaining proper invoices and records</li><li>Input Tax Credit (ITC) reconciliation</li><li>GST payment on time</li></ul><h2>Recent Changes in 2026</h2><p>Several important amendments have been introduced to simplify GST compliance...</p>",
  "image": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800",
  "author": "CA Deepak Sharma",
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-01-01T00:00:00Z"
}
```

## Option 2: Using Firebase Admin SDK

Create a script to initialize data programmatically (not included in this project).

## Option 3: Through Admin Dashboard

1. Login to `/admin/login` with your admin credentials
2. Navigate to each section and enter content
3. Save changes - they will be stored in Firestore

## Admin User Setup

1. Go to Firebase Console > Authentication
2. Click "Add User"
3. Email: `admin@sharmaassociates.in`
4. Password: Choose a secure password
5. Click "Add User"

This email matches the one in your `.env.local` file.

## Notes

- The website will use default content from `lib/defaultContent.js` if Firestore data is not available
- Update Firestore to override defaults
- All changes via admin dashboard are saved to Firestore
- ISR revalidation ensures updates appear within 60 seconds
