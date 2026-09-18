import confetti from 'canvas-confetti';
import {
  UserProfile,
  SubjectProgress,
  LeaderboardEntry,
  AttemptLog,
  AIRoadmapRecord,
  SubscriptionRecord,
  SubjectId,
  DifficultyLevel,
} from '../types';
import { INITIAL_LEADERBOARD } from '../data/curriculum';

const KEYS = {
  PROFILE: 'focuskids_profile',
  PROGRESS: 'focuskids_subject_progress',
  LEADERBOARD: 'focuskids_leaderboard',
  LOGS: 'focuskids_attempt_logs',
  ROADMAPS: 'focuskids_ai_roadmaps',
  SUBSCRIPTION: 'focuskids_subscription',
  PURCHASES: 'focuskids_purchases',
};

export function getRankTitle(stars: number): { title: string; badge: string; min: number; next: number } {
  if (stars >= 150) {
    return { title: 'Ustoz', badge: '👑', min: 150, next: 300 };
  } else if (stars >= 51) {
    return { title: 'Bilimdon', badge: '🧠', min: 51, next: 150 };
  }
  return { title: 'Boshlang\'ich', badge: '🌱', min: 0, next: 50 };
}

export function fireConfetti() {
  try {
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'],
    });
  } catch {
    // fallback
  }
}

export function loadProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(KEYS.PROFILE);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(KEYS.PROFILE, JSON.stringify(profile));
}

export function createProfile(name: string, grade: 2 | 3 | 4): UserProfile {
  const newProfile: UserProfile = {
    id: 'pk_' + Math.random().toString(36).substring(2, 9),
    name: name.trim() || 'Yosh Bilimdon',
    grade,
    total_stars: 10, // Initial welcome bonus stars!
    coins: 25, // Initial welcome bonus coins!
    is_premium: false,
    ai_free_uses_left: 3,
    created_at: new Date().toISOString(),
  };
  saveProfile(newProfile);
  return newProfile;
}

export function loadAttemptLogs(): AttemptLog[] {
  try {
    const raw = localStorage.getItem(KEYS.LOGS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function logAttempt(
  playerId: string,
  subjectId: SubjectId,
  questionId: string,
  isCorrect: boolean,
  mistakeType?: string
): AttemptLog {
  const logs = loadAttemptLogs();
  const newLog: AttemptLog = {
    id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    player_id: playerId,
    subject_id: subjectId,
    question_id: questionId,
    is_correct: isCorrect,
    mistake_type: mistakeType,
    created_at: new Date().toISOString(),
  };
  logs.unshift(newLog);
  // Keep last 100 logs
  localStorage.setItem(KEYS.LOGS, JSON.stringify(logs.slice(0, 100)));
  return newLog;
}

export function loadAIRoadmap(playerId: string): AIRoadmapRecord | null {
  try {
    const raw = localStorage.getItem(KEYS.ROADMAPS);
    if (!raw) return null;
    const list: AIRoadmapRecord[] = JSON.parse(raw);
    return list.find((r) => r.player_id === playerId) || null;
  } catch {
    return null;
  }
}

export function saveAIRoadmap(record: AIRoadmapRecord): void {
  try {
    const raw = localStorage.getItem(KEYS.ROADMAPS);
    let list: AIRoadmapRecord[] = raw ? JSON.parse(raw) : [];
    list = list.filter((r) => r.player_id !== record.player_id);
    list.unshift(record);
    localStorage.setItem(KEYS.ROADMAPS, JSON.stringify(list));
  } catch {
    // safe ignore
  }
}

export function loadSubscription(playerId: string): SubscriptionRecord {
  try {
    const raw = localStorage.getItem(KEYS.SUBSCRIPTION);
    if (raw) {
      const sub = JSON.parse(raw);
      if (sub.player_id === playerId) return sub;
    }
  } catch {}
  return {
    player_id: playerId,
    stripe_customer_id: 'cus_' + playerId,
    stripe_subscription_id: '',
    status: 'none',
    plan: 'monthly',
    current_period_end: '',
  };
}

export function saveSubscription(sub: SubscriptionRecord): void {
  localStorage.setItem(KEYS.SUBSCRIPTION, JSON.stringify(sub));
}

export function loadPurchasedItems(): string[] {
  try {
    const raw = localStorage.getItem(KEYS.PURCHASES);
    if (!raw) return ['hat-grad']; // default starter item
    return JSON.parse(raw);
  } catch {
    return ['hat-grad'];
  }
}

export function savePurchasedItems(items: string[]): void {
  localStorage.setItem(KEYS.PURCHASES, JSON.stringify(items));
}

export function loadLeaderboard(currentUser?: UserProfile): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(KEYS.LEADERBOARD);
    let entries: LeaderboardEntry[] = raw ? JSON.parse(raw) : [...INITIAL_LEADERBOARD];

    if (currentUser) {
      const existingIdx = entries.findIndex((e) => e.player_id === currentUser.id);
      const userRank = getRankTitle(currentUser.total_stars);
      const userEntry: LeaderboardEntry = {
        player_id: currentUser.id,
        player_name: `${currentUser.name} (${currentUser.grade}-sinf)`,
        stars: currentUser.total_stars,
        avatar_icon: currentUser.equipped_accessory === 'hat-crown' ? '👑' : '🦉',
        title: `${userRank.title} ${userRank.badge}`,
        updated_at: 'Hozir',
      };

      if (existingIdx >= 0) {
        entries[existingIdx] = userEntry;
      } else {
        entries.push(userEntry);
      }
    }

    // Sort descending by stars
    entries.sort((a, b) => b.stars - a.stars);
    return entries;
  } catch {
    return [...INITIAL_LEADERBOARD];
  }
}
