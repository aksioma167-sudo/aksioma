import React, { useState, useEffect } from 'react';
import { UserProfile, AttemptLog, AIRoadmapRecord, AIRoadmapData, SubscriptionRecord } from '../types';
import {
  loadAttemptLogs,
  loadAIRoadmap,
  saveAIRoadmap,
  loadSubscription,
  saveSubscription,
  saveProfile,
  fireConfetti,
} from '../utils/storage';
import { sound } from '../utils/sound';
import { MascotOlli } from './MascotOlli';
import {
  Sparkles,
  Bot,
  CheckCircle,
  Circle,
  AlertCircle,
  CreditCard,
  RefreshCw,
  TrendingUp,
  Brain,
  Clock,
  ShieldCheck,
  Award,
  ChevronRight,
} from 'lucide-react';

interface ParentCabinetProps {
  profile: UserProfile;
  onUpdateProfile: (updated: UserProfile) => void;
  onOpenPremiumModal: () => void;
  onBackToSubjects: () => void;
}

export const ParentCabinet: React.FC<ParentCabinetProps> = ({
  profile,
  onUpdateProfile,
  onOpenPremiumModal,
  onBackToSubjects,
}) => {
  const [logs, setLogs] = useState<AttemptLog[]>([]);
  const [roadmapRecord, setRoadmapRecord] = useState<AIRoadmapRecord | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionRecord>(loadSubscription(profile.id));
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    setLogs(loadAttemptLogs());
    setRoadmapRecord(loadAIRoadmap(profile.id));
    setSubscription(loadSubscription(profile.id));
  }, [profile.id]);

  // Statistics calculation
  const totalAttempts = logs.length;
  const correctAttempts = logs.filter((l) => l.is_correct).length;
  const accuracy = totalAttempts > 0 ? Math.round((correctAttempts / totalAttempts) * 100) : 100;

  // Mistake distribution analysis
  const mistakeCounts: Record<string, number> = {};
  logs
    .filter((l) => !l.is_correct && l.mistake_type)
    .forEach((l) => {
      const type = l.mistake_type || 'Boshqa';
      mistakeCounts[type] = (mistakeCounts[type] || 0) + 1;
    });

  // Trigger AI Analysis
  const handleRunAIAnalysis = async () => {
    if (!profile.is_premium && profile.ai_free_uses_left <= 0) {
      sound.playSoftPop();
      onOpenPremiumModal();
      return;
    }

    setIsLoadingAI(true);
    setAiError(null);
    sound.playFlip();

    try {
      const res = await fetch('/api/ai-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          player_name: profile.name,
          grade: profile.grade,
          attempt_logs: logs,
        }),
      });

      const data = await res.json();

      if (data.success && data.data) {
        const newRecord: AIRoadmapRecord = {
          player_id: profile.id,
          roadmap_json: data.data as AIRoadmapData,
          generated_at: new Date().toLocaleDateString('uz-UZ', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        saveAIRoadmap(newRecord);
        setRoadmapRecord(newRecord);

        // Deduct free use if not premium
        if (!profile.is_premium) {
          const updatedProfile = {
            ...profile,
            ai_free_uses_left: Math.max(0, profile.ai_free_uses_left - 1),
          };
          saveProfile(updatedProfile);
          onUpdateProfile(updatedProfile);
        }

        sound.playVictory();
        fireConfetti();
      } else {
        throw new Error(data.error || "Tahlilni yuklashda xatolik yuz berdi");
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Tahlil serveriga ulanib bo'lmadi");
      sound.playSoftPop();
    } finally {
      setIsLoadingAI(false);
    }
  };

  // Toggle checklist step completed
  const handleToggleStep = (stepId: string) => {
    if (!roadmapRecord) return;
    const updatedSteps = roadmapRecord.roadmap_json.roadmap.map((step) => {
      if (step.id === stepId) {
        return { ...step, completed: !step.completed };
      }
      return step;
    });

    const updatedRecord: AIRoadmapRecord = {
      ...roadmapRecord,
      roadmap_json: {
        ...roadmapRecord.roadmap_json,
        roadmap: updatedSteps,
      },
    };

    sound.playCorrect();
    saveAIRoadmap(updatedRecord);
    setRoadmapRecord(updatedRecord);
  };

  // Subscription cancel or renew simulation
  const handleToggleSubscription = () => {
    if (profile.is_premium) {
      // Cancel
      const updatedSub: SubscriptionRecord = {
        ...subscription,
        status: 'canceled',
      };
      saveSubscription(updatedSub);
      setSubscription(updatedSub);

      const updatedProf: UserProfile = {
        ...profile,
        is_premium: false,
      };
      saveProfile(updatedProf);
      onUpdateProfile(updatedProf);
      sound.playSoftPop();
    } else {
      // Open Stripe payment modal
      onOpenPremiumModal();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Welcome / Info Header */}
      <div className="bg-linear-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/30 border border-indigo-400 flex items-center justify-center text-4xl shrink-0">
            👨‍👩‍👧
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-indigo-500/40 text-indigo-200 rounded-full text-xs font-bold mb-1.5">
              <span>PIN-kod so'ralmaydi</span> • <span>To'g'ridan-to'g'ri ochiq</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ota-onalar Nazorati va Tahlil Kabineti
            </h2>
            <p className="text-sm font-medium text-indigo-200 mt-1">
              Farzandingiz <span className="font-bold text-white">{profile.name}</span> ({profile.grade}-sinf) ning rivojlanish ko'rsatkichlari va sun'iy intellekt tavsiyalari.
            </p>
          </div>
        </div>

        <button
          onClick={onBackToSubjects}
          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-2xl border border-white/20 transition cursor-pointer shrink-0"
        >
          Bolalar bo'limiga qaytish
        </button>
      </div>

      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border-2 border-indigo-100 shadow-xs">
          <div className="flex items-center justify-between text-indigo-600 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Aniqlik foizi
            </span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">{accuracy}%</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">
            {correctAttempts} ta to'g'ri / {totalAttempts} ta urinish
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-amber-100 shadow-xs">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              To'plangan yulduzlar
            </span>
            <Award className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-amber-900">⭐ {profile.total_stars}</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">
            Faollik ko'rsatkichi
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-emerald-100 shadow-xs">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Diqqat mashqlari
            </span>
            <Brain className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-emerald-900">100%</div>
          <div className="text-xs font-semibold text-slate-500 mt-1">
            Ijobiy rag'batlantirish tizimi
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border-2 border-purple-100 shadow-xs">
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              AI Tahlil huquqi
            </span>
            <Bot className="w-5 h-5" />
          </div>
          <div className="text-2xl font-black text-purple-900">
            {profile.is_premium ? 'Cheksiz 💎' : `${profile.ai_free_uses_left} ta qoldi`}
          </div>
          <div className="text-xs font-semibold text-slate-500 mt-1">
            {profile.is_premium ? 'Premium a\'zo' : 'Bepul litsenziya'}
          </div>
        </div>
      </div>

      {/* AI ROADMAP SECTION (Specification mandate) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-purple-200 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center text-3xl shadow-inner">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-black text-slate-800">
                  AI Adaptiv Tahlil va Shaxsiy Roadmap
                </h3>
                {profile.is_premium && (
                  <span className="text-xs font-black px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full">
                    Avtomatik & Cheksiz
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-600">
                Ollining aqlli AI tizimi test javoblarini tahlil qilib, 1-2 haftalik rejani tuzadi.
              </p>
            </div>
          </div>

          <button
            id="btn-run-ai-analysis"
            disabled={isLoadingAI}
            onClick={handleRunAIAnalysis}
            className="w-full sm:w-auto px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm rounded-2xl shadow-lg shadow-purple-200 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoadingAI ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI tahlil qilmoqda...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>
                  {roadmapRecord ? 'AI Roadmapni yangilash' : 'AI tahlil qil'}
                  {!profile.is_premium && ` (${profile.ai_free_uses_left} bepul)`}
                </span>
              </>
            )}
          </button>
        </div>

        {aiError && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-2xl text-xs font-bold text-orange-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{aiError}</span>
          </div>
        )}

        {/* Roadmap Content */}
        {roadmapRecord ? (
          <div className="space-y-6">
            {/* "Bolangiz nimada qiynalmoqda" Short Summary (Mandatory Spec) */}
            <div className="p-5 bg-purple-50/70 rounded-2xl border-2 border-purple-200 space-y-2">
              <div className="flex items-center gap-2 text-purple-900 font-black text-base sm:text-lg">
                <span>🧐</span>
                <h4>Bolangiz nimada qiynalmoqda (Qisqa xulosa)</h4>
              </div>
              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                {roadmapRecord.roadmap_json.summary}
              </p>
            </div>

            {/* Strengths & Focus Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-emerald-50/70 rounded-2xl border-2 border-emerald-200">
                <h5 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2 flex items-center gap-1.5">
                  <span>💪</span> Kuchli tomonlari
                </h5>
                <ul className="space-y-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                  {roadmapRecord.roadmap_json.strengths.map((st, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-amber-50/70 rounded-2xl border-2 border-amber-200">
                <h5 className="text-xs font-black uppercase tracking-wider text-amber-800 mb-2 flex items-center gap-1.5">
                  <span>🎯</span> E'tibor qaratish kerak
                </h5>
                <ul className="space-y-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                  {roadmapRecord.roadmap_json.focus_areas.map((fa, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-500 font-bold">•</span>
                      <span>{fa}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Checklist of Recommendations with progress status (Mandatory Spec) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                  <span>📋</span>
                  <span>1-2 Haftalik Shaxsiy Reja (Checklist)</span>
                </h4>
                <span className="text-xs font-semibold text-slate-400">
                  Tugallangan qadamlarni belgilang
                </span>
              </div>

              <div className="space-y-2.5">
                {roadmapRecord.roadmap_json.roadmap.map((step) => (
                  <div
                    key={step.id}
                    onClick={() => handleToggleStep(step.id)}
                    className={`p-4 rounded-2xl border-2 transition flex items-start justify-between gap-3 cursor-pointer ${
                      step.completed
                        ? 'bg-emerald-50/80 border-emerald-300 opacity-90'
                        : 'bg-slate-50/90 border-slate-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button className="mt-0.5 text-xl text-emerald-600 shrink-0">
                        {step.completed ? (
                          <CheckCircle className="w-5 h-5 fill-emerald-500 text-white" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-300" />
                        )}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-black text-sm sm:text-base ${
                              step.completed ? 'line-through text-slate-500' : 'text-slate-800'
                            }`}
                          >
                            {step.title}
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-200/70 text-slate-600 rounded-md">
                            {step.target_time}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-600 mt-1">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parent Mnemonic Tip */}
            {roadmapRecord.roadmap_json.parent_mnemonic_tip && (
              <div className="p-4 bg-linear-to-r from-amber-100/80 to-orange-100/60 rounded-2xl border border-amber-300 flex items-center gap-3">
                <span className="text-2xl shrink-0">💡</span>
                <p className="text-xs sm:text-sm font-bold text-amber-950">
                  {roadmapRecord.roadmap_json.parent_mnemonic_tip}
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Empty state */
          <div className="py-8 text-center max-w-sm mx-auto space-y-3">
            <div className="text-5xl">📊</div>
            <h4 className="font-black text-slate-800 text-lg">
              Hali AI Roadmap yaratilmagan
            </h4>
            <p className="text-xs font-medium text-slate-500">
              Farzandingizning darsdagi natijalarini to'liq tahlil qilish uchun yuqoridagi "AI tahlil qil" tugmasini bosing.
            </p>
          </div>
        )}
      </div>

      {/* STRIPE SUBSCRIPTION MANAGEMENT SECTION */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-slate-200 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center text-3xl">
              <CreditCard className="w-7 h-7 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">
                Obuna va To'lovlar Boshqaruvi (Stripe)
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-500">
                FocusKids Premium litsenziya holati va avtomatik yangilash
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                profile.is_premium
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}
            >
              {profile.is_premium ? 'Premium Faol' : 'Freemium (Bepul)'}
            </span>
          </div>
        </div>

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div>
            <div className="text-sm font-black text-slate-800">
              {profile.is_premium
                ? 'FocusKids Oylik Obuna (Premium)'
                : 'Bepul Boshlang\'ich Reja (1-darslar ochiq)'}
            </div>
            <div className="text-xs font-semibold text-slate-500 mt-1">
              {profile.is_premium
                ? 'Barcha fanlar, O\'rta va Qiyin darajalar hamda cheksiz AI tahlil faollashtirilgan.'
                : 'Keyingi darslar va chuqurlashtirilgan AI xaritasi yopiq.'}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {profile.is_premium ? (
              <button
                onClick={handleToggleSubscription}
                className="w-full md:w-auto px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-xs rounded-xl transition cursor-pointer"
              >
                Obunani bekor qilish
              </button>
            ) : (
              <button
                onClick={onOpenPremiumModal}
                className="w-full md:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer"
              >
                Premium'ga o'tish (Stripe)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
