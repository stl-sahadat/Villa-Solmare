# Security & Governance Specifications - Villa Solmare

## 1. Authentication & Session Architecture

### 1.1 Cookie Security Policy
The administrative suite (`/admin`) uses encrypted HTTP session cookies:
* Cookie Name: `solmare_admin_session`
* Flags:
  * `HttpOnly`: Prevents client-side script access via JavaScript (`document.cookie`), mitigating Cross-Site Scripting (XSS) attack vectors.
  * `SameSite=Lax`: Defends against Cross-Site Request Forgery (CSRF).
  * `Secure`: Enforced in production environments so credentials transmit strictly over HTTPS.
  * `Path=/`: Scoped to entire domain with explicit expiry (7-day lifecycle).

### 1.2 Authentication Lifecycle
* Login Route: `POST /api/admin/auth` validates incoming credentials against server-side authorization constants.
* Session Verification: `GET /api/admin/auth` asynchronously reads the session token using Next.js 15 cookies API.
* Logout Route: `DELETE /api/admin/auth` purges the session cookie immediately.

---

## 2. Input Sanitization & Request Validation

### 2.1 Booking API Validation (`POST /api/booking`)
* RFC 5322 Email Verification: Incoming guest emails are checked against standard syntax before processing.
* Date Range Constraints:
  * Check-in date cannot occur in the past (validated against UTC server midnight).
  * Checkout date must occur strictly after check-in date.
  * Nights count must be greater than or equal to 1.
* Occupancy Boundary: Guest count is strictly bounded between 1 and the property maximum (8 guests).
* Type Coercion Defense: Non-numeric and malformed inputs immediately trigger HTTP 400 with structured validation feedback.

---

## 3. Data Protection & Privacy Governance

* Zero Third-Party Advertising: Guest submission records are handled strictly for reservation fulfillment.
* Contact Privacy Masking: Public source code and client bundles display masked contact numbers (`+880 19XX-XXXXXX`) and email formats to prevent automated telephone harvesting.
* Administrative Endpoint Guard: Unauthorized calls to `/api/admin/config` return HTTP 401 Unauthorized without leaking filesystem paths.
