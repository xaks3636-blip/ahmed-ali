import React from 'react';

const ImageEditor = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg mt-8 max-w-2xl mx-auto text-right" dir="rtl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">محرر الصور الاحترافي</h2>
      <div className="border-2 border-dashed border-gray-300 p-12 text-center rounded-lg">
        <p className="text-gray-500">قريباً: ستتمكن من تعديل صورك هنا باستخدام أدوات الذكاء الاصطناعي</p>
      </div>
    </div>
  );
};

export default ImageEditor;
