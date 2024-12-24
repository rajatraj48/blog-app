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
        {/* title */}
        <Link
          to=""
          className="text-xl lg:text-3xl font-sans font-light lg:font-normal text-gray-900  focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 tracking-normal leading-relaxed transition duration-200 ease-in-out"
        >
          Designing Stunning Websites That Inspire and Engage
        </Link>
      </div>
      {/* Others */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* Second Section */}
        <div className="flex gap-4 h-32">
          {/* Image Container */}
          <div className="w-1/3">
            <Image
              src="blog_app/featured2.jpeg"
              className="rounded-3xl object-cover w-full h-full"
            />
          </div>

          {/* Details and Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link href="#" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">01 Days ago</span>
            </div>
            {/* Title */}
            <Link href="#" className="text-xl lg:text-xl font-sans font-semibold lg:font-normal text-gray-900">
              Understanding Modern Web Design Principles
            </Link>
          </div>
        </div>

        {/* Third Section */}
        <div className="flex gap-4 h-32">
          {/* Image Container */}
          <div className="w-1/3">
            <Image
              src="blog_app/featured2.jpeg"
              className="rounded-3xl object-cover w-full h-full"
            />
          </div>

          {/* Details and Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link href="#" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">01 Days ago</span>
            </div>
            {/* Title */}
            <Link href="#" className="text-xl lg:text-xl font-sans font-semibold lg:font-normal text-gray-900">
              Understanding Modern Web Design Principles
            </Link>
          </div>
        </div>

        {/* Fourth Section */}
        <div className="flex gap-4 h-32">
          {/* Image Container */}
          <div className="w-1/3">
            <Image
              src="blog_app/featured2.jpeg"
              className="rounded-3xl object-cover w-full h-full"
            />
          </div>

          {/* Details and Title */}
          <div className="w-2/3">
            {/* Details */}
            <div className="flex items-center gap-4 text-sm lg:text-base mb-4">
              <h1 className="font-semibold">02.</h1>
              <Link href="#" className="text-blue-800">
                Web Design
              </Link>
              <span className="text-gray-500 text-sm">01 Days ago</span>
            </div>
            {/* Title */}
            <Link href="#" className="text-xl lg:text-xl font-sans font-semibold lg:font-normal text-gray-900">
              Understanding Modern Web Design Principles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
