import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

// Define the Review interface
interface Review {
  id: number;
  lawyerId: number;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  title: string;
  comment: string;
  date: string | Date;
  helpful: number;
  notHelpful: number;
  userHasVoted: boolean;
  userVote: 'helpful' | 'notHelpful' | null;
}

// Define the props for LawyerReviews
interface LawyerReviewsProps {
  lawyerId: number | null;
  onBack: () => void;
}

const LawyerReviews: React.FC<LawyerReviewsProps> = ({ lawyerId, onBack }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isSignedIn, user } = useUser(); // Get the current user
  const navigate = useNavigate();

  // Fetch reviews for the selected lawyer
  useEffect(() => {
    if (lawyerId) {
      fetchReviews();
    }
  }, [lawyerId]);

  const fetchReviews = async () => {
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('lawyerId', lawyerId);

      if (error) throw error;

      if (!data || data.length === 0) {
        setError('No reviews found for this lawyer.');
      } else {
        setReviews(data);
      }
    } catch (err: any) {
      console.error('Error fetching reviews:', err.message);
      setError('Failed to load reviews. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle review submission
  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error('Please sign in to submit a review');
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const comment = formData.get('comment') as string;
    const rating = parseInt(formData.get('rating') as string);

    if (!title || !comment || !rating) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            lawyerId: lawyerId,
            userId: user?.id || '',
            userName: user?.fullName || 'Anonymous',
            userImage: user?.imageUrl || 'https://example.com/default.jpg',
            rating,
            title,
            comment,
            date: new Date().toISOString(),
            helpful: 0,
            notHelpful: 0,
            userHasVoted: false,
            userVote: null,
          },
        ])
        .single();

      if (error) throw error;

      toast.success('Review submitted successfully!');
      fetchReviews(); // Refresh the reviews list
    } catch (err: any) {
      console.error('Error submitting review:', err.message);
      toast.error('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        {/* Heading */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Reviews</h1>

        {/* Display Reviews */}
        <div className="divide-y">
          {loading ? (
            <p className="text-gray-600 text-center">Loading...</p>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : reviews.length === 0 ? (
            <div className="p-8 text-center text-gray-500">No reviews yet.</div>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start">
                  <img
                    src={review.userImage}
                    alt={review.userName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                      <span className="text-sm text-gray-500">{format(new Date(review.date), 'MMM d, yyyy')}</span>
                    </div>
                    <h4 className="font-medium text-lg mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Review Submission Form */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Submit a Review</h2>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <select
                name="rating"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                name="comment"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LawyerReviews;