import React, { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { db } from "../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export const EditBlog = ({ onClose, blogToEdit }) => {
  const [blogData, setBlogData] = useState({
    author: blogToEdit?.author || "",
    title: blogToEdit?.title || "",
    description: blogToEdit?.description || "",
    imageUrl: blogToEdit?.imageUrl || "",
    date: blogToEdit?.date || new Date().toDateString(),
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const blogRef = doc(db, "blogs", blogToEdit.id);
      await updateDoc(blogRef, blogData);
      toast.success("Blog updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating document: ", error);
      toast.error("Failed to update blog.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4">
      <Card
        color="white"
        shadow={true}
        className="shadow-2xl w-full max-w-lg rounded-lg p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <Typography
            variant="h4"
            className="text-2xl font-semibold border-b-4 border-black border-[#616161] text-[blue-gray] font-black"
          >
            Edit Blog
          </Typography>
          <Button
            onClick={onClose}
            className="px-3 py-1 text-xl bg-white text-black font-bold shadow-md"
          >
            ✕
          </Button>
        </div>

        <form className="mb-2 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            {/* Author */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Author
              </Typography>
              <Input
                name="author"
                value={blogData.author}
                onChange={handleChange}
                size="lg"
                placeholder="Write your name here..."
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            {/* Blog Title */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Blog Title
              </Typography>
              <Input
                name="title"
                value={blogData.title}
                onChange={handleChange}
                type="text"
                size="lg"
                placeholder="Write your blog title here..."
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>

            {/* Blog Description */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Blog Description
              </Typography>
              <textarea
                name="description"
                value={blogData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 text-sm border border-blue-gray-200 rounded-lg focus:outline-none focus:border-gray-900 resize-none overflow-y-scroll placeholder-transparent focus:placeholder-gray-400"
                placeholder="Write your blog description here..."
              />
            </div>

            {/* Blog Image URL */}
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-1">
                Blog Image URL
              </Typography>
              <Input
                name="imageUrl"
                value={blogData.imageUrl}
                onChange={handleChange}
                type="url"
                size="lg"
                placeholder="Paste your blog image url here..."
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />
            </div>
          </div>

          <Button type="submit" className="mt-6 text-md bg-[#0296D8]" fullWidth>
            Update
          </Button>
        </form>
      </Card>
    </div>
  );
};
