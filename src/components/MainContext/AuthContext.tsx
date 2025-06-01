import { createContext, useContext, ReactNode } from "react";
import { useAuth0, User } from "@auth0/auth0-react";

interface AuthContextType {
  user: User | undefined;
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { user, isAuthenticated, isLoading, logout: auth0Logout } = useAuth0();

  const logout = (): void => {
    auth0Logout({
      logoutParams: { returnTo: window.location.origin + "/welcome" },
    });
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
