import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebace/firebaceConfig";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md">
          <div className="space-y-4">
            <div className="skeleton w-32 h-8 rounded-md"></div>
            <div className="space-y-3">
              <div className="skeleton w-full h-10 rounded-md"></div>
              <div className="skeleton w-full h-10 rounded-md"></div>
              <div className="skeleton w-full h-10 rounded-md"></div>
            </div>
            <div className="skeleton w-full h-12 rounded-md mt-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
