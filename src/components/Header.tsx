import React from 'react';

export function Header() {
  return (
    <header className="px-6 py-4 flex justify-between items-center border-b bg-[rgb(2,5,10)] shadow-md">
      <div className="flex items-center gap-2">
        <img 
          src="https://i.ibb.co/b5qKQMf/x-Local-Coin-Swap-Blog-Logo-1-png-pagespeed-ic-V-8-F1r-IKy1.png" 
          alt="LocalCoins" 
          className="h-8"
        />
      </div>
      <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[rgb(255,141,25)] via-[rgb(240,131,15)] to-[rgb(230,121,5)] text-white hover:from-[rgb(255,151,35)] hover:via-[rgb(250,141,25)] hover:to-[rgb(240,131,15)] transition-all duration-300 shadow-lg">
        Register
      </button>
    </header>
  );
}