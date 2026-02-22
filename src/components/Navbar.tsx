import { Search, Moon, Sun, Globe, Menu, ChevronDown, X } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    "সর্বশেষ", "শিক্ষা", "উচ্চশিক্ষা", "শিক্ষা প্রশাসন", "ভর্তি পরীক্ষা", 
    "কর্মসংস্থান", "স্কলারশিপ", "খেলাধুলা", "অর্থনীতি", "জাতীয়", "ভিডিও স্টোরি", "আরও"
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <header className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#121212] transition-colors">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
          <div className="hidden md:block text-sm text-gray-600 dark:text-gray-400">
            রবিবার, ২৩ ফেব্রুয়ারি ২০২৫ | আর্কাইভ
          </div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <img 
            src="https://thedailycampus.com/assets/img/logo.png" 
            alt="The Daily Campus" 
            className={`h-12 md:h-16 ${isDark ? 'invert' : ''}`}
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/200x60?text=THE+DAILY+CAMPUS";
            }}
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </button>
          <button 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="hidden md:block bg-white dark:bg-[#121212] border-t border-gray-100 dark:border-gray-800 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar">
            <ul className="flex items-center whitespace-nowrap">
              {navItems.map((item, index) => (
                <li key={index} className="group relative">
                  <a 
                    href="#" 
                    className={`px-4 py-3 flex items-center gap-1 text-[15px] font-medium hover:text-blue-600 transition-colors ${index === 0 ? 'text-blue-600' : 'text-gray-800 dark:text-gray-200'}`}
                  >
                    {item}
                    {(item === "শিক্ষা" || item === "আরও") && <ChevronDown size={14} />}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 border-l dark:border-gray-800 pl-4 ml-4">
              <Globe size={16} className="text-gray-500" />
              <span className="text-sm font-medium">Eng</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#1e1e1e] rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">অনুসন্ধান করুন</h3>
              <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <X size={24} />
              </button>
            </div>
            <div className="relative">
              <input 
                autoFocus
                type="text" 
                placeholder="খবর খুঁজুন..." 
                className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl px-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg font-bold">
                খুঁজুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-[#121212] flex flex-col">
          <div className="p-4 flex justify-between items-center border-b dark:border-gray-800">
            <img 
              src="https://thedailycampus.com/assets/img/logo.png" 
              alt="Logo" 
              className={`h-10 ${isDark ? 'invert' : ''}`}
              referrerPolicy="no-referrer"
            />
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <X size={28} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-xl font-bold block py-2 border-b dark:border-gray-800">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
