import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MessageSquare, 
  Video, 
  MapPin, 
  Check, 
  X
} from "lucide-react";

interface LawyerDetails {
  id: number;
  name: string;
  specialization: string;
  subcategory: string;
  experience: number;
  contact: string;
}

interface Availability {
  date: string;
  slots: string[];
}

interface BookingFormData {
  consultationType: string;
  date: string;
  timeSlot: string;
  clientName: string;
  clientContact: string;
  clientEmail: string;
  reason: string;
  agreeToTerms: boolean;
}

const BookConsultation: React.FC = () => {
  const { lawyerId } = useParams<{ lawyerId: string }>();
  const navigate = useNavigate();
  
  // States
  const [step, setStep] = useState<number>(1);
  const [lawyer, setLawyer] = useState<LawyerDetails | null>(null);
  const [availableDates, setAvailableDates] = useState<Availability[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [bookingInProgress, setBookingInProgress] = useState<boolean>(false);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>("");
  
  // Form data
  const [formData, setFormData] = useState<BookingFormData>({
    consultationType: "video",
    date: "",
    timeSlot: "",
    clientName: "",
    clientContact: "",
    clientEmail: "",
    reason: "",
    agreeToTerms: false
  });

  // Fetch lawyer details
  useEffect(() => {
    const fetchLawyerDetails = async () => {
      setLoading(true);
      try {
        if (!lawyerId) return;
        
        const { data, error } = await supabase
          .from("consultants")
          .select("*")
          .eq("id", lawyerId)
          .single();
        
        if (error) throw error;
        setLawyer(data);
        
        // After fetching lawyer, get their availability
        fetchAvailability(parseInt(lawyerId));
      } catch (err: any) {
        console.error("Error fetching lawyer details:", err.message);
      }
    };

    fetchLawyerDetails();
  }, [lawyerId]);

  // Fetch lawyer availability
  const fetchAvailability = async (id: number) => {
    try {
      // This would be a real API call to get the lawyer's availability
      // For now, we'll simulate some mock data
      
      const currentDate = new Date();
      const mockAvailability: Availability[] = [];
      
      // Generate 14 days of mock availability
      for (let i = 1; i <= 14; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() + i);
        
        // Skip weekends in our mock data
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        const dateStr = date.toISOString().split('T')[0];
        
        // Generate time slots from 9 AM to 5 PM
        const slots = [];
        for (let hour = 9; hour < 17; hour++) {
          // Skip lunch hour
          if (hour === 12) continue;
          
          slots.push(`${hour}:00`);
          slots.push(`${hour}:30`);
        }
        
        mockAvailability.push({
          date: dateStr,
          slots
        });
      }
      
      setAvailableDates(mockAvailability);
    } catch (err: any) {
      console.error("Error fetching availability:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle date selection
  const handleDateSelect = (date: string) => {
    setFormData(prev => ({ ...prev, date, timeSlot: "" }));
  };

  // Handle time slot selection
  const handleTimeSelect = (timeSlot: string) => {
    setFormData(prev => ({ ...prev, timeSlot }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Move to next step or submit form
    if (step < 4) {
      // Validate current step before proceeding
      if (step === 1 && !formData.consultationType) {
        return;
      }
      if (step === 2 && (!formData.date || !formData.timeSlot)) {
        return;
      }
      if (step === 3 && (!formData.clientName || !formData.clientContact || !formData.clientEmail)) {
        return;
      }
      
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      // Submit the booking
      await submitBooking();
    }
  };

  // Submit booking to database
  const submitBooking = async () => {
    setBookingInProgress(true);
    setBookingError("");
    
    try {
      // Check one last time if time slot is still available
      // This would be a real API call in production
      
      // Create booking in database
      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            lawyer_id: lawyerId,
            consultation_type: formData.consultationType,
            date: formData.date,
            time_slot: formData.timeSlot,
            client_name: formData.clientName,
            client_contact: formData.clientContact,
            client_email: formData.clientEmail,
            reason: formData.reason,
            status: "confirmed"
          }
        ]);
      
      if (error) throw error;
      
      // Set success and show confirmation
      setBookingSuccess(true);
      
      // In a real app, you would send confirmation emails/SMS here
      // sendConfirmationEmail(formData.clientEmail);
      // sendConfirmationSMS(formData.clientContact);
      
    } catch (err: any) {
      console.error("Error booking consultation:", err.message);
      setBookingError("Failed to book consultation. Please try again.");
    } finally {
      setBookingInProgress(false);
    }
  };

  // Handle going back a step
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Render booking confirmation
  if (bookingSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-20">
        <div className="text-center">
          <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <Check className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-8">
            Your consultation with {lawyer?.name} has been scheduled for {formData.date} at {formData.timeSlot}.
            We have sent a confirmation to your email and phone.
          </p>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h3 className="font-semibold text-lg mb-4">Booking Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500">Lawyer</p>
                <p className="font-medium">{lawyer?.name}</p>
              </div>
              <div>
                <p className="text-gray-500">Consultation Type</p>
                <p className="font-medium">
                  {formData.consultationType === "video" && "Video Call"}
                  {formData.consultationType === "phone" && "Phone Call"}
                  {formData.consultationType === "in-person" && "In-Person Meeting"}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-medium">{formData.date}</p>
              </div>
              <div>
                <p className="text-gray-500">Time</p>
                <p className="font-medium">{formData.timeSlot}</p>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-4 justify-center">
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
            <button 
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              onClick={() => navigate(-1)}
            >
              Return to Lawyers
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Render main booking form
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg mt-20">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
        Book a Consultation
      </h2>
      <p className="text-center text-gray-600 mb-8">
        with {lawyer?.name} - {lawyer?.specialization}
      </p>
      
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                  ${step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                {stepNumber}
              </div>
              {stepNumber < 4 && (
                <div className={`w-12 h-1 ${step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow">
        {/* Step 1: Select Consultation Type */}
        {step === 1 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Select Consultation Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition ${formData.consultationType === "video" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setFormData(prev => ({ ...prev, consultationType: "video" }))}
              >
                <Video className={`w-10 h-10 mb-2 ${formData.consultationType === "video" ? 'text-blue-500' : 'text-gray-400'}`} />
                <h4 className="font-medium">Video Call</h4>
                <p className="text-sm text-gray-500">Connect face-to-face from anywhere</p>
                <input 
                  type="radio" 
                  name="consultationType" 
                  value="video" 
                  checked={formData.consultationType === "video"}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition ${formData.consultationType === "phone" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setFormData(prev => ({ ...prev, consultationType: "phone" }))}
              >
                <Phone className={`w-10 h-10 mb-2 ${formData.consultationType === "phone" ? 'text-blue-500' : 'text-gray-400'}`} />
                <h4 className="font-medium">Phone Call</h4>
                <p className="text-sm text-gray-500">Quick and convenient audio consultation</p>
                <input 
                  type="radio" 
                  name="consultationType" 
                  value="phone" 
                  checked={formData.consultationType === "phone"}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition ${formData.consultationType === "in-person" ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                onClick={() => setFormData(prev => ({ ...prev, consultationType: "in-person" }))}
              >
                <MapPin className={`w-10 h-10 mb-2 ${formData.consultationType === "in-person" ? 'text-blue-500' : 'text-gray-400'}`} />
                <h4 className="font-medium">In-Person</h4>
                <p className="text-sm text-gray-500">Meet at the lawyer's office</p>
                <input 
                  type="radio" 
                  name="consultationType" 
                  value="in-person" 
                  checked={formData.consultationType === "in-person"}
                  onChange={handleChange}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Step 2: Select Date and Time */}
        {step === 2 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Select Date and Time</h3>
            
            {/* Date Selection */}
            <div className="mb-6">
              <h4 className="font-medium mb-3 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Available Dates
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {availableDates.map((dateObj) => (
                  <div 
                    key={dateObj.date}
                    className={`p-2 border rounded text-center cursor-pointer ${formData.date === dateObj.date ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}`}
                    onClick={() => handleDateSelect(dateObj.date)}
                  >
                    {new Date(dateObj.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Time Selection */}
            {formData.date && (
              <div>
                <h4 className="font-medium mb-3 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  Available Time Slots
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                  {availableDates
                    .find(d => d.date === formData.date)
                    ?.slots.map((slot) => (
                      <div 
                        key={slot}
                        className={`p-2 border rounded text-center cursor-pointer ${formData.timeSlot === slot ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-50'}`}
                        onClick={() => handleTimeSelect(slot)}
                      >
                        {slot}
                      </div>
                    ))}
                </div>
              </div>
            )}
            
            {!formData.date && (
              <p className="text-gray-500 italic">Please select a date to view available time slots.</p>
            )}
          </div>
        )}
        
        {/* Step 3: Enter Personal Details */}
        {step === 3 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Enter Your Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="clientName" className="block mb-1 text-gray-700">Full Name *</label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    id="clientName"
                    name="clientName"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your full name"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="clientContact" className="block mb-1 text-gray-700">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    id="clientContact"
                    name="clientContact"
                    value={formData.clientContact}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your phone number"
                  />
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="clientEmail" className="block mb-1 text-gray-700">Email Address *</label>
              <input
                type="email"
                id="clientEmail"
                name="clientEmail"
                value={formData.clientEmail}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your email address"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="reason" className="block mb-1 text-gray-700">Reason for Consultation</label>
              <div className="relative">
                <MessageSquare className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  placeholder="Briefly describe your legal matter (optional)"
                ></textarea>
              </div>
            </div>
          </div>
        )}
        
        {/* Step 4: Confirmation */}
        {step === 4 && (
          <div>
            <h3 className="text-xl font-semibold mb-6">Confirm Your Booking</h3>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h4 className="font-medium text-lg mb-4">Booking Summary</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-gray-500">Lawyer</p>
                  <p className="font-medium">{lawyer?.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">Specialization</p>
                  <p className="font-medium">{lawyer?.specialization}</p>
                </div>
                <div>
                  <p className="text-gray-500">Consultation Type</p>
                  <p className="font-medium">
                    {formData.consultationType === "video" && "Video Call"}
                    {formData.consultationType === "phone" && "Phone Call"}
                    {formData.consultationType === "in-person" && "In-Person Meeting"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Date & Time</p>
                  <p className="font-medium">
                    {formData.date} at {formData.timeSlot}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Your Name</p>
                  <p className="font-medium">{formData.clientName}</p>
                </div>
                <div>
                  <p className="text-gray-500">Contact</p>
                  <p className="font-medium">{formData.clientContact}</p>
                </div>
              </div>
              
              {formData.reason && (
                <div>
                  <p className="text-gray-500">Reason for Consultation</p>
                  <p>{formData.reason}</p>
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 mr-2"
                />
                <span className="text-sm text-gray-600">
                  I agree to the terms and conditions and understand that my consultation booking is subject to the lawyer's acceptance. I consent to being contacted regarding this booking.
                </span>
              </label>
            </div>
            
            {bookingError && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
                {bookingError}
              </div>
            )}
          </div>
        )}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button 
            type="button"
            onClick={handleBack}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            {step === 1 ? 'Cancel' : 'Back'}
          </button>
          
          <button 
            type="submit"
            disabled={bookingInProgress}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ${bookingInProgress ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {step < 4 ? 'Continue' : 'Confirm Booking'}
            {bookingInProgress && (
              <span className="ml-2 inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookConsultation;