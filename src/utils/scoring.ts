import { Question } from '../data/questions';

export interface AssessmentResult {
  score: number;
  maxScore: number;
  category: 'content_creator' | 'getting_there' | 'conversion_pro';
  answers: Record<string, string>;
}

export interface ResultTemplate {
  category: 'content_creator' | 'getting_there' | 'conversion_pro';
  title: string;
  subtitle: string;
  diagnosis: string;
  problemWhy: string;
  quickWin: string;
  thirtyDayStrategy: string;
  overlySocialIntro: string;
}

export const calculateScore = (answers: number[], questions: Question[]): AssessmentResult => {
  const totalScore = answers.reduce((sum, answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    return sum + (question.options[answerIndex]?.score || 0);
  }, 0);

  const maxScore = questions.length * 3;
  
  const answerKeys = answers.reduce((acc, answerIndex, questionIndex) => {
    const question = questions[questionIndex];
    const selectedOption = question.options[answerIndex];
    if (selectedOption) {
      acc[`q${question.id}`] = selectedOption.key;
    }
    return acc;
  }, {} as Record<string, string>);

  let category: 'content_creator' | 'getting_there' | 'conversion_pro';
  if (totalScore <= 8) {
    category = 'content_creator';
  } else if (totalScore <= 16) {
    category = 'getting_there';
  } else {
    category = 'conversion_pro';
  }

  return {
    score: totalScore,
    maxScore,
    category,
    answers: answerKeys
  };
};

