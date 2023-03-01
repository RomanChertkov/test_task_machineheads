export interface UserProfile {
  id: number
  phone: string
  email: string
  name: string
  lastName: string
  secondName: string
  roles: Role[]
  status: Status
  isActive: boolean
  updatedAt: Date
  createdAt: Date
}

interface Role {
  role: string
  name: string
}

interface Status {
  code: number
  name: string
}

export interface LoginData {
  email: string
  password: string
}
