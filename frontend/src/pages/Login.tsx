import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login() {
const navigate = useNavigate();

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/dashboard");
  }
}, []);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();


        try {
            const res = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    email,
                    password,
                }
            );

            localStorage.setItem(
                "token",
                res.data.token
            );

            navigate("/dashboard");
        } catch (error) {
            alert("Login Failed");
            console.log(error);
        }


    }

return ( <div className="min-h-screen flex items-center justify-center bg-slate-100"> <form
     onSubmit={handleLogin}
     className="bg-white p-10 rounded-3xl shadow-xl w-[450px]"

   > <h1 className="text-3xl font-bold mb-6">
Login </h1>


    <input
      type="email"
      placeholder="Email"
      className="w-full border p-3 rounded-xl mb-4"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full border p-3 rounded-xl mb-6"
      value={password}
      onChange={(e) =>
        setPassword(
          e.target.value
        )
      }
    />

    <button
      className="
      w-full
      bg-purple-600
      text-white
      py-3
      rounded-xl
      "
    >
      Login
    </button>

    <p className="mt-4 text-center">
      No account?
      <Link
        to="/register"
        className="text-purple-600 ml-2"
      >
        Register
      </Link>
    </p>
  </form>
</div>


);
}

export default Login;
