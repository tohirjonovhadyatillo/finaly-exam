import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaThumbsUp, FaUserAlt } from "react-icons/fa";

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
          `https://api.unsplash.com/photos/${id}?client_id=bE9M1dTBCb17j6ol7uUtbXhRtHWM9Kc7U5U6FovuAFA`
        );
        const data = await response.json();

        if (response.ok) {
          setImage(data);
        } else {
          setError("Image not found");
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
    <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg m-5">
      <button
        onClick={() => navigate("/")}
        className="mb-6 p-3 bg-gray-800 text-white rounded-full flex items-center gap-2 hover:bg-gray-700 transition-all"
      >
        <FaArrowLeft /> Back to Gallery
      </button>

      <div className="flex flex-col items-center ">
        <img
          src={image?.urls?.regular || "default-image.jpg"} 
          alt={image?.alt_description || "Image"}
          className="w-full sm:w-96 md:w-80 lg:w-96 xl:w-1/2 rounded-lg shadow-xl mb-6 transition-transform duration-300 hover:scale-105"
        />
        <h1 className="text-3xl font-semibold mb-4 text-center text-gray-800">
          {image?.alt_description || "Untitled Image"}
        </h1>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-gray-700">
            <FaUserAlt className="text-lg" />
            <p className="text-lg font-medium">{image?.user?.name || "Unknown"}</p>
          </div>
          <div className="flex items-center space-x-2 text-gray-500">
            <FaThumbsUp className="text-lg" />
            <p className="text-lg">{image?.likes || 0} Likes</p>
          </div>
          <p className="text-lg text-gray-600 text-center">
            {image?.description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;
