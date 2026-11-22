/**
 * Villa Solmare — Admin Domain Types
 * Strict typing for Admin dashboard state, updates, and authentication.
 */

export type AdminTab = "general" | "owner" | "intro" | "walk" | "amenities" | "guests" | "faq" | "raw";

export interface AdminAuthState {
  isAuthenticated: boolean;
  username: string | null;
  checking: boolean;
}

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface AdminConfigUpdateRequest {
  site?: Record<string, unknown>;
  arrival?: Record<string, unknown>;
  booking?: Record<string, unknown>;
  owner?: Record<string, unknown>;
  intro?: Record<string, unknown>;
  walk?: Record<string, unknown>;
  amenities?: readonly unknown[];
  area?: Record<string, unknown>;
  guests?: Record<string, unknown>;
  faq?: Record<string, unknown>;
}

export interface AdminConfigUpdateResponse {
  success: boolean;
  message: string;
  error?: string;
}
