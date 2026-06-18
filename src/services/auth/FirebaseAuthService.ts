import { apiClient } from '../api/APIClient'
import type { FirebaseUserPayload } from '../../models/FirebaseModel'

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { buildSession, buildGoogleSession, getFirebaseIdToken, USERS_ENDPOINT } from "./SessionUtils";
import { auth } from '../../constants/FirebaseApp';

const googleProvider = new GoogleAuthProvider();

// Login

export async function loginWithEmail(email: string, password: string): Promise<FirebaseUserPayload> {
  await signInWithEmailAndPassword(auth, email, password)
  const uidToken = await getFirebaseIdToken()

  return buildSession('/login', { uid_token: uidToken })
}

export async function loginWithGoogle(): Promise<FirebaseUserPayload> {
  await signInWithPopup(auth, googleProvider)
  return buildGoogleSession()
}

// Cadastro

export async function signUpWithEmail(email: string, password: string, name: string): Promise<FirebaseUserPayload> {
  const credential = await createUserWithEmailAndPassword(auth, email, password)

  const user = credential.user
  const currentName = name.trim() || user.displayName || user.email?.split('@')[0] || 'Usuário'
  const uidToken = await getFirebaseIdToken()

  return buildSession('/signup', {
    uid_token: uidToken,
    name: currentName,
  })
}

// Logout

export async function logout(): Promise<void> {
  await apiClient.post(`${USERS_ENDPOINT}/logout`)
  await signOut(auth)
}