import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
const NewUser = ({ onHandleAddUser, btnTxt, selecteduser }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });
  const { name, email } = user;

  useEffect(() => {
    setUser({
      name: selecteduser.name,
      email: selecteduser.email,
    });
  }, [selecteduser]);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    setUser((prevState) => {
      return { ...prevState, [fieldName]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onHandleAddUser(user);
    setUser({
      name: "",
      email: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-field">
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="name"
          id="name"
          onChange={handleChange}
          value={name}
          required
        />
      </div>
      <div className="form-field">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleChange}
          value={email}
          required
        />
      </div>
      <button type="submit">{btnTxt}</button>
    </form>
  );
};

NewUser.defaultProps = {
  onHandleAddUser: PropTypes.func,
  selecteduser: {
    name: "",
    email: "",
  },
};

export default NewUser;
