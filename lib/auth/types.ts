export type User = {
  id: number;
  email: string;
  displayName: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type AuthResponse = {
  user: User;
};

export type AuthError = {
  error: string;
};

// WP JWT Authentication plugin response
export type WPJwtTokenResponse = {
  token: string;
  user_email: string;
  user_nicename: string;
  user_display_name: string;
};
