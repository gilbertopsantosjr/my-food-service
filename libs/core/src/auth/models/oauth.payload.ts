export type UserPayload = {
  sub?: number
  iat?: number
  exp?: number
  user: number
  name?: string
  email?: string
}

export type UserRecord = {
  id: number
  name: string
  username: string
  type: string
  email: string
}

export type UserRole = {
  roleName: string
}
