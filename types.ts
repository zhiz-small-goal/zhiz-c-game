
export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface UserStats {
  hp: number;
  maxHp: number;
  xp: number;
  level: number;
  gold: number;
  badges: Badge[]; // Collection of cosmetic items
}

export type DifficultyLevel = 'EASY' | 'NORMAL' | 'HARD';

export interface TopicNode {
  id: string;
  title: string;
  description: string;
  region: 'Plains' | 'Forest' | 'Fortress' | 'Peaks' | 'Void';
  completed: boolean;
  locked: boolean;
  x: number; // For visual positioning if needed, or grid index
  y: number;
}

export type ChallengeType = 'multiple-choice' | 'code-fix' | 'concept';

export interface QuestChallenge {
  question: string;
  type: ChallengeType;
  options?: string[]; // For multiple choice
  codeSnippet?: string; // For code analysis/fix
  correctAnswer: string; // The "key" or expected output
}

export interface QuestContent {
  title: string;
  storyContext: string; // The RPG flavor text
  lessonContent: string; // The actual C++ theory
  challenge: QuestChallenge;
  hint: string; // A helper tip that costs gold
  sources?: { title: string; uri: string }[]; // Google Search sources
}

// New interface for static data storage (one topic -> multiple potential challenges)
export interface StaticQuestData extends Omit<QuestContent, 'challenge'> {
  challenges: QuestChallenge[];
}

export type AppScreen = 'MAP' | 'QUEST' | 'VICTORY' | 'DEFEAT';
