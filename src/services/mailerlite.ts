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

  // Group IDs for each assessment category - loaded from environment variables
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

  // Convert category key to human-readable format
  private formatQuizResult(category: string): string {
    const categoryMap = {
      content_creator: 'Content Creator',
      getting_there: 'Getting There',
      conversion_pro: 'Conversion Pro'
    };
    return categoryMap[category as keyof typeof categoryMap] || category;
  }

  // Test method to verify API connection and group IDs
  async testConnection(): Promise<MailerLiteResponse> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'MailerLite API key not configured'
      };
    }

    try {
      // Test basic API connection by getting groups
      const groupsResponse = await this.getGroups();
      
      if (!groupsResponse.success) {
        return groupsResponse;
      }

      // Verify our configured group IDs exist
      const groups = groupsResponse.data?.data || [];
      const groupIds = groups.map((group: any) => group.id);
      
      const missingGroups: string[] = [];
      
      // Check each configured group ID
      Object.entries(this.groupMapping).forEach(([category, groupId]) => {
        if (groupId && !groupIds.includes(groupId)) {
          missingGroups.push(`${category}: ${groupId}`);
        }
      });

      if (missingGroups.length > 0) {
        return {
          success: false,
          error: `The following configured group IDs were not found: ${missingGroups.join(', ')}`
        };
      }

      return {
        success: true,
        data: {
          message: 'API connection successful',
          availableGroups: groups.map((group: any) => ({
            id: group.id,
            name: group.name
          })),
          configuredGroups: this.groupMapping
        }
      };

    } catch (error) {
      console.error('MailerLite connection test failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Connection test failed'
      };
    }
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
    // Determine which group to add the subscriber to
    const groupId = assessmentResult ? this.getGroupId(assessmentResult.category) : this.groupMapping.default;
    
    // Format the quiz result for human readability
    const quizResult = assessmentResult ? this.formatQuizResult(assessmentResult.category) : 'Unknown';

    const subscriber: MailerLiteSubscriber = {
      email,
      fields: {
        name,
        // Add custom field for human-readable quiz result
        quiz_result: quizResult,
        // Add other custom fields for assessment data
        ...(assessmentResult && {
          assessment_score: assessmentResult.score.toString(),
          assessment_category: assessmentResult.category,
          assessment_percentage: Math.round((assessmentResult.score / assessmentResult.maxScore) * 100).toString()
        })
      },
      // Only include groups array if we have a valid group ID
      ...(groupId && { groups: [groupId] }),
      status: 'active'
    };

    // Enhanced logging before making the API call
    console.log('🚀 Adding subscriber to MailerLite:', {
      email,
      category: assessmentResult?.category,
      groupId,
      groupsArray: groupId ? [groupId] : 'none'
    });

    const result = await this.addSubscriber(subscriber);

    // Enhanced logging after the API call
    if (result.success && groupId) {
      console.log(`✅ Subscriber successfully added to ${assessmentResult?.category} group (ID: ${groupId})`);
      console.log(`📊 Quiz result: "${quizResult}" | Score: ${assessmentResult?.score}/${assessmentResult?.maxScore}`);
      console.log('📋 Full API response:', result.data);
    } else if (result.success && !groupId) {
      console.log('⚠️ Subscriber added without group - no group ID configured');
      console.log(`📊 Quiz result: "${quizResult}"`);
      console.log('📋 API response:', result.data);
    } else {
      console.log('❌ Failed to add subscriber:', result.error);
      console.log('📋 Full error response:', result);
    }

    return result;
  }
}

export const mailerliteService = new MailerLiteService();