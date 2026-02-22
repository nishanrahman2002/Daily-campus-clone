import { Facebook, Twitter, Instagram, Youtube, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-bold mb-6">সম্পাদক:</h3>
            <p className="font-bold text-xl mb-2">মাহবুব রনি</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              দ্য ডেইলি ক্যাম্পাস, দ্বিতীয় তলা, হাসান হোল্ডিংস,<br />
              ৫২/১ নিউ ইস্কাটন রোড, ঢাকা ১০০০
            </p>
            <p className="mt-4 text-blue-400">info@thedailycampus.com</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">নিউজ রুম:</h3>
            <p className="text-gray-400 text-sm mb-2">০১৮২২০৯৯১০৫, ০১৭৮৭৭১২৬৭৮</p>
            <p className="text-blue-400">news@thedailycampus.com</p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">আমাদের সম্পর্কে</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">যোগাযোগ</a></li>
              <li><a href="#" className="hover:text-white">তথ্য দিন</a></li>
              <li><a href="#" className="hover:text-white">মতামত জানান</a></li>
              <li><a href="#" className="hover:text-white">প্রাইভেসি পলিসি</a></li>
              <li><a href="#" className="hover:text-white">শর্তাবলি</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">অন্যান্য</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white">টেক্সট কনভার্টার</a></li>
              <li><a href="#" className="hover:text-white">আর্কাইভ</a></li>
              <li><a href="#" className="hover:text-white">নামাজ, সেহরি, ইফতারের সময়</a></li>
            </ul>
            
            <div className="mt-8">
              <h4 className="text-sm font-bold mb-4">অনুসরণ করুন</h4>
              <div className="flex gap-4">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-blue-600 transition-colors"><Facebook size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-pink-600 transition-colors"><Instagram size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-blue-400 transition-colors"><Twitter size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-red-600 transition-colors"><Youtube size={18} /></a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-blue-700 transition-colors"><Linkedin size={18} /></a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          © কপিরাইট ২০২৫, দ্য ডেইলি ক্যাম্পাস লিমিটেড
        </div>
      </div>
    </footer>
  );
}
