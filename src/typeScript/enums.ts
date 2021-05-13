/* eslint-disable no-unused-vars */
export enum httpCode {
  // Success
  // =======================
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  // Error
  // =======================
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,

  // ServerError
  // =======================
  INTERNAL_SERVER_ERROR = 500,
}

export enum Roles {
  'USER',
  'ADMIN',
  'SUPERADMIN',
}
export enum UserType {
  STUDENT = 'Student',
  ASPIRANT = 'Aspirant',
  TEACHER = 'Teacher',
}
