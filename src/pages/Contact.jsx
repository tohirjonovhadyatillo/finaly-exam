import { FaEnvelope, FaTelegram, FaGlobe } from "react-icons/fa";

function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 bg-base-100 mt-10 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center text-pr imary mb-6">Bog‘lanish</h2>
      <p className="text-center text-gray-500 mb-6">
        Taklif va fikr-mulohazalaringizni bizga yuboring yoki ijtimoiy tarmoqlarda bog‘laning.
      </p>

      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-3">
          <FaEnvelope className="text-primary text-xl" />
          <span className="text-gray-700">tohirjonovhadyatillo@gmail.com</span>
        </div>
        <div className="flex items-center gap-3">
          <FaGlobe className="text-primary text-xl" />
          <a href="https://tohirjonov.uz" className="text-blue-500 hover:underline">
            tohirjonov.uz
          </a>
        </div>
        <div className="flex items-center gap-3">
          <FaTelegram className="text-primary text-xl" />
          <a href="https://t.me/tohirjonov_web" className="text-blue-500 hover:underline">
            Telegram
          </a>
        </div>
      </div>

      <form className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Ismingiz</span>
          <input
            type="text"
            className="input input-bordered w-full mt-1"
            placeholder="Ismingizni kiriting"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Xabaringiz</span>
          <textarea
            className="textarea textarea-bordered w-full mt-1"
            placeholder="Xabaringizni yozing"
          ></textarea>
        </label>
        <button type="submit" className="btn btn-primary w-full">
          Yuborish
        </button>
      </form>
    </div>
  );
}

export default Contact;
