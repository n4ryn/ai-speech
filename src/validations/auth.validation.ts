import { z } from "zod/v4";

import type {
  LoginCredentialsType,
  LoginErrorMessage,
  signupCredentialsType,
  SignupErrorMessage,
} from "../types/component.types";

// Login Schema
const loginSchema = z.object({
  email: z.email("Invalid email").trim().toLowerCase(),
  password: z
    .string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
});

// Signup Schema
const signupSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),
    email: z.email("Invalid email").trim().toLowerCase(),
    password: z
      .string()
      .trim()
      .min(8, "Password must be at least 8 characters")
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
        message:
          "Password must contain uppercase, lowercase, number, and special character",
      }),
    confirmPassword: z.string().trim(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Confirm Passwords do not match",
    path: ["confirmPassword"],
  });

// Validation Login Form
export const validateLoginForm = ({
  userData,
  setErrorMessage,
}: {
  userData: LoginCredentialsType;
  setErrorMessage: React.Dispatch<React.SetStateAction<LoginErrorMessage>>;
}) => {
  try {
    loginSchema.parse(userData);
    setErrorMessage({
      email: "",
      password: "",
    });
    return true;
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      const fieldErrors = {
        email: "",
        password: "",
      };
      err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof fieldErrors;
        fieldErrors[field] = issue.message;
      });
      setErrorMessage(fieldErrors);
    }
    return false;
  }
};

// Validation Signup Form
export const validateSignupForm = ({
  userData,
  setErrorMessage,
}: {
  userData: signupCredentialsType;
  setErrorMessage: React.Dispatch<React.SetStateAction<SignupErrorMessage>>;
}) => {
  try {
    signupSchema.parse(userData);
    setErrorMessage({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    return true;
  } catch (err) {
    console.log(err);
    if (err instanceof z.ZodError) {
      const fieldErrors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
      err.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof fieldErrors;
        fieldErrors[field] = issue.message;
      });
      setErrorMessage(fieldErrors);
    }
    return false;
  }
};
