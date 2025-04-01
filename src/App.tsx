import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import LawyerSelection from './components/LawyerSelection';
import PremiumServices from './components/PremiumServices';
import ExploreServices from './components/ExploreServices';
import About from './components/About';
import Blog from './components/Blog';
import TermsConditions from './components/TermsConditions';
import Careers from './components/Careers';
import BecomeConsultant from './components/BecomeConsultant';
import Insurance from './components/Insurance';
import DocumentUpload from './components/DocumentUpload';
import CaseTracking from './components/CaseTracking';
import LawyerReviews from './components/LawyerReviews';
import Notifications from './components/Notifications';
import { useAuth } from './hooks/useClerkAuth';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';

// Component Wrappers
const LawyerSelectionWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { specialization = "General Consultation", subcategory = "Online Consultation" } = location.state || {};
  
  return (
    <LawyerSelection 
      specialization={specialization} 
      subcategory={subcategory}
      onBack={() => navigate('/')}
      onViewReviews={(lawyerId) => navigate(`/lawyer-reviews/${lawyerId}`)}
    />
  );
};

const PremiumServicesWrapper = () => <PremiumServices onBack={() => useNavigate()('/')} />;
const BlogWrapper = () => <Blog onBack={() => useNavigate()('/')} />;
const TermsWrapper = () => <TermsConditions onBack={() => useNavigate()('/')} />;
const CareersWrapper = () => <Careers onBack={() => useNavigate()('/')} />;
const InsuranceWrapper = () => <Insurance onBack={() => useNavigate()('/')} />;
const DocumentUploadWrapper = () => <DocumentUpload onBack={() => useNavigate()('/')} />;
const CaseTrackingWrapper = () => <CaseTracking onBack={() => useNavigate()('/')} />;
const NotificationsWrapper = () => <Notifications onBack={() => useNavigate()('/')} />;
const ExploreServicesWrapper = () => <ExploreServices onBack={() => useNavigate()('/')} />;

// Lawyer Reviews Wrapper with URL Parameter Fix
const LawyerReviewsWrapper = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // id is of type string | undefined
  const lawyerId = id ? parseInt(id, 10) || null : null; // Convert to number or null

  return <LawyerReviews lawyerId={lawyerId} onBack={() => navigate('/')} />;
};

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" />
          <Navigation />
          
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/lawyer-selection" element={<LawyerSelectionWrapper />} />
              <Route path="/premium-services" element={<PremiumServicesWrapper />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<BlogWrapper />} />
              <Route path="/terms" element={<TermsWrapper />} />
              <Route path="/careers" element={<CareersWrapper />} />
              <Route path="/explore-services" element={<ExploreServicesWrapper />} /> 
              <Route path="/become-consultant" element={<BecomeConsultant />} />
              <Route path="/insurance" element={<InsuranceWrapper />} />
              <Route path="/lawyer-reviews/:id" element={<LawyerReviewsWrapper />} />
              <Route path="/notifications" element={<ProtectedRoute><NotificationsWrapper /></ProtectedRoute>} />
              <Route path="/document-upload" element={<ProtectedRoute><DocumentUploadWrapper /></ProtectedRoute>} />
              <Route path="/case-tracking" element={<ProtectedRoute><CaseTrackingWrapper /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ClerkProvider>
  );
}

// 🔹 Protected Route with "Sign in to continue" Toast
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    toast.error("Sign in to continue");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// 🔹 Admin Route
function AdminRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, user } = useAuth();

  if (!isSignedIn || !user?.publicMetadata?.isAdmin) {
    toast.error("Admin access required");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// 🔹 Lawyer Route
function LawyerRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn, user } = useAuth();

  if (!isSignedIn || !user?.publicMetadata?.isLawyer) {
    toast.error("Lawyer access required");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default App;
