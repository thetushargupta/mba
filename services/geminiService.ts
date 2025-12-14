import { GoogleGenAI, Type, Schema } from "@google/genai";
import { StudentProfile, SeniorProfile, MatchResult } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({ apiKey });
};

export const findBestMatches = async (
  student: StudentProfile,
  seniors: SeniorProfile[]
): Promise<MatchResult[]> => {
  const ai = getClient();

  // Define the JSON schema for the response
  const responseSchema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        seniorId: {
          type: Type.STRING,
          description: "The ID of the senior profile.",
        },
        matchScore: {
          type: Type.NUMBER,
          description: "A compatibility score from 0 to 100.",
        },
        reason: {
          type: Type.STRING,
          description: "A concise explanation of why this senior is a good match for the student (max 2 sentences).",
        },
      },
      required: ["seniorId", "matchScore", "reason"],
    },
  };

  const prompt = `
    You are an expert MBA placement counselor. Your task is to match a new MBA student (Junior) with the most suitable Senior Mentors from a provided list.

    **Student Profile:**
    - Name: ${student.name}
    - Target Field: ${student.targetField}
    - Undergrad Degree: ${student.undergradDegree}
    - Work Experience: ${student.workExperienceYears} years at ${student.prevCompany} as ${student.prevRole}
    - Skills/Interests: ${student.skills}
    - Hobbies: ${student.hobbies}

    **List of Available Seniors:**
    ${JSON.stringify(seniors.map(s => ({
      id: s.id,
      name: s.name,
      field: s.field,
      role: s.role,
      company: s.company,
      undergrad: s.undergradDegree,
      preMbaExp: s.preMbaExperienceYears,
      preMbaInd: s.preMbaIndustry,
      bio: s.bio
    })))}

    **Matching Criteria:**
    1. **Target Field Alignment (Critical):** The senior SHOULD ideally be in the field the student wants to enter. If not, there must be a very strong background overlap.
    2. **Background Similarity:** Similar undergrad degrees or pre-MBA industries create better mentorship bonds.
    3. **Experience Level:** Match students with similar experience levels (e.g., freshers with freshers/low exp seniors, experienced with experienced) UNLESS the student wants to pivot, in which case find a senior who successfully pivoted from a similar background.

    **Task:**
    Select the top 5 matches. Return a JSON array. High scores (>85) should be reserved for excellent matches.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.2, // Low temperature for consistent, logical matching
      },
    });

    const text = response.text;
    if (!text) {
        throw new Error("Empty response from Gemini");
    }
    const matches = JSON.parse(text) as MatchResult[];
    
    // Sort by score just in case
    return matches.sort((a, b) => b.matchScore - a.matchScore);

  } catch (error) {
    console.error("Error matching profiles:", error);
    // Fallback: Return empty array or handle UI error
    throw error;
  }
};