import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("userLogged");

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = savedUsers.find(
      (u: User) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("userLogged", JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const register = (email: string, password: string) => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = savedUsers.find(
      (u: User) => u.email === email
    );

    if (exists) {
      return false;
    }

    const newUser = { email, password };

    savedUsers.push(newUser);

    localStorage.setItem(
      "users",
      JSON.stringify(savedUsers)
    );

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userLogged");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe usarse dentro de AuthProvider"
    );
  }

  return context;
};