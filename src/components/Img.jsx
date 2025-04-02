import { useState, useEffect } from "react";
import { FaRegHeart, FaHeart, FaDownload } from "react-icons/fa";
import { saveAs } from "file-saver";
import { db, auth } from "../firebace/firebaceConfig";
import { doc, setDoc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory

function Img({ image }) {
  const { urls, alt_description, user, id } = image;
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  const currentUser = auth.currentUser;
  const navigate = useNavigate();  // Initialize useNavigate hook for navigation

  useEffect(() => {
    if (currentUser) {
      const likeRef = doc(db, "likes", `${currentUser.uid}_${id}`);

      const unsubscribe = onSnapshot(likeRef, (docSnap) => {
        setLiked(docSnap.exists());
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [currentUser, id]);

  const handleLikeClick = async () => {
    if (!currentUser) {
      alert("Iltimos, like bosish uchun tizimga kiring!");
      return;
    }

    const likeRef = doc(db, "likes", `${currentUser.uid}_${id}`);

    if (liked) {
      await deleteDoc(likeRef);
    } else {
      await setDoc(likeRef, {
        userId: currentUser.uid,
        imageId: id,
        imageUrl: urls.regular,
        likedAt: new Date(),
      });
    }
  };

  const handleDownload = async () => {
    const response = await fetch(urls.full);
    const blob = await response.blob();
    saveAs(blob, "downloaded-image.jpg");

    if (currentUser) {
      const downloadRef = doc(db, "downloads", `${currentUser.uid}_${id}`);
      await setDoc(downloadRef, {
        userId: currentUser.uid,
        imageId: id,
        imageUrl: urls.regular,
        downloadedAt: new Date(),
      });
    }
  };

  // Handle the click to navigate to the details page
  const handleImageClick = () => {
    navigate(`/details/${id}`);  // Navigate to details page with the image ID
  };

  return (
    <div className="relative group overflow-hidden rounded-xl shadow-lg w-full">
      <span
        className={`absolute h-9 w-9 border border-white rounded-full flex justify-center items-center cursor-pointer right-3 top-3 z-10 
        backdrop-blur-sm bg-black bg-opacity-50 transition-all duration-200 hover:scale-110 active:scale-90 ${
          liked ? "text-red-500" : "text-white"
        }`}
        onClick={handleLikeClick}
      >
        {loading ? (
          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
        ) : liked ? (
          <FaHeart className="animate-pulse" />
        ) : (
          <FaRegHeart />
        )}
      </span>

      <img
        src={urls.regular}
        alt={alt_description || "Unsplash image"}
        className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
        loading="lazy"
        onClick={handleImageClick}  // Handle click to navigate
      />

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 text-white text-xs md:text-sm px-3 py-2 rounded-lg opacity-90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          {user?.profile_image?.large && (
            <img
              src={user.profile_image.large}
              alt={user.name || "User avatar"}
              className="w-8 h-8 rounded-full border border-white"
            />
          )}
          <p className="text-white font-medium truncate max-w-[120px]">{user.name}</p>
        </div>

        <button
          onClick={handleDownload}
          className="h-9 w-9 border border-white rounded-full flex justify-center items-center cursor-pointer backdrop-blur-sm bg-black bg-opacity-40 transition-all duration-300 hover:scale-110 active:scale-90"
        >
          <FaDownload className="text-white text-sm" />
        </button>
      </div>
    </div>
  );
}

export default Img;
