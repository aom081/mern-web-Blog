import { useState, useRef, useEffect } from "react";
import { data, useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/post.service";
import { useAuthContext } from "../context/AuthContext";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { username } = useAuthContext();
  const editorRef = useRef(null);
  const [content, setContent] = useState("");
  const [post, setPost] = useState({ title: "", summary: "", file: null });
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        if (response.status === 200) {
          if (user.id !== response.data.author._id) {
            navigate("/");
          }
          setPost(response.data);
          setContent(response.data.content);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Update Post",
          text: "Error fetching data",
        });
      }
    };
    fetchPost;
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "file") {
      setPostDetail({ ...postDetail, [name]: e.target.file[0] });
    } else {
      setPostDetail({ ...postDetail, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      data.set("title", postDetail.title);
      data.set("summary", postDetail.summary);
      data.set("content", postDetail.content);
      data.set("file", postDetail.file);
      const response = await PostService.createPost(data);
      if (response.status === 200) {
        Swal.fire("Success", "Post created successfully", "success").then(
          () => {
            navigate("/");
          }
        );
      }
    } catch (error) {
      Swal.fire({
        title: "Create Post",
        text: "Error",
      });
    }
  };
  return (
    <div className="flex item-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-4xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Update Post
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
            name="title"
            value={postDetail.title}
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
            name="Summary"
            value={postDetail.summary}
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
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
