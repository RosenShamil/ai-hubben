"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import type { Concept } from "@/lib/knowledge-bank";

export function GlossarySearch({
  concepts,
  onSelect,
  searchTerm,
  onSearchChange,
}: {
  concepts: Concept[];
  onSelect: (concept: Concept) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const matches =
    searchTerm.length >= 2
      ? concepts
          .filter(
            (c) =>
              c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              c.shortExplanation
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
          .slice(0, 8)
      : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setShowDropdown(true);
          }}
          onFocus={() => setShowDropdown(true)}
          placeholder="Sök begrepp..."
          className="w-full rounded-lg border border-border bg-card py-2.5 pl-10 pr-10 text-[0.9375rem] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
        />
        {searchTerm && (
          <button
            onClick={() => {
              onSearchChange("");
              setShowDropdown(false);
            }}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {showDropdown && matches.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg">
          {matches.map((concept) => (
            <button
              key={concept.id}
              onClick={() => {
                onSelect(concept);
                setShowDropdown(false);
              }}
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[0.875rem] font-medium">{concept.title}</p>
                <p className="mt-0.5 line-clamp-1 text-[0.75rem] text-muted-foreground">
                  {concept.shortExplanation}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
