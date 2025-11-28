
import { GoogleGenAI, Type } from "@google/genai";
import { QuestContent, DifficultyLevel } from '../types';
import { DIFFICULTY_SETTINGS } from '../constants';
import { STATIC_QUESTS } from '../data/staticQuests';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const QUEST_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    storyContext: { type: Type.STRING, description: "A very cute, fairy-tale intro (2-3 sentences) relating the C++ concept to magic, baking, or gardening. Suitable for an 8-year-old girl. In Chinese." },
    lessonContent: { type: Type.STRING, description: "Detailed, structured C++ explanation in Chinese. Must include 3 sections: 【魔法小故事】, 【咒语说明书】 (Syntax), and 【神奇栗子】 (Code with line-by-line comments). Use analogies." },
    hint: { type: Type.STRING, description: "A gentle whisper of advice in Chinese." },
    challenge: {
      type: Type.OBJECT,
      properties: {
        question: { type: Type.STRING, description: "The quiz question in Chinese." },
        type: { type: Type.STRING, enum: ['multiple-choice', 'code-fix', 'concept'] },
        options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "4 options if multiple-choice. Null otherwise." },
        codeSnippet: { type: Type.STRING, description: "Simple C++ code context." },
        correctAnswer: { type: Type.STRING, description: "The correct answer." }
      },
      required: ['question', 'type', 'correctAnswer']
    }
  },
  required: ['title', 'storyContext', 'lessonContent', 'challenge', 'hint']
};

