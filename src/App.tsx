import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import LawyerSelection from './components/LawyerSelection';
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
import BookConsultation from './components/BookConsultation';
import { useAuth } from './hooks/useClerkAuth';
import toast from 'react-hot-toast';

function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Toaster position="top-right" /> 
          
          <Routes>
            {/* BecomeConsultant as a standalone route with no navigation */}
            <Route path="/become-consultant" element={<BecomeConsultant />} />

            {/* All other routes with main navigation */}
            <Route
              path="/*"
              element={
                <>
                  <Navigation />
                  <main className="pt-16">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/lawyer-selection" element={<LawyerSelection />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/terms" element={<TermsConditions />} />
                      <Route path="/careers" element={<Careers />} />
                      <Route path="/explore-services" element={<ExploreServices />} /> 
                      <Route path="/insurance" element={<Insurance />} />
                      <Route path="/lawyer-reviews/:id" element={<LawyerReviews />} />
                      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                      <Route path="/document-upload" element={<ProtectedRoute><DocumentUpload /></ProtectedRoute>} />
                      <Route path="/case-tracking" element={<ProtectedRoute><CaseTracking /></ProtectedRoute>} />
                      <Route path="/book-consultation/:lawyerId" element={<BookConsultation />} />
                      <Route path="/become-consultant" element={<BecomeConsultant />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </ClerkProvider>
  );
}

// Protected Route with "Sign in to continue" Toast
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    toast.error("Sign in to continue");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

export default App;