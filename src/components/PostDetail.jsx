import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams(); 
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetch(`http://localhost:7000/posts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch post data');
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-6">Loading...</div>;

  if (error)
    return (
      <div className="text-center py-6 text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={post.imgOrVdos[0]}
          alt={post.title}
          className="w-full max-w-[800px] h-auto rounded-lg mb-4 mx-auto"
        />
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          {post.title}
        </h2>
        <p className="text-gray-600 text-base mb-4 whitespace-pre-line">
          {post.description}
        </p>
        <div className="flex justify-between text-sm text-gray-500">
          <p className="font-medium">{post.userName}</p>
          <p className="text-blue-500">{post.likes} Likes</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
