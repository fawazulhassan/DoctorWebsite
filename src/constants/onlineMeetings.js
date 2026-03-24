/**
 * Free/no-provider option:
 * We use preset Jitsi room URLs per selected platform.
 * The doctor can still paste/edit the link before opening the meeting.
 */

const BASE_ROOM = 'health-mind-care';
const BASE_URL = `https://meet.jit.si/${BASE_ROOM}`;

// These are "preset/permanent" links that don't require Zoom/Google APIs.
export const WHATSAPP_JOIN_URL = BASE_URL;
export const ZOOM_JOIN_URL = `https://meet.jit.si/${BASE_ROOM}-zoom`;
export const GOOGLE_MEET_JOIN_URL = `https://meet.jit.si/${BASE_ROOM}-google-meet`;

// Fallback when meeting_link is missing and platform is unknown.
export const DEFAULT_JOIN_URL = BASE_URL;

export function getPlatformPresetJoinUrl(onlinePlatform) {
  switch (onlinePlatform) {
    case 'zoom':
      return ZOOM_JOIN_URL;
    case 'google_meet':
      return GOOGLE_MEET_JOIN_URL;
    case 'whatsapp':
      return WHATSAPP_JOIN_URL;
    default:
      return DEFAULT_JOIN_URL;
  }
}

