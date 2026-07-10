"use client";

import { useQueryState } from "nuqs";
import { Search, X } from "lucide-react";
import { useTransition } from "react";

import type { Post } from ".velite";

interface BlogSearchProps {
  allPosts: readonly Post[];
  resultCount: number;
}

// Extract all unique tags from posts (case-insensitive deduplication) (unused, keeping for future use)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getAllTags(posts: readonly Post[]): string[] {
  const tagMap = new Map<string, string>(); // lowercase -> original casing
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      const normalized = tag.toLowerCase();
      // Keep the first occurrence's casing for display
      if (!tagMap.has(normalized)) {
        tagMap.set(normalized, tag);
      }
    });
  });
  return Array.from(tagMap.values()).sort();
}

// Extract all unique categories from posts
function getAllCategories(posts: readonly Post[]): string[] {
  const categories = new Set<string>();
  posts.forEach((post) => {
    if (post.category) {
      categories.add(post.category);
    }
  });
  return Array.from(categories).sort();
}

export function BlogSearch({ allPosts, resultCount }: BlogSearchProps) {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });
  const [selectedTag, setSelectedTag] = useQueryState("tag", {
    defaultValue: "",
  });
  const [selectedCategory, setSelectedCategory] = useQueryState("category", {
    defaultValue: "",
  });
  const [isPending, startTransition] = useTransition();

  const allCategories = getAllCategories(allPosts);
  const hasActiveFilters = searchQuery || selectedTag || selectedCategory;

  const handleSearchChange = (value: string) => {
    startTransition(() => {
      void setSearchQuery(value || null);
    });
  };

  const handleCategoryClick = (category: string) => {
    startTransition(() => {
      void setSelectedCategory(selectedCategory === category ? null : category);
    });
  };

  const handleClearAll = () => {
    startTransition(() => {
      void setSearchQuery(null);
      void setSelectedTag(null);
      void setSelectedCategory(null);
    });
  };

  return (
    <div className="rounded-[20px] border border-white/60 bg-[#FFFDF8] p-4 shadow-[0_18px_50px_rgba(21,17,12,0.07)] sm:p-5">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="size-4 text-[#15110C]/40" />
        </div>
        <input
          type="text"
          placeholder="Search notes, places, and ideas..."
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="block w-full rounded-[12px] border border-[#1F1B14]/12 bg-[#FAF6EE] py-3 pr-12 pl-10 text-sm text-[#1F1B14] placeholder:text-[#1F1B14]/42 focus:border-[#1F4D3C] focus:ring-2 focus:ring-[#1F4D3C]/15 focus:outline-none"
        />
        {searchQuery && (
          <button
            onClick={() => handleSearchChange("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#15110C]/40 transition-colors hover:text-[#15110C]"
            aria-label="Clear search"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      {/* Category Filters - Flat Layout */}
      {allCategories.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mr-1 font-mono text-[10px] tracking-[0.08em] text-[#B0573F] uppercase">
            Filter
          </span>
          {allCategories.map((category) => {
            const isActive =
              selectedCategory?.toLowerCase() === category.toLowerCase();
            return (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`rounded-full px-3 py-1.5 text-[12px] font-semibold transition-all ${
                  isActive
                    ? "bg-[#1F4D3C] text-[#FAF6EE]"
                    : "border border-[#1F1B14]/12 bg-[#FAF6EE] text-[#15110C]/65 hover:border-[#1F4D3C]/35 hover:text-[#1F4D3C]"
                }`}
              >
                {category}
              </button>
            );
          })}
          {selectedCategory && (
            <button
              onClick={() => handleCategoryClick(selectedCategory)}
              className="ml-1 text-[12px] font-semibold text-[#B0573F] transition-colors hover:text-[#1F4D3C]"
            >
              Clear
            </button>
          )}
        </div>
      )}

      {/* Results Info & Clear Button - Flat Layout */}
      <div className="mt-4 flex items-center justify-between border-t border-[#1F1B14]/10 pt-4">
        <p className="text-[12px] text-[#15110C]/55">
          {isPending ? (
            <span className="opacity-50">Searching...</span>
          ) : (
            <>
              Showing{" "}
              <span className="font-semibold text-[#15110C]">
                {resultCount}
              </span>{" "}
              {resultCount === 1 ? "post" : "posts"}
              {hasActiveFilters && (
                <span className="text-[#15110C]/45"> (filtered)</span>
              )}
            </>
          )}
        </p>
        {hasActiveFilters && (
          <button
            onClick={handleClearAll}
            className="text-[12px] font-semibold text-[#B0573F] transition-colors hover:text-[#1F4D3C]"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
}
