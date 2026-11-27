import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import type { AdminLoginRequest, AdminLoginResponse } from "@/types";

const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "440055";
const SESSION_COOKIE_NAME = "solmare_admin_session";
const SESSION_TOKEN = "solmare_authenticated_session_token_xyz987";

export async function POST(request: Request): Promise<NextResponse<AdminLoginResponse>> {
  try {
    const body = (await request.json()) as AdminLoginRequest;
    const { username, password } = body;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });

      return NextResponse.json({ success: true, message: "Authenticated successfully" });
    }

    return NextResponse.json({ success: false, error: "Invalid username or password" }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: "Authentication failed" }, { status: 500 });
  }
}

export async function GET(): Promise<NextResponse<{ authenticated: boolean }>> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);

  if (session && session.value === SESSION_TOKEN) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE(): Promise<NextResponse<{ success: boolean }>> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  return NextResponse.json({ success: true });
}
