import type { FirebaseUserPayload } from "../../models/FirebaseModel"

export function getGoogleDisplayName(user: FirebaseUserPayload): string {
  return user.name || user.email.split('@')[0]
}

export function getGoogleEmail(user: FirebaseUserPayload): string {
  return user.email;
}

export function getGoogleUID(user: FirebaseUserPayload): string {
  return user.firebase_uid;
}

export function isUnregisteredUserError(error: unknown): boolean {
  return error instanceof Error && error.message.includes('User is not registered')
}