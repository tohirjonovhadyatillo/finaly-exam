import { useNavigate, Link } from "react-router-dom";
import { signInWithGoogle, signInAsGuest } from "../firebace/firebaceConfig";
import { FcGoogle } from "react-icons/fc";
import { FaUserSecret } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleGuestSignIn = async () => {
    try {
      await signInAsGuest();
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-xl font-semibold mb-4 text-black">Login</h2>

        <button onClick={handleGoogleSignIn} className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center">
          <FcGoogle className="mr-2" /> Continue with Google
        </button>

        <button onClick={handleGuestSignIn} className="w-full mt-3 bg-gray-700 text-white p-2 rounded flex items-center justify-center">
          <FaUserSecret className="mr-2" /> Continue as Guest
        </button>

        <p className="text-gray-600 mt-4">
          Don't have an account? <Link to="/register" className="text-blue-600 font-semibold">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
