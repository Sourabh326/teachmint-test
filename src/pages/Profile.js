import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    width: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -90%)",
    border: "1px solid black",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
};
Modal.setAppElement("#root");

const Profile = ({ modalIsOpen, closeModal, user }) => {
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button
          className="absolute right-0 top-0 m-2 bg-blue-100 rounded-md text-sm border border-black px-2"
          onClick={closeModal}
        >
          close
        </button>
        <h2 className="text-center font-semibold text-xl text-gray-700">
          Profile Page
        </h2>

        <div className="profile-info">
          <div className="profile bg-gray-100 flex justify-between p-3 my-5 rounded-lg border border-black cursor-pointer">
            <div>
              <h4 className="text-gray-700"> {user.name} </h4>
              <h4 className="text-gray-700">
                {" "}
                {user.username} | {user.catch_phrase}{" "}
              </h4>
            </div>
            <div>
              <h4 className="text-gray-700"> {user.address} </h4>
              <h4 className="text-gray-700">
                {" "}
                {user.email} | {user.phone}{" "}
              </h4>
            </div>
          </div>
          <div className="posts mt-10">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
              {user?.post?.map((post) => {
                return (
                  <div
                    key={post.id}
                    className="border bg-gray-100 border-black rounded-lg px-3 py-1 text-center text-md"
                  >
                    <h4 className="text-gray-700 mb-3 font-semibold"> {post.title} </h4>
                    <h4 className="text-gray-700 mt-5"> {post.content} </h4>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
