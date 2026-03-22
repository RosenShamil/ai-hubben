"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CONCEPTS,
  type Concept,
  type ConceptCategory,
  type DifficultyLevel,
} from "@/lib/knowledge-bank";
import { GlossarySearch } from "./glossary-search";
import { CategoryFilter } from "./category-filter";
import { ConceptCard } from "./concept-card";
import { ConceptDetailModal } from "./concept-detail-modal";

export function ConceptGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    ConceptCategory | "all"
  >("all");
  const [activeDifficulty, setActiveDifficulty] = useState<
    DifficultyLevel | "all"
  >("all");
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);

  const filtered = useMemo(() => {
    return CONCEPTS.filter((c) => {
      if (
        searchTerm.length >= 2 &&
        !c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !c.shortExplanation.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !c.analogy.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (activeCategory !== "all" && c.category !== activeCategory)
        return false;
      if (activeDifficulty !== "all" && c.difficulty !== activeDifficulty)
        return false;
      return true;
    });
  }, [searchTerm, activeCategory, activeDifficulty]);

  const conceptCounts = useMemo(() => {
    const counts: Record<string, number> = { all: CONCEPTS.length };
    for (const c of CONCEPTS) {
      counts[c.category] = (counts[c.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div>
      {/* Search */}
      <GlossarySearch
        concepts={CONCEPTS}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onSelect={(c) => setSelectedConcept(c)}
      />

      {/* Filters */}
      <div className="mt-4">
        <CategoryFilter
          activeCategory={activeCategory}
          activeDifficulty={activeDifficulty}
          onCategoryChange={setActiveCategory}
          onDifficultyChange={setActiveDifficulty}
          conceptCounts={conceptCounts}
        />
      </div>

      {/* Results count */}
      <p className="mt-4 text-[0.8125rem] text-muted-foreground">
        Visar {filtered.length} av {CONCEPTS.length} begrepp
      </p>

      {/* Grid */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((concept) => (
            <motion.div
              key={concept.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ConceptCard
                concept={concept}
                onOpenDetail={setSelectedConcept}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="rounded-lg border border-border bg-card p-8 text-center">
          <p className="text-[1rem] font-medium">Inga begrepp hittades</p>
          <p className="mt-2 text-[0.875rem] text-muted-foreground">
            Prova att ändra sökning eller filter
          </p>
        </div>
      )}

      {/* Detail modal */}
      <ConceptDetailModal
        concept={selectedConcept}
        onClose={() => setSelectedConcept(null)}
        onNavigate={(c) => setSelectedConcept(c)}
      />
    </div>
  );
}
