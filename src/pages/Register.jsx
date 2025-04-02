import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithGoogle, signInAsGuest, signUpWithEmail } from "../firebace/firebaceConfig";
import { FcGoogle } from "react-icons/fc";
import { FaUserSecret } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      await signInAsGuest();
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-black">Create an Account</h2>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        
        <form onSubmit={handleEmailSignUp} className="mb-4">
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded flex items-center justify-center">
            <MdEmail className="mr-2" /> Sign Up with Email
          </button>
        </form>

        <button onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center mb-2">
          <FcGoogle className="mr-2" /> Continue with Google
        </button>
        <button onClick={handleGuestSignIn} className="w-full bg-gray-700 text-white p-2 rounded flex items-center justify-center">
          <FaUserSecret className="mr-2" /> Continue as Guest
        </button>

        <p className="text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;