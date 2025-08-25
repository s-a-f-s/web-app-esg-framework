import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Link } from "wouter";
import type { Framework, Resource } from "@shared/schema";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["/api/search", { q: query }],
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 2);
  };

  return (
    <div className="relative w-64" data-testid="search-bar">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Input
              type="search"
              placeholder="Search frameworks..."
              value={query}
              onChange={handleSearch}
              className="pl-10 pr-4"
              data-testid="input-search"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-text-secondary" />
          </div>
        </PopoverTrigger>
        
        {isOpen && (
          <PopoverContent className="w-80 p-0" align="start">
            <div className="max-h-96 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center text-text-secondary">Searching...</div>
              ) : searchResults ? (
                <div>
                  {searchResults.frameworks.length > 0 && (
                    <div>
                      <div className="px-4 py-2 border-b border-gray-200 bg-gray-50">
                        <h4 className="font-semibold text-text-primary">Frameworks</h4>
                      </div>
                      {searchResults.frameworks.map((framework: Framework) => (
                        <Link key={framework.id} href={`/framework/${framework.id}`}>
                          <a
                            className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsOpen(false)}
                            data-testid={`search-result-framework-${framework.id}`}
                          >
                            <div className="font-medium text-text-primary">{framework.name}</div>
                            <div className="text-sm text-text-secondary line-clamp-2">
                              {framework.description}
                            </div>
                          </a>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
