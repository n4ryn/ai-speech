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
  LoginCredentialsType,
  LoginErrorMessage,
} from "../types/component.types";

// Validations
import { validateLoginForm } from "../validations/auth.validation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState<LoginCredentialsType>({
    email: "abc@email.com",
    password: "Password@123",
  });
  const [errorMessage, setErrorMessage] = useState<LoginErrorMessage>({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!validateLoginForm({ setErrorMessage, userData })) return;

    try {
      const res = await axios({
        method: "POST",
        url: import.meta.env.VITE_BASE_URL + "/login",
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
        <legend className="fieldset-legend">Login</legend>

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

        {/* Submit Button */}
        <button
          className="btn bg-blue-400/90 hover:shadow-lg hover:shadow-blue-200 text-white mt-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </fieldset>

      <p className="text-slate-600 mt-4">
        Don't have an account?{" "}
        <button
          className="text-blue-400 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </p>
    </div>
  );
};

export default Login;
