// MailerLite integration service
export interface MailerLiteSubscriber {
  email: string;
  fields?: {
    name?: string;
    last_name?: string;
    [key: string]: any;
  };
  groups?: string[];
  status?: 'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk';
}

export interface MailerLiteResponse {
  success: boolean;
  data?: any;
  error?: string;
}

class MailerLiteService {
  private apiKey: string | null = null;
  private baseUrl = 'https://connect.mailerlite.com/api';

  constructor() {
    // API key should be set via environment variables in production
    this.apiKey = import.meta.env?.VITE_MAILERLITE_API_KEY || null;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  async addSubscriber(subscriber: MailerLiteSubscriber): Promise<MailerLiteResponse> {
    if (!this.apiKey) {
      console.warn('MailerLite API key not configured');
      return {
        success: false,
        error: 'MailerLite API key not configured'
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(subscriber)
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data
        };
      } else {
        return {
          success: false,
          error: data.message || 'Failed to add subscriber'
        };
      }
    } catch (error) {
      console.error('MailerLite API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  async getGroups(): Promise<MailerLiteResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'MailerLite API key not configured'
      };
    }

    try {
      const response = await fetch(`${this.baseUrl}/groups`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        return {
          success: true,
          data
        };
      } else {
        return {
          success: false,
          error: data.message || 'Failed to fetch groups'
        };
      }
    } catch (error) {
      console.error('MailerLite API Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  // Method to add subscriber with assessment results
  async addAssessmentSubscriber(
    email: string, 
    name: string, 
    assessmentResult?: {
      score: number;
      category: string;
      maxScore: number;
    }
  ): Promise<MailerLiteResponse> {
    const subscriber: MailerLiteSubscriber = {
      email,
      fields: {
        name,
        // Add custom fields for assessment data
        ...(assessmentResult && {
          assessment_score: assessmentResult.score.toString(),
          assessment_category: assessmentResult.category,
          assessment_percentage: Math.round((assessmentResult.score / assessmentResult.maxScore) * 100).toString()
        })
      },
      status: 'active'
    };

    return this.addSubscriber(subscriber);
  }
}

export const mailerliteService = new MailerLiteService();