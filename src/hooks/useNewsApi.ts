import { useState, useEffect } from 'react';
import axios from 'axios';

// Define types for news articles
export interface NewsArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    name: string;
    url: string;
  };
  category?: string;
  author?: string;
}

export function useNewsApi(category: string = 'all') {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchIndiaLegalNews = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // India-specific fallback articles
      const indiaArticles: NewsArticle[] = getIndiaFallbackArticles(category);
      setArticles(indiaArticles);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load articles. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndiaLegalNews();
  }, [category]);

  const retry = () => {
    fetchIndiaLegalNews();
  };

  return { articles, loading, error, retry };
}

// Get a default image based on category (India-specific)
function getDefaultIndiaImage(category: string): string {
  const images = {
    'legal-updates': 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'case-studies': 'https://images.unsplash.com/photo-1553260188-75a8d6205b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'industry-news': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'tips-advice': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    'default': 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' // India-specific default image
  };
  
  return images[category as keyof typeof images] || images.default;
}

// India-specific fallback articles
function getIndiaFallbackArticles(category: string): NewsArticle[] {
  const indiaArticles: NewsArticle[] = [
    {
      title: "Supreme Court of India Issues Landmark Ruling on Privacy Rights",
      description: "The Supreme Court has declared privacy as a fundamental right under the Indian Constitution.",
      content: "In a historic unanimous decision, the Supreme Court of India has ruled that the right to privacy is a fundamental right protected under the Indian Constitution. The nine-judge bench overturned previous rulings and declared that privacy is intrinsic to life and liberty and is inherently protected under the various fundamental freedoms enshrined under Part III of the Indian Constitution. This judgment has far-reaching implications for various laws and policies in India, including Aadhaar, data protection, and surveillance.",
      url: "https://example.com/india-privacy-ruling",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      source: {
        name: "Live Law",
        url: "https://www.livelaw.in"
      },
      category: "legal-updates",
      author: "Priya Sharma"
    },
    {
      title: "Delhi High Court Rules on Intellectual Property Dispute Between Tech Giants",
      description: "A major ruling sets precedent for software patent cases in India.",
      content: "The Delhi High Court has delivered a significant judgment in a long-standing intellectual property dispute between two technology giants operating in India. The court ruled in favor of the plaintiff, finding that the defendant had indeed infringed on patented software technologies. This decision establishes important precedents for how software patents will be enforced in India, with the court emphasizing the need to balance innovation protection with the promotion of technological advancement in the country.",
      url: "https://example.com/delhi-ip-case",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      source: {
        name: "Bar and Bench",
        url: "https://www.barandbench.com"
      },
      category: "case-studies",
      author: "Rajesh Kumar"
    },
    {
      title: "Indian Legal Tech Startups Attract Record Investment in 2025",
      description: "Venture capital firms are betting big on India's legal technology sector.",
      content: "India's legal technology sector is experiencing unprecedented growth, with startups in this space attracting over $500 million in investments in the first quarter of 2025 alone. This represents a 300% increase compared to the entire previous year. Investors are particularly interested in AI-powered legal research tools, contract automation platforms, and online dispute resolution systems designed specifically for the Indian legal framework. Industry experts attribute this surge to the ongoing digital transformation of India's legal system and the government's push for tech adoption in the judiciary.",
      url: "https://example.com/india-legaltech-funding",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      source: {
        name: "Legally India",
        url: "https://www.legallyindia.com"
      },
      category: "industry-news",
      author: "Ananya Patel"
    },
    {
      title: "Five Legal Considerations for Foreign Companies Entering the Indian Market",
      description: "Expert advice on navigating India's complex legal landscape for business.",
      content: "As India continues to attract foreign investment, legal experts highlight five critical considerations for international companies looking to establish operations in the country. These include understanding the Foreign Direct Investment (FDI) policy framework, navigating labor laws that vary by state, ensuring compliance with GST regulations, protecting intellectual property rights, and structuring appropriate dispute resolution mechanisms. The article provides practical guidance on each aspect, emphasizing the importance of engaging local legal expertise to navigate India's unique business environment successfully.",
      url: "https://example.com/india-business-legal-guide",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      source: {
        name: "Lawctopus",
        url: "https://www.lawctopus.com"
      },
      category: "tips-advice",
      author: "Vikram Singh"
    },
    {
      title: "Analysis: The Impact of India's New Data Protection Law on Businesses",
      description: "Legal experts examine compliance requirements under the Digital Personal Data Protection Act.",
      content: "India's recently enacted Digital Personal Data Protection Act introduces comprehensive regulations for how businesses collect, process, and store personal data of Indian citizens. This analysis examines the key provisions of the law, including consent requirements, data localization mandates, and the establishment of a Data Protection Authority. Legal experts highlight that companies will need to significantly revamp their data handling practices, with penalties for non-compliance reaching up to 4% of global turnover. The article also compares India's approach with global standards like GDPR and provides a compliance roadmap for businesses.",
      url: "https://example.com/india-data-protection-analysis",
      image: "https://images.unsplash.com/photo-1553260188-75a8d6205b6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      publishedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
      source: {
        name: "Live Law",
        url: "https://www.livelaw.in"
      },
      category: "legal-updates",
      author: "Arjun Mehta"
    }
  ];
  
  // Add more India-specific articles
  const titles = [
    "Mumbai High Court Rules on Environmental Regulations for Coastal Development",
    "New Amendments to India's Arbitration Act: What Businesses Need to Know",
    "The Evolution of Corporate Governance in India: Legal Framework and Challenges",
    "Understanding Recent Changes to India's Labor Codes: A Comprehensive Guide",
    "Supreme Court of India Clarifies Stance on Cryptocurrency Regulations",
    "Legal Challenges in India's Renewable Energy Sector: Analysis and Insights",
    "How Small Businesses in India Can Navigate GST Compliance: Expert Tips",
    "Landmark Judgment: Delhi High Court on Digital Rights and Internet Shutdowns",
    "India's New Consumer Protection Act: Strengthened Rights and E-commerce Rules",
    "Legal Framework for Startups in India: Funding, Compliance, and Incentives"
  ];
  
  const categories = ['legal-updates', 'case-studies', 'industry-news', 'tips-advice'];
  const images = [
    "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // India-specific
    "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // India-specific
    "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // India-specific
    "https://images.unsplash.com/photo-1532375810709-75b1da00537c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // India-specific
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"  // India-specific
  ];
  
  const authors = ["Aditya Sharma", "Neha Gupta", "Rahul Verma", "Priya Patel", "Sanjay Mehta"];
  const sources = [
    { name: "Live Law", url: "https://www.livelaw.in" },
    { name: "Bar and Bench", url: "https://www.barandbench.com" },
    { name: "Legally India", url: "https://www.legallyindia.com" },
    { name: "Lawctopus", url: "https://www.lawctopus.com" },
    { name: "Times of India - Legal", url: "https://timesofindia.indiatimes.com/india/legal" }
  ];
  
  // Generate additional India-specific articles
  for (let i = 0; i < titles.length; i++) {
    const randomDays = Math.floor(Math.random() * 30) + 1;
    indiaArticles.push({
      title: titles[i],
      description: `A comprehensive analysis of ${titles[i].toLowerCase()} in the Indian legal context.`,
      content: `This article provides an in-depth examination of ${titles[i].toLowerCase()} within the Indian legal framework. Drawing on recent developments, court judgments, and expert opinions, it offers valuable insights for legal professionals, businesses, and individuals navigating India's complex legal landscape. The analysis considers both historical context and future implications, making it an essential resource for understanding this important legal topic in India.`,
      url: `https://example.com/india-legal-${i}`,
      image: images[i % images.length],
      publishedAt: new Date(Date.now() - randomDays * 24 * 60 * 60 * 1000).toISOString(),
      source: sources[i % sources.length],
      category: categories[i % categories.length],
      author: authors[i % authors.length]
    });
  }
  
  if (category === 'all') {
    return indiaArticles;
  }
  
  return indiaArticles.filter(article => article.category === category);
}