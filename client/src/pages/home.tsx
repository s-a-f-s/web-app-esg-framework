import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import FrameworkCard from "@/components/framework-card";
import Timeline from "@/components/timeline";
import type { Framework } from "@shared/schema";

export default function Home() {
  const { data: frameworks, isLoading } = useQuery<Framework[]>({
    queryKey: ["/api/frameworks"],
  });

  const scrollToFrameworks = () => {
    const element = document.getElementById("frameworks");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20" data-testid="hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Navigate ESG Reporting with Confidence
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Comprehensive guidance for GRI, ESRS, SASB, TNFD, and UN Global Compact frameworks. 
                Streamline your sustainability reporting journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/framework-selector">
                  <Button 
                    size="lg" 
                    className="bg-white text-primary hover:bg-gray-100 font-semibold"
                    data-testid="button-find-framework"
                  >
                    Find Your Framework
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
                  onClick={scrollToFrameworks}
                  data-testid="button-explore-frameworks"
                >
                  Explore All Frameworks
                </Button>
              </div>
            </div>
            <div className="lg:block">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
                alt="Professional team discussing ESG strategy"
                className="rounded-xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Framework Overview */}
      <section id="frameworks" className="py-20 bg-white" data-testid="frameworks-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">ESG Reporting Frameworks</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Choose from the world's leading sustainability reporting standards. Each framework offers 
              unique approaches to measuring and communicating your organization's ESG performance.
            </p>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-xl"></div>
                  <div className="p-6 bg-white rounded-b-xl border border-gray-200">
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-16 bg-gray-200 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-6 w-20 bg-gray-200 rounded"></div>
                      <div className="h-6 w-24 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : frameworks ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {frameworks.map((framework) => (
                <FrameworkCard key={framework.id} framework={framework} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary">No frameworks available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Framework Timeline */}
      <Timeline />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white" data-testid="cta-section">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Start Your ESG Reporting Journey?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Use our interactive framework selector to find the perfect reporting standard for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/framework-selector">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 font-semibold"
                data-testid="button-start-selector"
              >
                Start Framework Selector
              </Button>
            </Link>
            <Link href="/comparison">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white text-white hover:bg-white hover:text-primary font-semibold"
                data-testid="button-compare-frameworks"
              >
                Compare Frameworks
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
