import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Directory = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const ressult = await response.json();
      setUsers(ressult);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="directory w-6/12 mx-auto my-10">
        <h3 className="text-center font-semibold text-xl text-gray-700">
          Directory
        </h3>
        <div className="cards my-10">
          {users?.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                navigate(`/user-details/${user.id}`);
              }}
              className="flex justify-between bg-blue-100 p-4 my-5 rounded-lg border border-black cursor-pointer hover:bg-blue-200 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <div>
                <h4 className="text-xl font-semibold text-gray-800">
                  Name: {user.name}
                </h4>
              </div>
              <div>
                <h4 className="text-lg text-gray-700">Posts: 4</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Directory;
