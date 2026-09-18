import React, { useState, useEffect, useRef } from 'react';
import { SubjectMeta, DifficultyLevel, UserProfile, FlashcardItem, QuizItem } from '../types';
import { sound } from '../utils/sound';
import { fireConfetti, logAttempt } from '../utils/storage';
import { MascotOlli } from './MascotOlli';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Timer,
  Sparkles,
  RotateCw,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Award,
  Crown,
  Share2,
} from 'lucide-react';

interface LessonPlayerProps {
  subject: SubjectMeta;
  level: DifficultyLevel;
  lessonNumber: number;
  profile: UserProfile;
  onBack: () => void;
  onCompleteLesson: (earnedStars: number, earnedCoins: number) => void;
  onOpenPremiumModal: () => void;
}

type Stage = 'attention' | 'mnemonic' | 'quiz' | 'completed';

export const LessonPlayer: React.FC<LessonPlayerProps> = ({
  subject,
  level,
  lessonNumber,
  profile,
  onBack,
  onCompleteLesson,
  onOpenPremiumModal,
}) => {
  const [stage, setStage] = useState<Stage>('attention');

  // Attention Game State
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [attentionScore, setAttentionScore] = useState(0);
  const [itemsGrid, setItemsGrid] = useState<{ id: number; emoji: string; isTarget: boolean; x: number; y: number }[]>([]);
  const [hitFeedback, setHitFeedback] = useState<{ x: number; y: number; text: string; id: number } | null>(null);

  // Mnemonic Cards State
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Quiz State
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctQuizCount, setCorrectQuizCount] = useState(0);

  const lessonData = subject.lessons[0]; // Active lesson content
  const cards = lessonData?.cards || [];
  const quizzes = lessonData?.quizzes || [];

  const targetEmoji = lessonData?.targetEmoji || '⭐';
  const distractors = lessonData?.distractors || ['🍎', '⚽', '🚗', '🎈'];

  // Game timer
  useEffect(() => {
    if (stage !== 'attention' || !gameStarted) return;

    if (timeLeft <= 0) {
      sound.playVictory();
      fireConfetti();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [stage, gameStarted, timeLeft]);

  // Spawn random target & distractor items on grid
  useEffect(() => {
    if (stage !== 'attention' || !gameStarted || timeLeft <= 0) return;

    const spawnInterval = setInterval(() => {
      const count = level === 'hard' ? 9 : level === 'medium' ? 7 : 6;
      const newItems = Array.from({ length: count }, (_, i) => {
        const isTarget = Math.random() < 0.45; // 45% chance target
        const emoji = isTarget ? targetEmoji : distractors[Math.floor(Math.random() * distractors.length)];
        return {
          id: Date.now() + i,
          emoji,
          isTarget,
          x: Math.floor(Math.random() * 80) + 10,
          y: Math.floor(Math.random() * 70) + 15,
        };
      });
      setItemsGrid(newItems);
    }, level === 'hard' ? 1100 : level === 'medium' ? 1300 : 1600);

    return () => clearInterval(spawnInterval);
  }, [stage, gameStarted, timeLeft, level, targetEmoji, distractors]);

  // Click handler for attention game
  const handleItemClick = (item: { id: number; emoji: string; isTarget: boolean }, e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (item.isTarget) {
      sound.playCorrect();
      setAttentionScore((prev) => prev + 1);
      setHitFeedback({ x, y, text: '+1 ⭐️', id: Date.now() });
      // remove clicked item
      setItemsGrid((prev) => prev.filter((it) => it.id !== item.id));
    } else {
      // Prompt requirement: "noto'g'ri bosilganda jarima yo'q (faqat neytral tovush, 'xato' so'zi ishlatilmaydi)"
      sound.playSoftPop();
      setHitFeedback({ x, y, text: 'Diqqat! 🦉', id: Date.now() });
    }
  };

  // Move from Attention Game to Mnemonic Flashcards
  const handleProceedToMnemonic = () => {
    sound.playCorrect();
    setStage('mnemonic');
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  // Flip 3D Card
  const toggleFlip = () => {
    sound.playFlip();
    setIsFlipped(!isFlipped);
  };

  // Quiz Answer Submit
  const handleSelectQuizOption = (optionIndex: number) => {
    if (selectedOption !== null) return; // already selected

    const currentQuiz = quizzes[currentQuizIndex];
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === currentQuiz.correctIndex;

    // Log attempt to Lovable Cloud attempt_logs table
    logAttempt(profile.id, subject.id, currentQuiz.id, isCorrect, currentQuiz.mistakeType);

    if (isCorrect) {
      sound.playCorrect();
      setCorrectQuizCount((prev) => prev + 1);
    } else {
      sound.playSoftPop(); // Neutral sound, no buzzer, no "xato"
    }

    setShowExplanation(true);
  };

  const handleNextQuizQuestion = () => {
    sound.playFlip();
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      // Completed full quiz!
      sound.playVictory();
      fireConfetti();
      setStage('completed');
      const earnedStars = attentionScore + correctQuizCount * 2;
      const earnedCoins = 15 + correctQuizCount * 3;
      onCompleteLesson(earnedStars, earnedCoins);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Top Header / Exit Bar */}
      <div className="flex items-center justify-between gap-3 mb-6 bg-white/80 backdrop-blur-sm p-3.5 rounded-3xl border-2 border-amber-200 shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-bold transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Fanlarga qaytish</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xl">{subject.icon}</span>
          <span className="text-sm sm:text-base font-black text-slate-800">
            {subject.uzbekName} • {level === 'easy' ? '1-Daraja (Oson)' : level === 'medium' ? '2-Daraja (O\'rta)' : '3-Daraja (Qiyin)'}
          </span>
        </div>

        {/* Stage progress badges */}
        <div className="flex items-center gap-1">
          <span
            className={`w-3 h-3 rounded-full ${
              stage === 'attention' ? 'bg-amber-500 ring-4 ring-amber-200' : 'bg-emerald-500'
            }`}
          />
          <span
            className={`w-3 h-3 rounded-full ${
              stage === 'mnemonic'
                ? 'bg-amber-500 ring-4 ring-amber-200'
                : stage === 'quiz' || stage === 'completed'
                ? 'bg-emerald-500'
                : 'bg-slate-200'
            }`}
          />
          <span
            className={`w-3 h-3 rounded-full ${
              stage === 'quiz'
                ? 'bg-amber-500 ring-4 ring-amber-200'
                : stage === 'completed'
                ? 'bg-emerald-500'
                : 'bg-slate-200'
            }`}
          />
        </div>
      </div>

      {/* STAGE 1: DIQQAT MASHQI ("Kartochkalarni tut") */}
      {stage === 'attention' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl text-center relative overflow-hidden">
          {!gameStarted ? (
            <div className="py-8 max-w-md mx-auto space-y-6">
              <MascotOlli
                size="lg"
                speechText={`Diqqatli bo'l! Faqat ${targetEmoji} nishonini tut, boshqalariga teginma!`}
                animateBounce={true}
              />

              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800">
                  Diqqat Mashqi: "Kartochkalarni tut" 🎯
                </h2>
                <p className="text-slate-600 text-sm font-medium mt-2">
                  15 soniya davomida ekranda paydo bo'ladigan nishon obyektni tutishing kerak. Qani, tezligingni sinab ko'ramiz!
                </p>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-200 flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-500">Nishon (BOSISH KERAK)</div>
                  <div className="text-4xl mt-1 animate-bounce">{targetEmoji}</div>
                </div>
                <div className="text-2xl font-bold text-slate-300">vs</div>
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-500">Chalg'ituvchilar (TEGINMA)</div>
                  <div className="text-2xl mt-1 space-x-1 opacity-70">
                    {distractors.slice(0, 3).map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>

              <button
                id="btn-start-attention-game"
                onClick={() => {
                  sound.playCorrect();
                  setGameStarted(true);
                  setTimeLeft(15);
                  setAttentionScore(0);
                }}
                className="w-full py-4 px-6 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-amber-300 active:scale-95 transition cursor-pointer"
              >
                Mashqni boshlash! 🚀
              </button>
            </div>
          ) : timeLeft > 0 ? (
            <div>
              {/* Top Countdown Ring & Score */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">Nishon:</span>
                  <span className="text-3xl p-1 bg-amber-100 rounded-xl border border-amber-300">
                    {targetEmoji}
                  </span>
                </div>

                {/* Circular Timer Display */}
                <div className="relative flex items-center justify-center w-16 h-16">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="#FEF3C7"
                      strokeWidth="6"
                      fill="transparent"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="26"
                      stroke="#F59E0B"
                      strokeWidth="6"
                      fill="transparent"
                      strokeDasharray={163.3}
                      strokeDashoffset={163.3 - (163.3 * timeLeft) / 15}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <span className="absolute text-lg font-black text-amber-900">
                    {timeLeft}s
                  </span>
                </div>

                <div className="flex items-center gap-1.5 bg-amber-50 border-2 border-amber-300 px-4 py-2 rounded-2xl font-black text-amber-900 text-lg">
                  <span>⭐</span>
                  <span>{attentionScore}</span>
                  <span className="text-xs font-semibold text-amber-700">tutildi</span>
                </div>
              </div>

              {/* Game Interactive Arena */}
              <div className="relative w-full h-80 sm:h-96 bg-linear-to-b from-amber-50/50 to-orange-50/40 rounded-3xl border-3 border-dashed border-amber-200 overflow-hidden cursor-crosshair">
                {itemsGrid.map((item) => (
                  <motion.button
                    key={item.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    onClick={(e) => handleItemClick(item, e)}
                    style={{ left: `${item.x}%`, top: `${item.y}%` }}
                    className={`absolute text-4xl sm:text-5xl p-2 rounded-2xl transform -translate-x-1/2 -translate-y-1/2 transition active:scale-125 select-none hover:scale-110 cursor-pointer ${
                      item.isTarget ? 'hover:drop-shadow-lg' : 'opacity-85'
                    }`}
                  >
                    {item.emoji}
                  </motion.button>
                ))}

                {hitFeedback && (
                  <motion.div
                    key={hitFeedback.id}
                    initial={{ opacity: 1, y: 0, scale: 0.8 }}
                    animate={{ opacity: 0, y: -40, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    style={{ left: hitFeedback.x, top: hitFeedback.y }}
                    className="absolute pointer-events-none font-black text-lg px-2 py-1 rounded-xl bg-amber-400 text-amber-950 shadow-md"
                  >
                    {hitFeedback.text}
                  </motion.div>
                )}
              </div>

              <p className="text-xs font-semibold text-slate-500 mt-3">
                Chalg'ituvchi emojilarga teginma, faqat {targetEmoji} ni bosing!
              </p>
            </div>
          ) : (
            /* Time Up / Victory Result Screen */
            <div className="py-8 max-w-md mx-auto space-y-6">
              <MascotOlli
                size="lg"
                speechText={`Ajoyib diqqat! Sen ${attentionScore} ta nishonni tutding! 🎉`}
                animateBounce={true}
              />

              <div className="p-6 bg-amber-100/60 rounded-3xl border-2 border-amber-300">
                <h3 className="text-3xl font-black text-amber-950">
                  Barakalla! 🎉
                </h3>
                <p className="text-amber-900 font-bold text-lg mt-1">
                  Sen {attentionScore} ta yulduz tutding!
                </p>
                <div className="mt-3 flex justify-center gap-1 text-2xl">
                  {Array.from({ length: Math.min(attentionScore, 5) }).map((_, i) => (
                    <span key={i} className="animate-bounce" style={{ animationDelay: `${i * 100}ms` }}>
                      ⭐
                    </span>
                  ))}
                </div>
              </div>

              <button
                id="btn-next-to-mnemonic"
                onClick={handleProceedToMnemonic}
                className="w-full py-4 px-6 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-200 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>2-Bosqich: Mnemonika kartalari</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* STAGE 2: MNEMONIKA KARTOCHKASI (3D Flip Card) */}
      {stage === 'mnemonic' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl">
            {/* Stage title & step navigator */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🧠</span>
                <div>
                  <h3 className="text-xl font-black text-slate-800">
                    Ollining 3D Mnemonika Kartochkasi
                  </h3>
                  <p className="text-xs font-semibold text-slate-500">
                    Kartani bosib aylantir va eslab qolish sirini bilib ol!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  {currentCardIndex + 1} / {cards.length} karta
                </span>
              </div>
            </div>

            {/* 3D Flip Card Container */}
            <div className="perspective-1000 w-full max-w-lg mx-auto h-80 sm:h-96 my-4">
              <div
                onClick={toggleFlip}
                className={`relative w-full h-full duration-700 transform-style-3d cursor-pointer transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
              >
                {/* Front Side (Concept) */}
                <div className="absolute inset-0 backface-hidden w-full h-full bg-linear-to-b from-amber-50 to-orange-50 rounded-3xl border-4 border-amber-300 p-6 flex flex-col justify-between items-center text-center shadow-lg hover:border-amber-400 transition">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-xs font-black px-2.5 py-1 bg-amber-200 text-amber-950 rounded-xl">
                      {cards[currentCardIndex]?.badge || 'Qoida'}
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" /> Aylantirish uchun bos
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="text-6xl sm:text-7xl filter drop-shadow-md">
                      {cards[currentCardIndex]?.icon || '✨'}
                    </div>
                    <h4 className="text-2xl sm:text-3xl font-black text-slate-800">
                      {cards[currentCardIndex]?.title}
                    </h4>
                    <p className="text-sm sm:text-base font-semibold text-slate-600 max-w-xs mx-auto">
                      {cards[currentCardIndex]?.concept}
                    </p>
                  </div>

                  <div className="px-4 py-2 bg-amber-200/60 rounded-2xl text-xs font-bold text-amber-950 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-amber-700" />
                    <span>Orqa tomonida sehrli mnemonik qoida bor!</span>
                  </div>
                </div>

                {/* Back Side (Mnemonic Rhyme & Fun Fact) */}
                <div className="absolute inset-0 backface-hidden w-full h-full rotate-y-180 bg-linear-to-b from-emerald-50 to-teal-50 rounded-3xl border-4 border-emerald-300 p-6 flex flex-col justify-between items-center text-center shadow-lg">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-xs font-black px-2.5 py-1 bg-emerald-200 text-emerald-950 rounded-xl">
                      💡 Ollining Mnemonik Siri
                    </span>
                    <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                      <RotateCw className="w-3.5 h-3.5" /> Qaytish
                    </span>
                  </div>

                  <div className="space-y-3 max-w-sm mx-auto">
                    <div className="text-4xl">🦉✨</div>
                    <div className="p-3.5 bg-white/90 rounded-2xl border-2 border-emerald-200 shadow-xs">
                      <p className="text-base sm:text-lg font-black text-emerald-950 leading-snug">
                        "{cards[currentCardIndex]?.mnemonic}"
                      </p>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-slate-600">
                      <span className="font-bold text-slate-700">Qiziqarli fakt: </span>
                      {cards[currentCardIndex]?.funFact}
                    </p>
                  </div>

                  <div className="text-xs font-bold text-emerald-800">
                    Bu qoidani eslab qol, testda asqotadi! 🎯
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
              <button
                disabled={currentCardIndex === 0}
                onClick={() => {
                  sound.playFlip();
                  setCurrentCardIndex((p) => p - 1);
                  setIsFlipped(false);
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 font-bold text-sm transition cursor-pointer"
              >
                Oldingi karta
              </button>

              <button
                onClick={toggleFlip}
                className="px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCw className="w-4 h-4" />
                <span>Kartani ag'darish</span>
              </button>

              {currentCardIndex < cards.length - 1 ? (
                <button
                  onClick={() => {
                    sound.playFlip();
                    setCurrentCardIndex((p) => p + 1);
                    setIsFlipped(false);
                  }}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Keyingi</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  id="btn-start-quiz"
                  onClick={() => {
                    sound.playVictory();
                    setStage('quiz');
                    setCurrentQuizIndex(0);
                    setSelectedOption(null);
                    setShowExplanation(false);
                  }}
                  className="px-6 py-2.5 rounded-2xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm shadow-lg shadow-emerald-200 transition flex items-center gap-2 cursor-pointer animate-bounce"
                >
                  <span>Testga o'tish! 💡</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STAGE 3: TEST BOSQICHI (Multiple Choice Quiz) */}
      {stage === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Savol {currentQuizIndex + 1} / {quizzes.length}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-800">
                Bilimingni sinovdan o'tkaz!
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                To'g'ri: {correctQuizCount} ⭐️
              </span>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-5 bg-amber-50/60 rounded-3xl border-2 border-amber-200 text-center">
            <p className="text-xl sm:text-2xl font-black text-slate-800 leading-snug">
              {quizzes[currentQuizIndex]?.question}
            </p>
          </div>

          {/* 4 Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {quizzes[currentQuizIndex]?.options.map((option, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === quizzes[currentQuizIndex].correctIndex;

              let btnClasses =
                'bg-slate-50 border-2 border-slate-200 hover:border-amber-300 hover:bg-amber-50/50 text-slate-800';

              if (selectedOption !== null) {
                if (isCorrect) {
                  btnClasses = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 font-black shadow-md';
                } else if (isSelected) {
                  // Prompt requirement: "Xato/Noto'g'ri so'zi ishlatilmaydi, qizil/yashil rang o'rniga muloyimlik bilan"
                  btnClasses = 'bg-orange-100 border-2 border-orange-400 text-orange-950 font-bold';
                } else {
                  btnClasses = 'opacity-40 bg-slate-50 border-slate-200';
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-opt-${idx}`}
                  disabled={selectedOption !== null}
                  onClick={() => handleSelectQuizOption(idx)}
                  className={`p-4 rounded-2xl text-left font-bold text-base transition flex items-center justify-between cursor-pointer ${btnClasses}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-xl bg-white/80 border border-slate-200 flex items-center justify-center text-xs font-black text-slate-600 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {selectedOption !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* "💡 Esingda bo'lsin!" Modal / Banner when answered */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-5 bg-linear-to-r from-amber-100/90 via-orange-100/70 to-yellow-100/90 rounded-3xl border-3 border-amber-300 shadow-md space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <h4 className="font-black text-amber-950 text-base sm:text-lg">
                    Esingda bo'lsin!
                  </h4>
                </div>
                <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                  {quizzes[currentQuizIndex]?.mnemonicTip}
                </p>

                <div className="flex justify-end pt-2">
                  <button
                    id="btn-next-question"
                    onClick={handleNextQuizQuestion}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-black text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentQuizIndex < quizzes.length - 1 ? 'Keyingi savol' : 'Natijani ko\'rish'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* STAGE 4: NATIJA EKRANI (Results & Rewards) */}
      {stage === 'completed' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-amber-300 shadow-2xl text-center max-w-lg mx-auto space-y-6">
          <MascotOlli
            size="xl"
            speechText={`Aqlbovardek natija, ${profile.name}! Sen haqiqiy yosh qahramonsan! 🦉🎉`}
            animateBounce={true}
          />

          <div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
              Dars Muvaffaqiyatli Yakunlandi! 🎉
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              {subject.uzbekName} bo'yicha yangi bilimlarni xazinangga qo'shding!
            </p>
          </div>

          {/* Reward Badges */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 rounded-2xl border-2 border-amber-300">
              <span className="text-3xl">⭐</span>
              <div className="text-2xl font-black text-amber-900 mt-1">
                +{attentionScore + correctQuizCount * 2}
              </div>
              <div className="text-xs font-bold text-amber-700">Yulduz qo'shildi</div>
            </div>

            <div className="p-4 bg-yellow-50 rounded-2xl border-2 border-yellow-300">
              <span className="text-3xl">🪙</span>
              <div className="text-2xl font-black text-yellow-900 mt-1">
                +{15 + correctQuizCount * 3}
              </div>
              <div className="text-xs font-bold text-yellow-700">Tanga qo'shildi</div>
            </div>
          </div>

          {/* Freemium Next Lesson Prompt (Requirement: "Keyingi darslarni ochish uchun ota-onangdan so'ra") */}
          {!profile.is_premium && (
            <div className="p-5 bg-linear-to-r from-purple-100/70 via-pink-100/50 to-amber-100/70 rounded-3xl border-2 border-purple-300 text-left space-y-2">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-purple-600 shrink-0" />
                <h4 className="text-sm font-black text-purple-950">
                  Ajoyib natija! Keyingi darslarni ochish uchun ota-onangdan so'ra 🎉
                </h4>
              </div>
              <p className="text-xs font-medium text-slate-700">
                2-dars va keyingi barcha darslar, O'rta va Qiyin darajalar FocusKids Premium a'zolari uchun ochiq.
              </p>
              <button
                onClick={onOpenPremiumModal}
                className="w-full py-2.5 px-4 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition cursor-pointer"
              >
                Ota-onaga ko'rsatish (Premium imkoniyatlari)
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onBack}
              className="flex-1 py-3.5 px-4 bg-amber-500 hover:bg-amber-600 text-white font-black text-base rounded-2xl shadow-md transition cursor-pointer"
            >
              Fanlar sahifasiga qaytish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
