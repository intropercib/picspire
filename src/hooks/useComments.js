import { useState, useEffect } from 'react';
import useAuthStore from '../components/store/useAuthStore';
import usePostStore from '../components/store/usePostStore';
import { v4 as uuidv4 } from 'uuid';

const useComments = (post) => {
  const authUser = useAuthStore((state) => state.user);
  const addCommentStore = usePostStore((state) => state.addComment);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [visibleComments, setVisibleComments] = useState(1);
  const [showAllComments, setShowAllComments] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (post && post.comments) {
      setComments(post.comments);
    }
    else{
      setComments([])
    }
  }, [post]);

  const addComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!authUser) {
      console.error('No authenticated user found.');
      setError('You must be logged in to add a comment.');
      return;
    }

    const commentData = {
      id: uuidv4(),
      userId: authUser.userId,
      username: authUser.username,
      comment: newComment,
      profilePicURL: authUser.profilePicURL || '',
      createdAt: new Date(),
    };

    try {
      setIsLoading(true);
      await addCommentStore(post.id, commentData);
      setNewComment('');
      setError(null);
    } catch (error) {
      console.error('Error adding comment:', error);
      setError('Failed to add comment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewAll = () => {
    setShowAllComments(true);
    setVisibleComments(comments.length);
  };

  const handleHide = () => {
    setShowAllComments(false);
    setVisibleComments(1);
  };

  return {
    comments,
    newComment,
    setNewComment,
    visibleComments,
    showAllComments,
    handleViewAll,
    handleHide,
    addComment,
    isLoading,
    error,
  };
};

export default useComments;