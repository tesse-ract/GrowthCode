import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/product/search/${keyword}`);
    } else {
      navigate("/product");
    }
  };

  return (
    <Fragment>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          className='border-2 pl-4 border-black rounded-r-full rounded-l-full p-2 w-64 md:w-96 bg-slate-100'
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <i className="fa-solid fa-magnifying-glass ml-2"><input className="ml-1" type="submit" value="" /></i>
      </form>
    </Fragment>
  );
};

export default Search;
