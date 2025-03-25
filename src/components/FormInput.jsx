import { FaSearch } from "react-icons/fa";

function FormInput({ type = "text", placeholder, name, width = "400px" }) {
  return (
    <div>
      <label className="input input-bordered flex items-center gap-2 mx-auto">
        <input
          type={type}
          className="grow h-[35px] input-sm flex md:input-md"
          style={{ width }}
          placeholder={placeholder}
          name={name}
          aria-label={placeholder || "Search input"}
        />
        <FaSearch className="h-4 w-4 opacity-70" />
      </label>
    </div>
  );
}

export default FormInput;
