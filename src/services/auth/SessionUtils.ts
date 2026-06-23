import { auth } from "../../constants/FirebaseApp";
import { apiClient } from "../api/APIClient";
import type {
  FirebaseLoginRequest,
  FirebaseSessionResponse,
  FirebaseUserPayload,
  FirebaseSignupRequest,
} from "../../models/FirebaseModel";
import { getGoogleDisplayName, isUnregisteredUserError } from "./GoogleAuthUtils";

type SessionBody = FirebaseLoginRequest | FirebaseSignupRequest

export const USERS_ENDPOINT = '/users'

export async function buildSession(endpoint: '/login' | '/signup', body: SessionBody): Promise<FirebaseUserPayload> {
  const response = await apiClient.post<FirebaseSessionResponse>(`${USERS_ENDPOINT}${endpoint}`, body)

  return response.user
}

export async function buildGoogleSession(): Promise<FirebaseUserPayload> {
  const uidToken = await getFirebaseIdToken()

  try {
    return await buildSession('/login', { uid_token: uidToken })
  } catch (error) {
    if (!isUnregisteredUserError(error)) {
      throw error
    }

    const currentUser = auth.currentUser
    if (!currentUser || !currentUser.email) {
      throw new Error('Usuário do Google não está autenticado')
    }

    return buildSession('/signup', {
      uid_token: uidToken,
      name: getGoogleDisplayName({
        firebase_uid: currentUser.uid,
        email: currentUser.email,
        name: currentUser.displayName ?? '',
      }),
    })
  }
}

export async function getFirebaseIdToken(): Promise<string> {
  const user = auth.currentUser

  if (!user) {
    throw new Error('Usuário do Firebase não está autenticado')
  }

  return user.getIdToken()
}

export async function refreshSession(): Promise<FirebaseUserPayload> {
  const response = await apiClient.post<FirebaseSessionResponse>(`${USERS_ENDPOINT}/refresh`)

  return response.user
}