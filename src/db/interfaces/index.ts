export interface RoleAttributes {
  id?: number
  value: string
}

export interface UserAttributes {
  id?: number
  telegramId: number
  userName: string
  fullName: string
  phone?: string
  userType: string
  state: string
  RoleId?: number
  GroupId?: number
}

export interface SubjectAttributes {
  id?: number
  title: string
}

export interface QuestionAttributes {
  id?: number
  name: string
  answer: string
  SubjectId: number
  counter?: number
}

export interface GroupAttributes {
  id?: number
  name: string
}

export enum Roles {
  USER = 1,
  ADMIN = 2,
  SUPERADMIN = 3,
}
