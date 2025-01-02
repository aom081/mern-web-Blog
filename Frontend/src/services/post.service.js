import api from "./api";
const API_URL = import.meta.env.VITE_BASE_URL + "/post";

const createPost = async (post) => {
  const response = await api.post(API_URL, post, {
    headers: {
      "Content-Type": "multipart/from-data",
    },
  });
  return response;
};

const getPosts = async () => {
  return await api.get(API_URL);
};

const getPostById = async (id) => {
  return await api.get(`${API_URL}/${id}`);
}

const deleteById = async (id) => {
  return await api.delete(`${API_URL}/${id}`, post,{
    headers: {
      "Content-Type": "multipart/from-data",
      },
  });
}

const PostService = {
  createPost,
  getPosts,
  getPostById,
  deleteById,
};

export default PostService;
