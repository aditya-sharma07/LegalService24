import React, { useState } from 'react';
import { Search, Filter, Clock, CheckCircle, AlertCircle, XCircle, FileText, MessageSquare, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

interface Case {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'active' | 'resolved' | 'closed';
  priority: 'high' | 'medium' | 'low';
  lawyer: string;
  lawyerImage: string;
  lastUpdate: string;
  nextHearing?: string;
  description: string;
  documents: number;
  messages: number;
}

const CaseTracking: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  // Mock data for cases
  const cases: Case[] = [
    {
      id: '1',
      title: 'Property Dispute Resolution',
      type: 'Civil Law',
      status: 'active',
      priority: 'high',
      lawyer: 'Sarah Johnson',
      lawyerImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      lastUpdate: '2 hours ago',
      nextHearing: '2024-03-15',
      description: 'Ongoing property boundary dispute with neighboring plot owner.',
      documents: 5,
      messages: 12
    },
    {
      id: '2',
      title: 'Corporate Contract Review',
      type: 'Corporate Law',
      status: 'pending',
      priority: 'medium',
      lawyer: 'Michael Chen',
      lawyerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      lastUpdate: '1 day ago',
      description: 'Review and negotiation of service agreement with vendor.',
      documents: 3,
      messages: 8
    },
    {
      id: '3',
      title: 'Family Court Proceedings',
      type: 'Family Law',
      status: 'resolved',
      priority: 'high',
      lawyer: 'Emily Rodriguez',
      lawyerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      lastUpdate: '1 week ago',
      description: 'Child custody arrangement and visitation schedule.',
      documents: 8,
      messages: 15
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'resolved':
        return 'bg-blue-100 text-blue-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'medium':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      default:
        return null;
    }
  };

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.lawyer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <XCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Case Tracking</h1>
            <p className="text-xl text-gray-600 mb-8">
              Please sign in to access your case tracking dashboard.
            </p>
            <button 
              onClick={() => openSignIn()}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Case Tracking Dashboard</h1>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-gray-500" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="active">Active</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <AlertCircle className="text-gray-500" />
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-6">
          {filteredCases.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-8 text-center">
              <p className="text-gray-600">No cases found matching your criteria.</p>
            </div>
          ) : (
            filteredCases.map((case_) => (
              <div key={case_.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold">{case_.title}</h2>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(case_.status)}`}>
                        {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                      </span>
                      {getPriorityIcon(case_.priority)}
                    </div>
                    <p className="text-gray-600">{case_.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      <img
                        src={case_.lawyerImage}
                        alt={case_.lawyer}
                        className="w-8 h-8 rounded-full object-cover mr-2"
                      />
                      <span className="text-gray-700">{case_.lawyer}</span>
                    </div>
                    <p className="text-sm text-gray-500">Last update: {case_.lastUpdate}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{case_.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div className="flex items-center text-gray-600">
                      <FileText className="w-5 h-5 mr-1" />
                      <span>{case_.documents} documents</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MessageSquare className="w-5 h-5 mr-1" />
                      <span>{case_.messages} messages</span>
                    </div>
                    {case_.nextHearing && (
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-1" />
                        <span>Next hearing: {case_.nextHearing}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => navigate(`/case-details/${case_.id}`)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseTracking;