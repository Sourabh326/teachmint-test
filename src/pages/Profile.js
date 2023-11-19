import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import moment from "moment-timezone";
import MyStopwatch from "../utils/Timer";
import { useStopwatch } from "react-timer-hook";

const Profile = () => {
  const { id } = useParams();
  const [userPostDetails, setPostDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [timer, setTimer] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const result = await response.json();
      setPostDetails(result.splice(0, 3));

      // fetch use details
      const userResponse = await fetch(
        "https://jsonplaceholder.typicode.com/users/" + id
      );
      const userRessult = await userResponse.json();
      setUserDetails(userRessult);

      // fetch country list
      const countryResponse = await fetch(
        "http://worldtimeapi.org/api/timezone"
      );
      const countryResult = await countryResponse.json();
      setCountryList(countryResult);
    };
    fetchData();
  }, []);

  const handleCountryChange = async (e) => {
    setTimer(false);
    const response = await fetch(
      "http://worldtimeapi.org/api/timezone/" + e.target.value
    );
    const result = await response.json();
    setDateTime(result?.datetime);
  };

  return (
    <div>
      <div className="profile-info w-8/12 mx-auto border border-black m-10 px-5 pt-5">
        <div className="flex justify-between mb-5">
          <div>
            <Link to="/">
              <button className="bg-blue-100 px-3 rounded-sm border border-black">
                back
              </button>
            </Link>
          </div>
          <div>
            <select
              onChange={handleCountryChange}
              className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
            >
              {countryList?.map((country) => (
                <option key={country} value={country} name="country">
                  {" "}
                  {country}{" "}
                </option>
              ))}
            </select>
          </div>
          <div>
            {timer ? (
              <div>
                <MyStopwatch
                  minutes={minutes}
                  hours={hours}
                  days={days}
                  seconds={seconds}
                />
              </div>
            ) : (
              <div class=" px-6 py-2 font-semibold rounded-md bg-gray-700 text-white">
                {moment(dateTime).format("YYYY-MM-DD h:mm:ss A")}
              </div>
            )}
          </div>
          <div>
            <button
              className="h-10 px-6 font-semibold rounded-md bg-green-300"
              onClick={() => {
                setTimer(true);
                if (timer) {
                  pause();
                } else {
                  start();
                }
              }}
            >
              {timer ? "Pause" : "Start"}
            </button>
          </div>
        </div>
        <h3 className="text-center font-semibold text-xl mt-10">
          Profile Page
        </h3>
        <div className="profile bg-gray-100 flex justify-between p-3 my-5 rounded-lg border border-black cursor-pointer">
          <div className="text-left">
            <h4 className="text-lg font-bold text-gray-800">
              {userDetails.name}
            </h4>
            <p className="text-sm text-gray-600">
              {userDetails.username} | Catch Phrase
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {userDetails.address?.city} {userDetails.address?.street}
            </p>
            <p className="text-sm text-gray-600">
              {userDetails.email} | {userDetails.phone}
            </p>
          </div>
        </div>

        <div className="posts mt-10">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-3">
            {userPostDetails?.map((post) => (
              <div
                key={post.id}
                className="border bg-gray-100 border-black rounded-lg px-3 py-1 text-center text-md"
              >
                <h4 className="text-gray-700 mb-3 font-semibold">
                  {post.title.substring(0, 20)}...
                </h4>
                <p className="text-gray-700 mt-2">
                  {post.body.slice(0, 50 - 3).padEnd(50, "...")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
