import { useState, useCallback } from 'react';
import { assessmentQuestions } from '../data/questions';
import { calculateScore, getCustomizedResult, AssessmentResult, ResultTemplate } from '../utils/scoring';
import { mailerliteService } from '../services/mailerlite';

export type AssessmentStep = 'welcome' | 'questions' | 'email' | 'results';

interface UserInfo {
  name: string;
  email: string;
}

export const useAssessment = () => {
  const [currentStep, setCurrentStep] = useState<AssessmentStep>('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);
  const [resultTemplate, setResultTemplate] = useState<ResultTemplate | null>(null);
  const [loading, setLoading] = useState(false);

  const answerQuestion = useCallback((answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  }, [answers, currentQuestion]);

  const nextQuestion = useCallback(() => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions answered, move to email capture
      setCurrentStep('email');
    }
  }, [currentQuestion]);

  const previousQuestion = useCallback(() => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  }, [currentQuestion]);

  const submitEmail = useCallback(async (email: string, name: string) => {
    setLoading(true);
    setUserInfo({ email, name });

    try {
      // Calculate results first
      const result = calculateScore(answers, assessmentQuestions);
      const template = getCustomizedResult(result);

      // Submit to MailerLite with assessment results
      const mailerliteResponse = await mailerliteService.addAssessmentSubscriber(
        email, 
        name, 
        {
          score: result.score,
          category: result.category,
          maxScore: result.maxScore
        }
      );

      if (mailerliteResponse.success) {
        console.log('Successfully added subscriber to MailerLite:', mailerliteResponse.data);
      } else {
        console.warn('MailerLite subscription failed:', mailerliteResponse.error);
        // Continue with the assessment even if email signup fails
      }

      // Set results and proceed regardless of MailerLite status
      setAssessmentResult(result);
      setResultTemplate(template);
      setCurrentStep('results');
      
    } catch (error) {
      console.error('Error during email submission:', error);
      // Still show results even if there's an error
      const result = calculateScore(answers, assessmentQuestions);
      const template = getCustomizedResult(result);
      setAssessmentResult(result);
      setResultTemplate(template);
      setCurrentStep('results');
    } finally {
      setLoading(false);
    }
  }, [answers]);

  const startAssessment = useCallback(() => {
    setCurrentStep('questions');
  }, []);

  const restartAssessment = useCallback(() => {
    setCurrentStep('welcome');
    setCurrentQuestion(0);
    setAnswers([]);
    setUserInfo(null);
    setAssessmentResult(null);
    setResultTemplate(null);
    setLoading(false);
  }, []);

  const canGoNext = answers[currentQuestion] !== undefined;
  const canGoPrevious = currentQuestion > 0;
  const progress = ((currentQuestion + (canGoNext ? 1 : 0)) / assessmentQuestions.length) * 100;

  return {
    // State
    currentStep,
    currentQuestion,
    answers,
    userInfo,
    assessmentResult,
    resultTemplate,
    loading,
    
    // Current question data
    question: assessmentQuestions[currentQuestion],
    selectedAnswer: answers[currentQuestion],
    
    // Progress
    progress,
    canGoNext,
    canGoPrevious,
    
    // Actions
    answerQuestion,
    nextQuestion,
    previousQuestion,
    submitEmail,
    startAssessment,
    restartAssessment,
  };
};