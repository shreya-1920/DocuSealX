import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
const navigate = useNavigate();

const [name, setName] =
useState("");

const [email, setEmail] =
useState("");

const [password, setPassword] =
useState("");

const handleRegister = async (
e: React.FormEvent
) => {
e.preventDefault();


try {
  await axios.post(
    "http://localhost:5000/api/auth/register",
    {
      name,
      email,
      password,
    }
  );

  alert(
    "Registered Successfully"
  );

  navigate("/login");
} catch (error) {
  alert(
    "Registration Failed"
  );

  console.log(error);
}


};

return ( <div className="min-h-screen flex items-center justify-center bg-slate-100"> <form
     onSubmit={handleRegister}
     className="bg-white p-10 rounded-3xl shadow-xl w-[450px]"
   > <h1 className="text-3xl font-bold mb-6">
Register </h1>


    <input
      type="text"
      placeholder="Name"
      className="w-full border p-3 rounded-xl mb-4"
      value={name}
      onChange={(e) =>
        setName(e.target.value)
      }
    />

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
      Register
    </button>

    <p className="mt-4 text-center">
      Already have an account?
      <Link
        to="/login"
        className="text-purple-600 ml-2"
      >
        Login
      </Link>
    </p>
  </form>
</div>


);
}

export default Register;
