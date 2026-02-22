import { ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  showMore?: boolean;
  color?: string;
}

export default function SectionHeader({ title, showMore = true, color = "blue-600" }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6 border-b-2 border-gray-100 dark:border-gray-800 pb-2">
      <div className="relative">
        <h2 className="text-xl font-bold pr-4 dark:text-white">{title}</h2>
        <div className={`absolute -bottom-[10px] left-0 h-1 w-full bg-${color}`}></div>
      </div>
      {showMore && (
        <a href="#" className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors">
          আরও পড়ুন <ChevronRight size={16} />
        </a>
      )}
    </div>
  );
}
