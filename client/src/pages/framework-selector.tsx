import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, CheckCircle, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import type { SelectorQuestion, Framework } from "@shared/schema";

interface RecommendationResult {
  framework: Framework;
  score: number;
  reasons: string[];
}

export default function FrameworkSelectorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const { data: questions, isLoading } = useQuery<SelectorQuestion[]>({
    queryKey: ["/api/selector/questions"],
  });

  const recommendationMutation = useMutation({
    mutationFn: async (answers: Record<string, string>) => {
      const response = await apiRequest("POST", "/api/selector/recommend", { answers });
      return response.json();
    },
    onSuccess: () => {
      setShowResults(true);
    },
  });

  const totalSteps = questions?.length || 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Submit and get recommendations
      recommendationMutation.mutate(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const resetSelector = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-light py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const recommendations = recommendationMutation.data as RecommendationResult[];
    
    return (
      <div className="min-h-screen bg-bg-light py-8" data-testid="selector-results">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-text-primary mb-4">Your Framework Recommendations</h1>
            <p className="text-xl text-text-secondary">
              Based on your answers, here are the frameworks best suited for your organization.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            {recommendations?.map((rec, index) => (
              <Card key={rec.framework.id} className="overflow-hidden" data-testid={`recommendation-${rec.framework.id}`}>
                <CardHeader className={`bg-gradient-to-br ${rec.framework.backgroundColor} text-black`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="text-3xl font-bold">#{index + 1}</div>
                      <div>
                        <CardTitle className="text-2xl">{rec.framework.name}</CardTitle>
                        <p className="opacity-90">{rec.framework.fullName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold">{rec.score}%</div>
                      <div className="text-sm opacity-90">Match Score</div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Why This Framework?</h4>
                      <ul className="space-y-2">
                        {rec.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm text-text-secondary">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Framework Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge variant={rec.framework.isMandatory ? "destructive" : "secondary"}>
                            {rec.framework.isMandatory ? "Mandatory" : "Voluntary"}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Industry Specific:</span>
                          <span>{rec.framework.hasIndustrySpecificity ? "Yes" : "No"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Established:</span>
                          <span>{rec.framework.establishedYear}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <Link href={`/framework/${rec.framework.id}`}>
                          <Button className="w-full" data-testid={`button-learn-more-${rec.framework.id}`}>
                            Learn More About {rec.framework.name}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center space-y-4">
            <Button onClick={resetSelector} variant="outline" data-testid="button-retake-quiz">
              Retake Assessment
            </Button>
            <div className="flex justify-center space-x-4">
              <Link href="/comparison">
                <Button variant="outline" data-testid="button-compare-recommendations">
                  Compare All Frameworks
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
             
            
  }

  const currentQuestion = questions?.[currentStep];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : "";

  return (
    <div className="min-h-screen bg-bg-light py-8" data-testid="framework-selector">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Find Your Ideal Framework</h1>
          <p className="text-xl text-text-secondary">
            Answer a few questions to get personalized framework recommendations based on your organization's needs.
          </p>
        </div>

        {/* Quiz Card */}
        <Card className="shadow-xl" data-testid="quiz-card">
          <CardContent className="p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-text-secondary">
                  Question {currentStep + 1} of {totalSteps}
                </span>
                <span className="text-sm font-medium text-text-secondary">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {currentQuestion && (
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-6 text-text-primary">
                  {currentQuestion.question}
                </h2>
                
                <div className="space-y-4">
                  {currentQuestion.options.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        currentAnswer === option.value
                          ? "border-primary bg-blue-50"
                          : "border-gray-200 hover:border-primary"
                      }`}
                      data-testid={`option-${option.value}`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option.value}
                        checked={currentAnswer === option.value}
                        onChange={() => handleAnswerSelect(currentQuestion.id, option.value)}
                        className="mt-1 mr-4"
                      />
                      <div>
                        <div className="font-medium text-text-primary">{option.label}</div>
                        <div className="text-sm text-text-secondary mt-1">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                data-testid="button-previous"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!currentAnswer}
                data-testid="button-next"
              >
                {currentStep === totalSteps - 1 ? (
                  recommendationMutation.isPending ? (
                    "Generating Recommendations..."
                  ) : (
                    <>
                      Get Recommendations
                      <Target className="ml-2 h-4 w-4" />
                    </>
                  )
                ) : (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-sm text-text-secondary">
            Not sure about an answer? You can always go back and change your responses.
          </p>
        </div>
      </div>
    </div>
  );
}
