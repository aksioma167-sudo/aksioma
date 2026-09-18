import React, { useState } from 'react';
import { UserProfile, LeaderboardEntry } from '../types';
import { loadLeaderboard } from '../utils/storage';
import { Trophy, Medal, Flame, Calendar, Globe, Sparkles } from 'lucide-react';
import { sound } from '../utils/sound';

interface LeaderboardViewProps {
  profile: UserProfile;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ profile }) => {
  const [tab, setTab] = useState<'all' | 'weekly' | 'daily'>('all');

  const entries = loadLeaderboard(profile);

  // Tab modifiers to give realistic varied scores for daily & weekly
  const getDisplayEntries = () => {
    return entries.map((entry, index) => {
      let displayStars = entry.stars;
      if (tab === 'daily') {
        displayStars = Math.max(8, Math.round(entry.stars * 0.15) + (index % 3) * 5);
      } else if (tab === 'weekly') {
        displayStars = Math.max(25, Math.round(entry.stars * 0.45) + (index % 4) * 10);
      }
      return { ...entry, displayStars };
    }).sort((a, b) => b.displayStars - a.displayStars);
  };

  const displayList = getDisplayEntries();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-100 via-teal-50 to-amber-50 rounded-3xl p-6 border-3 border-emerald-300 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500 text-white flex items-center justify-center text-3xl shadow-lg shadow-emerald-200">
            🏆
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-200 px-3 py-1 rounded-full">
              Yosh Bilimdonlar Reytingi
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">
              Eng tirishqoq o'quvchilar
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600">
              Darslarni a'lo baholarga tugatib, shohsupaga ko'tariling!
            </p>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-2xl border-2 border-emerald-200 shadow-xs">
          <button
            onClick={() => {
              sound.playFlip();
              setTab('all');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              tab === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Umumiy
          </button>
          <button
            onClick={() => {
              sound.playFlip();
              setTab('weekly');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              tab === 'weekly'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Haftalik
          </button>
          <button
            onClick={() => {
              sound.playFlip();
              setTab('daily');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer ${
              tab === 'daily'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Kunlik
          </button>
        </div>
      </div>

      {/* Leaderboard Table List */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border-3 border-emerald-200 shadow-xl space-y-2.5">
        {displayList.map((entry, index) => {
          const isCurrentUser = entry.player_id === profile.id;
          const rankNumber = index + 1;

          return (
            <div
              key={entry.player_id + index}
              className={`p-4 rounded-2xl border-2 transition flex items-center justify-between gap-3 ${
                isCurrentUser
                  ? 'bg-linear-to-r from-amber-100/90 via-orange-50 to-amber-100/90 border-amber-400 shadow-lg ring-4 ring-amber-100 scale-101'
                  : rankNumber === 1
                  ? 'bg-yellow-50/70 border-yellow-300 shadow-xs'
                  : rankNumber === 2
                  ? 'bg-slate-50/70 border-slate-300 shadow-xs'
                  : rankNumber === 3
                  ? 'bg-amber-50/50 border-amber-200 shadow-xs'
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Rank Badge */}
                <div className="w-8 sm:w-10 text-center">
                  {rankNumber === 1 ? (
                    <span className="text-2xl sm:text-3xl">🥇</span>
                  ) : rankNumber === 2 ? (
                    <span className="text-2xl sm:text-3xl">🥈</span>
                  ) : rankNumber === 3 ? (
                    <span className="text-2xl sm:text-3xl">🥉</span>
                  ) : (
                    <span className="text-sm sm:text-base font-black text-slate-400">
                      #{rankNumber}
                    </span>
                  )}
                </div>

                {/* Avatar & Info */}
                <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-xl shrink-0">
                  {entry.avatar_icon || '🦉'}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-800 text-sm sm:text-base">
                      {entry.player_name}
                    </span>
                    {isCurrentUser && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-400 text-amber-950 shadow-2xs">
                        Bu sen! 🌟
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-500">
                    {entry.title}
                  </div>
                </div>
              </div>

              {/* Stars tally */}
              <div className="flex items-center gap-1.5 bg-white/90 px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                <span className="text-base">⭐</span>
                <span className="font-black text-slate-800 text-sm sm:text-base">
                  {entry.displayStars}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">yulduz</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
