import React from 'react';
import { UserProfile, ShopItem } from '../types';
import { SHOP_ITEMS } from '../data/curriculum';
import { sound } from '../utils/sound';
import { fireConfetti } from '../utils/storage';
import { MascotOlli } from './MascotOlli';
import { Check, Lock, Sparkles, ShoppingBag } from 'lucide-react';

interface ShopViewProps {
  profile: UserProfile;
  purchasedItemIds: string[];
  onPurchaseItem: (item: ShopItem) => void;
  onEquipItem: (itemId: string) => void;
  onOpenPremiumModal: () => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  profile,
  purchasedItemIds,
  onPurchaseItem,
  onEquipItem,
  onOpenPremiumModal,
}) => {
  const handleBuyOrEquip = (item: ShopItem) => {
    const isOwned = purchasedItemIds.includes(item.id);

    if (item.isPremiumOnly && !profile.is_premium) {
      sound.playSoftPop();
      onOpenPremiumModal();
      return;
    }

    if (isOwned) {
      sound.playCorrect();
      onEquipItem(item.id);
      return;
    }

    if (profile.coins >= item.price) {
      sound.playVictory();
      fireConfetti();
      onPurchaseItem(item);
    } else {
      sound.playSoftPop();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Olli dressing room banner */}
      <div className="bg-linear-to-r from-purple-100 via-pink-50 to-amber-50 rounded-3xl p-6 border-3 border-purple-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <MascotOlli
            size="lg"
            accessory={profile.equipped_accessory}
            animateBounce={true}
          />
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-purple-700 bg-purple-200 px-3 py-1 rounded-full">
              Ollining Do'koni 🛍️
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-1">
              Ollini kiyintiring va bezating!
            </h2>
            <p className="text-sm font-medium text-slate-600">
              Darslarda to'plangan tangalaringizga yangi aksessuarlar xarid qiling.
            </p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border-2 border-purple-200 shadow-xs">
          <div className="text-3xl">🪙</div>
          <div>
            <div className="text-xs font-bold text-slate-500">Sening hisobing</div>
            <div className="text-2xl font-black text-amber-900">{profile.coins} tanga</div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SHOP_ITEMS.map((item) => {
          const isOwned = purchasedItemIds.includes(item.id);
          const isEquipped = profile.equipped_accessory === item.id;
          const canAfford = profile.coins >= item.price;
          const lockedByPremium = item.isPremiumOnly && !profile.is_premium;

          return (
            <div
              key={item.id}
              className={`bg-white rounded-3xl p-5 border-3 transition flex flex-col justify-between shadow-sm hover:shadow-md ${
                isEquipped
                  ? 'border-purple-500 ring-4 ring-purple-100'
                  : isOwned
                  ? 'border-emerald-300'
                  : 'border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    {item.type === 'hat' ? 'Bosh kiyim' : item.type === 'glasses' ? 'Ko\'zoynak' : 'Nishon'}
                  </span>
                  {item.isPremiumOnly && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-md border border-amber-300">
                      <Sparkles className="w-3 h-3 text-amber-700" /> Faqat Premium
                    </span>
                  )}
                </div>

                <div className="w-20 h-20 mx-auto rounded-2xl bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-4xl shadow-inner mb-3">
                  {item.emoji}
                </div>

                <h3 className="font-black text-slate-800 text-lg text-center">
                  {item.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 text-center mt-1 mb-4">
                  {item.description}
                </p>
              </div>

              <div>
                {isEquipped ? (
                  <button
                    disabled
                    className="w-full py-2.5 px-4 bg-purple-100 text-purple-900 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 cursor-default"
                  >
                    <Check className="w-4 h-4" />
                    <span>Kiyilgan</span>
                  </button>
                ) : isOwned ? (
                  <button
                    onClick={() => handleBuyOrEquip(item)}
                    className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs rounded-xl shadow-xs transition cursor-pointer"
                  >
                    Kiyish
                  </button>
                ) : lockedByPremium ? (
                  <button
                    onClick={() => handleBuyOrEquip(item)}
                    className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Premium bilan ochish</span>
                  </button>
                ) : (
                  <button
                    disabled={!canAfford}
                    onClick={() => handleBuyOrEquip(item)}
                    className={`w-full py-2.5 px-4 font-black text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      canAfford
                        ? 'bg-amber-500 hover:bg-amber-600 text-white'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Sotib olish ({item.price} 🪙)</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
