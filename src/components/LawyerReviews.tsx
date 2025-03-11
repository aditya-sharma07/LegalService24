import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface LawyerReviewsProps {
  lawyerId: number | null;
  onBack: () => void;
}

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

const LawyerReviews: React.FC<LawyerReviewsProps> = ({ lawyerId, onBack }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const { isSignedIn, user } = useUser();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    if (lawyerId) {
      fetchReviews();
    }
  }, [lawyerId]);

  const fetchReviews = () => {
    setLoading(true);
    setTimeout(() => {
      const mockReviews: Review[] = [
        {
          id: 1,
          lawyerId: lawyerId || 0,
          userId: "user1",
          userName: "John Smith",
          userImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
          rating: 5,
          title: "Excellent legal advice",
          comment: "Sarah provided exceptional legal advice. Highly recommend her services.",
          date: new Date().toISOString(),
          helpful: 24,
          notHelpful: 2,
          userHasVoted: false,
          userVote: null
        }
      ];

      setReviews(mockReviews);
      const totalRating = mockReviews.reduce((sum, review) => sum + review.rating, 0);
      setAverageRating(totalRating / mockReviews.length);
      setLoading(false);
    }, 1000);
  };

  const handleVote = (reviewId: number, voteType: 'helpful' | 'notHelpful') => {
    if (!isSignedIn) {
      toast.error('Please sign in to vote on reviews');
      return;
    }

    setReviews(prevReviews =>
      prevReviews.map(review => {
        if (review.id === reviewId) {
          if (review.userHasVoted && review.userVote === voteType) {
            return {
              ...review,
              [voteType]: review[voteType] - 1,
              userHasVoted: false,
              userVote: null
            };
          }
          return {
            ...review,
            [voteType]: review[voteType] + 1,
            userHasVoted: true,
            userVote: voteType
          };
        }
        return review;
      })
    );
    toast.success(`You marked this review as ${voteType === 'helpful' ? 'helpful' : 'not helpful'}`);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isSignedIn) {
      toast.error('Please sign in to submit a review');
      return;
    }

    if (formData.title.trim() === '' || formData.comment.trim() === '') {
      toast.error('Please fill in all fields');
      return;
    }

    const newReview: Review = {
      id: reviews.length + 1,
      lawyerId: lawyerId || 0,
      userId: user?.id || '',
      userName: user?.fullName || 'Anonymous',
      userImage: user?.imageUrl || 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      date: new Date().toISOString(),
      helpful: 0,
      notHelpful: 0,
      userHasVoted: false,
      userVote: null
    };

    setReviews([newReview, ...reviews]);
    setFormData({ rating: 5, title: '', comment: '' });
    toast.success('Your review has been submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center text-blue-600 hover:text-blue-700 mb-8">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">Reviews</h1>
          </div>

          <div className="divide-y">
            {reviews.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No reviews yet.</div>
            ) : (
              reviews.map((review) => (
                <div key={review.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <img src={review.userImage} alt={review.userName} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900">{review.userName}</h3>
                        <span className="text-sm text-gray-500">{format(new Date(review.date), 'MMM d, yyyy')}</span>
                      </div>
                      <h4 className="font-medium text-lg mb-2">{review.title}</h4>
                      <p className="text-gray-700 mb-4">{review.comment}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>Was this review helpful?</span>
                        <button onClick={() => handleVote(review.id, 'helpful')} className="ml-4 text-green-600 hover:text-green-700">
                          <ThumbsUp className="w-4 h-4 mr-1" />
                          {review.helpful}
                        </button>
                        <button onClick={() => handleVote(review.id, 'notHelpful')} className="ml-4 text-red-600 hover:text-red-700">
                          <ThumbsDown className="w-4 h-4 mr-1" />
                          {review.notHelpful}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerReviews;
