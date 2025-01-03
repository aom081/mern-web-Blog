import React from "react";

const Post = ({ title, author, summary, cover, createAt }) => {
  return (
    <>
      <div className="card card-side bg-base-100 shadow-xl">
        <figure className="md:1/2 flex items-center justify-center">
          <a href={"/post/" + id} className="้href">
            <img
              className="w-full h-64 object-cover "
              src={`${cover}`}
              alt={title}
            />
          </a>
        </figure>
        <div className="p-6 md:1/2 flex flex-col justify-between card-body">
          <a href={"/post/" + id} className="้href">
            <h2 className="card-title">{title}</h2>
          </a>
          <p>
            {author.username} - {createAt}
          </p>
          <p>{summary}</p>
        </div>
      </div>
    </>
  );
};

export default Post;
