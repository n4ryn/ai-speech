import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

// Components
import Input from "./ui/Input";

// Slices
import { addUser } from "../slices/user.slice";

// Types
import type {
  signupCredentialsType,
  SignupErrorMessage,
} from "../types/component.types";

// Validations
import { validateSignupForm } from "../validations/auth.validation";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<signupCredentialsType>({
    name: "abc",
    email: "abc@email.com",
    password: "Password@123",
    confirmPassword: "Password@123",
  });
  const [errorMessage, setErrorMessage] = useState<SignupErrorMessage>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSignup = async () => {
    if (!validateSignupForm({ setErrorMessage, userData })) return;

    try {
      const res = await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/signup",
        data: userData,
        withCredentials: true,
      });

      dispatch(addUser(res.data.data.user));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <fieldset className="fieldset bg-blue-100/40 border border-blue-200 rounded-box w-xs p-4">
        <legend className="fieldset-legend">Signup</legend>

        {/* Name */}
        <Input
          label="Name"
          type="text"
          placeholder="Name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          errorMessage={errorMessage.name}
        />

        {/* Email */}
        <Input
          label="Email"
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          errorMessage={errorMessage.email}
        />

        {/* Password */}
        <Input
          label="Password"
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          errorMessage={errorMessage.password}
        />

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={userData.confirmPassword}
          onChange={(e) =>
            setUserData({ ...userData, confirmPassword: e.target.value })
          }
          errorMessage={errorMessage.confirmPassword}
        />

        {/* Submit Button */}
        <button
          className="btn bg-blue-400/90 hover:shadow-lg hover:shadow-blue-200 text-white mt-4"
          onClick={handleSignup}
        >
          Signup
        </button>
      </fieldset>

      <p className="text-slate-600 mt-4">
        Already have an account?{" "}
        <button
          className="text-blue-400 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
