import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateMockSession = () => {
  return {
    user: {
      id: 'usr_123',
      email: 'demo@neuromassage.com',
      name: 'Neuro User'
    },
    token: 'mock_jwt_token'
  };
};
