import { NextResponse } from "next/server";
import { villa } from "@/config/solmare.config";
import type { BookingSubmissionResponse } from "@/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface RawBookingPayload {
  arrival?: string;
  departure?: string;
  guests?: number | string;
  name?: string;
  email?: string;
  message?: string;
  checkIn?: string;
  checkOut?: string;
}

export async function POST(request: Request): Promise<NextResponse<BookingSubmissionResponse>> {
  try {
    const body = (await request.json()) as RawBookingPayload;
    const { arrival, departure, guests, name, email, checkIn, checkOut } = body;

    const startDateStr = arrival || checkIn;
    const endDateStr = departure || checkOut;
    const guestInput = guests || 2;
    const guestName = name;
    const guestEmail = email;

    if (!startDateStr || !endDateStr || !guestName || !guestEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: "Please fill in all required fields (dates, name, and email).",
        },
        { status: 400 }
      );
    }

    if (typeof guestEmail !== "string" || !EMAIL_REGEX.test(guestEmail.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: "Please provide a valid email address (e.g. name@domain.com).",
        },
        { status: 400 }
      );
    }

    const parsedGuests = Number(guestInput);
    if (isNaN(parsedGuests) || parsedGuests < 1 || parsedGuests > villa.booking.maxGuests) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: `${villa.site.name} accommodates between 1 and ${villa.booking.maxGuests} guests.`,
        },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: "Invalid check-in or checkout date format.",
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const todayMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const startMidnight = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()));

    if (startMidnight < todayMidnight) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: "Check-in date cannot be in the past.",
        },
        { status: 400 }
      );
    }

    const diffTime = endDate.getTime() - startDate.getTime();
    const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (nights < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: "Checkout date must be after check-in date.",
        },
        { status: 400 }
      );
    }

    const rate = villa.booking.priceFrom;
    const totalEstimate = nights * rate;
    const bookingReference = `VS-${Date.now().toString().slice(-6)}-${Math.random()
      .toString(36)
      .substring(2, 5)
      .toUpperCase()}`;

    return NextResponse.json({
      success: true,
      bookingReference,
      message: villa.book.sent,
      details: {
        property: villa.site.name,
        arrival: startDateStr,
        departure: endDateStr,
        nights,
        guests: parsedGuests,
        guestName,
        guestEmail,
        ratePerNight: rate,
        estimatedTotal: totalEstimate,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid payload",
        error: "Invalid request payload format.",
      },
      { status: 400 }
    );
  }
}
