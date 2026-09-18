import React, { useState } from 'react';
import { SubjectMeta, SubjectId, DifficultyLevel, UserProfile } from '../types';
import { SUBJECTS_DATA } from '../data/curriculum';
import { getRankTitle } from '../utils/storage';
import { MascotOlli } from './MascotOlli';
import { Lock, Play, Sparkles, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { sound } from '../utils/sound';

interface SubjectsViewProps {
  profile: UserProfile;
  onSelectLesson: (subject: SubjectMeta, level: DifficultyLevel, lessonNumber: number) => void;
  onOpenPremiumModal: () => void;
  onOpenParentCabinet: () => void;
}

export const SubjectsView: React.FC<SubjectsViewProps> = ({
  profile,
  onSelectLesson,
  onOpenPremiumModal,
  onOpenParentCabinet,
}) => {
  const [selectedSubjectId, setSelectedSubjectId] = useState<SubjectId>('math');
  const rank = getRankTitle(profile.total_stars);

  const selectedSubject = SUBJECTS_DATA.find((s) => s.id === selectedSubjectId) || SUBJECTS_DATA[0];

  const handleLevelClick = (subject: SubjectMeta, level: DifficultyLevel, isLocked: boolean) => {
    if (isLocked && !profile.is_premium) {
      sound.playSoftPop();
      onOpenPremiumModal();
      return;
    }
    sound.playCorrect();
    onSelectLesson(subject, level, level === 'easy' ? 1 : level === 'medium' ? 2 : 3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner with Olli encouraging message */}
      <div className="bg-linear-to-r from-amber-100 via-orange-100 to-amber-50 rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <MascotOlli
            size="md"
            accessory={profile.equipped_accessory}
            animateBounce={true}
          />
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/70 text-amber-950 rounded-full text-xs font-black mb-1">
              <span>{rank.badge}</span>
              <span>{rank.title} darajasi</span>
              <span className="opacity-60">• {profile.total_stars} / {rank.next} ⭐️</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
              Qani, bugun qaysi fanni zabt etamiz, {profile.name}? 🚀
            </h2>
            <p className="text-sm font-medium text-slate-600">
              Har bir darsda: 1) Diqqat o'yini 🎯 2) Mnemonika siri 🧠 3) Qiziqarli test 💡
            </p>
          </div>
        </div>

        {/* Quick Parent Portal Entry Card (spec: kichik ikonka bilan) */}
        <button
          onClick={onOpenParentCabinet}
          id="btn-parent-quick-card"
          className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-indigo-50 border-2 border-indigo-200 rounded-2xl shadow-xs transition hover:scale-105 cursor-pointer text-indigo-900 font-bold text-xs sm:text-sm"
        >
          <span className="text-xl">👨‍👩‍👧</span>
          <div className="text-left">
            <div className="text-[10px] text-indigo-500 uppercase tracking-wider font-extrabold">Ota-onalar</div>
            <div>Tahlil & Natijalar</div>
          </div>
          <ChevronRight className="w-4 h-4 text-indigo-400" />
        </button>
      </div>

      {/* 5 Subject Selector Pills / Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
        {SUBJECTS_DATA.map((subject) => {
          const isSelected = subject.id === selectedSubjectId;
          return (
            <button
              key={subject.id}
              id={`tab-sub-${subject.id}`}
              onClick={() => {
                sound.playFlip();
                setSelectedSubjectId(subject.id);
              }}
              className={`p-3.5 sm:p-4 rounded-3xl border-3 text-left transition flex flex-col items-center sm:items-start justify-between cursor-pointer ${
                isSelected
                  ? 'bg-white border-amber-400 shadow-lg scale-102 ring-4 ring-amber-100'
                  : 'bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-3xl sm:text-4xl">{subject.icon}</span>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                )}
              </div>
              <div>
                <h3 className="font-black text-slate-800 text-sm sm:text-base leading-tight">
                  {subject.uzbekName}
                </h3>
                <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline">
                  3 ta daraja
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Subject Detail & Lessons Grid */}
      <motion.div
        key={selectedSubject.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-200 shadow-xl"
      >
        {/* Subject Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100">
          <div className="flex items-center gap-3.5">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-4xl shadow-inner">
              {selectedSubject.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                  {selectedSubject.uzbekName}
                </h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                  {profile.grade}-sinf dasturi
                </span>
              </div>
              <p className="text-sm font-medium text-slate-600 mt-0.5">
                {selectedSubject.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
              10 ta mnemonika kartasi + 10 ta test
            </span>
          </div>
        </div>

        {/* 3 Difficulty Levels */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* 1-Daraja (Oson - Bepul) */}
          <div className="bg-linear-to-b from-emerald-50/70 to-teal-50/30 rounded-3xl p-5 border-3 border-emerald-300 shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                  1-Daraja • Oson
                </span>
                <span className="text-xs font-extrabold text-emerald-700 bg-white px-2 py-0.5 rounded-lg shadow-2xs">
                  Bepul ochiq ✅
                </span>
              </div>

              <h4 className="text-lg font-black text-slate-800 mb-1">
                {selectedSubject.lessons[0]?.title || "Boshlang'ich dars"}
              </h4>
              <p className="text-xs font-medium text-slate-600 mb-4">
                {selectedSubject.lessons[0]?.description || "Asosiy qoidalar va eslab qolish mnemonikalari"}
              </p>

              <div className="space-y-1.5 text-xs text-slate-700 font-semibold mb-6">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Diqqat o'yini ("{selectedSubject.lessons[0]?.targetEmoji}" ni tut)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>10 ta 3D mnemonika kartochkasi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>10 ta quvnoq test savoli</span>
                </div>
              </div>
            </div>

            <button
              id={`btn-play-${selectedSubject.id}-easy`}
              onClick={() => handleLevelClick(selectedSubject, 'easy', false)}
              className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm rounded-2xl shadow-md shadow-emerald-200 hover:shadow-emerald-300 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Darsni boshlash</span>
            </button>
          </div>

          {/* 2-Daraja (O'rta - Premium) */}
          <div
            className={`rounded-3xl p-5 border-3 shadow-sm flex flex-col justify-between transition ${
              profile.is_premium
                ? 'bg-linear-to-b from-blue-50/70 to-indigo-50/30 border-blue-300'
                : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-blue-800 bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
                  2-Daraja • O'rta
                </span>
                {profile.is_premium ? (
                  <span className="text-xs font-extrabold text-blue-700 bg-white px-2 py-0.5 rounded-lg shadow-2xs">
                    Ochiq 🔓
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-lg border border-amber-300">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>

              <h4 className="text-lg font-black text-slate-800 mb-1">
                {selectedSubject.lessons[1]?.title || "2-Dars: Chuqurlashtirilgan bilim"}
              </h4>
              <p className="text-xs font-medium text-slate-600 mb-4">
                {selectedSubject.lessons[1]?.description || "Murakkabroq topshiriqlar va yangi qoidalar"}
              </p>

              <div className="space-y-1.5 text-xs text-slate-600 font-semibold mb-6">
                <div className="flex items-center gap-1.5">
                  <span>🎯</span>
                  <span>Tezkorlik oshirilgan reaksiya mashqi</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>🧠</span>
                  <span>Ilmiy va qiziqarli assotsiatsiyalar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>⭐</span>
                  <span>Ikki barobar ko'proq tanga mukofoti</span>
                </div>
              </div>
            </div>

            <button
              id={`btn-play-${selectedSubject.id}-medium`}
              onClick={() => handleLevelClick(selectedSubject, 'medium', !profile.is_premium)}
              className={`w-full py-3 px-4 font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                profile.is_premium
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                  : 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-amber-200'
              }`}
            >
              {profile.is_premium ? (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Darsni boshlash</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Premium'da ochish</span>
                </>
              )}
            </button>
          </div>

          {/* 3-Daraja (Qiyin - Premium) */}
          <div
            className={`rounded-3xl p-5 border-3 shadow-sm flex flex-col justify-between transition ${
              profile.is_premium
                ? 'bg-linear-to-b from-purple-50/70 to-pink-50/30 border-purple-300'
                : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
                  3-Daraja • Qiyin
                </span>
                {profile.is_premium ? (
                  <span className="text-xs font-extrabold text-purple-700 bg-white px-2 py-0.5 rounded-lg shadow-2xs">
                    Ochiq 🔓
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-900 bg-amber-200 px-2 py-0.5 rounded-lg border border-amber-300">
                    <Lock className="w-3 h-3" /> Premium
                  </span>
                )}
              </div>

              <h4 className="text-lg font-black text-slate-800 mb-1">
                {selectedSubject.lessons[2]?.title || "3-Dars: Ustozlar bellashuvi"}
              </h4>
              <p className="text-xs font-medium text-slate-600 mb-4">
                {selectedSubject.lessons[2]?.description || "Olimpiada savollari va mantiqiy jumboqlar"}
              </p>

              <div className="space-y-1.5 text-xs text-slate-600 font-semibold mb-6">
                <div className="flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>Maksimal diqqat va chaqqonlik</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>👑</span>
                  <span>'Ustoz' unvoni uchun asosiy ballar</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>💎</span>
                  <span>Maxsus reyting kubogi</span>
                </div>
              </div>
            </div>

            <button
              id={`btn-play-${selectedSubject.id}-hard`}
              onClick={() => handleLevelClick(selectedSubject, 'hard', !profile.is_premium)}
              className={`w-full py-3 px-4 font-black text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer ${
                profile.is_premium
                  ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
                  : 'bg-amber-400 hover:bg-amber-500 text-amber-950 shadow-amber-200'
              }`}
            >
              {profile.is_premium ? (
                <>
                  <Play className="w-4 h-4 fill-white" />
                  <span>Darsni boshlash</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Premium'da ochish</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Freemium notification bar */}
        {!profile.is_premium && (
          <div className="mt-8 p-4 bg-linear-to-r from-amber-100/70 via-orange-100/50 to-yellow-100/70 rounded-2xl border-2 border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-600 shrink-0" />
              <p className="text-xs sm:text-sm font-bold text-amber-950">
                1-daraja barcha fanlarda bepul ochiq! Qolgan darslar, O'rta va Qiyin darajalarni ochish uchun FocusKids Premium'ga o'ting.
              </p>
            </div>
            <button
              onClick={onOpenPremiumModal}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs sm:text-sm font-black rounded-xl shadow transition shrink-0 cursor-pointer"
            >
              Premium imkoniyatlari
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
