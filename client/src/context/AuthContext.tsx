import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as authApi from "../api/auth";
import type { LoginDto, RegisterDto, Role, User } from "../types/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => void;
  hasRole: (...roles: Role[]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function storeSession(token: string, user: User) {
  localStorage.setItem("authToken", token);
  localStorage.setItem("authUser", JSON.stringify(user));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsLoading(false);
      return;
    }

    authApi
      .getMe()
      .then((me) => setUser(me))
      .catch(() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("authUser");
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function login(dto: LoginDto) {
    const res = await authApi.login(dto);
    const loggedInUser: User = { id: res.userId, email: res.email, role: res.role };
    storeSession(res.token, loggedInUser);
    setUser(loggedInUser);
  }

  async function register(dto: RegisterDto) {
    const res = await authApi.register(dto);
    const registeredUser: User = { id: res.userId, email: res.email, role: res.role };
    storeSession(res.token, registeredUser);
    setUser(registeredUser);
  }

  function logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
  }

  function hasRole(...roles: Role[]) {
    return !!user && roles.includes(user.role);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, login, register, logout, hasRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
