import React from 'react';
import { X, Calendar, User, Tag, Share2, Bookmark, Printer, MessageSquare } from 'lucide-react';
import { NewsArticle } from '../hooks/useNewsApi';
import { useAuth } from '../hooks/useClerkAuth';
import toast from 'react-hot-toast';

interface ArticleModalProps {
  article: NewsArticle;
  onClose: () => void;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const { isSignedIn } = useAuth();

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return 'Recent';
    }
  };

  const handleBookmarkClick = () => {
    if (isSignedIn) {
      toast.success('Article saved to your bookmarks');
    } else {
      toast.error('Please sign in to bookmark articles');
    }
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.description,
        url: article.url,
      })
      .then(() => toast.success('Article shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(article.url)
        .then(() => toast.success('Article URL copied to clipboard'))
        .catch(() => toast.error('Failed to copy URL'));
    }
  };

  const handlePrintClick = () => {
    window.print();
  };

  const handleConsultClick = () => {
    onClose();
    // Redirect to consultation booking with context
    toast.success('Redirecting to consultation booking for legal advice on this topic');
    // You could also use a router to navigate to a specific page
    setTimeout(() => {
      window.scrollTo({
        top: document.getElementById('services')?.offsetTop || 0,
        behavior: 'smooth'
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full capitalize">
              {article.category?.replace('-', ' ') || 'Legal News'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Calendar className="w-4 h-4 mr-2" />
            {formatDate(article.publishedAt)}
            {article.author && (
              <>
                <span className="mx-2">•</span>
                <User className="w-4 h-4 mr-2" />
                {article.author}
              </>
            )}
            <span className="mx-2">•</span>
            <span>Source: {article.source.name}</span>
          </div>

          {article.image && (
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}

          <div className="prose max-w-none mb-8">
            <p className="text-lg mb-4">{article.description}</p>
            <div className="text-gray-700 leading-relaxed">
              {article.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-blue-800 mb-2">Legal Implications</h3>
            <p className="text-blue-700">
              This article discusses important legal concepts relevant to Indian law. For specific advice related to your situation, consider consulting with a qualified legal professional.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              <Tag className="w-4 h-4 mr-1" />
              Indian Law
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              <Tag className="w-4 h-4 mr-1" />
              {article.category?.replace('-', ' ') || 'Legal News'}
            </span>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              <Tag className="w-4 h-4 mr-1" />
              Legal Analysis
            </span>
          </div>

          <div className="border-t pt-6">
            <div className="flex flex-wrap gap-4 justify-between">
              <div className="flex gap-4">
                <button 
                  onClick={handleBookmarkClick}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Bookmark className="w-5 h-5" />
                  <span className="hidden sm:inline">Save</span>
                </button>
                <button 
                  onClick={handleShareClick}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button 
                  onClick={handlePrintClick}
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <Printer className="w-5 h-5" />
                  <span className="hidden sm:inline">Print</span>
                </button>
              </div>
              <button 
                onClick={handleConsultClick}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                Consult a Lawyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;