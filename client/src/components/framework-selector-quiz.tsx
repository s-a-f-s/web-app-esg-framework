import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizOption {
  value: string;
  label: string;
  description: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

interface FrameworkSelectorQuizProps {
  questions: QuizQuestion[];
  onComplete: (answers: Record<string, string>) => void;
}

export default function FrameworkSelectorQuiz({ questions, onComplete }: FrameworkSelectorQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion?.id] || "";

  const handleAnswerSelect = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!currentQuestion) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto" data-testid="framework-selector-quiz">
      <CardContent className="p-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-text-secondary">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-text-secondary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold mb-6 text-text-primary">
            {currentQuestion.question}
          </h3>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <label
                key={option.value}
                className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  currentAnswer === option.value
                    ? "border-primary bg-blue-50"
                    : "border-gray-200 hover:border-primary"
                }`}
                data-testid={`quiz-option-${option.value}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option.value}
                  checked={currentAnswer === option.value}
                  onChange={() => handleAnswerSelect(option.value)}
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

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            data-testid="button-quiz-previous"
          >
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!currentAnswer}
            data-testid="button-quiz-next"
          >
            {currentStep === questions.length - 1 ? "Get Recommendations" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
