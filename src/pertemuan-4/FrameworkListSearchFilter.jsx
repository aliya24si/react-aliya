import frameworkData from "./framework.json";
import { useState } from "react";

export default function FrameworkListSearchFilter() {
  /** Deklrasai state **/
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  /** Deklrasai Logic Search & Filter **/
  const _searchTerm = searchTerm.toLowerCase();
  const filteredFrameworks = frameworkData.filter((framework) => {
    const matchesSearch =
      framework.name.toLowerCase().includes(_searchTerm) ||
      framework.description.toLowerCase().includes(_searchTerm);

    const matchesTag = selectedTag
      ? framework.tags.includes(selectedTag)
      : true;

    return matchesSearch && matchesTag;
  });

  const allTags = [
    ...new Set(frameworkData.flatMap((framework) => framework.tags)),
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Modern Frameworks
        </h1>
        <p className="mt-3 text-lg text-gray-500">
          Kumpulan teknologi terbaik untuk membangun aplikasi masa kini.
        </p>
      </div>

      <input
        type="text"
        name="searchTerm"
        placeholder="Search framework..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        name="selectedTag"
        className="w-full p-2 border border-gray-300 rounded mb-4"
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="">All Tags</option>
        {allTags.map((tag, index) => (
          <option key={index} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFrameworks.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Card Body */}
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h2>
                <span className="text-xs font-medium text-gray-400">
                  {item.details?.releaseYear}
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {item.description}
              </p>

              {item.details && (
                <div className="space-y-2 mb-6">
                  <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">
                    Developed by
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {item.details.developer}
                  </div>
                </div>
              )}

              {/* Tags Area */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-indigo-50 text-indigo-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide rounded-full border border-indigo-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer / Link */}
            {item.details?.officialWebsite && (
              <div className="border-t border-gray-50 p-4 bg-gray-50/50">
                <a
                  href={item.details.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                  Visit Website
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
