import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);

  const handleSubmit = async (e)=>{

    e.preventDefault();
    setError("");

    try{

      setLoading(true);

      const response = await fetch(
        "https://unitconverter-backend.onrender.com/api/auth/register",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(form)
        }
      );

      if(!response.ok){
        throw new Error("Registration failed");
      }

      navigate("/");

    }
    catch(err){
      setError(err.message);
    }
    finally{
      setLoading(false);
    }

  };

  return (

    <div className="auth-page">

      <div className="container">

        <div className="drop">

          <div className="content">

            <h2>Register</h2>

            {error && <p style={{color:"red"}}>{error}</p>}

            <form onSubmit={handleSubmit}>

              <div className="inputBox">
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  onChange={(e)=>setForm({...form,name:e.target.value})}
                />
              </div>

              <div className="inputBox">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e)=>setForm({...form,email:e.target.value})}
                />
              </div>

              <div className="inputBox">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e)=>setForm({...form,password:e.target.value})}
                />
              </div>

              <div className="inputBox submitBox">
                <input
                  type="submit"
                  value={loading ? "Registering..." : "Register"}
                />
              </div>

            </form>

          </div>

        </div>

        <Link to="/" className="btns signup">
          Login
        </Link>

      </div>

    </div>

  );

};

export default Register;