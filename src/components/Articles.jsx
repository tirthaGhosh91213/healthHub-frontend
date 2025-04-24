import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);


  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [creating, setCreating] = useState(false);

  const accessToken = localStorage.getItem('accessToken');
  const roles = JSON.parse(localStorage.getItem('userRole') || '[]');
  const isDoctor = roles.includes('DOCTOR');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:7000/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setArticles(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const fetchPostById = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:7000/posts/${id}`);
      if (!res.ok) throw new Error('Failed to fetch post');
      const data = await res.json();
      setSelectedPost(data.data || {});
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => setShowCreateModal(true);
  const closeModal = () => setShowCreateModal(false);
  const handleImageChange = (e) => setImageFiles(Array.from(e.target.files));

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setCreating(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    imageFiles.forEach(f => formData.append('imageFiles', f));
    try {
      const res = await fetch('http://localhost:7000/posts/createPost', {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.apiError?.message || 'Create failed');
      }
      const result = await res.json();
      setArticles(prev => [result.data, ...prev]);
      setTitle('');
      setDescription('');
      setImageFiles([]);
      setPopup('Post created successfully!');
      setTimeout(() => setPopup(null), 2000); 
      closeModal();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center py-6 text-red-500">Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 relative pb-24">
      {popup && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow mb-4">
          {popup}
        </div>
      )}

      {selectedPost ? (
        <>
          <button onClick={() => setSelectedPost(null)} className="text-blue-500 underline mb-4">
            Back to Articles
          </button>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <img src={selectedPost.imgOrVdos?.[0] || '/placeholder.jpg'} alt={selectedPost.title} className="w-full rounded mb-4" />
            <h2 className="text-3xl font-semibold mb-4">{selectedPost.title}</h2>
            <p className="text-gray-700 whitespace-pre-line mb-4">{selectedPost.description}</p>
            <p className="text-sm text-gray-500">Posted by {selectedPost.userName}</p>
          </div>
        </>
      ) : (
        articles.map(article => (
          <div key={article.id} className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <img src={article.imgOrVdos?.[0] || '/placeholder.jpg'} alt={article.title} className="w-full h-64 object-cover rounded mb-4 cursor-pointer" onClick={() => fetchPostById(article.id)} />
            <h2 className="text-2xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4">{article.description}</p>
            <p className="text-sm text-gray-500">Posted by {article.userName}</p>
          </div>
        ))
      )}

      {isDoctor && (
        <button onClick={handleCreateClick} className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg">
          Create Post 
        </button>
      )}

      {showCreateModal && createPortal(
        <div className="fixed bottom-24 right-1/3 z-50 bg-white border border-gray-300 shadow-lg rounded-xl p-6 w-[90%] max-w-xl">
          <h2 className="text-xl font-semibold mb-4">Create Post</h2>
          <form onSubmit={handleCreatePost} className="space-y-4">
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" className="w-full border rounded px-3 py-2" required />
            <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="w-full border rounded px-3 py-2" rows={4} required />
            <input type="file" accept="image/*" multiple onChange={handleImageChange} />
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={closeModal} className="px-4 py-2 rounded border">Cancel</button>
              <button type="submit" disabled={creating} className="px-4 py-2 rounded bg-blue-600 text-white">
                {creating ? 'Creating...' : 'Post'}
              </button>
            </div>
          </form>
        </div>, document.body
      )}
    </div>
  );
};

export default Articles;
