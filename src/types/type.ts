export enum Role {
  Admin = 0,
  User = 1,
}
export enum SaveOptions {
  JUST_ME = "draft",
  PUBLIC = "public",
}

export type Display = SaveOptions;
export interface BackendToken {
  access_token: string;
  refresh_token: string;
  expiresIn: number;
}

export interface ResponseError {
  error: string;
  message: string;
  statusCode: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface Auth {
  name: string;
  email: string;
  _id: string;
  avatar_url: string;
  verified: boolean;
  role: Role;
  viewHistory: [];
  createdAt: string;
  updatedAt: string;
}

export interface HashTag {
  _id: string;
  name: string;
  slug: string;
}
export interface Post {
  _id: string;
  author: Auth | string;
  title: string;
  hashtags: HashTag[];
  description: string;
  content: string;
  display: Display;
  createdAt: string;
  updatedAt: string;
}

export interface PostFormData
  extends Omit<
    Post,
    "hashtags" | "_id" | "author" | "createdAt" | "updatedAt"
  > {
  hashtags: string[];
}

export interface PaginateResponse<T> {
  totalDocs: number;
  totalPages: number;
  page: number;
  limit: number;
  prevPage: number | null;
  nextPage: number | null;
  docs: T[];
}

export interface ImageType {
  createdAt: string;
  format: string;
  height: number;
  original_filename: string;
  public_id: string;
  resource_type: string;
  secure_url: string;
  type: string;
  updatedAt: string;
  url: string;
  user: string;
  width: number;
  _id: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

export interface UpdateProfileData {
  avatar_url?: string;
  name?: string;
}
