import { ArrowRight, Globe, Scale, TrendingUp, Leaf, Handshake, Puzzle } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Framework } from "@shared/schema";

interface FrameworkCardProps {
  framework: Framework;
}

const iconMap = {
  gri: Globe,
  esrs: Scale,
  sasb: TrendingUp,
  tnfd: Leaf,
  ungc: Handshake,
  ir: Puzzle,
};

export default function FrameworkCard({ framework }: FrameworkCardProps) {
  const IconComponent = iconMap[framework.id as keyof typeof iconMap] || Globe;
  
  return (
    <Card 
      className="hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
      data-testid={`framework-card-${framework.id}`}
    >
      <div className={`h-48 bg-gradient-to-br ${framework.backgroundColor} relative`}>
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <h3 className="text-2xl font-bold text-white">{framework.name}</h3>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center mb-3">
          <IconComponent className={`h-5 w-5 mr-2 ${framework.iconColor}`} />
          <span className="text-sm font-semibold text-text-secondary">{framework.fullName}</span>
        </div>
        
        <p className="text-text-secondary mb-4 line-clamp-3">
          {framework.description}
        </p>
        
        <div className="flex items-center justify-between">
          <Badge 
            variant={framework.isMandatory ? "destructive" : "secondary"}
            className="font-medium"
          >
            {framework.category}
          </Badge>
          
          <Link href={`/framework/${framework.id}`}>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-blue-700 font-semibold group-hover:translate-x-1 transition-transform"
              data-testid={`button-learn-more-${framework.id}`}
            >
              Learn More <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
