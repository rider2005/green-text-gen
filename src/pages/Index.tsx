import { useState } from "react";
import { PlantSearch } from "@/components/PlantSearch";
import { PlantResult } from "@/components/PlantResult";
import { SearchHistory } from "@/components/SearchHistory";
import { Leaf } from "lucide-react";

export interface PlantData {
  query: string;
  plantInfo: string;
  timestamp: Date;
}

const Index = () => {
  const [currentResult, setCurrentResult] = useState<PlantData | null>(null);
  const [searchHistory, setSearchHistory] = useState<PlantData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (result: PlantData) => {
    setCurrentResult(result);
    setSearchHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 searches
  };

  const handleHistorySelect = (item: PlantData) => {
    setCurrentResult(item);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg">
              <Leaf className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">PlantIQ</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Plant Identification</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Section */}
          {!currentResult && (
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-5xl font-bold text-foreground leading-tight">
                Discover the World of Plants
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Describe any plant and get instant, detailed botanical information powered by advanced AI
              </p>
            </div>
          )}

          {/* Search Component */}
          <PlantSearch 
            onSearch={handleSearch} 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />

          {/* Result Display */}
          {currentResult && !isLoading && (
            <PlantResult data={currentResult} />
          )}

          {/* Search History */}
          {searchHistory.length > 0 && (
            <SearchHistory 
              history={searchHistory}
              onSelect={handleHistorySelect}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground text-sm">
            Powered by Gemini AI • Built with Lovable Cloud
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
