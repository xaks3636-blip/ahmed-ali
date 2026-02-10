import React, { useState } from 'react';

const ImageGenerator = () => {
  const [prompt, setPrompt] = useState('');
  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-4 text-right" dir="rtl">
      <h2 className="text-xl font-bold mb-4">مولد الصور بالذكاء الاصطناعي</h2>
      <input 
        type="text" 
        placeholder="اكتب وصف الصورة هنا..." 
        className="w-full p-2 border rounded mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
        توليد الصورة
      </button>
    </div>
  );
};

export default ImageGenerator;
