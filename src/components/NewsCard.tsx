import React from "react";
import { Share2 } from "lucide-react";
import { NewsItem } from "../types";

interface NewsCardProps {
  item: NewsItem;
  variant?: "horizontal" | "vertical" | "mini" | "hero";
  key?: string | number;
  onClick?: (item: NewsItem) => void;
}

export default function NewsCard({ item, variant = "vertical", onClick }: NewsCardProps) {
  const handleClick = () => {
    if (onClick) onClick(item);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = window.location.href;
    const shareTitle = item.title;

    if (navigator.share) {
      navigator.share({
        title: shareTitle,
        url: shareUrl,
      }).catch(console.error);
    } else {
      // Fallback: Open a simple alert or custom menu
      // For this clone, we'll just open a Facebook share link as an example
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
    }
  };

  const ShareButton = () => (
    <button 
      onClick={handleShare}
      className="p-1.5 bg-white/80 dark:bg-black/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-black transition-colors shadow-sm"
      title="শেয়ার করুন"
    >
      <Share2 size={16} className="text-gray-700 dark:text-gray-200" />
    </button>
  );

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://picsum.photos/seed/${item.id}/800/450`;
  };

  if (variant === "hero") {
    return (
      <div className="group cursor-pointer" onClick={handleClick}>
        <div className="relative overflow-hidden rounded-lg aspect-video mb-4">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <ShareButton />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-blue-600 transition-colors dark:text-white">
          {item.title}
        </h2>
        {item.excerpt && <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">{item.excerpt}</p>}
        <div className="mt-2 text-sm text-gray-400">{item.date}</div>
      </div>
    );
  }

  if (variant === "horizontal") {
    return (
      <div className="flex gap-4 group cursor-pointer py-3 border-b border-gray-100 dark:border-gray-800 last:border-0" onClick={handleClick}>
        <div className="w-1/3 shrink-0 aspect-video overflow-hidden rounded relative">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <ShareButton />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold leading-snug group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-gray-200">
            {item.title}
          </h3>
          <div className="mt-1 text-xs text-gray-400">{item.date}</div>
        </div>
      </div>
    );
  }

  if (variant === "mini") {
    return (
      <div className="flex gap-3 group cursor-pointer py-2" onClick={handleClick}>
        <div className="w-20 h-14 shrink-0 overflow-hidden rounded relative">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-medium leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-gray-300">
            {item.title}
          </h4>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={handleClick}>
      <div className="relative overflow-hidden rounded-lg aspect-video mb-3">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={handleImageError}
        />
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ShareButton />
        </div>
      </div>
      <h3 className="text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 dark:text-gray-100">
        {item.title}
      </h3>
      <div className="mt-2 text-xs text-gray-400">{item.date}</div>
    </div>
  );
}
