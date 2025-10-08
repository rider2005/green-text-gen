import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, Sparkles, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { PlantData } from "@/pages/Index";

interface PlantSearchProps {
  onSearch: (result: PlantData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const PlantSearch = ({ onSearch, isLoading, setIsLoading }: PlantSearchProps) => {
  const [query, setQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Empty Query",
        description: "Please enter a plant description to search",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('identify-plant', {
        body: { query: query.trim() }
      });

      if (error) throw error;

      if (data.success) {
        onSearch({
          query: query.trim(),
          plantInfo: data.plantInfo,
          timestamp: new Date(),
        });
        
        toast({
          title: "Plant Identified!",
          description: "Information retrieved successfully",
        });
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (error: any) {
      console.error('Search error:', error);
      toast({
        title: "Search Failed",
        description: error.message || "Failed to identify plant. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <div className="bg-card rounded-2xl shadow-[var(--shadow-elegant)] p-8 border border-border/50">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Describe Your Plant</h3>
        </div>
        
        <Textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="E.g., 'A tall plant with broad green leaves and white flowers' or 'Monstera deliciosa'"
          className="min-h-[120px] text-base resize-none border-border/70 focus-visible:ring-primary mb-4"
          disabled={isLoading}
        />
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Press Enter to search • Shift + Enter for new line
          </p>
          
          <Button 
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            size="lg"
            className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity shadow-md"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Identifying...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Identify Plant
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