export const generateQuest = async (nodeId: string, topicTitle: string, userLevel: number, difficulty: DifficultyLevel = 'NORMAL'): Promise<QuestContent> => {
  
  // 1. Check if we have built-in content for this node
  if (STATIC_QUESTS[nodeId]) {
    const staticData = STATIC_QUESTS[nodeId];
    
    // Safety check: Ensure challenges array exists and is not empty
    if (staticData.challenges && staticData.challenges.length > 0) {
        // Simulate a short network delay for realism, or return immediately
        return new Promise(resolve => {
            setTimeout(() => {
                // Randomly select one challenge from the pool
                const randomChallenge = staticData.challenges[Math.floor(Math.random() * staticData.challenges.length)];
                
                resolve({
                    title: staticData.title,
                    storyContext: staticData.storyContext,
                    lessonContent: staticData.lessonContent,
                    hint: staticData.hint,
                    sources: staticData.sources,
                    challenge: randomChallenge // Map single selected challenge to the interface
                });
            }, 300);
        });
    } else {
        console.warn(`Static quest found for ${nodeId} but has no challenges. Falling back to AI.`);
    }
  }

  // 2. Fallback to Gemini AI if no static content exists (or it's empty)
  const model = "gemini-2.5-flash";
  const difficultyConfig = DIFFICULTY_SETTINGS[difficulty];
  
  const prompt = `
    你是一只温柔可爱的“魔法兔兔导师”。
    请为一名 8 岁的小女孩设计一个有趣的 C++ 学习任务。
    
    任务主题： "${topicTitle}"。
    难度：${difficulty}。
    ${difficultyConfig.promptMod}
    
    要求：
    1. **搜索验证**：请利用 Google 搜索确保你提供的 C++ 知识是准确的、符合现代标准的。
    2. **语言**：中文（简体）。语气要超级超级可爱，多用“哦”、“呢”、“呀”。
    3. **结构**：
       - **【魔法小故事】**：用比喻（糖果、玩偶）引入概念。
       - **【咒语说明书】**：简单解释语法。
       - **【神奇栗子】**：展示代码，每行都要有可爱的注释。
    4. **StoryContext**：简短的剧情引入。
    5. **题目**：根据难度设计，确保不仅有趣还能学到知识。
    6. **CRITICAL**: If the challenge refers to specific code, you MUST provide it in the 'codeSnippet' field.

    **CRITICAL OUTPUT INSTRUCTION:**
    You MUST return the result as a raw valid JSON object. 
    Do not use Markdown formatting (no \`\`\`json blocks).
    The JSON object must strictly adhere to this schema:
    ${JSON.stringify(QUEST_SCHEMA, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }], // Enable Search Grounding
        // IMPORTANT: When using tools, we CANNOT use responseMimeType: "application/json"
        // We must rely on the prompt to enforce JSON structure.
        temperature: 0.5, 
      }
    });

    let text = response.text;
    if (!text) throw new Error("Bunny is sleeping.");
    
    // Clean up any Markdown formatting if the model adds it despite instructions
    text = text.replace(/^```json\s*/, '').replace(/\s*```$/, '').trim();
    
    const questData = JSON.parse(text) as QuestContent;

    // Extract Grounding Sources
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .map(c => c.web ? { title: c.web.title || '魔法图书馆', uri: c.web.uri } : null)
      .filter((s): s is { title: string; uri: string } => s !== null);

    return { ...questData, sources };

  } catch (error) {
    console.error("Bunny API Error:", error);
    return {
      title: "兔兔打了个盹",
      storyContext: "魔法讯号有时候会卡住呢，没关系，我们休息一下！",
      lessonContent: "请检查网络或者 API Key 哦。",
      hint: "再试一次看看？",
      challenge: {
        question: "我们现在该怎么办？",
        type: "multiple-choice",
        options: ["再试一次", "哭哭", "生气", "发呆"],
        correctAnswer: "再试一次"
      }
    };
  }
};

export const evaluateAnswer = async (quest: QuestContent, userAnswer: string): Promise<{ isCorrect: boolean; feedback: string; compilerError?: string }> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    你是一只超级温柔的C++魔法兔兔老师。
    
    【任务信息】
    题目: "${quest.challenge.question}"
    题目类型: "${quest.challenge.type}"
    参考代码/答案: "${quest.challenge.correctAnswer}"
    小朋友的回答: "${userAnswer}"
    
    【判分要求】
    1. 判断小朋友回答是否正确。如果代码逻辑正确但格式稍微不同，也算对。
    2. **如果错了，绝对不要给枯燥的报错！**
       - 语气要鼓励，像"哎呀，好像差一点点呢"。
       - 必须指出具体错在哪里。例如："咒语末尾是不是少了一个分号 ';' 呀？" 或者 "变量名写错啦"。
       - 不要直接给答案，给一个明显的提示。
    
    【返回格式】
    JSON对象 (不要Markdown):
    {
      "isCorrect": boolean,
      "feedback": "中文简体的反馈语，如果是错误的，请包含具体的修改建议。",
      "compilerError": "如果是代码题且有明显的语法错误（如漏分号、拼写错误），请在这里模拟一个可爱的编译器报错（例如：'Line 2: 找不到这个变量哦'）。如果没有语法错误，留空。"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
         responseSchema: {
          type: Type.OBJECT,
          properties: {
            isCorrect: { type: Type.BOOLEAN },
            feedback: { type: Type.STRING },
            compilerError: { type: Type.STRING }
          },
          required: ['isCorrect', 'feedback']
        }
      }
    });

    const text = response.text;
    return text ? JSON.parse(text) : { isCorrect: false, feedback: "兔兔在思考..." };
  } catch (e) {
    // Robust Fallback Evaluation Logic
    // If AI fails, use a logic-aware string comparison
    
    const normalize = (str: string) => {
        // 1. Remove comments (both // and /* */)
        const noComments = str.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '');
        // 2. Split by lines to preserve structure logic if needed, but mostly we just want tokens
        // 3. Join back with single space and trim
        return noComments.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join(' ')
            .replace(/\s+/g, ' '); // Standardize multiple spaces to one
    };

    const normUser = normalize(userAnswer);
    const normCorrect = normalize(quest.challenge.correctAnswer);
    
    // For simple multiple choice, exact match or index match
    let isCorrect = normUser === normCorrect;
    
    // If it's code-fix, allow simple space variation but require exact token sequence
    if (quest.challenge.type === 'code-fix') {
         isCorrect = normUser.includes(normCorrect) || normCorrect.includes(normUser);
         // Extremely basic check: length difference shouldn't be too big
         if (Math.abs(normUser.length - normCorrect.length) > 20) isCorrect = false;
    }

    return {
      isCorrect,
      feedback: isCorrect ? "哇！太棒了！答对了呢！（备用裁判判定）" : "哎呀，好像有点小问题，再仔细检查一下？（备用裁判判定）",
      compilerError: isCorrect ? undefined : "魔法能量波动，无法精确编译..."
    };
  }
};
