import { useEffect, useState } from "react";
import Search from "../components/Search";
import { useActionData } from "react-router-dom";
import axios from "axios";
import ImgContainer from "../components/ImgContainer";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let search = formData.get("search");
  return { search };
};

function Home() {
  const actionData = useActionData();
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("all");

  useEffect(() => {
    if (actionData?.search) {
      setSearchQuery(actionData.search);
      setPage(1);
    }
  }, [actionData]);

  const fetchImages = async (pageNumber) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = "bE9M1dTBCb17j6ol7uUtbXhRtHWM9Kc7U5U6FovuAFA";
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query: searchQuery, page: pageNumber, per_page: 12 },
        headers: { Authorization: `Client-ID ${apiKey}` },
      });

      if (response.status === 200) {
        setImages((prev) =>
          pageNumber == 1 ? response.data.results : [...prev, ...response.data.results]
        );
      } else {
        throw new Error(`Failed to fetch images: ${response.status}`);
      }
    } catch (error) {
      setError(error.response?.data?.errors?.[0] || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(1);
  }, [searchQuery]);

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(nextPage);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-base-200">
      <div className="my-10 w-full max-w-3xl px-4">
        <Search />
      </div>
      <div className="w-full max-w-5xl px-4">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(12)].map((_, index) => (
              <div key={index} className="skeleton w-full h-48 rounded-lg"></div>
            ))}
          </div>
        ) : images.length > 0 ? (
          <ImgContainer images={images} />
        ) : (
          !loading && !error && <p className="text-center text-gray-500">No images found.</p>
        )}
      </div>

      {error && <p className="text-red-500 text-center my-5">{error}</p>}
      {!loading && (
        <button
          onClick={loadMoreImages}
          className="btn btn-primary mt-4 mb-8"
        >
          Load More
        </button>
      )}
    </div>
  );
}

export default Home;
