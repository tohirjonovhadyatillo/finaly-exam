import { Form } from "react-router-dom";
import FormInput from "./FormInput";

function Search() {
  return (
    <div className="flex justify-center  my-5">
      <Form method="post" className="flex gap-2 flex flex-col">
        <FormInput type="text" placeholder="Search" name="search"  />
        <button type="submit" className="btn btn-primary btn-sm flex md:hidden w-20 mx-auto">
          Search
        </button>
      </Form>
    </div>
  );
}

export default Search;
