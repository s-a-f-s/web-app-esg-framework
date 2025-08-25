import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download, BookOpen, FileSpreadsheet, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import type { Resource } from "@shared/schema";

const typeIcons = {
  guide: BookOpen,
  template: FileSpreadsheet,
  "case-study": Award,
};

const typeColors = {
  guide: "text-blue-600",
  template: "text-green-600",
  "case-study": "text-purple-600",
};

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const IconComponent = typeIcons[resource.type as keyof typeof typeIcons] || BookOpen;
    const iconColor = typeColors[resource.type as keyof typeof typeColors] || "text-gray-600";

    return (
      <Card className="hover:shadow-lg transition-shadow" data-testid={`resource-card-${resource.id}`}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gray-50`}>
                <IconComponent className={`h-5 w-5 ${iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{resource.title}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {resource.type}
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
              data-testid={`button-download-${resource.id}`}
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">
            {resource.description}
          </p>
          
          <div className="flex flex-wrap gap-1">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-light py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-48 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  