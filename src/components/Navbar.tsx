import React from 'react';
import { UserProfile } from '../types';
import { getRankTitle } from '../utils/storage';
import { MascotOlli } from './MascotOlli';
import { Sparkles, Users, Trophy, ShoppingBag, BookOpen, Crown } from 'lucide-react';

interface NavbarProps {
  profile: UserProfile;
  currentTab: 'subjects' | 'shop' | 'leaderboard' | 'parent';
  onSelectTab: (tab: 'subjects' | 'shop' | 'leaderboard' | 'parent') => void;
  onOpenPremiumModal: () => void;
  onSwitchProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  currentTab,
  onSelectTab,
  onOpenPremiumModal,
  onSwitchProfile,
}) => {
  const rank = getRankTitle(profile.total_stars);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-amber-200 shadow-xs px-3 sm:px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 md:gap-4">
        {/* Brand & Child Identity */}
        <div className="w-full md:w-auto flex items-center justify-between md:justify-start gap-3">
          <button
            onClick={() => onSelectTab('subjects')}
            className="flex items-center gap-2.5 text-left group transition cursor-pointer"
          >
            <MascotOlli size="sm" accessory={profile.equipped_accessory} animateBounce={false} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-amber-900 group-hover:text-amber-700 transition">
                  FocusKids
                </span>
                {profile.is_premium ? (
                  <span className="inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 bg-linear-to-r from-amber-400 to-amber-500 text-white rounded-full shadow-xs">
                    <Crown className="w-3 h-3" /> Premium
                  </span>
                ) : (
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full border border-slate-200">
                    Freemium
                  </span>
                )}
              </div>
              <div className="text-xs font-medium text-slate-500 flex items-center gap-1">
                <span>{profile.name}</span>
                <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                <span>{profile.grade}-sinf</span>
                <span className="inline-flex items-center text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  {rank.badge} {rank.title}
                </span>
              </div>
            </div>
          </button>

          {/* Mobile Right Controls: Stars & Coins */}
          <div className="flex md:hidden items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-1 rounded-xl text-xs font-black text-amber-800">
              <span>⭐</span>
              <span>{profile.total_stars}</span>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-xl text-xs font-black text-yellow-800">
              <span>🪙</span>
              <span>{profile.coins}</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center justify-center gap-1.5 sm:gap-2 w-full md:w-auto overflow-x-auto py-1">
          <button
            id="tab-subjects"
            onClick={() => onSelectTab('subjects')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
              currentTab === 'subjects'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Fanlar</span>
          </button>

          <button
            id="tab-shop"
            onClick={() => onSelectTab('shop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
              currentTab === 'shop'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Do'kon</span>
          </button>

          <button
            id="tab-leaderboard"
            onClick={() => onSelectTab('leaderboard')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-bold transition cursor-pointer ${
              currentTab === 'leaderboard'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Reyting</span>
          </button>

          {/* Ota-onalar kabineti — no PIN, opens directly */}
          <button
            id="tab-parent"
            onClick={() => onSelectTab('parent')}
            title="Ota-onalar kabineti (Parol yo'q)"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-sm font-bold transition cursor-pointer border ${
              currentTab === 'parent'
                ? 'bg-indigo-600 text-white border-indigo-700 shadow-md shadow-indigo-200'
                : 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Ota-onalar</span>
            <span className="sm:hidden">👨‍👩‍👧</span>
          </button>
        </nav>

        {/* Desktop Balance & Upgrade Call to Action */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-2xl text-sm font-black text-amber-900 shadow-xs">
            <span className="text-base">⭐</span>
            <span>{profile.total_stars}</span>
            <span className="text-[11px] font-normal text-amber-700">yulduz</span>
          </div>

          <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 px-3 py-1.5 rounded-2xl text-sm font-black text-yellow-900 shadow-xs">
            <span className="text-base">🪙</span>
            <span>{profile.coins}</span>
            <span className="text-[11px] font-normal text-yellow-700">tanga</span>
          </div>

          {!profile.is_premium && (
            <button
              onClick={onOpenPremiumModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl text-xs font-black text-amber-900 bg-linear-to-r from-amber-300 via-amber-200 to-yellow-300 hover:from-amber-400 hover:to-yellow-400 border border-amber-300 shadow-sm transition hover:scale-105 cursor-pointer animate-pulse-ring"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>Premium</span>
            </button>
          )}

          {onSwitchProfile && (
            <button
              onClick={onSwitchProfile}
              title="Profilni o'zgartirish"
              className="text-xs text-slate-400 hover:text-slate-600 px-1"
            >
              🔄
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
