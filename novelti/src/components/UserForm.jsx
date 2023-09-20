"use client";
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import countryCodes from "@/data/data";
import Select from "react-select";
import axios from "../helper/axios";
import { useRouter } from "next/navigation";
const UserForm = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    address_1: "",
    address_2: "",
    email: "",
    zipcode: 1,
    mobile: {
      countryCode: "1",
      phoneNumber: "",
    },
    selectedCountry: null,
    selectedStates: [],
  });
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [zipCodeError, setZipCodeError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [address1Error, setAddress1Error] = useState("");

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get("/countries");
        setCountries(res.data);
      } catch (err) {
        toast.error(err.message);
      }
    };

    fetchCountries();
  }, []);

  // Function to fetch states based on the selected country
  const fetchStatesByCountry = async (countryCode) => {
    try {
      const res = await axios.get(`/countries/states/${countryCode}`);

      setStates(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCountry = (selectedOption) => {
    setUser((prevUser) => ({
      ...prevUser,
      selectedCountry: selectedOption,
    }));

    if (selectedOption) {
      fetchStatesByCountry(selectedOption.value);
    } else {
      setStates([]);
    }
  };

  const handleUser = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleMobile = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const selectedStateValues = selectedStates.map((state) => state.value);
      const zipCodeAsNumber = parseInt(user.zipcode, 10);

      const userData = {
        ...user,
        selectedStates: selectedStateValues,
        zipcode: zipCodeAsNumber,
      };

      const res = await axios.post("/users", userData);

      toast.success(res.data.message);
      router.push("/user");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-10 justify-center items-center antialiased">
      <Toaster />
      <h1 className="bg-gradient-to-r font-playfair font-bold text-center mt-10 from-violet-500 via-purple-500 to-pink-600 bg-clip-text text-transparent text-4xl">
        User Management
      </h1>
      <form className="bg-white flex flex-col shadow-lg w-96   gap-4 p-12   text-gray-700  rounded-md ">
        <div className="flex flex-col gap-2">
          <label className="text-lg ">FirstName</label>
          <input
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleUser}
            onBlur={() => {
              if (user.firstName.length < 5) {
                setFirstNameError("Name should be greater than 5 characters.");
              } else {
                setFirstNameError("");
              }
            }}
            className="rounded-md  p-1 outline hover:border-gray-500 focus:outline-green-500 indent-1 hover:outline-red-500 transition-transform delay-150 ease-in-out hover:scale-105"
            placeholder="Enter your first name"
          />
          {firstNameError && (
            <p className="text-red-500 text-sm">{firstNameError}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">LastName</label>
          <input
            type="text"
            value={user.lastName}
            name="lastName"
            onChange={handleUser}
            onBlur={() => {
              if (user.lastName.length < 5) {
                setLastNameError(
                  "Last Name should be greater than 5 characters."
                );
              } else {
                setLastNameError("");
              }
            }}
            className="rounded-md p-1 outline hover:border-gray-500 focus:outline-green-600 indent-1 hover:outline-red-500 ring-offset-purple-700 transition-transform delay-150 ease-in-out hover:scale-105"
            placeholder="Enter your last name"
          />
          {lastNameError && (
            <p className="text-red-500 text-sm">{lastNameError}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg">Email</label>
          <input
            type="text"
            value={user.email}
            name="email"
            onChange={handleUser}
            onBlur={() => {
              const emailPattern =
                /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
              if (!emailPattern.test(user.email)) {
                setEmailError("Invalid Email format.");
              } else {
                setEmailError("");
              }
            }}
            className="rounded-md p-1 outline hover:border-gray-500 focus:outline-green-600 indent-1 hover:outline-red-500 ring-offset-purple-700 transition-transform delay-150 ease-in-out hover:scale-105"
            placeholder="Enter your Email"
          />
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
        </div>
        <div className="flex flex-col gap-4">
          <label className="text-lg">Mobile</label>
          <div className="flex gap-2">
            <Select
              options={countryCodes.map((country) => ({
                value: country.code,
                label: `+${country.code} `,
              }))}
              className="w-28"
              value={{
                value: user.mobile.countryCode,
                label: `${user.mobile.countryCode}`,
              }}
              onChange={(selectedOption) => {
                setUser((prevUser) => ({
                  ...prevUser,
                  mobile: {
                    ...prevUser.mobile,
                    countryCode: selectedOption.value,
                  },
                }));
              }}
            />
            <input
              type="text"
              name="phoneNumber"
              value={user.mobile.phoneNumber}
              onChange={handleMobile}
              onBlur={() => {
                const phoneNumberPattern = /^\d{10}$/;
                if (!phoneNumberPattern.test(user.mobile.phoneNumber)) {
                  setMobileError("Invalid mobile number.");
                } else {
                  setMobileError("");
                }
              }}
              className="rounded-md p-1 outline w-4/5 hover:border-gray-500 focus:outline-green-600 indent-1 hover:outline-red-500 ring-offset-purple-700 transition-transform delay-150 ease-in-out hover:scale-105"
              placeholder="Enter your number"
            />
          </div>
          {mobileError && <p className="text-red-500 text-sm">{mobileError}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label>Address 1</label>
          <textarea
            placeholder="Address1..."
            name="address_1"
            value={user.address_1}
            onChange={handleUser}
            onBlur={() => {
              if (user.address_1.trim() === "") {
                setAddress1Error("Address 1 is required.");
              } else {
                setAddress1Error("");
              }
            }}
            className="rounded-md p-1 outline  hover:border-gray-500 focus:outline-green-600 indent-1 hover:outline-red-500 ring-offset-purple-700 transition-transform delay-150 ease-in-out hover:scale-105"
          ></textarea>
          {address1Error && (
            <p className="text-red-500 text-sm">{address1Error}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label>Address 2</label>
          <textarea
            placeholder="Optional ..."
            name="address_2"
            value={user.address_2}
            onChange={handleUser}
            className="rounded-md p-1 outline  hover:border-gray-500 focus:outline-green-600 indent-1 hover:outline-red-500 ring-offset-purple-700 transition-transform delay-150 ease-in-out hover:scale-105"
          ></textarea>
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-gray-700 ">Country:</label>
          <Select
            options={countries.map((country) => ({
              value: country.iso2,
              label: country.name,
            }))}
            value={user.selectedCountry}
            onChange={handleCountry}
            isClearable
            menuPlacement="auto" // Add this to ensure the dropdown opens based on available space
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="block mt-4 text-gray-700">State:</label>
          <Select
            options={states.map((state) => ({
              value: state.name,
              label: state.name,
            }))}
            value={selectedStates} // Use selectedStates here
            onChange={(selectedOptions) => setSelectedStates(selectedOptions)}
            isMulti
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">ZipCode</label>
          <input
            type="number"
            name="zipcode"
            value={user.zipcode}
            onChange={handleUser}
            onBlur={() => {
              if (isNaN(user.zipcode)) {
                setZipCodeError("Zip Code must be a number.");
              } else {
                setZipCodeError("");
              }
            }}
            className="rounded-md p-1 outline w-4/5 hover:border-gray-500 focus:outline-green-600 indent-1 hover:outline-red-500 ring-offset-purple-700 transition-transform delay-150 ease-in-out hover:scale-105"
            placeholder="Zipcode..."
          />
          {zipCodeError && (
            <p className="text-red-500 text-sm">{zipCodeError}</p>
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-gradient-to-r mt-4 hover:scale-105 transition-transform ease-in-out delay-150  from-purple-600 via-violet-600 to-green-700 hover:from-green-700 hover:via-cyan-700 hover:to-yellow-800 text-white font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserForm;
