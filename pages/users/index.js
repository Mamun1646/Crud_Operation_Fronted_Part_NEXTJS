import React, { useState, useEffect } from "react";
import NewUser from "./NewUser";

const url = "http://localhost:3005/";

const App = () => {
  const [users, setUsers] = useState([]);
  const getAllUsers = () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  };

  const userDelete = (id) => {
    fetch(url + `${id}`, {
      method: "Delete",
    })
      .then(() => getAllUsers())
      .catch((error) => console.log(error));
  };


  const [selecteduser, setSelectedUser] = useState({
    name: "",
    email: "",
  });
  const [updateFlag, setUpdateFlag] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState("");
  const userEdit = (id) => {
    setSelectedUserID(id);
    // console.log("=========", selectedUserID);
    setUpdateFlag(true);
    const filterData = users.filter((user) => user.id === id);
    setSelectedUser({
      name: filterData[0].name,
      email: filterData[0].email,
    });
  };

  const handleAddUser = (newUser) => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(() => getAllUsers())
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUpdate = (newUser) => {
    // console.log("======>", newUser);
    fetch(url + `${selectedUserID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then(() => getAllUsers())
      .catch((error) => console.log(error));
    setUpdateFlag(false);
  };
  return (
    <div>
      <h1>Complete CRUD Operation </h1>
      {updateFlag ? (
        <NewUser
          btnTxt={"Update User"}
          selecteduser={selecteduser}
          onHandleAddUser={handleUpdate}
        />
      ) : (
        <NewUser btnTxt={"Add User"} onHandleAddUser={handleAddUser} />
      )}
      <section className="users">
        {users.map((user) => {
          const { id, name, email } = user;
          return (
            <article key={id} className="user">
              <h4>{name}</h4>
              <p>{email}</p>
              <button onClick={() => userEdit(id)}>Edit</button>
              <button onClick={() => userDelete(id)}>Delete</button>
            </article>
          );
        })}
      </section>
    </div>
  );
};
export default App;
