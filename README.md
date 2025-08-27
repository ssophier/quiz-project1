# OverlySocial Assessment Quiz

Interactive conversion audit assessment application built with React, TypeScript, and Tailwind CSS.

## 🚀 Live Demo

Visit the live application: [https://ssophier.github.io/quiz-project1](https://ssophier.github.io/quiz-project1)

## ✨ Features

- Interactive 8-question assessment
- Real-time score calculation
- Personalized results with recommendations
- Email capture with MailerLite integration
- Responsive design with premium glassmorphism UI
- Automatic deployment to GitHub Pages

## 🛠️ Development

### Prerequisites

- Node.js 18 or higher
- npm

### Setup

1. Clone the repository:
```bash
git clone https://github.com/ssophier/quiz-project1.git
cd quiz-project1
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Add your MailerLite API key to `.env`:
```
VITE_MAILERLITE_API_KEY=your_api_key_here
```

5. Start development server:
```bash
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages (manual)

## 🌐 Deployment

### Automatic Deployment

The project automatically deploys to GitHub Pages when changes are pushed to the `main` branch via GitHub Actions.

### Manual Deployment

```bash
npm run deploy
```

### Environment Variables for Production

Add your MailerLite API key as a GitHub secret:

1. Go to your repository settings
2. Navigate to Secrets and variables > Actions
3. Add `VITE_MAILERLITE_API_KEY` with your API key

## 📁 Project Structure

```
src/
├── components/
│   ├── Assessment/     # Quiz components
│   └── Results/        # Results display
├── data/              # Questions and content
├── hooks/             # Custom React hooks
├── services/          # External API services
└── utils/             # Helper functions
```

## 🎯 Assessment Flow

1. **Welcome Page** - Introduction and start button
2. **Questions** - 8 multiple choice questions
3. **Email Capture** - User details collection
4. **Results** - Personalized recommendations

## 🔧 Technologies Used

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **MailerLite API** for email capture
- **GitHub Pages** for hosting
- **GitHub Actions** for CI/CD

## 📊 MailerLite Integration

The application automatically adds subscribers to MailerLite with custom fields:
- `assessment_score` - Raw score
- `assessment_category` - Result category
- `assessment_percentage` - Score percentage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📝 License

This project is proprietary and confidential.