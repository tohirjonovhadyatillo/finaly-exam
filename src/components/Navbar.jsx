import { useEffect, useState } from "react";
import { Sun, Moon, Heart, Download, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebace/firebaceConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FcStackOfPhotos } from "react-icons/fc";

const themeFromLocalStorage = () => localStorage.getItem("theme") || "winter";

function Navbar() {
  const [theme, setTheme] = useState(themeFromLocalStorage());
  const [likedImagesCount, setLikedImagesCount] = useState(0);
  const [downloadedImagesCount, setDownloadedImagesCount] = useState(0);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const likesRef = collection(db, "likes");
    const q = query(likesRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setLikedImagesCount(snapshot.docs.length);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const downloadsRef = collection(db, "downloads");
    const q = query(downloadsRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDownloadedImagesCount(snapshot.docs.length);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <header className="bg-base-200 shadow-md">
      <div className="navbar bg-base-100 flex items-center justify-between px-4 py-3">
        <Link to="/" className="hidden md:flex items-center space-x-2">
          <FcStackOfPhotos className="w-8 h-8" />
          <span className="text-xl font-bold">PhotoApp</span>
        </Link>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
          {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>

        <div className="flex items-center gap-5">
          <Link to="/likedImages">
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">{likedImagesCount}</span>
              <Heart className="h-6 w-6 text-red-500" />
            </div>
          </Link>

          <Link to="/downloads">
            <div className="indicator">
              <span className="indicator-item badge badge-sm badge-secondary">{downloadedImagesCount}</span>
              <Download className="h-6 w-6 text-blue-500" />
            </div>
          </Link>

          <button onClick={toggleTheme} className="btn btn-circle btn-ghost">
            {theme === "winter" ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-blue-300" />}
          </button>

          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || "https://via.placeholder.com/40"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300"
                onClick={() => setShowDropdown(!showDropdown)}
              />
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md z-10">
                  <button onClick={() => navigate("/myprofile")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    My Profile
                  </button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-4 bg-base-100 p-4 shadow-md">
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/about" className="hover:text-primary">About</Link>
          <Link to="/contact" className="hover:text-primary">Contact</Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
