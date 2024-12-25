import { useState, useRef } from "react";
import { data, useNavigate } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/post.serveice";

const Edit = () => {
  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    file: null,
  });
  const [content, setContent] = useState("");
  const editorRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div className="flex item-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create a new Post
        </h2>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w0full py-2 px-3 text-gray-700 leading-tight focus:out-line-none focus:shadow-outline "
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Summary
          </label>
          <input
            type="text"
            className="shadow appearance-none border rounded w0full py-2 px-3 text-gray-700 leading-tight focus:out-line-none focus:shadow-outline "
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Content
          </label>
          <div className="h-64">
            <Editor
              value={content}
              onChange={handleContentChange}
              ref={editorRef}
            ></Editor>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor=""
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Upload image
          </label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="shadow appearance-none border rounded w0full py-2 px-3 text-gray-700 leading-tight focus:out-line-none focus:shadow-outline "
            required
          />
        </div>
        <div className="flex item-center justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Edit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
