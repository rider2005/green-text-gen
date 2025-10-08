import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Clock } from "lucide-react";
import type { PlantData } from "@/pages/Index";

interface PlantResultProps {
  data: PlantData;
}

export const PlantResult = ({ data }: PlantResultProps) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPlantInfo = (info: string) => {
    // Split by numbered sections and format
    const sections = info.split(/\n(?=\d+\.)/);
    
    return sections.map((section, index) => {
      if (!section.trim()) return null;
      
      const lines = section.split('\n');
      const title = lines[0].replace(/^\d+\.\s*/, '').trim();
      const content = lines.slice(1).join('\n').trim();
      
      return (
        <div key={index} className="mb-6 last:mb-0">
          <h3 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            {title}
          </h3>
          <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap pl-7">
            {content || 'Information not available'}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-gradient-to-br from-card to-card/80 border-border/50 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border-b border-border/50">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-3">
                Search Query
              </Badge>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {data.query}
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              {formatTime(data.timestamp)}
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            {formatPlantInfo(data.plantInfo)}
          </div>
        </div>
      </Card>
    </div>
  );
};
