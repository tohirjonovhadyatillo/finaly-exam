import { useEffect, useState } from "react";
import { auth, db } from "../firebace/firebaceConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

function MyProfile() {
  const user = auth.currentUser;
  const [uploadedCount, setUploadedCount] = useState(0);
  const [likedCount, setLikedCount] = useState(0);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const uploadRef = collection(db, "uploads");
        const uploadQuery = query(uploadRef, where("userId", "==", user.uid));
        const uploadSnapshot = await getDocs(uploadQuery);
        setUploadedCount(uploadSnapshot.size);

        const likesRef = collection(db, "likes");
        const likesQuery = query(likesRef, where("userId", "==", user.uid));
        const likesSnapshot = await getDocs(likesQuery);
        setLikedCount(likesSnapshot.size);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">My Profile</h2>

      <div className="flex flex-col items-center">
        <img
          src={
            user?.photoURL ||
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxKV-fKQHr0Z5dIlHUQ-NfViV-5sx0DzkBVA&s"
          }
          alt="Profile"
          className="w-24 h-24 rounded-full border"
        />
        <p className="text-center text-gray-700 mt-2 text-lg font-semibold">
          {user?.displayName || "Anonim bro akkauntizdan kiring"}
        </p>
      </div>

      <div className="mt-5 text-center">
        <p className="text-gray-700 text-md">
          Download Images: <span className="font-bold">{uploadedCount}</span>
        </p>
        <p className="text-gray-700 text-md">
          Liked Images: <span className="font-bold">{likedCount}</span>
        </p>
      </div>
    </div>
  );
}

export default MyProfile;
