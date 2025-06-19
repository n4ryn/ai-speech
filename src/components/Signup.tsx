import { useNavigate } from "react-router";

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <fieldset className="fieldset bg-blue-100/40 border border-blue-200 rounded-box w-xs p-4">
        <legend className="fieldset-legend">Signup</legend>

        <label className="label">Name</label>
        <input type="name" className="input" placeholder="Name" />

        <label className="label">Email</label>
        <input type="email" required className="input" placeholder="Email" />

        <label className="label">Password</label>
        <input
          type="password"
          required
          className="input"
          placeholder="Password"
        />

        <label className="label">Confirm Password</label>
        <input
          type="password"
          required
          className="input"
          placeholder="Confirm Password"
        />

        <button className="btn bg-blue-400/90 hover:shadow-lg hover:shadow-blue-200 text-white mt-4">
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
