// "use client";
// import React, { useState, useEffect } from "react";
// import Select from "react-select";

// const StateSelector = () => {
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [stateOptions, setStateOptions] = useState([]);
//   const [selectedStates, setSelectedStates] = useState([]);

//   // Sample data for country and state options (replace with your data)
//   const countryOptions = [
//     { value: "usa", label: "United States" },
//     { value: "uk", label: "United Kingdom" },
//     // Add more country options here
//   ];

//   const allStateOptions = [
//     { value: "ny", label: "New York" },
//     { value: "ca", label: "California" },
//     { value: "tx", label: "Texas" },
//     { value: "fl", label: "Florida" },
//     // Add more state options here
//   ];

//   useEffect(() => {
//     // Filter state options based on the selected country
//     const filteredStates = allStateOptions.filter((state) =>
//       selectedCountry ? state.value.startsWith(selectedCountry.value) : true
//     );
//     setStateOptions(filteredStates);
//   }, [selectedCountry]);

//   const handleCountryChange = (selectedOption) => {
//     setSelectedCountry(selectedOption);
//     setSelectedStates([]); // Clear selected states when the country changes
//   };

//   const handleStateChange = (selectedOptions) => {
//     setSelectedStates(selectedOptions);
//   };

//   return (

//   );
// };

// export default StateSelector;
