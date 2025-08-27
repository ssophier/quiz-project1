export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    score: number;
    key: string;
  }[];
}

export const assessmentQuestions: Question[] = [
  {
    id: 1,
    question: "When someone sees your content for the first time, what happens next?",
    options: [
      { text: "They like/comment and that's it (I hope they follow)", score: 0, key: "content_hope" },
      { text: "I tell them to \"DM me for more info\"", score: 1, key: "content_dm" },
      { text: "I have a link in bio to book a call", score: 2, key: "content_call" },
      { text: "I offer a specific free resource that captures their email", score: 3, key: "content_resource" }
    ]
  },
  {
    id: 2,
    question: "How often do you post content specifically designed to generate leads (not just engagement)?",
    options: [
      { text: "Never - I focus on valuable content and hope people reach out", score: 0, key: "lead_content_never" },
      { text: "Occasionally - maybe once a week", score: 1, key: "lead_content_weekly" },
      { text: "Regularly - 2-3 times per week", score: 2, key: "lead_content_regular" },
      { text: "Strategically - every post has a purpose in my client journey", score: 3, key: "lead_content_strategic" }
    ]
  },
  {
    id: 3,
    question: "What free resource do you offer to capture contact information?",
    options: [
      { text: "Nothing - I rely on social media followers", score: 0, key: "magnet_none" },
      { text: "Generic PDF guide or checklist", score: 1, key: "magnet_pdf" },
      { text: "Specific resource that solves one problem", score: 2, key: "magnet_specific" },
      { text: "Interactive tool/assessment that provides personalized results", score: 3, key: "magnet_interactive" }
    ]
  },
  {
    id: 4,
    question: "How many email subscribers do you get per 1000 content views?",
    options: [
      { text: "I don't track this / Less than 5", score: 0, key: "conversion_very_low" },
      { text: "5-15 subscribers", score: 1, key: "conversion_low" },
      { text: "15-30 subscribers", score: 2, key: "conversion_med" },
      { text: "30+ subscribers", score: 3, key: "conversion_high" }
    ]
  },
  {
    id: 5,
    question: "What happens after someone downloads your free resource?",
    options: [
      { text: "They get the resource and that's it", score: 0, key: "followup_none" },
      { text: "They go on my general newsletter list", score: 1, key: "followup_newsletter" },
      { text: "They get 2-3 follow-up emails with more value", score: 2, key: "followup_few" },
      { text: "They enter a strategic sequence that builds trust and positions my services", score: 3, key: "followup_sequence" }
    ]
  },
  {
    id: 6,
    question: "How do you stay in touch with prospects who aren't ready to buy yet?",
    options: [
      { text: "I don't - I hope they see my social media posts", score: 0, key: "nurture_none" },
      { text: "Occasional newsletter when I remember", score: 1, key: "nurture_occasional" },
      { text: "Regular newsletter with business tips", score: 2, key: "nurture_regular" },
      { text: "Strategic email sequence + regular value-driven content", score: 3, key: "nurture_strategic" }
    ]
  },
  {
    id: 7,
    question: "How do prospects typically book a call with you?",
    options: [
      { text: "They have to DM me or email me directly", score: 0, key: "booking_dm" },
      { text: "Generic \"book a call\" link in bio", score: 1, key: "booking_generic" },
      { text: "Dedicated booking page with clear value proposition", score: 2, key: "booking_dedicated" },
      { text: "Multi-step process that pre-qualifies and warms them up first", score: 3, key: "booking_qualified" }
    ]
  },
  {
    id: 8,
    question: "What percentage of your discovery calls convert to clients?",
    options: [
      { text: "Less than 30% (or I don't track this)", score: 0, key: "close_low" },
      { text: "30-50%", score: 1, key: "close_med" },
      { text: "50-70%", score: 2, key: "close_good" },
      { text: "70%+ (because only qualified prospects book calls)", score: 3, key: "close_excellent" }
    ]
  }
];