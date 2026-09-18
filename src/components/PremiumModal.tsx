import React, { useState } from 'react';
import { UserProfile, SubscriptionRecord } from '../types';
import { saveProfile, saveSubscription, fireConfetti } from '../utils/storage';
import { sound } from '../utils/sound';
import { MascotOlli } from './MascotOlli';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, Crown, ShieldCheck, Zap } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: UserProfile;
  onSuccessUpgrade: (updated: UserProfile) => void;
}

export const PremiumModal: React.FC<PremiumModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSuccessUpgrade,
}) => {
  const [billingPlan, setBillingPlan] = useState<'monthly' | 'annual'>('monthly');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = async () => {
    setIsProcessing(true);
    sound.playFlip();

    try {
      // Call Stripe backend simulation endpoint
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerId: profile.id,
          plan: billingPlan,
        }),
      });

      const data = await res.json();

      // Instant activation of Premium for child
      const updatedProfile: UserProfile = {
        ...profile,
        is_premium: true,
      };
      saveProfile(updatedProfile);

      const updatedSub: SubscriptionRecord = {
        player_id: profile.id,
        stripe_customer_id: 'cus_' + profile.id,
        stripe_subscription_id: data.sessionId || 'sub_stripe_focuskids',
        status: 'active',
        plan: billingPlan,
        current_period_end: new Date(Date.now() + 30 * 86400000).toISOString(),
      };
      saveSubscription(updatedSub);

      sound.playVictory();
      fireConfetti();
      onSuccessUpgrade(updatedProfile);
      onClose();
    } catch (e) {
      console.error(e);
      // Fallback local upgrade
      const updatedProfile: UserProfile = { ...profile, is_premium: true };
      saveProfile(updatedProfile);
      onSuccessUpgrade(updatedProfile);
      sound.playVictory();
      fireConfetti();
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-amber-300 relative my-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Mascot & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <MascotOlli
            size="md"
            accessory="hat-crown"
            speechText="Ota-onangdan so'ra, birgalikda barcha darslarni ochamiz! 🎉"
            animateBounce={true}
          />

          <div className="mt-3 inline-flex items-center gap-1 text-xs font-extrabold uppercase tracking-wider text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
            <Crown className="w-3.5 h-3.5" /> FocusKids Premium
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
            Ajoyib natija! Keyingi darslarni ochish uchun ota-onangdan so'ra 🎉
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
            Barcha 5 ta fan bo'yicha O'rta va Qiyin darajalar, 50+ mnemonik darslar hamda cheksiz AI tahlilga ega bo'ling!
          </p>
        </div>

        {/* Benefits list */}
        <div className="space-y-2.5 mb-6 p-4 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs sm:text-sm font-semibold text-slate-800">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 font-black" />
            <span>Barcha fanlardagi barcha darslar va qiyin darajalar ochiq</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 font-black" />
            <span>Sun'iy Intellekt (AI) orqali cheksiz shaxsiy Roadmap</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 font-black" />
            <span>Do'kondagi barcha maxsus toj va kiyimlar bepul</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0 font-black" />
            <span>Reklamasiz, 100% xavfsiz va bolalar uchun qulay muhit</span>
          </div>
        </div>

        {/* Plan selection */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setBillingPlan('monthly')}
            className={`p-3.5 rounded-2xl border-3 text-left transition cursor-pointer ${
              billingPlan === 'monthly'
                ? 'bg-amber-100/80 border-amber-500 shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-xs font-bold text-slate-500">Oylik Reja</div>
            <div className="text-lg sm:text-xl font-black text-slate-800 mt-0.5">
              29,000 UZS
            </div>
            <div className="text-[11px] font-semibold text-slate-500">oyiga / istalgan payt bekor qilish</div>
          </button>

          <button
            type="button"
            onClick={() => setBillingPlan('annual')}
            className={`p-3.5 rounded-2xl border-3 text-left transition relative cursor-pointer ${
              billingPlan === 'annual'
                ? 'bg-amber-100/80 border-amber-500 shadow-sm'
                : 'bg-slate-50 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="absolute -top-2.5 right-2 px-2 py-0.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider">
              Tejamkor (-42%)
            </div>
            <div className="text-xs font-bold text-slate-500">Yillik Reja</div>
            <div className="text-lg sm:text-xl font-black text-slate-800 mt-0.5">
              199,000 UZS
            </div>
            <div className="text-[11px] font-semibold text-slate-500">yiliga / 16,500 oyiga</div>
          </button>
        </div>

        {/* Stripe Upgrade CTA button */}
        <button
          id="btn-confirm-premium-upgrade"
          disabled={isProcessing}
          onClick={handleCheckout}
          className="w-full py-4 px-6 bg-linear-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-base sm:text-lg rounded-2xl shadow-xl shadow-amber-300 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5 text-amber-200" />
          <span>{isProcessing ? "To'lov amalga oshirilmoqda..." : "Obunani faollashtirish (Stripe)"}</span>
        </button>

        <div className="mt-4 text-center flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Stripe orqali xavfsiz to'lov • Istalgan vaqtda bekor qilish imkoni</span>
        </div>
      </motion.div>
    </div>
  );
};
