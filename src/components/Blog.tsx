import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ExternalLink, RefreshCw, MapPin } from 'lucide-react';
import { useNewsApi } from '../hooks/useNewsApi';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useClerkAuth';
import ArticleModal from './ArticleModal';

// Define categories for filtering
export const newsCategories = [
  'all',
  'legal-updates',
  'case-studies',
  'industry-news',
  'tips-advice'
];

const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { articles, loading, error, retry } = useNewsApi(selectedCategory);
  const { isSignedIn } = useAuth();
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  // Show error toast when there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

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

  const getExcerpt = (content: string) => {
    const plainText = content.replace(/<[^>]+>/g, '').trim();
    return plainText.length > 200 ? plainText.slice(0, 200) + '...' : plainText;
  };

  const handleRetry = () => {
    retry();
    toast.success('Retrying to fetch articles...');
  };

  const openArticle = (article: any) => {
    setSelectedArticle(article);
  };

  const closeArticle = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Indian Legal News & Insights</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay informed with the latest legal news and updates from across India
          </p>
          <div className="flex items-center justify-center mt-2 text-blue-600">
            <MapPin className="w-5 h-5 mr-1" />
            <span>India-focused legal content</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4 flex-wrap">
            {newsCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full capitalize transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {category.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {!isSignedIn && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 text-center">
            <p className="text-blue-800">
              Sign in to save articles and receive personalized legal news updates.
            </p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading articles...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={handleRetry}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Retry
            </button>
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No articles found in this category.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={`${article.url}-${index}`}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {article.image && (
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    {formatDate(article.publishedAt)}
                    {article.author && (
                      <>
                        <span className="mx-2">•</span>
                        <User className="w-4 h-4 mr-2" />
                        {article.author}
                      </>
                    )}
                  </div>
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.description || getExcerpt(article.content)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <Tag className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-500 capitalize">
                        {article.category?.replace('-', ' ') || 'Legal News'}
                      </span>
                    </div>
                    <button
                      onClick={() => openArticle(article)}
                      className="text-blue-600 hover:text-blue-700 flex items-center"
                    >
                      Read More
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selectedArticle && (
        <ArticleModal 
          article={selectedArticle} 
          onClose={closeArticle} 
        />
      )}
    </div>
  );
};

export default Blog;
