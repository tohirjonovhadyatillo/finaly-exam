import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-base-200 text-base-content mt-10 border-t border-base-300">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">PhotoApp</span>
        </div>
        <div className="flex gap-4 mt-4 md:mt-0">
          <a href="#" className="text-gray-500 hover:text-primary transition">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-primary transition">
            <FaInstagram size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-primary transition">
            <FaTwitter size={24} />
          </a>
          <a href="#" className="text-gray-500 hover:text-primary transition">
            <FaGithub size={24} />
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-4 md:mt-0">
          © {new Date().getFullYear()} Barcha huquqlar himoyalangan
        </p>
      </div>
    </footer>
  );
}

export default Footer;
