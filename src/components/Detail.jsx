import React, { useState, useEffect } from "react";
import DetailCard from "./DetailCard";

function Detail() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("personal");
  const [uploadProgress, setUploadProgress] = useState({});

  const documentCategories = {
    personal: [
      {
        id: "doc-001",
        title: "Proof of Identity",
        requirements: "Passport, Driver's License or National ID",
        img: "img1",
        icon: "identity",
        tip: "Required for age verification and identity confirmation",
        uploadStatus: "completed",
        required: true,
        processingTime: "Instant verification"
      },
      {
        id: "doc-002",
        title: "Valid Driver's License",
        requirements: "Must be valid for vehicle category",
        img: "img5",
        icon: "license",
        tip: "International licenses accepted with translation",
        uploadStatus: "pending",
        required: true,
        processingTime: "2-3 minutes"
      }
    ],
    vehicle: [
      {
        id: "doc-003",
        title: "Car Registration Book",
        requirements: "Original or certified copy",
        img: "img2",
        icon: "registration",
        tip: "Verifies vehicle ownership and legal status",
        uploadStatus: "pending",
        required: true,
        processingTime: "5 minutes"
      }
    ],
    additional: [
      {
        id: "doc-004",
        title: "Proof of Address",
        requirements: "Utility bill or bank statement",
        img: "img3",
        icon: "address",
        tip: "Must be dated within last 3 months",
        uploadStatus: "optional",
        required: false,
        processingTime: "Instant"
      },
      {
        id: "doc-005",
        title: "Insurance Documents",
        requirements: "Valid comprehensive coverage",
        img: "img4",
        icon: "insurance",
        tip: "Additional coverage options available",
        uploadStatus: "optional",
        required: false,
        processingTime: "Manual review"
      }
    ]
  };

  const allDocuments = [
    ...documentCategories.personal,
    ...documentCategories.vehicle,
    ...documentCategories.additional
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          simulateUploadProgress();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("rentaldetail");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const simulateUploadProgress = () => {
    const docs = ['doc-001', 'doc-002', 'doc-003'];
    docs.forEach((docId, index) => {
      setTimeout(() => {
        setUploadProgress(prev => ({
          ...prev,
          [docId]: 100
        }));
      }, (index + 1) * 1000);
    });
  };

  const getCompletedCount = () => {
    return allDocuments.filter(doc => doc.uploadStatus === 'completed').length;
  };

  return (
    <section 
      id="rentaldetail" 
      className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-28 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-12 transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
            <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-semibold text-orange-700">Document Requirements</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Necessary Documents
            </span>
            <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              for Renting
            </span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Have these documents ready to ensure a smooth rental process. 
            Upload them now for instant verification!
          </p>

          {/* Progress Bar */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Upload Progress</span>
              <span className="text-sm font-medium text-gray-700">
                {getCompletedCount()} of {allDocuments.filter(d => d.required).length} required
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${(getCompletedCount() / allDocuments.filter(d => d.required).length) * 100}%` 
                }}
              >
                <div className="h-full bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-200 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex bg-white rounded-full shadow-lg p-1">
            {Object.keys(documentCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image and Tips */}
          <div className={`lg:sticky lg:top-8 transition-all duration-1000 delay-300 transform ${
            isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
          }`}>
            {/* Main Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <img
                src="/src/assets/aboutcar.png"
                className="relative w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-300"
                alt="Car rental documents"
              />
              {/* Floating Badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg animate-bounce">
                <span className="text-sm font-bold">Quick Process</span>
              </div>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-blue-900">Quick Scan</h3>
                </div>
                <p className="text-sm text-blue-700">
                  Use your phone camera for instant upload
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-green-900">Verified</h3>
                </div>
                <p className="text-sm text-green-700">
                  All documents are securely encrypted
                </p>
              </div>
            </div>

            {/* Pro Tip Card */}
            <div className="mt-6 bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-xl shadow-xl text-white">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-1a1 1 0 01-1-1z" clipRule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Pro Tip</h3>
                  <p className="text-sm opacity-95">
                    Upload documents in advance to skip the queue! Our AI-powered verification 
                    system processes most documents instantly.
                  </p>
                  <button className="mt-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors">
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Document Cards */}
          <div className={`space-y-4 transition-all duration-1000 delay-400 transform ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
          }`}>
            {documentCategories[activeCategory].map((item, index) => (
              <div
                key={item.id}
                style={{ animationDelay: `${index * 100 + 500}ms` }}
                className="animate-fadeInUp"
              >
                <DetailCard
                  {...item}
                  progress={uploadProgress[item.id] || 0}
                />
              </div>
            ))}
            
            {/* Action Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Upload All Documents
              </button>
              <button className="flex-1 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                Save for Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Detail;