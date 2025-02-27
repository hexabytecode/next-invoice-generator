export interface UserType {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
  username?: string | null;
  phone_number?: string | null;
}
