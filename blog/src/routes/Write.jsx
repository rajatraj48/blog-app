import React, { useState } from 'react'
import ReactQuill from 'react-quill-new';
import 'react-quill/dist/quill.snow.css'; // Import the Quill CSS for styling

const Write = () => {
  const [value, setValue] = useState('');

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
    <h1 className="text-cl font-light">Create a New Post</h1>
    <form  className="flex flex-col gap-6 flex-1 mb-6">
     
        <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
          Add a cover image
        </button>
      
<input
  className="text-4xl font-semibold font-sans bg-transparent outline-none placeholder-gray-500 focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-800 rounded-md p-2 transition duration-200"
  type="text"
  placeholder="My Awesome Story"
  name="title"
/>



      <div className="flex items-center gap-4">
        <label htmlFor="" className="text-sm">
          Choose a category:
        </label>
        <select
          name="category"
          id=""
          className="p-2 rounded-xl bg-white shadow-md"
        >
          <option value="general">General</option>
          <option value="web-design">Web Design</option>
          <option value="development">Development</option>
          <option value="databases">Databases</option>
          <option value="seo">Search Engines</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>
      <textarea
        className="p-4 rounded-xl bg-white shadow-md"
        name="desc"
        placeholder="A Short Description"
      />
      <div className="flex flex-1 ">
        <div className="flex flex-col gap-2 mr-2">
          {/* <Upload type="image" setProgress={setProgress} setData={setImg}>
            🌆
          </Upload>
          <Upload type="video" setProgress={setProgress} setData={setVideo}>
            ▶️
          </Upload> */}
        </div>
       <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl bg-white shadow-md"
          value={value} 
          onChange={setValue} 
         
          
        /> 
      </div>
      <button
        
        className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        Save
      </button>
      {/* {"Progress:" + progress} */}
      {/* {mutation.isError && <span>{mutation.error.message}</span>} */}
    </form>
  </div>
  )
}

export default Write