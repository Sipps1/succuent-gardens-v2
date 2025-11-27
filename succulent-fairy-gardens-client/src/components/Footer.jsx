import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-bg-soft text-gray-700 py-10 px-4 mt-12 text-center border-t-2 border-dashed border-primary">
      <div className="flex justify-center gap-4 mb-4 text-2xl text-primary">
        <a
          href="https://www.instagram.com/succulentfairygardens/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline text-primary"
        >
          Instagram
        </a>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">Contact Us: info@succulentfairygardens.co.za</p>
      </div>
      <p className="mt-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Succulent Fairy Gardens
      </p>
    </footer>
  );
};

export default Footer;