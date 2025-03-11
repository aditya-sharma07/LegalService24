import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface TermsConditionsProps {
  onBack: () => void;
}

const TermsConditions: React.FC<TermsConditionsProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
            <p>
              Welcome to LegalService24. These Terms and Conditions govern your use of our website and services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">2. Definitions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>"Service"</strong> refers to the LegalService24 website and all legal consultation services provided.</li>
              <li><strong>"Client"</strong> refers to any individual or entity that uses our services.</li>
              <li><strong>"Legal Professional"</strong> refers to lawyers, attorneys, and legal consultants available through our platform.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">3. Service Description</h2>
            <p>
              LegalService24 provides a platform connecting clients with legal professionals for consultations, document preparation, and legal advice. We do not provide legal services directly but facilitate connections between clients and independent legal professionals.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">4. User Accounts</h2>
            <p>
              To access certain features of our service, you may be required to register for an account. You are responsible for maintaining the confidentiality of your account information and for all activities under your account. You agree to notify us immediately of any unauthorized use of your account.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">5. Booking and Appointments</h2>
            <p>
              When booking an appointment with a legal professional through our platform:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You agree to provide accurate and complete information.</li>
              <li>Appointments are subject to availability of the selected legal professional.</li>
              <li>Cancellation policies may apply as specified during the booking process.</li>
              <li>Payment terms will be clearly stated before confirmation.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">6. Fees and Payment</h2>
            <p>
              Fees for legal services vary depending on the type of service, duration, and the legal professional selected. All fees will be clearly displayed before you confirm your booking. Payment methods accepted include credit/debit cards and other electronic payment methods as specified on our platform.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">7. Cancellation Policy</h2>
            <p>
              Cancellations must be made at least 24 hours before the scheduled appointment time to receive a full refund. Cancellations made less than 24 hours in advance may be subject to a cancellation fee of up to 50% of the service cost.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>
            <p>
              LegalService24 is not liable for any actions, advice, or services provided by the legal professionals on our platform. We do not guarantee the outcome of any legal matter. Our service is limited to facilitating connections between clients and legal professionals.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">9. Intellectual Property</h2>
            <p>
              All content on our website, including text, graphics, logos, and software, is the property of LegalService24 and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">10. Privacy Policy</h2>
            <p>
              Your use of our service is also governed by our Privacy Policy, which outlines how we collect, use, and protect your personal information.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which LegalService24 is registered, without regard to its conflict of law provisions.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">12. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will provide notice of significant changes by updating the date at the top of these Terms. Your continued use of our service after such modifications constitutes your acceptance of the updated Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">13. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              Email: legal@legalservice24.com<br />
              Phone: +1 (555) 123-4567<br />
              Address: 123 Legal Street, New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;