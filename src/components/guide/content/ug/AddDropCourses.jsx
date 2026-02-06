import React from 'react';

const AddDropCourses = () => {
  const sections = [
    {
      title: "Select Campus Guide",
      summary: "This content is specific to your campus.",
      content: (
        <div className="p-12 text-center bg-gray-50 rounded-3xl border border-gray-100">
           <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🚧</div>
           <h3 className="text-xl font-bold text-gray-900 mb-2">Coming Soon</h3>
           <p className="text-gray-500 max-w-md mx-auto">
             We are working on the AddDropCourses guide for this campus. 
             Please check back later or contribute if you have information!
           </p>
        </div>
      )
    }
  ];

  return { sections, tabs: [] };
};

export default AddDropCourses;
