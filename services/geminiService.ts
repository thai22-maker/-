import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, PracticeQuestion } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    subject: {
      type: Type.STRING,
      description: "The subject of the question (e.g., 'English', 'Math', 'Physics', 'Chinese').",
    },
    mistakeAnalysis: {
      type: Type.STRING,
      description: "A friendly explanation of the mistake. If the subject is English, explain in Chinese but quote English words/phrases from the image.",
    },
    correctSolution: {
      type: Type.STRING,
      description: "Step-by-step correct solution. If the subject is English, provide the English answer followed by its Chinese translation (Bilingual).",
    },
    coreConcept: {
      type: Type.STRING,
      description: "The main academic concept being tested (e.g., 'Pythagorean Theorem', 'Past Perfect Tense'). MUST BE IN SIMPLIFIED CHINESE.",
    },
    encouragement: {
      type: Type.STRING,
      description: "A short, enthusiastic message to cheer the student up. MUST BE IN SIMPLIFIED CHINESE.",
    },
  },
  required: ["subject", "mistakeAnalysis", "correctSolution", "coreConcept", "encouragement"],
};

const quizSchema: Schema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      id: { type: Type.INTEGER },
      question: { type: Type.STRING, description: "The practice question text." },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "Four multiple choice options.",
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The correct option string, must exactly match one of the options.",
      },
      explanation: { type: Type.STRING, description: "Explanation of why the answer is correct (In Simplified Chinese)." },
    },
    required: ["id", "question", "options", "correctAnswer", "explanation"],
  },
};

export async function analyzeImage(base64Image: string, mimeType: string): Promise<AnalysisResult> {
  try {
    const modelId = "gemini-2.5-flash"; 
    const prompt = `
      You are a friendly, encouraging middle school tutor.
      Please analyze this image of a student's incorrect homework or exam question.
      
      1. Identify the Subject (e.g. English, Math).
      2. If you see handwriting, analyze the specific mistake.
      3. Explain the error directly to the student (use "you"). Keep the tone lighthearted and supportive.
      
      LANGUAGE RULES:
      - If the subject is 'English' (or the question is in English): 
         - 'correctSolution': MUST be Bilingual. First show the correct English answer/sentence, then a new line with the Chinese translation.
         - 'mistakeAnalysis': Explain in Chinese (to explain grammar/vocab) but quote English parts naturally.
      - If the subject is NOT 'English': 
         - Output 'correctSolution' and 'mistakeAnalysis' in Simplified Chinese.
      - 'coreConcept' and 'encouragement' must ALWAYS be in Simplified Chinese.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { inlineData: { mimeType, data: base64Image } },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text) as AnalysisResult;
  } catch (error) {
    console.error("Analysis Error:", error);
    throw error;
  }
}

export async function generatePracticeQuestions(concept: string, subject: string): Promise<PracticeQuestion[]> {
  try {
    const isEnglishSubject = subject.toLowerCase().includes('english') || subject.includes('英语');
    
    let prompt = "";
    
    if (isEnglishSubject) {
      prompt = `
        The student made a mistake in the concept: "${concept}" (Subject: English).
        Generate 3 multiple-choice practice questions to reinforce this English concept.
        
        RULES:
        1. The 'question' and 'options' and 'correctAnswer' MUST be in ENGLISH.
        2. The 'explanation' MUST be in SIMPLIFIED CHINESE (to help the student understand).
        3. Make the questions suitable for a middle school level.
      `;
    } else {
      prompt = `
        Based on the concept: "${concept}" (Subject: ${subject}), generate 3 similar multiple-choice practice questions for a middle school student.
        The questions should help reinforce the correct understanding of the concept.
        
        RULES:
        1. All fields (question, options, explanation) MUST be in Simplified Chinese.
        2. Make them fun or slightly creative!
      `;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });

    if (!response.text) throw new Error("No response from AI");
    return JSON.parse(response.text) as PracticeQuestion[];
  } catch (error) {
    console.error("Quiz Gen Error:", error);
    throw error;
  }
}