import { Schema } from "mongoose";
import { model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 5,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address_1: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
  address_2: {
    type: String,
  },
  mobile: {
    countryCode: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 4,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  selectedStates: [
    {
      type: String,
      required: true,
    },
  ],
  selectedCountry: [
    {
      value: { type: String, required: true },
      label: { type: String, required: true },
    },
  ],
  zipcode: {
    type: Number,
    required: true,
  },
});

const User = model("User", userSchema);

export default User;
