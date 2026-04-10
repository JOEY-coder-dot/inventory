import { jwtDecode } from "jwt-decode";

export const saveAuthData = (token) => {
  localStorage.setItem("token", token);
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};

export const getUsername = () => {
  const token = localStorage.getItem("token");
  if (!token) return "Guest";

  try {
    const decoded = jwtDecode(token);
    return decoded.username || "Guest"; // ✅ read from payload
  } catch (err) {
    console.error("Token decode error:", err);
    return "Guest";
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
