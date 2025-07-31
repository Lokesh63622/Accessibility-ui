import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="60"
        height="60"
        viewBox="0 0 40 40"
        className="animate-spin"
      >
        <path
          d="M6.421,8.679.02,15.087,0,15.1V27.643L6.29,21.357,19.346,34.415H32.159L12.7,14.951,18.015,9.63l-6.27-6.272Z"
          transform="translate(0 4.334)"
          fill="#f57d20"
        />
        <path
          d="M2.746,0,22.212,19.468,19.02,22.66l-2.126,2.126,6.272,6.272L34.9,19.319V6.772l-6.286,6.291L15.557,0Z"
          transform="translate(3.545 0.001)"
          fill="#162d52"
        />
      </svg>
    </div>
  );
};

export default Loader;
