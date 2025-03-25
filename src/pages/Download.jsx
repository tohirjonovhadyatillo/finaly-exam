import { useEffect, useState } from "react";
import { db, auth } from "../firebace/firebaceConfig";
import { collection, query, where, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { FaTrash} from "react-icons/fa";

function Download() {
  const [downloadedImages, setDownloadedImages] = useState([]);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const downloadsRef = collection(db, "downloads");
    const q = query(downloadsRef, where("userId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setDownloadedImages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = async (imageId) => {
    const downloadRef = doc(db, "downloads", `${currentUser.uid}_${imageId}`);
    await deleteDoc(downloadRef);
  };

  return (
    <div className="max-w-4xl mx-auto py-6 px-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Downloaded Images</h2>

      {downloadedImages.length === 0 ? (
        <p className="text-center text-gray-500">No downloaded images yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {downloadedImages.map((image) => (
            <div key={image.id} className="relative group rounded-xl overflow-hidden shadow-lg bg-white">
              <img
                src={image.imageUrl}
                alt="Downloaded"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleDelete(image.imageId)}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Download;
