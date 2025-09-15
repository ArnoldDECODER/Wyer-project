export interface User {
  id: number;
  email: string;
  tenantId: number;
}

export interface OtpRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}