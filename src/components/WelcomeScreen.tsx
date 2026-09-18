import React, { useState } from 'react';
import { Grade } from '../types';
import { MascotOlli } from './MascotOlli';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { sound } from '../utils/sound';

interface WelcomeScreenProps {
  onStart: (name: string, grade: Grade) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState<Grade>(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playCorrect();
    onStart(name, grade);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-100/60 via-orange-50/40 to-amber-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative overflow-hidden"
      >
        {/* Decorative corner stars */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-200/50 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-orange-200/50 rounded-full blur-xl pointer-events-none" />

        {/* Mascot Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <MascotOlli
            size="lg"
            speechText="Salom, mening yosh do'stim! Men Olli 🦉. Keling, birgalikda o'rganamiz!"
            animateBounce={true}
          />

          <h1 className="mt-4 text-3xl sm:text-4xl font-black text-amber-900 tracking-tight">
            FocusKids
          </h1>
          <p className="text-slate-600 font-medium text-sm sm:text-base mt-1">
            Diqqat va bilimingni sinab, yulduzlar yig'amiz!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5">
              Isming nima? ✍️
            </label>
            <input
              id="input-child-name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masalan: Alijon"
              className="w-full px-4 py-3 text-lg font-bold text-slate-800 bg-amber-50/70 border-2 border-amber-300 rounded-2xl focus:outline-hidden focus:ring-4 focus:ring-amber-200 focus:border-amber-500 transition placeholder:text-slate-400 placeholder:font-normal"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Nechanchi sinfda o'qiysan? 🎒
            </label>
            <div className="grid grid-cols-3 gap-3">
              {([2, 3, 4] as Grade[]).map((g) => (
                <button
                  key={g}
                  type="button"
                  id={`btn-grade-${g}`}
                  onClick={() => {
                    sound.playFlip();
                    setGrade(g);
                  }}
                  className={`py-3 px-2 rounded-2xl font-black text-base sm:text-lg border-3 transition flex flex-col items-center justify-center gap-1 cursor-pointer ${
                    grade === g
                      ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-md scale-105'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-100 hover:border-amber-300'
                  }`}
                >
                  <span>{g}-sinf</span>
                  <span className="text-xs font-semibold opacity-70">
                    {g === 2 ? '7-8 yosh' : g === 3 ? '8-9 yosh' : '9-10 yosh'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Bonus pill */}
          <div className="flex items-center gap-2 p-3 bg-amber-100/60 rounded-2xl border border-amber-200 text-amber-900 text-xs font-semibold">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500 shrink-0" />
            <span>Boshlash uchun senga 10 ta yulduz va 25 ta tanga sovg'a beriladi! 🎉</span>
          </div>

          <button
            type="submit"
            id="btn-start-journey"
            className="w-full py-4 px-6 bg-linear-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white text-lg font-black rounded-2xl shadow-xl shadow-amber-300/60 hover:shadow-amber-400/70 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Boshlash</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500">
            Parol kerak emas. Istalgan vaqtda fanlarni davom ettirishing mumkin.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
