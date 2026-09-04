import React, { useState } from "react";
import { Deity, UserPetition } from "../types";
import { Flame, Sparkles, ArrowRight, RotateCcw } from "lucide-react";
import { playTempleBell, playWoodenFish } from "../utils/audio";

interface IncenseRitualProps {
  deity: Deity;
  petition: UserPetition;
  onComplete: () => void;
  onBack: () => void;
  soundEnabled: boolean;
}

export const IncenseRitual: React.FC<IncenseRitualProps> = ({
  deity,
  petition,
  onComplete,
  onBack,
  soundEnabled,
}) => {
  const [isLit, setIsLit] = useState(false);
  const [bowCount, setBowCount] = useState(0);

  const handleLightIncense = () => {
    setIsLit(true);
    if (soundEnabled) {
      playTempleBell(523.25, 2.0); // C5
    }
  };

  const handleBow = () => {
    if (!isLit) {
      handleLightIncense();
    }
    const next = bowCount + 1;
    setBowCount(next);
    if (soundEnabled) {
      playWoodenFish();
    }
    if (next >= 3) {
      setTimeout(() => {
        if (soundEnabled) playTempleBell(659.25, 2.5); // E5
      }, 300);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-center">
      {/* Step Indicator */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold mb-4">
        <span>第二步：焚香淨心・三叩首敬稟</span>
      </div>

      <h2 className="text-2xl font-black text-amber-950 mb-2">
        向【{deity.name}】敬獻清香
      </h2>
      <p className="text-xs sm:text-sm text-stone-600 mb-8 max-w-md mx-auto">
        求籤前當平心靜氣，放下雜念。默念姓名、現居地與所求之事，行三叩拜之禮，恭請神明垂慈開示。
      </p>

      {/* Incense Burner Display */}
      <div className="relative w-72 h-72 mx-auto bg-linear-to-b from-[#2a1d17] to-[#1a120e] rounded-3xl p-6 border-4 border-amber-800/40 shadow-2xl flex flex-col items-center justify-end overflow-hidden mb-8">
        {/* Sacred Aureole / Golden Glow */}
        <div className={`absolute top-6 w-32 h-32 rounded-full bg-amber-400/20 blur-xl transition-all duration-1000 ${isLit ? "scale-150 opacity-100" : "scale-75 opacity-30"}`} />

        {/* Smoke Simulation */}
        {isLit && (
          <div className="absolute top-10 flex gap-4 pointer-events-none">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-20 bg-linear-to-t from-amber-200/50 via-stone-300/30 to-transparent rounded-full animate-pulse"
                style={{
                  animationDuration: `${1.4 + i * 0.4}s`,
                  filter: "blur(1.5px)",
                }}
              />
            ))}
          </div>
        )}

        {/* 3 Incense Sticks */}
        <div className="flex justify-center gap-5 z-10 mb-2">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex flex-col items-center">
              {/* Burning tip */}
              <div
                className={`w-2 h-3 rounded-t-full transition-colors duration-500 ${
                  isLit ? "bg-amber-400 shadow-[0_0_10px_#f59e0b] animate-pulse" : "bg-amber-800"
                }`}
              />
              {/* Incense stick rod */}
              <div className="w-1 h-28 bg-linear-to-b from-amber-700 via-amber-900 to-amber-950 rounded-b-xs" />
            </div>
          ))}
        </div>

        {/* Bronze Incense Burner Pot */}
        <div className="relative z-10 w-44 h-16 bg-linear-to-r from-amber-700 via-amber-600 to-amber-800 rounded-b-3xl rounded-t-lg border-2 border-amber-400/60 shadow-lg flex items-center justify-center">
          <span className="text-amber-100 text-xs font-black tracking-widest px-2 py-0.5 border border-amber-300/40 rounded-sm">
            {deity.templeHall}
          </span>
        </div>
      </div>

      {/* Petition Summary Card */}
      <div className="bg-[#fffdfa] border border-amber-900/15 rounded-xl p-4 text-left mb-6 shadow-xs">
        <div className="flex items-center justify-between text-xs text-amber-900 font-bold mb-1.5">
          <span>善信：{petition.userName} ({petition.gender})</span>
          <span>請示範疇：{petition.category.split("・")[0]}</span>
        </div>
        <p className="text-xs text-stone-700 line-clamp-2">
          「{petition.question}」
        </p>
      </div>

      {/* Action Controls */}
      <div className="space-y-3">
        {!isLit ? (
          <button
            onClick={handleLightIncense}
            id="light-incense-btn"
            className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-amber-600 to-red-700 text-amber-50 font-bold text-base shadow-md hover:from-amber-500 hover:to-red-600 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Flame className="w-5 h-5 text-amber-300" />
            <span>虔心點燃三炷清香</span>
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleBow}
              id="bow-prayer-btn"
              className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-amber-700 to-stone-800 text-amber-100 font-bold text-base shadow-md hover:from-amber-600 hover:to-stone-700 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>
                誠心禮拜叩首 ({bowCount} / 3 拜)
              </span>
            </button>

            {bowCount >= 3 ? (
              <button
                onClick={onComplete}
                id="enter-divination-btn"
                className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-red-800 via-amber-800 to-red-900 text-amber-50 font-bold text-base shadow-lg hover:shadow-xl hover:from-red-700 hover:to-amber-700 transition-all cursor-pointer flex items-center justify-center gap-2 animate-bounce"
              >
                <span>禮畢・搖動籤筒抽籤</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <p className="text-xs text-stone-700">
                請連續叩首三拜，聚凝精氣神以通神明。
              </p>
            )}
          </div>
        )}

        <button
          onClick={onBack}
          id="incense-back-btn"
          className="text-xs text-stone-700 hover:text-stone-900 cursor-pointer pt-2"
        >
          修改稟報資料
        </button>
      </div>
    </div>
  );
};
