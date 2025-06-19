import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <fieldset className="fieldset bg-blue-100/40 border border-blue-200 rounded-box w-xs p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="email" required className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input
          type="password"
          required
          className="input"
          placeholder="Password"
        />

        <button className="btn bg-blue-400/90 hover:shadow-lg hover:shadow-blue-200 text-white mt-4">
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
