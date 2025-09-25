
import { GoogleGenAI, Type } from "@google/genai";
import type { InvestorProfile, CampaignStrategy, GrantProposal } from '../types';

if (!process.env.API_KEY) {
    // In a real app, this would be a more robust check.
    // For this environment, we assume it's set.
    console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const BASE_PROMPT_PHILOSOPHY = `You are an AI assistant for 'The Golden Horde', a collective focused on projects that embody the teachings of love, service to others, and deep collaboration. The goal is to build long-term, sustainable ventures that foster community and genuine connection, not just quick profits. You are helping build something people can believe in. Your responses should be sincere, inspiring, and strategically sound, always reflecting this core ethos.`;

export const generateGrantProposal = async (projectDescription: string): Promise<GrantProposal> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${BASE_PROMPT_PHILOSOPHY}\n\nBased on the following project idea, write a compelling and inspiring grant proposal. Focus on the long-term vision, the community impact, the collaborative nature of the project, and how it aligns with building a better, more connected future.\n\nProject Idea: "${projectDescription}"`,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating grant proposal:", error);
        throw new Error("Failed to generate grant proposal. Please check the console for details.");
    }
};

export const generateInvestorProfiles = async (projectDescription: string): Promise<InvestorProfile[]> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${BASE_PROMPT_PHILOSOPHY}\n\nYour task is to identify and profile three ideal investor archetypes for the following project. These are not 'get rich quick' types; they are 'long-haul stakeholders' and 'family' who want to build something meaningful and believe in a shared vision. For each, create a profile for a Venture Capitalist, an Angel Investor, and a Crowdfunding Backer persona.\n\nProject Idea: "${projectDescription}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING, description: "The type of investor (Venture Capitalist, Angel Investor, or Crowdfunding Backer)." },
                            name: { type: Type.STRING, description: "A representative name for this investor archetype." },
                            mindset: { type: Type.STRING, description: "The core philosophy and mindset of this investor." },
                            whyTheyInvest: { type: Type.STRING, description: "What motivates them to invest in a project like this." },
                            howToApproach: { type: Type.STRING, description: "The best way to communicate and pitch the project to them." },
                        },
                        required: ["type", "name", "mindset", "whyTheyInvest", "howToApproach"],
                    }
                },
            },
        });
        
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as InvestorProfile[];
    } catch (error) {
        console.error("Error generating investor profiles:", error);
        throw new Error("Failed to generate investor profiles. Please check the console for details.");
    }
};


export const generateCampaignStrategy = async (projectDescription: string): Promise<CampaignStrategy> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `${BASE_PROMPT_PHILOSOPHY}\n\nNow, act as a master strategist. Based on the project idea below, develop a comprehensive go-to-market and crowdfunding campaign strategy. This strategy should attract a tribe of believers, not just customers. Create branding, define the target audience, outline a Kickstarter strategy, and provide concepts for targeted ads that resonate deeply.\n\nProject Idea: "${projectDescription}"`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        branding: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "A powerful, fitting name for the project or brand." },
                                tagline: { type: Type.STRING, description: "A memorable tagline that captures the essence of the mission." },
                                coreMessage: { type: Type.STRING, description: "The central message that communicates the project's 'why'." },
                            },
                        },
                        targetAudience: {
                            type: Type.OBJECT,
                            properties: {
                                demographics: { type: Type.STRING, description: "Key demographic traits of the ideal supporter." },
                                psychographics: { type: Type.STRING, description: "The values, beliefs, and lifestyle of the ideal supporter (the 'family')." },
                            },
                        },
                        kickstarterStrategy: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING, description: "A compelling title for the Kickstarter campaign." },
                                fundingGoalRationale: { type: Type.STRING, description: "A transparent explanation of the funding goal and what it will achieve." },
                                rewardTiers: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Creative reward tiers that offer value and build community." },
                            },
                        },
                        targetedAdConcepts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    platform: { type: Type.STRING, description: "The social media platform for the ad (e.g., Instagram, Facebook)." },
                                    headline: { type: Type.STRING, description: "An attention-grabbing headline for the ad." },
                                    body: { type: Type.STRING, description: "The ad copy, written to inspire and connect." },
                                },
                            },
                        },
                    },
                },
            },
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as CampaignStrategy;
    } catch (error) {
        console.error("Error generating campaign strategy:", error);
        throw new Error("Failed to generate campaign strategy. Please check the console for details.");
    }
};
