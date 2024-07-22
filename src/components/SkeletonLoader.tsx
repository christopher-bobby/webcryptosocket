import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="p-4 w-1/2 mx-auto flex">
        <div className="animate-pulse flex space-x-4 w-1/2">
            <div className="rounded-full bg-gray-200 h-12 w-12"></div>
            <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            </div>
        </div>
        <div className='w-1/4 px-4'>
            <div className="animate-pulse h-4 bg-gray-200" />
        </div>
        <div className='w-1/4 px-4'>
            <div className="animate-pulse h-4 w-1/2 bg-gray-200" />
        </div>
    </div>
  );
};

export default SkeletonLoader;
