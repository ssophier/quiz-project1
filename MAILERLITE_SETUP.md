# MailerLite Integration Setup

This guide will help you connect your OverlySocial quiz to your MailerLite account to automatically capture email subscribers.

## Quick Setup Steps

### 1. Get Your MailerLite API Key
1. Log in to your MailerLite account
2. Go to **Integrations** → **API**
3. Copy your API key

### 2. Configure Your Environment
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and add your API key:
   ```
   VITE_MAILERLITE_API_KEY=your_actual_api_key_here
   ```

### 3. Restart Your Development Server
```bash
npm run dev
```

## How It Works

When users complete the quiz and submit their email:

1. **Email Capture**: User enters name and email
2. **Assessment Results**: Quiz scores are calculated 
3. **MailerLite Sync**: Subscriber is added to your MailerLite account with:
   - Email address
   - First name
   - Assessment score
   - Assessment category (Content Creator, Getting There, Conversion Pro)
   - Assessment percentage

## Custom Fields in MailerLite

The integration automatically adds these custom fields to each subscriber:
- `assessment_score`: Raw score (e.g., "15")
- `assessment_category`: Result category (e.g., "getting_there")
- `assessment_percentage`: Score as percentage (e.g., "62")

You can use these fields to:
- Segment your email list
- Send targeted campaigns
- Personalize follow-up sequences

## Advanced Configuration

### Adding Subscribers to Specific Groups
1. In MailerLite, create or find your group ID
2. Add it to your `.env` file:
   ```
   VITE_MAILERLITE_GROUP_ID=your_group_id
   ```

### Error Handling
The integration is designed to be robust:
- If MailerLite is down, users still see their results
- Failed submissions are logged to the console
- The quiz experience is never interrupted

## Testing

1. Complete the quiz with a test email
2. Check your MailerLite dashboard for the new subscriber
3. Verify the custom fields are populated correctly

## Production Deployment

When deploying to production (Vercel, Netlify, etc.):
1. Add your `VITE_MAILERLITE_API_KEY` to your hosting platform's environment variables
2. Never commit your `.env` file to version control
3. The `.env` file is already added to `.gitignore`

## Troubleshooting

**API Key Issues:**
- Verify your API key is correct
- Make sure you're using the new MailerLite API (not Classic)
- Check that your MailerLite account has API access enabled

**Missing Subscribers:**
- Check browser console for error messages
- Verify your API key has subscriber creation permissions
- Ensure your MailerLite account isn't at subscriber limits

**Custom Fields Not Showing:**
- Custom fields are created automatically when first used
- Check the "Subscribers" section in your MailerLite dashboard
- It may take a few minutes for fields to appear

Need help? Check the browser console for detailed error messages.