import React, { useState } from "react";
import { Tooltip } from "@mui/material";

function DetailCard({ 
  id,
  img, 
  icon,
  title, 
  requirements, 
  tip,
  required = true,
  uploadStatus = 'pending',
  processingTime = 'Instant',
  progress = 0
}) {
  const [hovered, setHovered] = useState(false);
  const [uploading, setUploading] = useState(false);

  const getStatusColor = () => {
    switch(uploadStatus) {
      case 'completed': return 'from-green-500 to-green-600';
      case 'pending': return 'from-orange-500 to-red-500';
      case 'optional': return 'from-gray-400 to-gray-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getStatusIcon = () => {
    switch(uploadStatus) {
      case 'completed':
        return (
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
        );
      case 'pending':
        return (
          <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
        );
    }
  };

  const getIcon = (iconType) => {
    const icons = {
      identity: '👤',
      license: '🚗',
      registration: '📋',
      address: '🏠',
      insurance: '🛡️'
    };
    return icons[iconType] || '📄';
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
    }, 2000);
  };

  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
        hovered ? 'transform scale-[1.02]' : ''
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Status Bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getStatusColor()}`}>
        {progress > 0 && progress < 100 && (
          <div 
            className="h-full bg-white/30 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        )}
      </div>

      {/* Required/Optional Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          required 
            ? 'bg-red-100 text-red-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {required ? 'Required' : 'Optional'}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Icon Container */}
          <div className={`flex-shrink-0 relative`}>
            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${
              hovered ? 'from-orange-500 to-red-500' : 'from-orange-400 to-red-400'
            } flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
              hovered ? 'transform rotate-3 scale-110' : ''
            }`}>
              {icon ? (
                <span className="text-2xl">{getIcon(icon)}</span>
              ) : (
                <img
                  src={`/src/assets/requirements/${img}.png`}
                  className="w-10 h-10"
                  alt={title}
                />
              )}
            </div>
            {/* Status Icon Overlay */}
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
              {getStatusIcon()}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>
            
            <p className="text-gray-600 mb-3">{requirements}</p>
            
            {/* Processing Time */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
              </svg>
              <span>Processing: {processingTime}</span>
            </div>

            {/* Tooltip */}
            {tip && (
              <Tooltip 
                title={tip} 
                arrow 
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: 'common.black',
                      '& .MuiTooltip-arrow': {
                        color: 'common.black',
                      },
                    },
                  },
                }}
              >
                <span className="inline-flex items-center text-sm text-orange-600 cursor-help hover:text-orange-700 transition-colors">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-1a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Why is this needed?
                </span>
              </Tooltip>
            )}

            {/* Upload Button */}
            {uploadStatus !== 'completed' && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  uploading
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-md transform hover:-translate-y-0.5'
                }`}
              >
                {uploading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Uploading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                    </svg>
                    Upload Document
                  </span>
                )}
              </button>
            )}

            {/* Completed State */}
            {uploadStatus === 'completed' && (
              <div className="mt-4 flex items-center gap-2 text-green-600">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="text-sm font-medium">Document verified</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
    </div>
  );
}

export default DetailCard;