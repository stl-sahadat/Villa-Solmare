# Database & Data Schema Specification - Villa Solmare

## 1. Storage Architecture

Villa Solmare employs a dual-tier persistence model:
1. File-System JSON Database (`src/data/site-config.json`): Serves as the primary source of truth for runtime configurations, pricing, and textual content.
2. In-Memory Domain Layer (`src/config/solmare.config.ts`): Applies strict TypeScript schemas (`VillaConfig`) over raw JSON data, guaranteeing type safety at compile and runtime.

---

## 2. Entity Schemas

### 2.1 Site Configuration Entity
```json
{
  "site": {
    "name": "Villa Solmare",
    "title": "Villa Solmare — Clifftop Coastal Sanctuary | Bay of Bengal, Bangladesh",
    "description": "An ultra-luxury coastal stone sanctuary...",
    "url": "https://villa-solmare.example.com",
    "lang": "en"
  }
}
```

### 2.2 Booking & Rate Configuration Entity
```json
{
  "booking": {
    "priceFrom": 85000,
    "currency": "BDT",
    "maxGuests": 8,
    "minNights": 2,
    "checkIn": "15:00",
    "checkOut": "11:00"
  }
}
```

### 2.3 Owner & Contact Profile Entity
```json
{
  "owner": {
    "name": "Md Sahadat Hossain",
    "phone": "+880 19XX-XXXXXX",
    "whatsapp": "8801900000000",
    "email": "sahadat.xxxx@gmail.com",
    "instagram": "stlsahadat",
    "street": "Barura",
    "city": "Comilla",
    "country": "Bangladesh"
  }
}
```

### 2.4 Guest Review Entity
```json
{
  "author": "Tanvir Ahmed",
  "from": "Dhaka",
  "when": "November 2026",
  "nights": 7,
  "quote": "We had dinner on the terrace every night watching the sunset into the Bay of Bengal..."
}
```

### 2.5 Area Distance Entity
```json
{
  "name": "Inani Coral Beach",
  "minutes": 4,
  "by": "on foot"
}
```

---

## 3. Booking Transaction Schema

Incoming booking requests submit payloads adhering to the following structure:
```typescript
interface BookingSubmissionPayload {
  arrival: string;       // ISO 8601 YYYY-MM-DD
  departure: string;     // ISO 8601 YYYY-MM-DD
  guests: number;        // 1 through 8
  name: string;          // Full name string
  email: string;         // Standard RFC 5322 compliant email
  message?: string;      // Optional guest notes
}
```

Upon validation, the reservation engine returns:
```typescript
interface BookingSubmissionResponse {
  success: boolean;
  bookingReference: string; // E.g. "VS-178439-I0T"
  message: string;
  details: {
    property: string;
    arrival: string;
    departure: string;
    nights: number;
    guests: number;
    guestName: string;
    guestEmail: string;
    ratePerNight: number;   // E.g. 85000
    estimatedTotal: number; // E.g. nights * ratePerNight
  };
}
```

---

## 4. Mutation Lifecycle & Concurrency

1. Administrative Updates:
   * Client sends authenticated `POST /api/admin/config` payload.
   * Route handler verifies `solmare_admin_session` cookie against the server secret token.
   * Upon authentication, the JSON payload is safely synchronized to `src/data/site-config.json` via synchronous atomic file write.
   * Server responds with HTTP 200 and cache revalidation headers.
