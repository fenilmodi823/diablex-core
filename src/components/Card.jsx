import React from 'react';

export const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white border border-gray-200 rounded-2xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-5 pt-4 pb-2 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`px-5 pb-5 ${className}`}>{children}</div>
);
