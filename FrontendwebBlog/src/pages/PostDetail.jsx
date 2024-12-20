import { useEffect, useState } from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { useAuthContext } from "../context/AuthContext"

const PostDetail = () => {
  const [PostDetail, setPostDetail] = useState(null);
  const { username } = useAuthContext();
  const { id } = useParams();
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await PostService.getPostById(id);
        if (response.status === 200) {
          setPostDetail(response.data);
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Post Detail",
          text: "Error fetching post detail",
        });
      }
    };
    fetchPost();
  }, [id]);
  return <div>is Author post  {PostDetail?.author?._id === user?.id && <p> true</p>}</div>;
};

export default PostDetail;
