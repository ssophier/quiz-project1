# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
OverlySocial Interactive Conversion Audit Assessment - a comprehensive web application that evaluates users' conversion journey effectiveness and provides personalized recommendations using Lara Acosta's distinctive tone of voice.

## Technology Stack
- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Email Integration**: MailerLite
- **Deployment**: Vercel/Netlify ready
- **Icons**: Lucide React (preferred)

## Development Commands
Since this project is in initial setup phase, these are the expected commands once initialized:

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
npm run format       # Format code with Prettier
```

## Architecture & Key Components

### Planned File Structure
```
/src
  /components
    /Assessment      # Core assessment components
      - QuestionCard.tsx
      - ProgressBar.tsx  
      - EmailCapture.tsx
    /Results         # Results and scoring
      - ResultsPage.tsx
      - ScoreCalculator.ts
      - ContentEngine.ts
  /data             # Static data and content
    - questions.ts
    - resultTemplates.ts
  /hooks            # Custom React hooks
    - useAssessment.ts
    - useAnalytics.ts
  /utils            # Utility functions
    - scoring.ts
    - emailValidation.ts
```

### Assessment Scoring System
- **Total Questions**: 10-12 multiple choice (4 options each)
- **Scoring**: 0-3 points per question (max 36 points)
- **Result Categories**:
  - 0-12: "Content Creator" (needs full conversion system)
  - 13-24: "Getting There" (needs optimization)
  - 25-36: "Conversion Pro" (needs fine-tuning)
- **Conditional Logic**: Results depend on both overall score AND specific answer combinations

### Brand Identity
- **Primary Color**: #3a35fb (OverlySocial signature blue)
- **Secondary**: #ffffff (white)
- **Design**: Minimalist, premium feel with smooth animations
- **Voice**: Direct, numbers-driven, transformation-focused (Lara Acosta style)

## Content Strategy
Results pages follow a structured framework:
1. **Problem Identification**: Situation-specific headline and validation
2. **Cost Analysis**: Financial impact and opportunity cost
3. **Solution Framework**: Strategy overview and quick wins
4. **Authority Building**: Client examples and next steps

## Key Implementation Notes
- Mobile-first responsive design required
- Email capture integration before revealing results
- Analytics tracking for user behavior and conversions
- Dynamic content generation based on scoring logic
- Social sharing functionality for results
- Print/PDF export capability

## Content Files
- Questions and result templates are documented in `/docs/` folder
- All content should match Lara Acosta's voice characteristics
- Include specific metrics and transformation language