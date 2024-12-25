import { useEffect, useState } from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useParams } from "react-router";
import { useAuthContext } from "../context/AuthContext";

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
          text: error?.response?.data?.message || error.message,
        });
      }
    };
    fetchPost();
  }, [id]);
  return (
    <div>
      {PostDetail ? (
        <div className="post-page min-h-full min-w-full flex item-center p-4 pt-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-4xl w-full">
            <h1 className="text-3xl font-bold mb-4 text grey-800">
              {PostDetail.title}
            </h1>
          </div>
        </div>
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
};

export default PostDetail;
