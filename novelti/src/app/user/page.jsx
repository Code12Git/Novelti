"use client";
import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@/components/Delete";
import axios from "../../helper/axios";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
const Page = () => {
  const router = useRouter();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("/users");
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const excludedKeys = ["_id", "__v"];
  const keys =
    data.length > 0
      ? Object.keys(data[0])
          .filter((key) => !excludedKeys.includes(key))
          .map((key) => capitalizeFirstLetter(key))
      : [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="p-2 overflow-x-auto table-container">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {keys.map((key) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {key}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((user) => (
            <tr key={user._id}>
              <td className="px-6 py-4 whitespace-nowrap">
                + {user.mobile.countryCode} {user.mobile.phoneNumber}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.address_1}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.address_2}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.selectedStates.join(",")}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {user.selectedCountry.map((country) => country.label)}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{user.zipcode}</td>
              <td className="px-6 py-4 whitespace-nowrap flex items-center">
                {" "}
                <Link href={`/user/${user._id}`}>
                  <EditIcon className=" hover:text-blue-500 text-blue-400 cursor-pointer  transition-transform delay-150 ease-in-out hover:scale-105" />
                </Link>
                <Delete fetchUser={fetchData} user={user} />
                <Link href="/">
                  <AddIcon className=" hover:text-orange-500 text-orange-400 cursor-pointer  transition-transform delay-150 ease-in-out hover:scale-105" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