export const getCustomizedResult = (result: AssessmentResult): ResultTemplate => {
  const { category, answers } = result;
  
  // Base templates for each category
  const baseTemplates: Record<string, ResultTemplate> = {
    content_creator: {
      category: 'content_creator',
      title: "You're Working Hard, But Your Content Isn't Working For You",
      subtitle: "You show up every day creating valuable content, but when it comes to booking calls or making sales... nothing.",
      diagnosis: "Here's what I see happening with your current approach:\n\nYou show up every day. You share valuable insights. People engage, maybe even follow you. But when it comes to actually booking calls or making sales? …Nothing.\n\nIf this sounds familiar, don't beat yourself up for it.\n\nMost entrepreneurs I work with have this exact problem. Most think they need more followers or viral content. But the truth is much simpler and way more fixable.\n\nYour content is doing its job perfectly. It's building awareness and trust. But it's just not guiding people anywhere, and that's costing you serious money.\n\nThis is what I call the Client Journey Gap, and it's the single biggest reason why business owners stay stuck at getting lots of engagement but no actual clients.\n\nThink about the last time someone discovered your content and thought 'wow, this person knows what they're talking about.' What happened next?\n\nIf you're like most people, probably nothing. They liked your post, maybe followed you, and then... They close LinkedIn and go back to their day. Maybe they'll see your content again in a few days, maybe they won't.\n\nBut either way, there's no clear path for them to go deeper with you. There's no way for them to gradually warm up to the idea of potentially working with you one day.\n\nSo they just... disappear.",
      problemWhy: "The problem isn't your content quality. You're asking people to make too big of a leap.\n\nYou're essentially saying: 'Enjoy my free content, and when you're ready to spend $3,000-$10,000, let me know.' That's like asking someone to marry you on the first date.\n\nWhat you need is a bridge. A way for interested people to raise their hand and say 'I want more of this' without committing to a big purchase.\n\nIf you get 1,000 content views monthly (and you probably get way more), you should be converting 2-5% of those into email subscribers. That's 20-50 people who are interested enough to give you their email address.\n\nBut right now? You're probably getting close to zero because you don't have anything to offer them.\n\nThose 20-50 people monthly turn into 240-600 potential clients annually. Even if just 10% of those eventually bought from you, that's 24-60 additional clients you're missing out on.\n\nEvery month you don't fix this, you're leaving thousands of dollars on the table while your competitors with inferior content are booking clients because they have systems in place.",
      quickWin: "Here's something you can do in the next 30 minutes that could literally double your conversion rates:\n\nGo to your most popular post from last month - the one that got the most engagement and comments. Right now, add a comment to that post that says: 'If this resonated with you, I created a free [specific resource] that shows you exactly how to [specific outcome they want]. Link in my bio to grab it.'\n\nThen create a simple Google Doc with 3-5 actionable tips related to that post's topic. Put it behind a simple email capture (you can use ConvertKit, Mailchimp, or even a Google Form). Update your bio link to point to this resource.\n\nWhy does this work? Because people who engaged with that post are already warm. They've raised their hand by commenting or liking. You're just giving them a natural next step.\n\nThis single action often generates 10-20 new email subscribers within 48 hours, and those subscribers convert to clients at a 500% higher rate than cold social media followers.\n\nThe key is specificity - don't offer a generic PDF guide. Offer something that directly solves the problem your popular post highlighted.",
      thirtyDayStrategy: "Your 30-Day Conversion System Blueprint:\n\nWeek 1: Create your lead magnet properly. Not a 47-page PDF that nobody reads, but something that gives a quick win in 15 minutes or less. Think checklist, template, mini-course, or assessment. It should solve ONE specific problem your ideal client has right now.\n\nWeek 2: Set up your email capture system and create your first nurture email sequence. Start with five emails: deliver the lead magnet plus your origin story, share a framework or strategy to build authority, address their biggest objection to working with someone like you, share a client transformation story, and end with a soft invitation to book a call or learn about your services.\n\nWeek 3: Implement the content strategy that actually works. Every piece of content should have one of three jobs: Authority posts (70%) where you share frameworks, insights, and behind-the-scenes content. Connection posts (20%) with personal stories, values, and beliefs. Conversion posts (10%) featuring client results, testimonials, and clear calls-to-action to your lead magnet.\n\nWeek 4: Track and optimize. Which posts drive the most lead magnet downloads? Which emails get the highest open rates? Double down on what works.\n\nBy day 30, you should have 50-100 new email subscribers and a system that runs itself. The entrepreneurs who actually implement this see results within the first week.",
      overlySocialIntro: "Hey, my name is Stefany, the founder of OverlySocial, and I've spent the last 5 years helping entrepreneurs turn their content into consistent client bookings.\n\nI've seen too many brilliant people struggle with this exact problem. They create amazing content but struggle to convert that attention into revenue.\n\nThat's why I developed the OverlySocial Method, a proven system that transforms your existing content into a client-generating machine.\n\nWe don't focus on going viral or gaming algorithms. Instead, we build strategic systems that turn every piece of content into a stepping stone toward working with you.\n\nMy clients typically see a 300-500% increase in qualified leads within 60 days, not because they create more content, but because every piece of content they create now has a purpose in their client journey.\n\nIf you want to learn more about how this approach could work for your business, you can connect with me on LinkedIn or check out OverlySocial.com for free resources and case studies."
    },
    getting_there: {
      category: 'getting_there',
      title: "You're Getting There, But Leaks in Your System Are Costing You",
      subtitle: "You have some pieces in place, but gaps in your conversion system are bleeding potential clients and revenue",
      diagnosis: "You're in the most frustrating position possible. You're doing 'all the right things' but not seeing proportional results.\n\nYou have some of the pieces: maybe a lead magnet, some email subscribers, occasional sales calls. But something's not clicking into place the way it should.\n\nYour lead magnet gets some downloads, but they don't turn into calls. Your emails get decent open rates, but people aren't taking action. You book some discovery calls, but the conversion rate feels lower than it should be.\n\nHere's the thing - you're not bad at what you do. Your system has gaps and friction points that are bleeding potential clients at every stage.\n\nThe good news? You're closer than you think. Small improvements in a working system create exponential results.\n\nYou don't need to start over; you need to identify the leaks and plug them.\n\nMost entrepreneurs in your position are missing 1-2 key elements that would transform their entire funnel performance. The difference between a 20% call booking rate and a 60% rate often comes down to fixing one broken step in your sequence.",
      problemWhy: "Here's what's actually happening in your system:\n\nYou're losing people at the transition points. Someone downloads your lead magnet but never opens your follow-up emails. They read your emails but don't click your links. They click your links but don't book a call.\n\nEach gap might seem small - maybe you're only losing 20-30% of people at each stage - but compound that across 4-5 steps and you're losing 80% of your potential clients before they even get to a sales conversation.\n\nIf you're getting 100 new leads per month but only booking 10 calls, that's not a lead quality problem. That's a system problem. Those 90 people who didn't book calls represent thousands in lost revenue.\n\nThe brutal truth is that most of your competitors aren't better marketers or service providers than you. They just have tighter systems. While you're losing half your prospects between email 2 and email 3, they've optimized that transition and kept 80% engaged.\n\nSmall improvements compound dramatically in conversion systems.",
      quickWin: "Here's a 30-minute fix that could increase your call bookings by 50% this week:\n\nLook at your email sequence that follows your lead magnet. Find the email where you first mention booking a call or learning about our services. Before that email, add one new email that shares a specific client transformation story.\n\nNot just results ('We helped Sarah increase her revenue') but the actual journey: 'Sarah came to us frustrated because she was working 60-hour weeks but barely breaking even. She had leads coming in but couldn't convert them to sales. Within 30 days of implementing our system, she booked 8 new clients and reduced her work hours to 40 per week. The key was fixing her discovery call process - one small change doubled her closing rate.'\n\nThen end with: 'If you're facing similar challenges, we have a few spots open for strategy calls this week.'\n\nWhy does this work? Because people need to see themselves in your success stories before they're ready to take action. This one email often increases call bookings by 40-60% because it bridges the gap between 'this person shares good tips' and 'this person could actually help me.'",
      thirtyDayStrategy: "Your 30-Day System Optimization Plan:\n\nWeek 1: Audit every step of your current funnel. Track the numbers: How many people download your lead magnet? How many open email 1? Email 2? Email 3? How many click to your booking page? How many actually book? Identify your biggest drop-off point - that's where you start.\n\nWeek 2: Fix your biggest leak. If it's between lead magnet and email opens, optimize your email subject lines and sender name. If it's between emails and call bookings, add more social proof and urgency. If it's between call bookings and sales, improve your call preparation process.\n\nWeek 3: Optimize your content-to-lead magnet bridge. Look at your last 10 posts. How many have clear CTAs to your lead magnet? Add CTAs to your top-performing posts from the last 3 months. Create 2-3 new pieces of content specifically designed to drive lead magnet downloads.\n\nWeek 4: Implement advanced nurturing tactics. Segment your email list based on engagement levels. Create a separate sequence for highly engaged subscribers. Add a re-engagement campaign for people who haven't opened emails in 30 days. Set up automated follow-ups for people who book calls but don't show up.\n\nBy day 30, you should see a 30-50% improvement in your overall conversion rates. The key is focusing on one improvement at a time and measuring the impact before moving to the next optimization.",
      overlySocialIntro: "Hey, my name is Stefany, the founder of OverlySocial, and I specialize in helping entrepreneurs like you who are 'almost there' optimize their conversion systems for maximum results.\n\nYou already understand the importance of lead magnets, email marketing, and sales calls - you just need someone to help you identify and fix the gaps that are costing you clients.\n\nThe OverlySocial Optimization Method is specifically designed for businesses that have the foundation in place but need strategic improvements to multiply their results.\n\nWe use data-driven analysis to find your biggest conversion leaks and implement proven fixes that often double or triple performance within 60 days.\n\nMy clients in your situation typically see the fastest results because we're not starting from scratch - we're taking what's working and making it work even better.\n\nIf you're tired of being 'close' and ready to break through to consistent client flow, I'd love to help you optimize your system. You can learn more about our approach at OverlySocial.com or connect with me directly on LinkedIn."
    },
    conversion_pro: {
      category: 'conversion_pro',
      title: "You're a Conversion Pro, But There's Another Level",
      subtitle: "Your system is working well, but advanced optimization could 2x your results without 2x the work",
      diagnosis: "You're in the enviable position that most entrepreneurs dream of - you've built a system that actually works.\n\nYou're getting consistent leads from your content, your email list is growing, your discovery calls are converting at a solid rate, and you're making regular sales.\n\nYou're in the top 10% of online businesses. Most people would kill for your 'problems.'\n\nBut here's what we know about high-performers like you: good isn't good enough when great is possible.\n\nYou can feel that there's another level to reach.\n\nMaybe your conversion rates have plateaued.\n\nMaybe you're manually doing things that could be automated.\n\nMaybe you know your system could handle 2x the volume if it was optimized properly.\n\nThe challenge at your level isn't fixing what's broken - it's optimizing what's working to perform at an elite level.\n\nYou need advanced strategies, not basic fixes.\n\nYou're ready for the kind of optimization that turns a successful business into a scalable, predictable revenue machine.",
      problemWhy: "Here's what's actually holding you back:\n\nYou've hit the ceiling of 'good enough' systems.\n\nYour lead magnet works, but it's not optimized for maximum conversions.\n\nYour email sequence gets results, but it's not segmented for different types of prospects.\n\nYour sales calls close deals, but you're not pre-qualifying as effectively as you could be.\n\nAt your level, small percentage improvements create massive dollar improvements.\n\nIf you're currently generating $50K/month and you improve your email-to-call conversion rate from 15% to 25%, that's not just a 10% improvement - that could translate to an extra $15-20K in monthly revenue.\n\nBut most successful entrepreneurs get comfortable with 'working well' and miss the opportunity to optimize for 'working extraordinarily.'\n\nEvery month you plateau is a month your competitors might catch up or you miss market opportunities.\n\nThe gap between good and great isn't usually about working harder - it's about implementing advanced strategies that most people don't even know exist.",
      quickWin: "Here's a 30-minute optimization that could increase your revenue by 20% this month:\n\nSegment your email list based on engagement behavior.\n\nCreate three segments: Hot (opened 80%+ of emails in last 30 days), Warm (opened 40-80%), and Cold (less than 40%).\n\nThen create a separate email sequence for your Hot prospects that's more direct and action-oriented.\n\nInstead of 5 nurture emails before asking for a call, send them value in email 1, social proof in email 2, and a direct invitation to book in email 3.\n\nWhy does this work?\n\nYour most engaged prospects don't need as much nurturing - they're already convinced of your expertise and are waiting for you to make an offer.\n\nThis single change often increases call bookings from highly qualified prospects by 40-60%.\n\nSet this up using tags in your email platform (ConvertKit, ActiveCampaign, etc.) and watch your conversion rates jump.\n\nYour Hot prospects will book faster, and your Warm prospects will still get the full nurture sequence they need.",
      thirtyDayStrategy: "Your 30-Day Scale & Optimize Blueprint:\n\nWeek 1: Implement advanced tracking and attribution. Set up proper conversion tracking to see which content pieces drive the highest-value leads. Use UTM codes on all your social posts. Install proper analytics to track the full customer journey from first touch to sale. Identify your highest-converting content and double down on similar topics.\n\nWeek 2: Optimize your highest-impact touchpoints. A/B test your lead magnet landing page (try video vs. text, long-form vs. short-form). Test different subject lines for your highest-performing emails. Optimize your booking page with social proof, urgency, and clearer value propositions. Small improvements here compound dramatically.\n\nWeek 3: Implement advanced automation and personalization. Set up behavior-triggered emails based on specific actions (downloaded X resource, visited pricing page, etc.). Create dynamic content that changes based on how prospects found you. Add retargeting pixels to re-engage people who didn't complete your funnel.\n\nWeek 4: Scale what's working and eliminate what's not. Identify your most profitable traffic sources and double your investment there. Eliminate or improve underperforming content and campaigns. Create systems to handle 2x the volume without 2x the work.\n\nBy day 30, you should have a system that's not just working, but working at an elite level with clear scalability built in.",
      overlySocialIntro: "Hey, my name is Stefany, the founder of OverlySocial, and I work exclusively with high-performing entrepreneurs like you who are ready to scale from good to extraordinary.\n\nYou already understand conversion optimization - you've built a system that works. But there's a difference between a system that works and a system that's optimized for scale, automation, and maximum profitability.\n\nThe OverlySocial Scale Method is designed specifically for businesses already generating consistent revenue who want to break through to the next level without burning out or working more hours.\n\nWe focus on advanced optimization, automation, and scaling strategies that most entrepreneurs never learn.\n\nMy clients at your level typically see 50-150% increases in revenue within 90 days, not by working more, but by optimizing their existing systems to perform at an elite level.\n\nIf you're ready to transform your successful business into a revenue machine that scales predictably, I'd love to explore how our advanced strategies could work for your business. You can learn more about our Scale Method at OverlySocial.com or reach out to me directly on LinkedIn."
    }
  };

  let template = baseTemplates[category];

  // Apply conditional logic based on specific answers
  if (answers.q3 === 'magnet_interactive' && result.score < 16) {
    template = {
      ...template,
      diagnosis: template.diagnosis + "\n\nNote: Your interactive lead magnet approach is excellent - that's exactly the right strategy.\n\nThe issue isn't your lead magnet choice, it's likely in your follow-up sequence.",
      quickWin: "Your lead magnet strategy is spot-on.\n\nFocus your 30 minutes on improving your first follow-up email after someone completes your assessment.\n\nMake sure it delivers immediate value and sets up the next step in your sequence."
    };
  }

  if (answers.q3 === 'magnet_pdf' && result.score > 16) {
    template = {
      ...template,
      problemWhy: template.problemWhy + "\n\nSpecific to your situation: Your generic PDF guide is likely your biggest conversion bottleneck.\n\nEven with everything else working well, that PDF is probably getting downloaded and forgotten.",
      quickWin: "Skip the 30-minute fix - this needs a bigger change.\n\nReplace that PDF with something interactive (assessment, calculator, template, or mini-course) within the next week.\n\nThis single change often doubles conversion rates."
    };
  }

  if (answers.q8 === 'close_excellent' && answers.q4 === 'conversion_very_low') {
    template = {
      ...template,
      diagnosis: template.diagnosis + "\n\nUnique insight for you: Your 70%+ call conversion rate is incredible - you're clearly excellent at sales.\n\nThe problem isn't your closing ability, it's that you need way more qualified people booking those calls.",
      thirtyDayStrategy: "Your 30-day focus should be 90% on lead generation and 10% on optimization.\n\nWith your closing skills, more qualified leads directly equals more revenue.\n\n" + template.thirtyDayStrategy
    };
  }

  return template;
};