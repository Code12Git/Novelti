import express from "express";
import {
  createUser,
  getUsers,
  updateUserById,
  getUserById,
  deleteUserById,
  getStatesByCountry,
} from "../controllers/userController.js";
const router = express.Router();

//Create a new user
router.post("/", createUser);

//Update a user
router.put("/:id", updateUserById);

//Delete a user
router.delete("/:id", deleteUserById);

//Get all users
router.get("/", getUsers);

//Get a single user
router.get("/:id", getUserById);

//Get States
router.get("/state/:country", getStatesByCountry);

export default router;
