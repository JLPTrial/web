export type FirebaseUserPayload = {
  firebase_uid: string
  email: string
  name: string
}

export type FirebaseLoginRequest = {
  uid_token: string
}

export type FirebaseSignupRequest = {
  uid_token: string
  name: string
}

export type FirebaseSessionResponse = {
  user: FirebaseUserPayload
}

export default {} as const
