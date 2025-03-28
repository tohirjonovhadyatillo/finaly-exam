import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Img from "./Img.jsx";

function ImgFullContainer({ images }) {
  return (
    <div className="w-full py-10">
      <div className="max-w-screen-2xl w-full mx-auto px-5">
        <ResponsiveMasonry
          columnsCountBreakPoints={{
            350: 1,
            768: 2,
            1024: 3,
            1280: 4,
          }}
        >
          {images.length == 0 ? (
            <p className="text-center text-gray-500">No images found.</p>
          ) : (
            <Masonry gutter="20px">
              {images.map((img) => (
                <div key={img.id} className="w-full">
                  <Img image={img} />
                </div>
              ))}
            </Masonry>
          )}
        </ResponsiveMasonry>
      </div>
    </div>
  );
}

export default ImgFullContainer;