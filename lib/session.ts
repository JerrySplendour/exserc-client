'use server'

import { cookies } from 'next/headers'
import { SessionPayload } from './definitions'

type Type = 'USER' | 'VERIFICATION'
 
export async function createSession(type: Type, payload: SessionPayload) {
  let expiresAt
  if(type === 'USER'){
    expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  }else if(type === 'VERIFICATION'){
    expiresAt = new Date(Date.now() + 60 * 60 * 1000)
  }
 
  // 3. Store the session in cookies for optimistic auth checks
  const cookieStore = await cookies()
  cookieStore.set( `exserc-${type.toLowerCase()}`, JSON.stringify(payload), {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(type: Type) {
  const cookieStore = await cookies()
  const session = cookieStore.get(`exserc-${type.toLowerCase()}`)
  if (!session) return null
  return JSON.parse(session?.value) as SessionPayload
}

export async function updateSession(type: Type, payload: Partial<SessionPayload>) {
  const session = await getSession(type)
  if (!session) return
  createSession(type, { ...session, ...payload })
  
}

export async function deleteSession(type: Type) {
  const cookieStore = await cookies()
    cookieStore.delete(`exserc-${type.toLowerCase()}`)
}