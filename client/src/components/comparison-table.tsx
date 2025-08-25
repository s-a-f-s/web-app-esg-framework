import { Check, X, Minus, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Framework, FrameworkComparison } from "@shared/schema";

interface ComparisonTableProps {
  frameworks: Framework[];
  comparisons: FrameworkComparison[];
}

export default function ComparisonTable({ frameworks, comparisons }: ComparisonTableProps) {
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

  return (
    <Card className="overflow-hidden" data-testid="comparison-table">
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
                {frameworks.map((framework) => (
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
              {comparisons.map((comparison) => (
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
                  {frameworks.map((framework) => {
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
  );
}
