import React from 'react';
import { motion } from 'motion/react';

interface MascotOlliProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  accessory?: string;
  speechText?: string;
  animateBounce?: boolean;
}

export const MascotOlli: React.FC<MascotOlliProps> = ({
  size = 'md',
  accessory,
  speechText,
  animateBounce = true,
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-2xl',
    md: 'w-20 h-20 text-4xl',
    lg: 'w-32 h-32 text-6xl',
    xl: 'w-44 h-44 text-8xl',
  };

  const getAccessoryEmoji = () => {
    switch (accessory) {
      case 'hat-grad':
        return '🎓';
      case 'hat-crown':
        return '👑';
      case 'hat-wizard':
        return '🧙‍♂️';
      case 'glasses-smart':
        return '👓';
      case 'glasses-sun':
        return '🕶️';
      case 'badge-star':
        return '🌟';
      case 'badge-diamond':
        return '💎';
      case 'theme-rainbow':
        return '🪽';
      default:
        return null;
    }
  };

  const accEmoji = getAccessoryEmoji();

  return (
    <div className="relative inline-flex flex-col items-center">
      {speechText && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="mb-3 max-w-xs bg-white text-slate-800 text-sm md:text-base font-medium px-4 py-2.5 rounded-2xl shadow-lg border-2 border-amber-300 relative text-center"
        >
          {speechText}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b-2 border-r-2 border-amber-300 rotate-45" />
        </motion.div>
      )}

      <motion.div
        animate={
          animateBounce
            ? {
                y: [0, -8, 0],
                rotate: [0, 2, -2, 0],
              }
            : {}
        }
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
        className={`relative flex items-center justify-center rounded-3xl bg-linear-to-b from-amber-200 to-amber-400 p-2 shadow-xl border-4 border-amber-300 select-none ${sizeClasses[size]}`}
      >
        {/* Owl Mascot Emoji */}
        <span>🦉</span>

        {/* Equipped Accessory Overlay */}
        {accEmoji && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-3 -right-2 text-xl md:text-3xl filter drop-shadow-md"
          >
            {accEmoji}
          </motion.div>
        )}

        {/* Glow badge */}
        <div className="absolute -bottom-1 -left-1 bg-amber-500 text-white rounded-full p-1 text-[10px] font-bold shadow">
          Olli
        </div>
      </motion.div>
    </div>
  );
};
