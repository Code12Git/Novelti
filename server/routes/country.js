import {
  getCountriesFromAPI,
  getStatesByCountry,
} from "../controllers/countryController.js";
import express from "express";
const router = express.Router();

router.get("/", getCountriesFromAPI);

router.get("/states/:countryCode", getStatesByCountry);

export default router;
