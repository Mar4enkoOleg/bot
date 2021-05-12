import { Roles } from './enums';

export interface SubjectAttributes {
  id?: number;
  title: string;
}

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
