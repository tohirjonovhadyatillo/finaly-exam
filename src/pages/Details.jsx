import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/photos/${id}?client_id=AIzaSyA94G9XZSc2F-1LkdKnn48xD7RlIEeVx04` // Vergulni olib tashlash
        );
        const data = await response.json();

        if (response.ok) {
          setImage(data); // ✅ To‘g‘ridan-to‘g‘ri obyektni saqlash
        } else {
          setError("Image not found"); // Xatolik haqida to'g'ri ma'lumot
        }
      } catch (err) {
        setError(`An error occurred: ${err.message}`);
        console.error("Error fetching document: ", err);
      }
      setLoading(false);
    };

    fetchImageDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border animate-spin border-4 border-t-transparent border-gray-800 rounded-full w-16 h-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 text-blue-500 hover:underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 p-2 bg-gray-800 text-white rounded-full flex items-center gap-2 hover:bg-gray-700 transition"
      >
        <FaArrowLeft /> Back to Gallery
      </button>

      <div className="flex flex-col items-center">
        <img
          src={image?.urls?.regular || "default-image.jpg"} // Rasm URL mavjudligini tekshirish
          alt={image?.alt_description || "Image"}
          className="w-full max-w-3xl mb-6 rounded-lg shadow-md"
        />
        <h1 className="text-3xl font-semibold mb-3 text-center">
          {image?.alt_description || "Untitled Image"}
        </h1>
        <div className="flex flex-col items-center space-y-2">
          <p className="text-lg font-medium text-gray-700">
            By {image?.user?.name || "Unknown"}
          </p>
          <p className="text-lg text-gray-500">Likes: {image?.likes || 0}</p>
          <p className="text-lg text-gray-600">
            {image?.description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
