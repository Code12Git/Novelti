import React from "react";
import Update from "@/components/Update";
import { useParams } from "next/navigation";

const getUserById = async (id) => {
  console.log(id);
  try {
    const res = await fetch(`http://localhost:8000/api/users/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const Page = async ({ params }) => {
  const { slug } = params;
  const data = await getUserById(slug);

  return (
    <div className="min-h-screen flex flex-col gap-10 justify-center items-center antialiased">
      <h1 className="bg-gradient-to-r font-playfair font-bold text-center mt-10 from-violet-500 via-purple-500 to-pink-600 bg-clip-text text-transparent text-4xl">
        User Update
      </h1>
      <Update data={data} />
    </div>
  );
};

export default Page;
