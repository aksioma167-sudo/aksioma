import React, { useState, useEffect } from 'react';
import { UserProfile, SubjectMeta, DifficultyLevel, ShopItem, Grade } from './types';
import {
  loadProfile,
  saveProfile,
  createProfile,
  loadPurchasedItems,
  savePurchasedItems,
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { SubjectsView } from './components/SubjectsView';
import { LessonPlayer } from './components/LessonPlayer';
import { ShopView } from './components/ShopView';
import { LeaderboardView } from './components/LeaderboardView';
import { ParentCabinet } from './components/ParentCabinet';
import { PremiumModal } from './components/PremiumModal';

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentTab, setCurrentTab] = useState<'subjects' | 'shop' | 'leaderboard' | 'parent'>('subjects');
  const [purchasedItems, setPurchasedItems] = useState<string[]>([]);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);

  // Active lesson state
  const [activeLesson, setActiveLesson] = useState<{
    subject: SubjectMeta;
    level: DifficultyLevel;
    lessonNumber: number;
  } | null>(null);

  // Load initial profile
  useEffect(() => {
    const saved = loadProfile();
    if (saved) {
      setProfile(saved);
    }
    setPurchasedItems(loadPurchasedItems());
  }, []);

  const handleStartChildJourney = (name: string, grade: Grade) => {
    const newProf = createProfile(name, grade);
    setProfile(newProf);
    setCurrentTab('subjects');
  };

  const handleSelectLesson = (subject: SubjectMeta, level: DifficultyLevel, lessonNumber: number) => {
    setActiveLesson({ subject, level, lessonNumber });
  };

  const handleCompleteLesson = (earnedStars: number, earnedCoins: number) => {
    if (!profile) return;
    const updated: UserProfile = {
      ...profile,
      total_stars: profile.total_stars + earnedStars,
      coins: profile.coins + earnedCoins,
    };
    saveProfile(updated);
    setProfile(updated);
  };

  const handlePurchaseShopItem = (item: ShopItem) => {
    if (!profile || profile.coins < item.price) return;
    const updatedProf: UserProfile = {
      ...profile,
      coins: profile.coins - item.price,
      equipped_accessory: item.id,
    };
    saveProfile(updatedProf);
    setProfile(updatedProf);

    const updatedPurchases = [...purchasedItems, item.id];
    savePurchasedItems(updatedPurchases);
    setPurchasedItems(updatedPurchases);
  };

  const handleEquipShopItem = (itemId: string) => {
    if (!profile) return;
    const updatedProf: UserProfile = {
      ...profile,
      equipped_accessory: itemId,
    };
    saveProfile(updatedProf);
    setProfile(updatedProf);
  };

  const handleSwitchProfile = () => {
    setProfile(null);
    setActiveLesson(null);
  };

  // If child has not registered yet, show Welcome screen (1-BET: Kirish)
  if (!profile) {
    return <WelcomeScreen onStart={handleStartChildJourney} />;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans selection:bg-amber-200">
      {/* Universal Top Navbar */}
      <Navbar
        profile={profile}
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setActiveLesson(null);
          setCurrentTab(tab);
        }}
        onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
        onSwitchProfile={handleSwitchProfile}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeLesson ? (
          <LessonPlayer
            subject={activeLesson.subject}
            level={activeLesson.level}
            lessonNumber={activeLesson.lessonNumber}
            profile={profile}
            onBack={() => setActiveLesson(null)}
            onCompleteLesson={handleCompleteLesson}
            onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
          />
        ) : (
          <>
            {currentTab === 'subjects' && (
              <SubjectsView
                profile={profile}
                onSelectLesson={handleSelectLesson}
                onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
                onOpenParentCabinet={() => setCurrentTab('parent')}
              />
            )}

            {currentTab === 'shop' && (
              <ShopView
                profile={profile}
                purchasedItemIds={purchasedItems}
                onPurchaseItem={handlePurchaseShopItem}
                onEquipItem={handleEquipShopItem}
                onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
              />
            )}

            {currentTab === 'leaderboard' && (
              <LeaderboardView profile={profile} />
            )}

            {currentTab === 'parent' && (
              <ParentCabinet
                profile={profile}
                onUpdateProfile={(updated) => setProfile(updated)}
                onOpenPremiumModal={() => setIsPremiumModalOpen(true)}
                onBackToSubjects={() => setCurrentTab('subjects')}
              />
            )}
          </>
        )}
      </main>

      {/* Premium Upgrade Modal */}
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
        profile={profile}
        onSuccessUpgrade={(updated) => setProfile(updated)}
      />
    </div>
  );
}
