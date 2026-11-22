/**
 * Villa Solmare — Booking Domain Types
 * Strict typing for reservation lifecycle and price calculations.
 */

export interface BookingFormInput {
  arrival: string;
  departure: string;
  guests: number;
  name: string;
  email: string;
  message?: string;
  consent: boolean;
}

export interface BookingValidationResult {
  valid: boolean;
  nights: number;
  error?: string;
}

export interface BookingEstimate {
  ratePerNight: number;
  currency: string;
  nights: number;
  totalBeforeTax: number;
  cleaningFee: number;
  estimatedTotal: number;
}

export interface BookingSubmissionPayload {
  arrival: string;
  departure: string;
  guests: number;
  name: string;
  email: string;
  message?: string;
}

export interface BookingSubmissionResponse {
  success: boolean;
  bookingReference?: string;
  message: string;
  details?: {
    property: string;
    arrival: string;
    departure: string;
    nights: number;
    guests: number;
    guestName: string;
    guestEmail: string;
    ratePerNight: number;
    estimatedTotal: number;
  };
  error?: string;
}
