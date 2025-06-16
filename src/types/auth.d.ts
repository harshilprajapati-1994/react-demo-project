export type User = {
  email: string;
};

export type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
};
