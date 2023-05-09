export interface Users {
  id: number;
  firstName: string;
  lastname: string;
  email: string;
  role: {
    id: number;
    roleName: string;
  };
}
