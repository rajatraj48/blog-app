import React from "react";
import { Link } from "react-router-dom";
import Image from "./Image";

const PostListItems = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8 ">
      {/* image */}

      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src="blog_app/postImg.jpeg"
          className="rounded-2xl object-cover"
          w="735"
        />
      </div>

      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link
          to="/test"
          className="text-lg font-medium text-black hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition duration-200 ease-in-out"
        >
         Node.js: Unlocking the Power of AI to Shape the Future
        </Link>

        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <span className="text-black">Written by</span>
          <Link
            className="text-indigo-700 hover:text-indigo-600 transition duration-200 ease-in-out"
            to=""
          >
            Rajat Raj
          </Link>
          <span className="text-black">on</span>
          <Link
            className="text-indigo-700 hover:text-indigo-600 transition duration-200 ease-in-out"
            to=""
          >
            Node.js
          </Link>
          <span className="text-black">2 Days ago</span>
        </div>

        <p className="justify-arround">Node.js is revolutionizing application development by providing a fast, scalable platform for building AI-powered solutions. Its event-driven architecture is ideal for real-time applications, enabling developers to harness AI technologies efficiently. As AI evolves, Node.js empowers developers to create intelligent applications that shape the future of technology.</p>
        <Link to="" className="underline text-blue-800 text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItems;
