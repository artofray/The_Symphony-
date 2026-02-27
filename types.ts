export enum AppView {
  DASHBOARD = 'DASHBOARD',
  GRANT_WRITER = 'GRANT_WRITER',
  INVESTOR_PROFILER = 'INVESTOR_PROFILER',
  CAMPAIGN_STRATEGIST = 'CAMPAIGN_STRATEGIST',
  BRANDING_ASSET_GENERATOR = 'BRANDING_ASSET_GENERATOR',
  ORGANIC_INTELLIGENCE = 'ORGANIC_INTELLIGENCE',
}

export interface InvestorProfile {
  type: 'Venture Capitalist' | 'Angel Investor' | 'Crowdfunding Backer';
  name: string;
  mindset: string;
  whyTheyInvest: string;
  howToApproach: string;
}

export interface CampaignStrategy {
  branding: {
    name: string;
    tagline: string;
    coreMessage: string;
  };
  targetAudience: {
    demographics: string;
    psychographics: string;
  };
  kickstarterStrategy: {
    title: string;
    fundingGoalRationale: string;
    rewardTiers: string[];
  };
  targetedAdConcepts: {
    platform: string;
    headline: string;
    body: string;
  }[];
}

export type GrantProposal = string;