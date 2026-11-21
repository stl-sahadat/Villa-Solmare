import { NextResponse } from "next/server";
import { villa } from "@/config/solmare.config";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { arrival, departure, guests, name, email, message, checkIn, checkOut, notes } = body;

    const startDateStr = arrival || checkIn;
    const endDateStr = departure || checkOut;
    const guestInput = guests || 2;
    const guestName = name;
    const guestEmail = email;

    if (!startDateStr || !endDateStr || !guestName || !guestEmail) {
      return NextResponse.json(
        { error: "Please fill in all required fields (dates, name, and email)." },
        { status: 400 }
      );
    }

    if (typeof guestEmail !== "string" || !EMAIL_REGEX.test(guestEmail.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address (e.g. name@domain.com)." },
        { status: 400 }
      );
    }

    const parsedGuests = Number(guestInput);
    if (isNaN(parsedGuests) || parsedGuests < 1 || parsedGuests > villa.booking.maxGuests) {
      return NextResponse.json(
        {
          error: `${villa.site.name} accommodates between 1 and ${villa.booking.maxGuests} guests.`,
        },
        { status: 400 }
      );
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      return NextResponse.json(
        { error: "Invalid check-in or checkout date format." },
        { status: 400 }
      );
    }

    const now = new Date();
    const todayMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
    const startMidnight = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()));

    if (startMidnight < todayMidnight) {
      return NextResponse.json(
        { error: "Check-in date cannot be in the past." },
        { status: 400 }
      );
    }

    const diffTime = endDate.getTime() - startDate.getTime();
    const nights = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (nights < 1) {
      return NextResponse.json(
        { error: "Checkout date must be after check-in date." },
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
    return NextResponse.json({ error: "Invalid request payload." }, { status: 400 });
  }
}
