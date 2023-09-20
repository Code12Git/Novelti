import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../helper/axios";

const Delete = ({ user, fetchUser }) => {
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/users/${userId}`);
      toast.success("User deleted successfully");
      fetchUser();
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      <Toaster />
      <DeleteIcon
        onClick={() => handleDelete(user._id)}
        className="text-red-500 hover:text-red-700 cursor-pointer"
      />
    </>
  );
};

export default Delete;
