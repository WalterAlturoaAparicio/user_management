export interface BusinessType {
  id: number;
  name: string;
  description: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  users?: User[];
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  refreshToken?: string;
  userName?: string;
  role: Role;
  resetTokens?: PasswordResetToken[];
  auditLogs?: AuditLog[];
  createdAt: Date;
  admin?: User;
  managedUsers?: User[];
}

export interface PasswordResetToken {
  id: number;
  userId: number;
  token: string;
  user: User;
  createdAt: Date;
  expiresAt: Date;
}

export interface AuditLog {
  id: number;
  userId: string;
  action: string;
  user: User;
  timestamp: Date;
}
