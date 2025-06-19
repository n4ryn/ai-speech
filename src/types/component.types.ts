export interface SideBarType {
  isSideBarOpen: boolean;
  setIsSideBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface LoginCredentialsType {
  email: string;
  password: string;
}

export interface signupCredentialsType extends LoginCredentialsType {
  name: string;
  confirmPassword: string;
}

export interface LoginErrorMessage {
  email?: string;
  password?: string;
}

export interface SignupErrorMessage extends LoginErrorMessage {
  name?: string;
  confirmPassword?: string;
}

export interface UserType {
  _id: string;
  name: string;
  email: string;
}

export type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
