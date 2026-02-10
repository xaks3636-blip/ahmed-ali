import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-lg">
      <div className="font-bold text-xl">أحمد علي</div>
      <ul className="flex gap-4">
        <li><a href="/" className="hover:underline">الرئيسية</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
