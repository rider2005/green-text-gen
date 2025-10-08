import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { History, ChevronRight } from "lucide-react";
import type { PlantData } from "@/pages/Index";

interface SearchHistoryProps {
  history: PlantData[];
  onSelect: (item: PlantData) => void;
}

export const SearchHistory = ({ history, onSelect }: SearchHistoryProps) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground">Recent Searches</h3>
        <Badge variant="secondary" className="ml-2">{history.length}</Badge>
      </div>
      
      <div className="grid gap-3">
        {history.map((item, index) => (
          <Card
            key={index}
            className="p-4 cursor-pointer hover:shadow-[var(--shadow-card)] hover:border-primary/30 transition-all duration-200 group bg-card/50 backdrop-blur-sm"
            onClick={() => onSelect(item)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {item.query}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {formatTime(item.timestamp)}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
