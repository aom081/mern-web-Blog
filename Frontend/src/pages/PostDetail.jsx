import { useEffect, useState } from "react";
import PostService from "../services/post.service";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";
import { useAuthContext } from "../context/Authcontext";
import { format } from "date-fns";

const PostDetail = () => {
  const [PostDetail, setPostDetail] = useState(null);
  const navigate = useNavigate();
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
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure you want to delete this post?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        PostService.deleteById(id);
        Swal.fire({
          icon: "success",
          title: "Post Deleted",
          text: "Post has been deleted successfully",
        }).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <div>
      {PostDetail ? (
        <div className="post-page min-h-full min-w-full flex item-center p-4 pt-20">
          <div className="bg-white p-8 rounded-lg shadow-lg max-4xl w-full">
            <h1 className="text-3xl font-bold mb-4 text grey-800">
              {PostDetail.title}
            </h1>
          </div>
          <div className="text-gray-600 mb-4 text-center">
            <time datetime="" className="block mb-2">
              {format(new Date(PostDetail.createdAt), "dd MMMM yyyy HH:mm")}
            </time>
            <div className="author mb-2">
              <span className="text-blue-500">
                @<a href={`/author/${PostDetail.author._id}`}>{PostDetail.author.username}</a>
              </span>
            </div>
          </div>
          {user?.id === PostDetail.author._id && (
            <div className="edit-row mb-4 text-center flex items-center justify-center">
              <a
                href={`/edit/${PostDetail._id}`}
                className="items-center btn btn-warning "
              >
                Edit Button
              </a>
              <div
                className="items-center btn btn-error "
                onClick={handleDelete}
              >
                Delete Post
              </div>
            </div>
          )}

          <div
            className="content text-gary-700"
            dangerouslySetInnerHTML={{ __html: PostDetail.content }}
          >
            {PostDetail.content}
          </div>
        </div>
      ) : (
        <div>Not found</div>
      )}
    </div>
  );
};

export default PostDetail;
