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

  // Group IDs for each assessment category
  private groupMapping = {
    content_creator: import.meta.env?.VITE_MAILERLITE_CONTENT_CREATOR_GROUP_ID || null,
    getting_there: import.meta.env?.VITE_MAILERLITE_GETTING_THERE_GROUP_ID || null,
    conversion_pro: import.meta.env?.VITE_MAILERLITE_CONVERSION_PRO_GROUP_ID || null,
    // Fallback default group
    default: import.meta.env?.VITE_MAILERLITE_GROUP_ID || null
  };

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

  // Get group ID for assessment category
  private getGroupId(category: string): string | null {
    const groupId = this.groupMapping[category as keyof typeof this.groupMapping];
    return groupId || this.groupMapping.default;
  }

  // Method to add subscriber with assessment results and group assignment
  async addAssessmentSubscriber(
    email: string, 
    name: string, 
    assessmentResult?: {
      score: number;
      category: string;
      maxScore: number;
    }
  ): Promise<MailerLiteResponse> {
    // Debug logging
    console.log('Group mapping configuration:', this.groupMapping);
    console.log('Assessment result:', assessmentResult);

    // Determine which group to add the subscriber to
    const groupId = assessmentResult ? this.getGroupId(assessmentResult.category) : this.groupMapping.default;
    const groups = groupId ? [groupId] : [];

    console.log(`Selected group ID: ${groupId} for category: ${assessmentResult?.category}`);
    console.log('Groups array:', groups);

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
      groups,
      status: 'active'
    };

    console.log('Final subscriber object:', subscriber);

    const result = await this.addSubscriber(subscriber);

    // Log group assignment for debugging
    if (result.success && groupId) {
      console.log(`✅ Successfully added subscriber to group: ${assessmentResult?.category} (ID: ${groupId})`);
    } else if (result.success && !groupId) {
      console.log('⚠️ Subscriber added without group assignment - no group ID configured');
    } else {
      console.log('❌ Failed to add subscriber:', result.error);
    }

    return result;
  }
}

export const mailerliteService = new MailerLiteService();