import { Download, BookOpen, FileSpreadsheet, Award, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Resource } from "@shared/schema";

interface ResourceCardProps {
  resource: Resource;
  showFramework?: boolean;
}

const typeIcons = {
  guide: BookOpen,
  template: FileSpreadsheet,
  "case-study": Award,
};

const typeColors = {
  guide: "text-blue-600 bg-blue-50",
  template: "text-green-600 bg-green-50",
  "case-study": "text-purple-600 bg-purple-50",
};

export default function ResourceCard({ resource, showFramework = false }: ResourceCardProps) {
  const IconComponent = typeIcons[resource.type as keyof typeof typeIcons] || BookOpen;
  const colorClasses = typeColors[resource.type as keyof typeof typeColors] || "text-gray-600 bg-gray-50";

  const handleDownload = () => {
    if (resource.downloadUrl) {
      window.open(resource.downloadUrl, '_blank');
    }
  };

  return (
    <Card 
      className="hover:shadow-lg transition-shadow duration-200 group cursor-pointer border-gray-200"
      data-testid={`resource-card-${resource.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1">
            <div className={`p-2 rounded-lg ${colorClasses.split(' ')[1]}`}>
              <IconComponent className={`h-5 w-5 ${colorClasses.split(' ')[0]}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary group-hover:text-primary transition-colors line-clamp-2">
                {resource.title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs capitalize">
                  {resource.type.replace('-', ' ')}
                </Badge>
                <span className="text-xs text-text-secondary">
                  {resource.fileType?.toUpperCase()}
                  {resource.pageCount && ` • ${resource.pageCount} pages`}
                  {resource.duration && ` • ${resource.duration}`}
                </span>
              </div>
            </div>
          </div>
          
          <Button 
            size="sm" 
            variant="outline"
            onClick={handleDownload}
            className="hover:bg-primary hover:text-white transition-colors flex-shrink-0 ml-2"
            data-testid={`button-resource-action-${resource.id}`}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-3 leading-relaxed">
          {resource.description}
        </p>
        
        {showFramework && resource.frameworkId && (
          <div className="mb-3">
            <span className="text-xs text-text-secondary">Framework: </span>
            <Badge variant="secondary" className="text-xs">
              {resource.frameworkId.toUpperCase()}
            </Badge>
          </div>
        )}
        
        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200">
                {tag}
              </Badge>
            ))}
            {resource.tags.length > 4 && (
              <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-500">
                +{resource.tags.length - 4}
              </Badge>
            )}
          </div>
        )}

        {resource.downloadUrl && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <button 
              onClick={handleDownload}
              className="text-xs text-primary hover:text-blue-700 font-medium flex items-center transition-colors"
              data-testid={`link-download-${resource.id}`}
            >
              Access Resource
              <ExternalLink className="ml-1 h-3 w-3" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
