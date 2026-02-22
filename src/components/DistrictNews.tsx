import { MapPin, ChevronDown } from "lucide-react";
import { useState } from "react";
import { DISTRICTS_DATA } from "../constants";

export default function DistrictNews() {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const divisions = Object.keys(DISTRICTS_DATA);
  const districts = selectedDivision ? DISTRICTS_DATA[selectedDivision] : [];

  return (
    <section className="bg-[#F9F9F9] dark:bg-[#1e1e1e] py-20 rounded-2xl my-24 transition-colors">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-yellow-400 p-2 rounded-lg">
            <MapPin className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold">আমার জেলার খবর</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-8">আপনার জেলার সর্বশেষ খবর এক নজরে</p>
        
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <div className="relative">
            <select 
              value={selectedDivision}
              onChange={(e) => {
                setSelectedDivision(e.target.value);
                setSelectedDistrict("");
              }}
              className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="">-- বিভাগ নির্বাচন করুন --</option>
              {divisions.map(div => (
                <option key={div} value={div}>{div}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          
          <div className="relative">
            <select 
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedDivision}
              className="w-full appearance-none bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
            >
              <option value="">-- জেলা নির্বাচন করুন --</option>
              {districts.map(dist => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center opacity-40">
          <MapPin size={64} className="text-gray-300 mb-4" />
          <p className="text-lg font-medium">
            {selectedDistrict 
              ? `${selectedDistrict} জেলার খবর দেখুন` 
              : selectedDivision 
                ? `${selectedDivision} বিভাগের খবর দেখুন` 
                : "আপনার জেলার খবর দেখুন"}
          </p>
          <p className="text-sm">উপরে থেকে আপনার বিভাগ ও জেলা নির্বাচন করুন</p>
        </div>
      </div>
    </section>
  );
}
