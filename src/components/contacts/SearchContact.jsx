import { PURPLE } from "../../helpers/color";
import { contactContext } from "../../context/contactContext";
import { useContext } from "react";
const SearchContact = () => {
  const { contactSearch } = useContext(contactContext);
  return (
    <>
      <div className="input-group mx-2 w-75">
        <input
          placeholder="Search Contact"
          className="form-control"
          type="text"
          aria-label="Search"
          aria-describedby="basic-addon1"
          onChange={(e) => {
            contactSearch(e.target.value);
          }}
        />
        <span
          className="input-group-text"
          id="basic-addon1"
          style={{ backgroundColor: PURPLE }}
        >
          <i className="fa fa-search"></i>
        </span>
      </div>
    </>
  );
};
export default SearchContact;
