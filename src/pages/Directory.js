import {useState} from "react";
import users from "../utils/data.json";
import Profile from "./Profile";

const Directory = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  // Define function for closing the modal and resetting the state of user
  const closeModal = () => {
    setIsOpen(false);
    setSelectedUser({});
  }

  return (
    <>
      <div className="directory w-6/12 mx-auto my-10">
        <h3 className="text-center font-semibold text-xl text-gray-700">
          Directory
        </h3>
        <div className="cards my-10">
          {users?.users.map((user) => {
            return (
              <div
                key={user.id}
                onClick={() =>{
                  setIsOpen(true);
                  setSelectedUser(user)
                }}
                className="flex justify-between bg-blue-100 p-3 my-5 rounded-lg border border-black cursor-pointer hover:bg-blue-200"
              >
                <div>
                  <h4 className="text-gray-700">Name : {user.name} </h4>
                </div>
                <div>
                  <h4 className="text-gray-700">Post : {user.posts} </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Define Modal for user info */}
      <Profile modalIsOpen={modalIsOpen} closeModal={closeModal} user={selectedUser} />
    </>
  );
};

export default Directory;
