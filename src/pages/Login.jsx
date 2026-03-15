import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {

  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();
    setError("");

    try {

      setLoading(true);

      const response = await fetch(
        "https://unitconverter-backend.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await response.json();

      login(data.token);

      navigate("/dashboard");

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="auth-page">

      <div className="container">

        <div className="drop">

          <div className="content">

            <h2>Login to continue</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>

              <div className="inputBox">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
              </div>

              <div className="inputBox submitBox">
                <input
                  type="submit"
                  value={loading ? "Logging in..." : "Login"}
                />
              </div>

            </form>

          </div>

        </div>

        <Link to="/register" className="btns signup">
          Register
        </Link>

      </div>

    </div>

  );

};

export default Login;