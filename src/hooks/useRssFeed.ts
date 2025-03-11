import { useState, useEffect } from 'react';
import Parser from 'rss-parser';
import { legalNewsFeeds } from '../lib/rssFeeds';

type FeedItem = {
  title: string;
  link: string;
  content: string;
  contentSnippet?: string;
  isoDate?: string;
  creator?: string;
  categories?: string[];
};

export function useRssFeed(selectedCategory: string = 'all') {
  const [articles, setArticles] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const parser = new Parser({
          customFields: {
            item: [
              ['creator', 'dc:creator'],
              ['pubDate', 'pubDate'],
              ['content:encoded', 'content'],
            ]
          }
        });

        const relevantFeeds = selectedCategory === 'all'
          ? legalNewsFeeds
          : legalNewsFeeds.filter(feed => feed.category === selectedCategory);

        const feedPromises = relevantFeeds.map(async (feed) => {
          try {
            // Use a more reliable CORS proxy
            const corsProxy = 'https://api.allorigins.win/raw?url=';
            const response = await fetch(`${corsProxy}${encodeURIComponent(feed.url)}`);
            
            if (!response.ok) {
              throw new Error(`Failed to fetch ${feed.name}: ${response.statusText}`);
            }
            
            const xmlText = await response.text();
            const parsedFeed = await parser.parseString(xmlText);

            return (parsedFeed.items || []).map(item => ({
              title: item.title || 'Untitled',
              link: item.link || '#',
              content: item['content:encoded'] || item.content || item.description || '',
              contentSnippet: item.contentSnippet || item.description || '',
              isoDate: item.isoDate || item.pubDate || new Date().toISOString(),
              creator: item.creator || item.author || 'Unknown',
              categories: item.categories || []
            }));
          } catch (err) {
            console.error(`Error fetching ${feed.name}:`, err);
            return [];
          }
        });

        const feedResults = await Promise.allSettled(feedPromises);
        const successfulFeeds = feedResults
          .filter((result): result is PromiseFulfilledResult<FeedItem[]> => 
            result.status === 'fulfilled')
          .map(result => result.value)
          .flat();

        if (successfulFeeds.length === 0) {
          setError('Unable to load articles at this time. Please try again later.');
          setArticles([]);
        } else {
          const sortedArticles = successfulFeeds
            .sort((a, b) => 
              new Date(b.isoDate || '').getTime() - new Date(a.isoDate || '').getTime()
            )
            .slice(0, 30); // Limit to 30 most recent articles
          
          setArticles(sortedArticles);
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching RSS feeds:', err);
        setError('Failed to load articles. Please try again later.');
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, [selectedCategory]);

  return { articles, loading, error };
}