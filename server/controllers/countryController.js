import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

const API_KEY = process.env.API_TOKEN; // Replace with your actual API key

export const getCountriesFromAPI = async (req, res) => {
  try {
    const headers = {
      "X-CSCAPI-KEY": API_KEY,
    };

    // Make an API request to fetch the list of countries
    const response = await axios.get(
      "https://api.countrystatecity.in/v1/countries",
      { headers }
    );

    // Return the list of countries as a JSON response with a 200 status code
    res.status(200).json(response.data);
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getStatesByCountry = async (req, res) => {
  try {
    const { countryCode } = req.params; // You may receive the countryCode from the frontend
    const headers = {
      "X-CSCAPI-KEY": API_KEY,
    };

    // Make an API request to fetch the list of states based on the selected country
    const response = await axios.get(
      `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      { headers }
    );

    // Return the list of states as a JSON response with a 200 status code
    res.status(200).json(response.data);
  } catch (err) {
    // Handle errors appropriately
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
