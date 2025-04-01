import React, { useState, useCallback } from 'react';
import { Upload, File, FileText, Trash2, Lock, Shield, Eye, Download } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { useUser, useClerk } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

interface Document {
  id: string;
  name: string;
  size: number;
  type: string;
  uploadDate: Date;
  sharedWith: string[];
  status: 'uploaded' | 'shared' | 'reviewed';
}

const DocumentUpload: React.FC = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!isSignedIn) {
      toast.error('Please sign in to upload documents');
      return;
    }

    const newDocuments = acceptedFiles.map(file => ({
      id: uuidv4(),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date(),
      sharedWith: [],
      status: 'uploaded' as const
    }));

    setDocuments(prev => [...prev, ...newDocuments]);
    toast.success(`${acceptedFiles.length} document(s) uploaded successfully`);
  }, [isSignedIn]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxSize: 10485760, // 10MB
  });

  const handleDeleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    toast.success('Document deleted successfully');
  };

  const handleShareDocument = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDocument) return;
    
    if (!shareEmail.trim()) {
      toast.error('Please enter an email address');
      return;
    }
    
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === selectedDocument.id 
          ? { 
              ...doc, 
              sharedWith: [...doc.sharedWith, shareEmail],
              status: 'shared' as const
            } 
          : doc
      )
    );
    
    setShareEmail('');
    setShowShareModal(false);
    toast.success(`Document shared with ${shareEmail}`);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <File className="w-10 h-10 text-red-500" />;
    if (type.includes('word')) return <FileText className="w-10 h-10 text-blue-500" />;
    if (type.includes('excel')) return <FileText className="w-10 h-10 text-green-500" />;
    if (type.includes('image')) return <FileText className="w-10 h-10 text-purple-500" />;
    return <FileText className="w-10 h-10 text-gray-500" />;
  };

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Lock className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Secure Document Upload</h1>
            <p className="text-xl text-gray-600 mb-8">
              Please sign in to securely upload and manage your legal documents.
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h1 className="text-2xl font-bold mb-6">Secure Document Upload</h1>
              
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p className="text-lg font-medium mb-2">
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here, or click to select files'}
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG (Max: 10MB)
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Your Documents</h2>
              
              {documents.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No documents uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
                      {getFileIcon(doc.type)}
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{doc.name}</h3>
                        <div className="flex text-sm text-gray-500">
                          <span>{formatFileSize(doc.size)}</span>
                          <span className="mx-2">•</span>
                          <span>{format(doc.uploadDate, 'MMM d, yyyy')}</span>
                          {doc.status !== 'uploaded' && (
                            <>
                              <span className="mx-2">•</span>
                              <span className={`${
                                doc.status === 'shared' ? 'text-blue-600' : 'text-green-600'
                              }`}>
                                {doc.status === 'shared' ? 'Shared' : 'Reviewed'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedDocument(doc);
                            setShowShareModal(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                          title="Share"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        <button 
                          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                          title="Download"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleDeleteDocument(doc.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Security Features</h2>
              <ul className="space-y-4">
                <li className="flex">
                  <Shield className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">End-to-End Encryption</h3>
                    <p className="text-sm text-gray-600">Your documents are encrypted in transit and at rest</p>
                  </div>
                </li>
                <li className="flex">
                  <Lock className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Access Control</h3>
                    <p className="text-sm text-gray-600">Share documents only with authorized individuals</p>
                  </div>
                </li>
                <li className="flex">
                  <Eye className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium">Activity Tracking</h3>
                    <p className="text-sm text-gray-600">Monitor who views or downloads your documents</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4">Document Tips</h2>
              <ul className="space-y-3 text-blue-800">
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-3 mt-0.5">1</div>
                  <p>Organize documents by case or matter for easy access</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-3 mt-0.5">2</div>
                  <p>Use descriptive filenames including dates</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-3 mt-0.5">3</div>
                  <p>Share documents only with your assigned lawyer</p>
                </li>
                <li className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs mr-3 mt-0.5">4</div>
                  <p>Keep original copies of all important documents</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Share Document Modal */}
      {showShareModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Share Document</h2>
              <p className="text-gray-600 mb-4">
                Share "{selectedDocument.name}" with your lawyer or other authorized parties.
              </p>
              
              <form onSubmit={handleShareDocument}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={shareEmail}
                    onChange={(e) => setShareEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter email address"
                    required
                  />
                </div>
                
                {selectedDocument.sharedWith.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Already shared with:</h3>
                    <ul className="text-sm text-gray-600">
                      {selectedDocument.sharedWith.map((email, index) => (
                        <li key={index} className="mb-1">{email}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowShareModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Share
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;