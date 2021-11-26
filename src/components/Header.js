import React from "react";

const Header = (props) => {
  return (
    <>
      <div className="col col-sm-4">
        <input
          className="form-control"
          value={props.value}
          onChange={(event) => props.setSearchMovie(event.target.value)}
          placeholder="Type to search"
        ></input>
      </div>
    </>
  );
};

export default Header;
