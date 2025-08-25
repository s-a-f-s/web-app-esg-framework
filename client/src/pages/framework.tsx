import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Calendar, Users, Target, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { Framework} from "@shared/schema";

export default function FrameworkPage() {
  const { id } = useParams<{ id: string }>();

  const { data: framework, isLoading: frameworkLoading } = useQuery<Framework>({
    queryKey: ["/api/frameworks", id],
  });

  

  if (!framework) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-4">Framework Not Found</h1>
          <p className="text-text-secondary mb-6">The requested framework could not be found.</p>
          <Link href="/">
            <Button data-testid="button-back-home">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light py-8" data-testid="framework-page">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <Link href="/">
          <Button variant="ghost" className="mb-6" data-testid="button-back">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Frameworks
          </Button>
        </Link>

        {/* Framework Header */}
        <div className={`bg-gradient-to-br ${framework.backgroundColor} text-black rounded-xl p-8 mb-8`}>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2" data-testid="framework-title">
                {framework.name}
              </h1>
              <p className="text-xl opacity-90 mb-4">{framework.fullName}</p>
              <Badge 
                variant={framework.isMandatory ? "destructive" : "secondary"}
                className="mb-4"
              >
                {framework.category}
              </Badge>
              <p className="text-lg opacity-90 max-w-2xl">
                {framework.description}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="mr-2 h-5 w-5 text-primary" />
                  Framework Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Focus Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {framework.focusAreas.map((area) => (
                      <Badge key={area} variant="outline">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Key Features</h3>
                  <div className="space-y-2">
                    {framework.keyFeatures.map((feature) => (
                      <div key={feature} className="flex items-start">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Target Audience</h3>
                  <p className="text-text-secondary">{framework.targetAudience}</p>
                </div>
              </CardContent>
            </Card>

            {/* Implementation Guidance */}
            <Card>
              <CardHeader>
                <CardTitle>Implementation Guidance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Getting Started</h4>
                    <p className="text-blue-800 text-sm">
                      Begin by conducting a materiality assessment to identify the most relevant topics for your organization. 
                      Review the framework's requirements and establish a reporting team.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Best Practices</h4>
                    <p className="text-green-800 text-sm">
                      Engage stakeholders early in the process, establish robust data collection systems, 
                      and consider external assurance to enhance credibility.
                    </p>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-semibold text-amber-900 mb-2">Common Challenges</h4>
                    <p className="text-amber-800 text-sm">
                      Data availability and quality are often the biggest challenges. Start with available data 
                      and gradually improve collection processes over time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Framework Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Framework Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4 text-text-secondary" />
                  <span className="text-sm">
                    <span className="font-medium">Established:</span> {framework.establishedYear}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-text-secondary" />
                  <span className="text-sm">
                    <span className="font-medium">Status:</span> {framework.isMandatory ? "Mandatory" : "Voluntary"}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Target className="mr-2 h-4 w-4 text-text-secondary" />
                  <span className="text-sm">
                    <span className="font-medium">Industry Specific:</span> {framework.hasIndustrySpecificity ? "Yes" : "No"}
                  </span>
                </div>

                <Separator />

                <Button className="w-full" asChild data-testid="button-official-website">
                  <a href={framework.website} target="_blank" rel="noopener noreferrer">
                    Official Website
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/comparison">
                  <Button variant="outline" className="w-full" data-testid="button-compare">
                    Compare Frameworks
                  </Button>
                </Link>
                
                <Link href="/framework-selector">
                  <Button variant="outline" className="w-full" data-testid="button-find-alternative">
                    Find Alternative
                  </Button>
                </Link>
               
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
