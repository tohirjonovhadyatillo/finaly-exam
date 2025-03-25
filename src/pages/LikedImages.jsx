import { useEffect, useState } from "react";
import { db, auth } from "../firebace/firebaceConfig";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { saveAs } from "file-saver";
import { FaTrash, FaDownload } from "react-icons/fa";

function LikedImages() {
  const [likedImages, setLikedImages] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;

    const likesRef = collection(db, "likes");
    const q = query(likesRef, where("userId", "==", user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const images = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setLikedImages(images);
    });

    return () => unsubscribe();
  }, [user]);

  const handleUnlike = async (imageId) => {
    if (!user) return;
    const likeRef = doc(db, "likes", `${user.uid}_${imageId}`);

    await deleteDoc(likeRef);
    setLikedImages((prev) => prev.filter((img) => img.imageId !== imageId));
  };

  const handleDownload = async (imageUrl) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    saveAs(blob, "downloaded-image.jpg");
  };

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-bold text-center my-6">Liked Images</h2>

      {likedImages.length === 0 ? (
        <p className="text-center text-gray-500">You have no liked images yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {likedImages.map((image) => (
            <div key={image.id} className="relative group rounded-xl shadow-lg overflow-hidden">
              <img
                src={image.imageUrl}
                alt="Liked Image"
                className="w-full h-auto object-cover rounded-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleUnlike(image.imageId)}
                  className="h-9 w-9 border border-white rounded-full flex justify-center items-center cursor-pointer backdrop-blur-sm bg-black bg-opacity-50 text-white transition-all duration-300 hover:scale-110 active:scale-90"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => handleDownload(image.imageUrl)}
                  className="h-9 w-9 border border-white rounded-full flex justify-center items-center cursor-pointer backdrop-blur-sm bg-black bg-opacity-50 text-white transition-all duration-300 hover:scale-110 active:scale-90"
                >
                  <FaDownload />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LikedImages;
