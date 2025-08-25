import { useQuery } from "@tanstack/react-query";
import { Download, Check, X, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Framework, FrameworkComparison } from "@shared/schema";

export default function ComparisonPage() {
  const { data: frameworks, isLoading: frameworksLoading } = useQuery<Framework[]>({
    queryKey: ["/api/frameworks"],
  });

  const { data: comparisons, isLoading: comparisonsLoading } = useQuery<FrameworkComparison[]>({
    queryKey: ["/api/comparisons"],
  });

  const getValueIcon = (value: string) => {
    const lowerValue = value.toLowerCase();
    if (lowerValue.includes("high") || lowerValue.includes("yes") || lowerValue.includes("required") || lowerValue.includes("mandatory")) {
      return <Check className="h-4 w-4 text-green-600" />;
    }
    if (lowerValue.includes("low") || lowerValue.includes("no") || lowerValue.includes("voluntary")) {
      return <X className="h-4 w-4 text-red-600" />;
    }
    if (lowerValue.includes("medium") || lowerValue.includes("recommended") || lowerValue.includes("optional")) {
      return <Minus className="h-4 w-4 text-yellow-600" />;
    }
    return null;
  };

  const getValueColor = (value: string) => {
    const lowerValue = value.toLowerCase();
    if (lowerValue.includes("high") || lowerValue.includes("yes") || lowerValue.includes("required") || lowerValue.includes("mandatory")) {
      return "text-green-600";
    }
    if (lowerValue.includes("low") || lowerValue.includes("no") || lowerValue.includes("voluntary")) {
      return "text-red-600";
    }
    if (lowerValue.includes("medium") || lowerValue.includes("recommended") || lowerValue.includes("optional")) {
      return "text-yellow-600";
    }
    return "text-text-secondary";
  };

  if (frameworksLoading || comparisonsLoading) {
    return (
      <div className="min-h-screen bg-bg-light py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light py-8" data-testid="comparison-page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Framework Comparison</h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Compare key features, requirements, and focus areas across different ESG reporting frameworks 
            to make informed decisions.
          </p>
        </div>

        {/* Comparison Table */}
        <Card className="overflow-hidden">
          <CardHeader className="bg-gray-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle>Framework Features Comparison</CardTitle>
              <Button variant="outline" size="sm" data-testid="button-download-comparison">
                <Download className="mr-2 h-4 w-4" />
                Download Comparison
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary min-w-48">
                      Feature
                    </th>
                    {frameworks?.map((framework) => (
                      <th key={framework.id} className="px-4 py-4 text-center text-sm font-semibold text-text-primary min-w-32">
                        <div className="flex flex-col items-center">
                          <span className="font-bold">{framework.name}</span>
                          <Badge 
                            variant={framework.isMandatory ? "destructive" : "secondary"}
                            className="mt-1 text-xs"
                          >
                            {framework.category}
                          </Badge>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {comparisons?.map((comparison) => (
                    <tr key={comparison.id} className="hover:bg-gray-50" data-testid={`comparison-row-${comparison.id}`}>
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-text-primary">
                            {comparison.feature}
                          </div>
                          {comparison.description && (
                            <div className="text-xs text-text-secondary mt-1">
                              {comparison.description}
                            </div>
                          )}
                        </div>
                      </td>
                      {frameworks?.map((framework) => {
                        const value = comparison.values[framework.id] || "N/A";
                        return (
                          <td key={framework.id} className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              {getValueIcon(value)}
                              <span className={`text-sm font-medium ${getValueColor(value)}`}>
                                {value}
                              </span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Framework Summary Cards */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">Framework Summaries</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {frameworks?.map((framework) => (
              <Card key={framework.id} className="hover:shadow-lg transition-shadow" data-testid={`summary-card-${framework.id}`}>
                <CardHeader className={`bg-gradient-to-br ${framework.backgroundColor} text-white`}>
                  <CardTitle className="text-lg">{framework.name}</CardTitle>
                  <p className="text-sm opacity-90">{framework.fullName}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-2">Focus Areas</h4>
                      <div className="flex flex-wrap gap-1">
                        {framework.focusAreas.slice(0, 3).map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {framework.focusAreas.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{framework.focusAreas.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-semibold text-text-primary mb-2">Key Characteristics</h4>
                      <div className="space-y-1 text-xs text-text-secondary">
                        <div>Status: {framework.isMandatory ? "Mandatory" : "Voluntary"}</div>
                        <div>Industry Specific: {framework.hasIndustrySpecificity ? "Yes" : "No"}</div>
                        <div>Established: {framework.establishedYear}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Legend</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Check className="h-4 w-4 text-green-600" />
              <span>High / Yes / Required / Mandatory</span>
            </div>
            <div className="flex items-center space-x-2">
              <Minus className="h-4 w-4 text-yellow-600" />
              <span>Medium / Recommended / Optional</span>
            </div>
            <div className="flex items-center space-x-2">
              <X className="h-4 w-4 text-red-600" />
              <span>Low / No / Voluntary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
