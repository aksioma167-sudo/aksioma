export type Grade = 2 | 3 | 4;

export type SubjectId = 'math' | 'reading' | 'native' | 'english' | 'russian';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface UserProfile {
  id: string;
  name: string;
  grade: Grade;
  total_stars: number;
  coins: number;
  is_premium: boolean;
  ai_free_uses_left: number;
  equipped_accessory?: string;
  created_at: string;
}

export interface SubjectProgress {
  player_id: string;
  subject_id: SubjectId;
  difficulty_level: DifficultyLevel;
  stage: 'attention' | 'mnemonic' | 'quiz' | 'completed';
  current_index: number;
  session_stars: number;
  quiz_correct_count: number;
  updated_at: string;
}

export interface LeaderboardEntry {
  player_id: string;
  player_name: string;
  stars: number;
  avatar_icon: string;
  title: string;
  updated_at: string;
}

export interface AttemptLog {
  id: string;
  player_id: string;
  subject_id: SubjectId;
  question_id: string;
  is_correct: boolean;
  mistake_type?: string;
  created_at: string;
}

export interface AIRoadmapStep {
  id: string;
  title: string;
  target_time: string;
  description: string;
  completed: boolean;
}

export interface AIRoadmapData {
  summary: string;
  strengths: string[];
  focus_areas: string[];
  roadmap: AIRoadmapStep[];
  parent_mnemonic_tip: string;
}

export interface AIRoadmapRecord {
  player_id: string;
  roadmap_json: AIRoadmapData;
  generated_at: string;
}

export interface SubscriptionRecord {
  player_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: 'active' | 'canceled' | 'trial' | 'none';
  plan: 'monthly' | 'annual';
  current_period_end: string;
}

export interface FlashcardItem {
  id: string;
  title: string;
  concept: string;
  mnemonic: string;
  funFact: string;
  icon: string;
  badge: string;
}

export interface QuizItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  mnemonicTip: string;
  mistakeType: string;
}

export interface LessonContent {
  level: DifficultyLevel;
  lessonNumber: number;
  isLocked: boolean; // Lesson 1 Easy is free, others premium
  title: string;
  description: string;
  targetEmoji: string; // Target for attention game
  distractors: string[];
  cards: FlashcardItem[];
  quizzes: QuizItem[];
}

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  uzbekName: string;
  icon: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  description: string;
  lessons: LessonContent[];
}

export interface ShopItem {
  id: string;
  name: string;
  emoji: string;
  type: 'hat' | 'glasses' | 'badge' | 'theme';
  price: number;
  isPremiumOnly: boolean;
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
  progressText: string;
}
