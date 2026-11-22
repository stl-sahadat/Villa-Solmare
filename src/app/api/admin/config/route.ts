import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "node:fs";
import path from "node:path";
import type { AdminConfigUpdateResponse } from "@/types";

const SESSION_COOKIE_NAME = "solmare_admin_session";
const SESSION_TOKEN = "solmare_authenticated_session_token_xyz987";
const CONFIG_FILE = path.join(process.cwd(), "src/data/site-config.json");

export async function GET(): Promise<NextResponse> {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request): Promise<NextResponse<AdminConfigUpdateResponse>> {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);

    if (!session || session.value !== SESSION_TOKEN) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 401 }
      );
    }

    const newConfig = (await request.json()) as Record<string, unknown>;

    // Ensure directory exists
    fs.mkdirSync(path.dirname(CONFIG_FILE), { recursive: true });
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(newConfig, null, 2), "utf-8");

    return NextResponse.json({ success: true, message: "Configuration updated successfully" });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, message, error: message }, { status: 500 });
  }
}
