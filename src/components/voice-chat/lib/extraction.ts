import { z } from "zod";

/**
 * Minimal transcript interface for extraction
 * Only requires the fields we actually use
 */
interface MinimalTranscript {
  role: "user" | "assistant";
  content: string;
}

/**
 * Schema for extracted interview candidate data
 */
export const interviewExtractionSchema = z.object({
  // Role information
  targetRole: z
    .string()
    .optional()
    .describe("The job title/role they're interviewing for"),
  targetCompany: z
    .string()
    .optional()
    .describe("Specific company name if mentioned"),
  companyType: z
    .string()
    .optional()
    .describe("Type of company (startup, enterprise, agency, etc.)"),
  industry: z
    .string()
    .optional()
    .describe("Industry sector (tech, finance, healthcare, etc.)"),

  // Candidate background
  yearsExperience: z
    .number()
    .optional()
    .describe("Years of relevant experience"),
  currentRole: z.string().optional().describe("Their current job title"),
  keySkills: z
    .array(z.string())
    .optional()
    .describe("Technical or professional skills mentioned"),

  // Interview specifics
  interviewStage: z
    .enum(["phone_screen", "technical", "behavioral", "final", "unknown"])
    .optional()
    .describe("What stage of interview they're preparing for"),
  specificConcerns: z
    .array(z.string())
    .optional()
    .describe("Specific concerns or weak areas they want to work on"),

  // Compensation
  salaryExpectation: z
    .string()
    .optional()
    .describe("Expected salary range if mentioned"),
  location: z.string().optional().describe("Job location or remote preference"),

  // Confidence scores (0-1)
  confidence: z
    .object({
      targetRole: z.number().optional(),
      targetCompany: z.number().optional(),
      yearsExperience: z.number().optional(),
      salaryExpectation: z.number().optional(),
    })
    .optional()
    .describe("Confidence scores for key fields (0-1 range)"),
});

export type ExtractedInterviewData = z.infer<typeof interviewExtractionSchema>;

/**
 * Format transcript messages for extraction prompt
 */
export function formatTranscriptForExtraction(
  messages: MinimalTranscript[],
): string {
  return messages
    .map((msg) => {
      const role = msg.role === "user" ? "Candidate" : "Coach";
      return `${role}: ${msg.content}`;
    })
    .join("\n\n");
}

/**
 * Create the extraction prompt
 */
export function createExtractionPrompt(transcript: string): string {
  return `Extract structured information about this interview candidate from the following coaching conversation.

## Conversation Transcript
${transcript}

Extract all relevant information about:
- The role/position they're targeting
- Company or company type
- Their experience level and background
- Skills they've mentioned
- Interview stage they're preparing for
- Any salary/location preferences mentioned
- Specific concerns or areas they want to improve

Only extract information that was explicitly mentioned or strongly implied. Use confidence scores to indicate certainty.`;
}

/**
 * Parse and validate extraction response
 */
export function parseExtractionResponse(data: unknown): {
  data: ExtractedInterviewData;
  success: boolean;
} {
  try {
    const parsed = interviewExtractionSchema.parse(data);
    return { data: parsed, success: true };
  } catch (error) {
    console.error("Failed to parse extraction:", error);
    return { data: {}, success: false };
  }
}

/**
 * Calculate completeness score (0-100) based on extracted fields
 */
export function calculateCompleteness(data: ExtractedInterviewData): number {
  let score = 0;
  const weights = {
    targetRole: 25,
    targetCompany: 10,
    companyType: 10,
    yearsExperience: 15,
    keySkills: 15,
    interviewStage: 10,
    salaryExpectation: 10,
    location: 5,
  };

  if (data.targetRole) score += weights.targetRole;
  if (data.targetCompany || data.companyType)
    score += weights.targetCompany + weights.companyType;
  if (data.yearsExperience) score += weights.yearsExperience;
  if (data.keySkills && data.keySkills.length > 0) score += weights.keySkills;
  if (data.interviewStage && data.interviewStage !== "unknown")
    score += weights.interviewStage;
  if (data.salaryExpectation) score += weights.salaryExpectation;
  if (data.location) score += weights.location;

  return Math.min(100, score);
}
