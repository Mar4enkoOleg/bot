export interface RoleAttributes {
  id?: number;
  value: string;
}

export interface UserAttributes {
  id?: number;
  telegramId: number;
  userName?: string;
  fullName?: string;
  phone?: string;
  userType?: string;
  state?: string;
  role?: Roles;
  GroupId?: number;
}

export interface SubjectAttributes {
  id?: number;
  title: string;
}

export interface QuestionAttributes {
  id?: number;
  name: string;
  answer: string;
  SubjectId: number;
  counter?: number;
}

export interface GroupAttributes {
  id?: number;
  name: string;
}

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPERADMIN',
}
export enum UserType {
  STUDENT = 'Student',
  ASPIRANT = 'Aspirant',
  TEACHER = 'Teacher',
}
