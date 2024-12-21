import React from "react";
import Image from "./Image";
import { Link } from "react-router-dom";


const FeaturedPost = () => {
  return (
    <div className="mt-8 flex flex-col lg:flex-row gap-8">
      {/* First */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}
        <Image
          src="blog_app/featured1.jpeg"
          className="rounded-3xl object-cover"
        />
        {/* details */}
        <div className="flex items-center gap-4">
          <h1 className="font-semibold lg:text-lg">01.</h1>
          <Link className="text-blue-800 lg:text-lg">Web Design</Link>
          <span className="text-gray-500">02 Days ago</span>
        </div>
        {/* text */}
        <Link to="" className="text-xl lg:text-3xl font-semibold lg:font-bold">
          Designing Stunning Websites That Inspire and Engage
        </Link>
      </div>
      {/* other */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* second */}
        <div className="lg:h-1/3 flex justify-between gap-4">
            <Image src='blog_app/featured2.jpeg' className="rounded-3xl object-cover"/>
        </div>
        {/* third */}
        <div className="lg:h-1/3 flex justify-between gap-4"></div>
        {/* fourth */}
        <div className="lg:h-1/3 flex justify-between gap-4"></div>
      </div>
    </div>
  );
};

export default FeaturedPost;
