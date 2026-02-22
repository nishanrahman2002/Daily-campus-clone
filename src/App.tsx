import Navbar from "./components/Navbar";
import NewsCard from "./components/NewsCard";
import SectionHeader from "./components/SectionHeader";
import DistrictNews from "./components/DistrictNews";
import Footer from "./components/Footer";
import { NewsItem } from "./types";
import { useState, useEffect } from "react";
import { X, ArrowUp, Share2, Facebook, Twitter, Mail, Link as LinkIcon } from "lucide-react";

import { supabase } from "./lib/supabase";

export default function App() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  
  // Hardcoded defaults
  const defaultHero: NewsItem = {
    id: "ru-cocaine-1",
    title: "কোকেন নিয়ে ক্লাসে ধরা পড়ল এক রাবি শিক্ষার্থী",
    image: "https://ais-pre-4q5cqasz32lf75bd6pd2sy-54222501514.asia-east1.run.app/api/images/0.png",
    excerpt: "রাজশাহী বিশ্ববিদ্যালয়ে (রাবি) মাদকদ্রব্যসহ এক শিক্ষার্থীকে আটক করার ঘটনা ঘটেছে। রবিবার সকালে বিশ্ববিদ্যালয়ের একটি বিভাগে ক্লাস চলাকালীন সময়ে এ ঘটনা ঘটে...",
    date: "২২ ফেব্রুয়ারি ২০২৬",
    content: `রাজশাহী বিশ্ববিদ্যালয়ে (রাবি) মাদকদ্রব্যসহ এক শিক্ষার্থীকে আটক করার ঘটনা ঘটেছে। রবিবার (২২ ফেব্রুয়ারি ২০২৬) সকালে বিশ্ববিদ্যালয়ের একটি বিভাগে ক্লাস চলাকালীন সময়ে এ ঘটনা ঘটে।

প্রত্যক্ষদর্শীরা জানান, ক্লাস চলাকালে সংশ্লিষ্ট শিক্ষার্থীর আচরণ সন্দেহজনক মনে হলে শিক্ষক বিষয়টি গুরুত্বের সঙ্গে নেন। পরে তার কাছে থাকা সামগ্রী তল্লাশি করে সাদা পাউডার সদৃশ পদার্থ, কিছু কার্ড ও নগদ অর্থ উদ্ধার করা হয়।

বিশ্ববিদ্যালয় প্রশাসন সূত্রে জানা গেছে, উদ্ধারকৃত পদার্থ প্রাথমিকভাবে কোকেন বলে সন্দেহ করা হচ্ছে। বিষয়টি নিশ্চিত করতে প্রয়োজনীয় পরীক্ষার ব্যবস্থা নেওয়া হয়েছে। অভিযুক্ত শিক্ষার্থীকে জিজ্ঞাসাবাদের জন্য সংশ্লিষ্ট কর্তৃপক্ষের কাছে হস্তান্তর করা হয়েছে।

প্রশাসন জানিয়েছে, বিশ্ববিদ্যালয় ক্যাম্পাসে কোনো ধরনের মাদক কার্যক্রম সহ্য করা হবে না। শিক্ষার্থীদের নিরাপদ ও মাদকমুক্ত পরিবেশ নিশ্চিত করতে প্রয়োজনীয় পদক্ষেপ নেওয়া হবে।

এ ঘটনায় ক্যাম্পাসজুড়ে চাঞ্চল্যের সৃষ্টি হয়েছে।`
  };

  const defaultSideNews: NewsItem[] = [
    { id: "1", title: "ঢাকা বিশ্ববিদ্যালয়ের নতুন উপাচার্য হিসেবে আলোচনায় ৫ শিক্ষকের নাম", image: "https://picsum.photos/seed/du-campus/400/250", date: "২৩ ফেব্রুয়ারি ২০২৫" },
    { id: "2", title: "গোপালগঞ্জ বিশ্ববিদ্যালয়ে ছাত্রদের দুই গ্রুপের দফায় দফায় সংঘর্ষ, আহত ২", image: "https://picsum.photos/seed/student-clash/400/250", date: "২২ ফেব্রুয়ারি ২০২৫" },
    { id: "3", title: "একই প্রশ্নে পরীক্ষা হলেও ভিন্ন গ্রেডে বেতন পাচ্ছেন কারিগরি কৃষি শিক্ষকরা, বৈষম্যের অভিযোগ", image: "https://picsum.photos/seed/teacher-protest/400/250", date: "২২ ফেব্রুয়ারি ২০২৫" },
  ];

  const [heroNews, setHeroNews] = useState<NewsItem>(defaultHero);
  const [sideNews, setSideNews] = useState<NewsItem[]>(defaultSideNews);

  // Fetch news from Supabase
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          if (error.code === 'PGRST116' || error.message.includes('schema cache')) {
            console.warn('Supabase: "news" table not found. Using hardcoded fallback data. Please run the SQL setup script.');
          } else {
            console.error('Supabase error:', error.message);
          }
          return;
        }

        if (data && data.length > 0) {
          const hero = data.find(n => n.is_main) || data[0];
          const others = data.filter(n => n.id !== hero.id).slice(0, 3);
          
          setHeroNews(hero);
          if (others.length > 0) setSideNews(others);
          console.log('News loaded from Supabase');
        }
      } catch (err) {
        console.error('Failed to fetch news from Supabase');
      }
    };
    fetchNews();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNewsClick = (item: NewsItem) => {
    setSelectedNews(item);
  };

  const handleShare = (platform: string) => {
    if (!selectedNews) return;
    const url = window.location.href;
    const title = selectedNews.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('লিঙ্ক কপি করা হয়েছে!');
        break;
    }
  };

  const admissionNews: NewsItem[] = [
    { id: "5", title: "২০ বিশ্ববিদ্যালয়ে ভর্তির প্রবেশপত্র ডাউনলোডের সুযোগ আর ৩ দিন", image: "https://picsum.photos/seed/exam-hall/600/350", date: "২২ ফেব্রুয়ারি ২০২৫" },
    { id: "6", title: "রাবিতে ভর্তির বিষয় পছন্দক্রম শুরু আজ, শিক্ষার্থীদের জরুরি নির্দেশনা", image: "https://picsum.photos/seed/varsity-gate/400/250", date: "২২ ফেব্রুয়ারি ২০২৫" },
    { id: "7", title: "জবিতে চান্স পাওয়া শিক্ষার্থীদের ভর্তি শুরু হচ্ছে দুপুরে", image: "https://picsum.photos/seed/student-id/400/250", date: "১৯ ফেব্রুয়ারি ২০২৫" },
    { id: "8", title: "জবিতে পাঁচ ইউনিটের বিষয় প্রাপ্তদের ভর্তির তারিখ প্রকাশ", image: "https://picsum.photos/seed/notice-board/400/250", date: "১৮ ফেব্রুয়ারি ২০২৫" },
  ];

  const educationAdminNews: NewsItem[] = [
    { id: "9", title: "পরীক্ষার সময় আন্দোলনকারী শিক্ষকদের শাস্তি সংক্রান্ত সেই আদেশ বাতিল", image: "https://picsum.photos/seed/admin-office/600/350", date: "২২ ফেব্রুয়ারি ২০২৫" },
    { id: "10", title: "প্রাথমিক শিক্ষার মানোন্নয়নে বিশেষ গুরুত্ব দেওয়া প্রয়োজন : ড. মিলন", image: "https://picsum.photos/seed/classroom/400/250", date: "২২ ফেব্রুয়ারি ২০২৫" },
    { id: "11", title: "পিটিআইএর সংশোধিত ছুটির তালিকা প্রকাশ, দেখুন এখানে", image: "https://picsum.photos/seed/calendar/400/250", date: "২২ ফেব্রুয়ারি ২০২৫" },
    { id: "12", title: "ই-রেজিস্ট্রেশনের সময় বাড়ল", image: "https://picsum.photos/seed/computer-lab/400/250", date: "২২ ফেব্রুয়ারি ২০২৫" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#121212] transition-colors">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-6 py-12">
        {/* Breaking News Ticker */}
        <div className="mb-12 bg-red-600 text-white rounded-xl overflow-hidden flex items-center shadow-xl">
          <div className="bg-red-800 px-4 py-2 font-bold uppercase tracking-wider text-sm whitespace-nowrap">
            ব্রেকিং নিউজ
          </div>
          <div className="px-4 py-2 text-sm font-medium overflow-hidden whitespace-nowrap">
            <div className="animate-marquee">
              কোকেন নিয়ে ক্লাসে ধরা পড়ল এক রাবি শিক্ষার্থী • ঢাকা বিশ্ববিদ্যালয়ের নতুন উপাচার্য হিসেবে আলোচনায় ৫ শিক্ষকের নাম • ২০ বিশ্ববিদ্যালয়ে ভর্তির প্রবেশপত্র ডাউনলোডের সুযোগ আর ৩ দিন
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-12 gap-10 mb-20">
          <div className="lg:col-span-3 space-y-6">
            {sideNews.map(item => (
              <NewsCard key={item.id} item={item} onClick={handleNewsClick} />
            ))}
          </div>
          
          <div className="lg:col-span-6">
            <NewsCard item={heroNews} variant="hero" onClick={handleNewsClick} />
            <div className="grid grid-cols-2 gap-6 mt-10">
              <NewsCard item={{...sideNews[0], id: "extra1"}} variant="horizontal" onClick={handleNewsClick} />
              <NewsCard item={{...sideNews[1], id: "extra2"}} variant="horizontal" onClick={handleNewsClick} />
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="bg-gray-100 dark:bg-[#1e1e1e] p-6 rounded-xl transition-colors">
              <h3 className="font-bold mb-6 border-b dark:border-gray-800 pb-3 dark:text-white text-lg">সর্বশেষ সংবাদ</h3>
              <div className="space-y-6">
                {sideNews.map(item => (
                  <NewsCard key={`latest-${item.id}`} item={item} variant="mini" onClick={handleNewsClick} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Admission Section */}
        <section className="mb-20">
          <SectionHeader title="ভর্তি পরীক্ষা" />
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-12">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="md:col-span-2">
                  <NewsCard item={admissionNews[0]} onClick={handleNewsClick} />
                </div>
                <div className="md:col-span-2 grid grid-cols-1 gap-6">
                  {admissionNews.slice(1).map(item => (
                    <NewsCard key={item.id} item={item} variant="horizontal" onClick={handleNewsClick} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Admin Section */}
        <section className="mb-20 bg-yellow-50/30 dark:bg-yellow-900/10 -mx-4 px-4 py-16 transition-colors">
          <div className="max-w-7xl mx-auto">
            <SectionHeader title="শিক্ষা প্রশাসন" color="yellow-500" />
            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-12">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <div className="md:col-span-2">
                    <NewsCard item={educationAdminNews[0]} onClick={handleNewsClick} />
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 gap-6">
                    {educationAdminNews.slice(1).map(item => (
                      <NewsCard key={item.id} item={item} variant="horizontal" onClick={handleNewsClick} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="mb-24">
          <SectionHeader title="ভিডিও" />
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="relative group cursor-pointer">
                <div className="aspect-video rounded-xl overflow-hidden relative">
                  <img src="https://picsum.photos/seed/minister/800/450" className="w-full h-full object-cover" alt="Video" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mt-4 group-hover:text-blue-600 transition-colors dark:text-white">বেসরকারি শিক্ষকদের বেতন ও বদলি নিয়ে যা বললেন শিক্ষামন্ত্রী</h3>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-video rounded-lg overflow-hidden relative mb-2">
                    <img src={`https://picsum.photos/seed/edu-vid-${i}/400/250`} className="w-full h-full object-cover" alt="Video" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-0.5">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h4 className="text-sm font-bold leading-tight line-clamp-2 group-hover:text-blue-600 dark:text-gray-300">ছোটবেলায় অষ্টম শ্রেণী পর্যন্ত পাস করতাম না</h4>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* District News */}
        <DistrictNews />

        {/* More Sections Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div>
            <SectionHeader title="রাজনীতি" />
            <NewsCard item={sideNews[0]} onClick={handleNewsClick} />
            <div className="mt-4 space-y-3">
              {sideNews.slice(1).map(item => (
                <NewsCard key={`pol-${item.id}`} item={item} variant="horizontal" onClick={handleNewsClick} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="খেলাধুলা" />
            <NewsCard item={sideNews[1]} onClick={handleNewsClick} />
            <div className="mt-4 space-y-3">
              {sideNews.slice(0, 1).map(item => (
                <NewsCard key={`spo-${item.id}`} item={item} variant="horizontal" onClick={handleNewsClick} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="স্বাস্থ্য ও চিকিৎসা" />
            <NewsCard item={sideNews[2]} onClick={handleNewsClick} />
            <div className="mt-4 space-y-3">
              {sideNews.slice(0, 2).map(item => (
                <NewsCard key={`hea-${item.id}`} item={item} variant="horizontal" onClick={handleNewsClick} />
              ))}
            </div>
          </div>
        </div>

        {/* Employment Section */}
        <section className="mb-24">
          <SectionHeader title="কর্মসংস্থান" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "অ্যাসিস্ট্যান্ট এক্সিকিউটিভ নিয়োগ দেবে সিটি গ্রুপ, আবেদন অভিজ্ঞতা ছাড়াই", color: "bg-blue-100 dark:bg-blue-900/20" },
              { title: "শিক্ষক নিয়োগ দেবে জাতীয় বিশ্ববিদ্যালয়, আবেদন সরাসরি-ডাকযোগে", color: "bg-green-100 dark:bg-green-900/20" },
              { title: "সিটি ব্যাংকে চাকরি, নিয়োগ ঢাকা-সহ ৮ জেলায়, আবেদন স্নাতক পাশেই", color: "bg-pink-100 dark:bg-pink-900/20" },
              { title: "ইবনে সিনায় চাকরি, আবেদন শেষ ২৬ ফেব্রুয়ারি", color: "bg-purple-100 dark:bg-purple-900/20" }
            ].map((job, i) => (
              <div key={i} className={`${job.color} p-6 rounded-xl flex flex-col items-center text-center cursor-pointer hover:shadow-md transition-shadow`}>
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg mb-4 flex items-center justify-center shadow-sm">
                  <img src={`https://picsum.photos/seed/company-${i}/64/64`} alt="Logo" className="rounded" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-sm font-bold leading-tight dark:text-gray-200">{job.title}</h4>
              </div>
            ))}
          </div>
        </section>

        {/* Opinion Section */}
        <section className="mb-24">
          <SectionHeader title="মতামত" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {[
              { name: "একুশের চেতনা থেকে রাষ্ট্রচেতনার উত্তরণ", author: "অধ্যাপক ড. সামসুল আলম" },
              { name: "চাপে পদত্যাগ করিনি, বরং দায়িত্বে থাকতে আমাকে অনুরোধ করা হয়েছে", author: "ড. নিয়াজ আহমেদ খান" },
              { name: "নতুন দিনের আশা জাগাচ্ছে স্পিন অ্যান্ড ল্যাপটপের থেরাপি", author: "ড. সায়েম আহমেদ" },
              { name: "আসিফ নজরুল কি করেছে?", author: "ড. আসিফ নজরুল" }
            ].map((op, i) => (
              <div key={i} className="group cursor-pointer text-center">
                <div className="aspect-square rounded-full overflow-hidden mb-4 border-4 border-gray-100 dark:border-gray-800 group-hover:border-blue-200 transition-colors">
                  <img src={`https://picsum.photos/seed/writer-${i}/300/300`} alt={op.author} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-sm font-bold leading-tight mb-2 group-hover:text-blue-600 dark:text-gray-200">{op.name}</h4>
                <p className="text-xs text-gray-500">{op.author}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Law and Foreign */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div>
            <SectionHeader title="আইন ও আদালত" />
            <NewsCard item={{ id: "law1", title: "বাগেরহাটে কুপিয়ে যুবকের হাত-পা বিচ্ছিন্ন করার অভিযোগ", image: "https://picsum.photos/seed/law/600/350", date: "২২ ফেব্রুয়ারি ২০২৫" }} onClick={handleNewsClick} />
            <div className="mt-4 space-y-3">
              <NewsCard item={{ id: "law2", title: "চাঁদাবাজকে ধরে চাঁদাবাজির বিরুদ্ধে পুলিশের মাইকিং", variant: "horizontal" } as any} onClick={handleNewsClick} />
              <NewsCard item={{ id: "law3", title: "গৃহকর্মী পরিচয়ের আড়ালে 'অজ্ঞান পার্টি', বৃদ্ধার মৃত্যুর পর গ্রেপ্তার ৪", variant: "horizontal" } as any} onClick={handleNewsClick} />
            </div>
          </div>
          <div>
            <SectionHeader title="বিদেশ" />
            <NewsCard item={{ id: "for1", title: "বিয়ের দিনেই দুই বোনের রহস্যজনক মৃত্যু", image: "https://picsum.photos/seed/foreign/600/350", date: "২২ ফেব্রুয়ারি ২০২৫" }} onClick={handleNewsClick} />
            <div className="mt-4 space-y-3">
              <NewsCard item={{ id: "for2", title: "বৈশ্বিক শুল্ক ১৫ শতাংশে বাড়ানোর ঘোষণা ট্রাম্পের", variant: "horizontal" } as any} onClick={handleNewsClick} />
              <NewsCard item={{ id: "for3", title: "একটি ইট থেকে যেভাবে বহু বছর নির্যাতনের শিকার শিশুর খোঁজ পেলেন গোয়েন্দারা", variant: "horizontal" } as any} onClick={handleNewsClick} />
            </div>
          </div>
        </div>

        {/* Tech, Entertainment, Economy */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div>
            <SectionHeader title="বিজ্ঞান ও প্রযুক্তি" />
            <NewsCard item={{ id: "tech1", title: "আন্তর্জাতিক সনদসহ লিঙ্কডইনের ফ্রি এআই কোর্স, করবেন যেভাবে", image: "https://picsum.photos/seed/tech/400/250" }} onClick={handleNewsClick} />
            <div className="mt-4 space-y-3">
              <NewsCard item={{ id: "tech2", title: "আজ দুই ঘণ্টা মোবাইল ফোনের নেটওয়ার্ক বিচ্ছিন্ন হতে পারে অনেক গ্রাহকের", variant: "horizontal" } as any} onClick={handleNewsClick} />
              <NewsCard item={{ id: "tech3", title: "২০২৭ সালে মানুষের বেকার হওয়ার কারণ হবে এআই, গুরুত্ব বাড়বে যে ৫ চাকরির", variant: "horizontal" } as any} onClick={handleNewsClick} />
            </div>
          </div>
          <div>
            <SectionHeader title="বিনোদন ও সংস্কৃতি" />
            <NewsCard item={{ id: "ent1", title: "১৪ বোতল মদসহ ধরা পড়ার খবর, যা বললেন অভিনেত্রী মেহজাবীন", image: "https://picsum.photos/seed/ent/400/250" }} onClick={handleNewsClick} />
            <div className="mt-4 space-y-3">
              <NewsCard item={{ id: "ent2", title: "বাচ্চারা আল্লাহর ওয়াস্তে পড়তে বসো", variant: "horizontal" } as any} onClick={handleNewsClick} />
              <NewsCard item={{ id: "ent3", title: "হঠাৎ কেন খালি পায়ে সালমান মুক্তাদির ও দিশা ইসলাম", variant: "horizontal" } as any} onClick={handleNewsClick} />
            </div>
          </div>
          <div>
            <SectionHeader title="অর্থনীতি ও ব্যবসা" />
            <NewsCard item={{ id: "eco1", title: "গোডাউনে লুকানো ছিল ৭৭টি আমেরিকান মোটরসাইকেল, সিলগালা", image: "https://picsum.photos/seed/eco/400/250" }} onClick={handleNewsClick} />
            <div className="mt-4 space-y-3">
              <NewsCard item={{ id: "eco2", title: "ইসলামী ব্যাংক-রিয়া মানি ট্রান্সফার ক্যাশ রেমিট্যান্স উৎসবে প্রথম মোটরসাইকেল পেলেন শাবনুর", variant: "horizontal" } as any} onClick={handleNewsClick} />
              <NewsCard item={{ id: "eco3", title: "১১ মাস লাভ করেন, রোজার মাস বাদ রাখেন: ব্যবসায়ীদের উদ্দেশ্যে বাণিজ্যমন্ত্রী", variant: "horizontal" } as any} onClick={handleNewsClick} />
            </div>
          </div>
        </div>

        {/* Personality, Books, Religion */}
        <div className="grid md:grid-cols-3 gap-12 mb-24">
          <div>
            <SectionHeader title="ব্যক্তিত্ব" />
            <div className="space-y-4">
              {[
                { title: "কোথায় আছেন ড. ইউনুস, যা জানা গেল", img: "https://picsum.photos/seed/yunus/100/70" },
                { title: "বিসিএসে প্রথম হওয়া ড. খলিলুর রহমান যেভাবে পররাষ্ট্রমন্ত্রী", img: "https://picsum.photos/seed/minister-khalil/100/70" },
                { title: "হেলিকপ্টারের সঙ্গে নতুন শিক্ষামন্ত্রীর কী সম্পর্ক, কেন এত আলোচনা", img: "https://picsum.photos/seed/heli/100/70" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer" onClick={() => handleNewsClick({ id: `p-${i}`, title: item.title, image: item.img } as any)}>
                  <img src={item.img} className="w-20 h-14 object-cover rounded" alt="" referrerPolicy="no-referrer" />
                  <h4 className="text-sm font-bold leading-tight group-hover:text-blue-600 dark:text-gray-300">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="বই ও গ্রন্থাগার" />
            <div className="space-y-4">
              {[
                { title: "নিজ বইয়ের নামে ৭০ হাজার প্রস্তাব, চূড়ান্ত করে জানালেন শায়খ আহমাদুল্লাহ", img: "https://picsum.photos/seed/book-cover/100/70" },
                { title: "১৩৬ বছর বয়সী অমদা গোবিন্দ পাবলিক লাইব্রেরিতে ৬৭ বছরের দুর্লভ সংগ্রহ", img: "https://picsum.photos/seed/library-old/100/70" },
                { title: "৮ম শ্রেণির নতুন বাংলা বই থেকে বাদ শেখ মুজিবের ৭ মার্চের ভাষণ", img: "https://picsum.photos/seed/bangla-book/100/70" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer" onClick={() => handleNewsClick({ id: `b-${i}`, title: item.title, image: item.img } as any)}>
                  <img src={item.img} className="w-20 h-14 object-cover rounded" alt="" referrerPolicy="no-referrer" />
                  <h4 className="text-sm font-bold leading-tight group-hover:text-blue-600 dark:text-gray-300">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="ধর্ম ও নৈতিকতা" />
            <div className="space-y-4">
              {[
                { title: "ছাত্রদের আয়োজনে ঢাবিতে কোরআন তেলাওয়াত প্রতিযোগিতা শুরু ১ মার্চ", img: "https://picsum.photos/seed/quran/100/70" },
                { title: "স্যানিটাইজার মেখে নামাজ পড়লে কি নামাজ হবে?", img: "https://picsum.photos/seed/prayer/100/70" },
                { title: "সর্বোচ্চ সওয়াব পেতে রমজানে করুন এই পাঁচ গুরুত্বপূর্ণ আমল", img: "https://picsum.photos/seed/ramadan/100/70" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer" onClick={() => handleNewsClick({ id: `r-${i}`, title: item.title, image: item.img } as any)}>
                  <img src={item.img} className="w-20 h-14 object-cover rounded" alt="" referrerPolicy="no-referrer" />
                  <h4 className="text-sm font-bold leading-tight group-hover:text-blue-600 dark:text-gray-300">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#1e1e1e] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative">
            <button 
              onClick={() => setSelectedNews(null)}
              className="absolute right-4 top-4 p-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="p-6 md:p-8">
              <div className="aspect-video rounded-xl overflow-hidden mb-6">
                <img src={selectedNews.image} alt={selectedNews.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">{selectedNews.title}</h2>
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-y dark:border-gray-800 py-4 mb-6">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{selectedNews.date || "২৩ ফেব্রুয়ারি ২০২৫"}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  <span className="text-blue-600 font-bold">দ্য ডেইলি ক্যাম্পাস</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mr-2">শেয়ার করুন:</span>
                  <button onClick={() => handleShare('facebook')} className="p-2 bg-[#1877F2] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Facebook size={18} />
                  </button>
                  <button onClick={() => handleShare('twitter')} className="p-2 bg-[#1DA1F2] text-white rounded-full hover:opacity-90 transition-opacity">
                    <Twitter size={18} />
                  </button>
                  <button onClick={() => handleShare('email')} className="p-2 bg-gray-600 text-white rounded-full hover:opacity-90 transition-opacity">
                    <Mail size={18} />
                  </button>
                  <button onClick={() => handleShare('copy')} className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <LinkIcon size={18} />
                  </button>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                {selectedNews.content ? (
                  selectedNews.content.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))
                ) : (
                  <>
                    <p>
                      {selectedNews.excerpt || "ঢাকা বিশ্ববিদ্যালয়ের নতুন উপাচার্য হিসেবে আলোচনায় রয়েছেন ৫ জন শিক্ষক। ঘোষণার ১২ দিনের মাথায় আনুষ্ঠানিকভাবে ঢাকা বিশ্ববিদ্যালয়ের (ঢাবি) উপাচার্য পদ থেকে পদত্যাগপত্র জমা দিয়েছেন অধ্যাপক ড. নিয়াজ আহমেদ খান।"}
                    </p>
                    <p>
                      সূত্রে জানা গেছে, নতুন উপাচার্য নিয়োগের প্রক্রিয়া দ্রুত সম্পন্ন করার নির্দেশ দেওয়া হয়েছে। শিক্ষা মন্ত্রণালয় থেকে এ সংক্রান্ত একটি প্রস্তাবনা রাষ্ট্রপতির কাছে পাঠানো হয়েছে। খুব শীঘ্রই এ বিষয়ে প্রজ্ঞাপন জারি হতে পারে।
                    </p>
                    <p>
                      আলোচনায় থাকা শিক্ষকদের মধ্যে রয়েছেন বিশ্ববিদ্যালয়ের প্রথিতযশা কয়েকজন অধ্যাপক। শিক্ষার্থীরাও চান একজন সৎ ও দক্ষ উপাচার্য যিনি বিশ্ববিদ্যালয়ের শিক্ষা ও গবেষণার মান উন্নয়নে কাজ করবেন।
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-xl hover:bg-blue-700 transition-all hover:scale-110 z-50"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}
