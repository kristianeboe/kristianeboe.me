// =====================================================
// EVENT NAME DEFINITIONS
// =====================================================

export type ServerAnalyticsEventName =
  // Authentication events
  | "user_signed_up" // Real user completes signup (after account creation)
  | "user_account_created" // Account/credential created (OAuth or email)
  | "user_signed_in"
  | "user_signed_out"
  | "user_email_verified"

  // Anonymous user lifecycle
  | "anonymous_user_created" // Guest user created
  | "anonymous_user_converted" // Guest converted to real user

  // User management
  | "user_profile_updated"
  | "user_deleted"

  // Placeholder for your app-specific events
  | "placeholder_server_event";

export type ClientAnalyticsEventName =
  // Authentication UI interactions
  | "sign_up_clicked"
  | "sign_in_clicked"
  | "sign_out_clicked"
  | "conversion_dialog_opened" // Anonymous → real user dialog
  | "conversion_dialog_dismissed"

  // UI interactions
  | "button_clicked"
  | "form_submitted"
  | "page_viewed"

  // Navigation
  | "navigation_clicked"

  // Placeholder for your app-specific events
  | "placeholder_client_event";

// =====================================================
// EVENT PROPERTIES DEFINITIONS
// =====================================================

// =====================================================
// SUPPORTING TYPES
// =====================================================

export type SupportedAuthProvider = "google" | "github";

// =====================================================
// SERVER EVENT PROPERTIES
// =====================================================

export type ServerEventPropertiesDefinition = {
  // Real user signup (discriminated union by method)
  user_signed_up:
    | { method: "anonymous" } // Anonymous user (no credentials yet)
    | { method: "email"; email: string } // Email signup
    | { method: "oauth"; provider: SupportedAuthProvider; email: string }; // OAuth signup

  // Account/credential creation (discriminated union)
  user_account_created:
    | { method: "email" } // Password account created
    | { method: "oauth"; provider: SupportedAuthProvider }; // OAuth account linked

  // Sign in (flexible - can be "email", "google", "github", "credential", etc.)
  user_signed_in: {
    method: string;
  };

  user_signed_out: undefined;

  user_email_verified: {
    email: string;
  };

  // Anonymous user lifecycle
  anonymous_user_created: {
    source: string; // Where they came from (e.g., "landing_page", "checkout")
  };

  anonymous_user_converted: {
    previousUserId: string; // The anonymous user ID
    daysSinceCreation: number; // Time between anonymous creation and conversion
  };

  // User management
  user_profile_updated: {
    fieldsChanged: string[];
  };

  user_deleted: {
    reason?: string;
  };

  placeholder_server_event: {
    // Add your properties here
    exampleProperty?: string;
  };
};

export type ClientEventPropertiesDefinition = {
  // Auth UI interactions
  sign_up_clicked: {
    method: "email" | "google" | "github" | "anonymous";
  };
  sign_in_clicked: {
    method: "email" | "google" | "github";
  };
  sign_out_clicked: undefined;
  conversion_dialog_opened: {
    trigger: string; // What prompted the conversion dialog
  };
  conversion_dialog_dismissed: {
    reason: "cancelled" | "completed" | "closed";
  };

  // General UI interactions
  button_clicked: {
    buttonId: string;
    label: string;
  };
  form_submitted: {
    formId: string;
  };
  page_viewed: {
    path: string;
  };
  navigation_clicked: {
    from: string;
    to: string;
  };
  placeholder_client_event: {
    // Add your properties here
    exampleProperty?: string;
  };
};

// =====================================================
// EXHAUSTIVENESS VALIDATION
// =====================================================

// Helper type - will show TypeScript error if any event is missing properties
type EnsureExhaustiveServerEvents<T> = {
  [K in ServerAnalyticsEventName]: K extends keyof T
    ? T[K]
    : `Missing server event: ${K}`;
};

type EnsureExhaustiveClientEvents<T> = {
  [K in ClientAnalyticsEventName]: K extends keyof T
    ? T[K]
    : `Missing client event: ${K}`;
};

// These enforce exhaustiveness at compile-time
export type ServerEventPropertiesMap =
  EnsureExhaustiveServerEvents<ServerEventPropertiesDefinition>;
export type ClientEventPropertiesMap =
  EnsureExhaustiveClientEvents<ClientEventPropertiesDefinition>;

// =====================================================
// METADATA & TRAITS
// =====================================================

export interface AnalyticsMetadata {
  timestamp?: Date;
  groups?: {
    organization?: string;
    team?: string;
    [key: string]: string | undefined;
  };
  ip?: string; // Auto-extracted if not provided (for PostHog GeoIP)
  isAnonymous?: boolean; // Track if this is an anonymous user
}

export interface UserTraits {
  email?: string;
  name?: string;
  username?: string; // Better Auth username field
  isAnonymous?: boolean; // For anonymous users
  city?: string; // Location tracking
  country?: string; // Location tracking
  [key: string]: unknown;
}

// =====================================================
// COMPILE-TIME VALIDATION
// =====================================================

type ValidateServerEvents =
  keyof ServerEventPropertiesDefinition extends ServerAnalyticsEventName
    ? ServerAnalyticsEventName extends keyof ServerEventPropertiesDefinition
      ? true
      : `Extra server events found: ${Exclude<keyof ServerEventPropertiesDefinition, ServerAnalyticsEventName>}`
    : `Missing server events: ${Exclude<ServerAnalyticsEventName, keyof ServerEventPropertiesDefinition>}`;

type ValidateClientEvents =
  keyof ClientEventPropertiesDefinition extends ClientAnalyticsEventName
    ? ClientAnalyticsEventName extends keyof ClientEventPropertiesDefinition
      ? true
      : `Extra client events found: ${Exclude<keyof ClientEventPropertiesDefinition, ClientAnalyticsEventName>}`
    : `Missing client events: ${Exclude<ClientAnalyticsEventName, keyof ClientEventPropertiesDefinition>}`;

// Compile-time assertions
const _serverEventsValidation: ValidateServerEvents = true;
const _clientEventsValidation: ValidateClientEvents = true;

// Prevent unused variable warnings
export const __typeValidation = {
  _serverEventsValidation,
  _clientEventsValidation,
};
