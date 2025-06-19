// Types
import type { UserType } from "../types/component.types";

// Get Cookie
export const getCookie = (name: string): string | null => {
  const nameEQ = `${name}=`;
  const ca = document.cookie.split(";");

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }

  return null;
};

// Get User
export const getUser = () => {
  const userStr = getCookie("user");
  const user: UserType | null = userStr
    ? JSON.parse(decodeURIComponent(userStr))
    : null;

  return user;
};

// Convert to Minutes
export const convertToMinutes = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  return `${m}:${s < 10 ? "0" : ""}${s} min`;
};
