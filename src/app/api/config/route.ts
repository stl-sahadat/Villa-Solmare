import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";

const CONFIG_FILE = path.join(process.cwd(), "src/data/site-config.json");

export async function GET() {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      const data = JSON.parse(fs.readFileSync(CONFIG_FILE, "utf-8"));
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: "Config not found" }, { status: 404 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
