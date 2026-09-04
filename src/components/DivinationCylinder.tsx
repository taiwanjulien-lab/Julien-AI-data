import React, { useState } from "react";
import { Deity, DivinationPoem } from "../types";
import { Sparkles, ArrowRight, RotateCcw, Flame } from "lucide-react";
import { playBambooSticks, playTempleBell } from "../utils/audio";
import { DeityMascot } from "./DeityMascot";

interface DivinationCylinderProps {
  deity: Deity;
  poems: DivinationPoem[];
  onPoemDrawn: (poem: DivinationPoem) => void;
  soundEnabled: boolean;
}

export const DivinationCylinder: React.FC<DivinationCylinderProps> = ({
  deity,
  poems,
  onPoemDrawn,
  soundEnabled,
}) => {
  const [isShaking, setIsShaking] = useState(false);
  const [drawnPoem, setDrawnPoem] = useState<DivinationPoem | null>(null);

  const handleShake = () => {
    if (isShaking) return;
    setIsShaking(true);
    setDrawnPoem(null);

    // Play shaking sounds
    if (soundEnabled) {
      playBambooSticks();
      setTimeout(() => playBambooSticks(), 350);
      setTimeout(() => playBambooSticks(), 750);
      setTimeout(() => playBambooSticks(), 1150);
    }

    // Pick a random poem from this deity's repertoire
    const deityPoems = poems.filter((p) => p.deityId === deity.id);
    const selected =
      deityPoems.length > 0
        ? deityPoems[Math.floor(Math.random() * deityPoems.length)]
        : poems[Math.floor(Math.random() * poems.length)];

    setTimeout(() => {
      setIsShaking(false);
      setDrawnPoem(selected);
      if (soundEnabled) {
        playTempleBell(587.33, 2.0); // D5 chime
      }
    }, 1600);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-center">
      {/* Step Indicator with Mascot header */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <DeityMascot deityId={deity.id} size="sm" showAura />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>第三步：搖籤出筒・感應神機</span>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-amber-950 mb-2">
        請【{deity.name}】賜籤
      </h2>
      <p className="text-xs sm:text-sm text-stone-600 mb-6 max-w-md mx-auto">
        心中凝神默禱所問之事。按下搖筒按鈕，籤筒感應天地靈氣，竹籤將震動浮起，降下為您指點迷津的神明聖籤。
      </p>

      {/* Visual Bamboo Cylinder Container with Dynamic Animations */}
      <div className="relative w-80 h-96 mx-auto flex flex-col items-center justify-end pb-8 mb-6 overflow-hidden">
        {/* Glow backdrop / Divine aura */}
        <div className="absolute inset-0 bg-radial from-amber-500/15 via-amber-200/5 to-transparent pointer-events-none" />

        {/* Dynamic Sparks and Smoke particles when shaking */}
        {isShaking && (
          <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
            <div className="absolute w-48 h-48 rounded-full border-2 border-amber-400/40 animate-ping" />
            <div className="absolute -top-4 text-amber-400 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="absolute left-8 top-12 text-amber-500 animate-pulse">
              <Flame className="w-6 h-6" />
            </div>
            <div className="absolute right-8 top-16 text-amber-500 animate-pulse">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        )}

        {/* Drawn Stick Popping Out with Divine Glow */}
        {drawnPoem && (
          <div className="absolute top-0 z-30 animate-stick-emerge flex flex-col items-center">
            {/* Mascot blessing badge */}
            <div className="mb-1 p-1 bg-amber-50 rounded-full border border-amber-300 shadow-md">
              <DeityMascot deityId={deity.id} size="xs" />
            </div>
            <div className="w-12 h-44 bg-linear-to-b from-red-700 via-amber-100 to-amber-200 border-2 border-amber-950 rounded-t-xl shadow-2xl flex flex-col items-center py-2 px-1 text-center">
              {/* Vermilion Tip */}
              <div className="w-8 h-5 bg-red-800 rounded-sm mb-1.5 flex items-center justify-center text-[10px] text-white font-bold shadow-xs">
                {drawnPoem.rank}
              </div>
              <div className="writing-vertical-rl text-xs font-black text-amber-950 tracking-widest">
                {drawnPoem.poemNumber}
              </div>
              <div className="writing-vertical-rl text-[11px] font-bold text-red-800 mt-1">
                {drawnPoem.cyclicalSign}
              </div>
            </div>
          </div>
        )}

        {/* Bamboo Cylinder Body with vibrating sticks */}
        <div
          className={`relative z-20 w-44 h-64 bg-linear-to-b from-[#8c531b] via-[#6f3b10] to-[#452206] rounded-t-2xl rounded-b-3xl border-4 border-amber-950/70 shadow-2xl p-3 flex flex-col items-center justify-between transition-transform ${
            isShaking ? "animate-wiggle" : ""
          }`}
          style={{
            transformOrigin: "bottom center",
          }}
        >
          {/* Bamboo Sticks visible inside rim with dynamic rattle */}
          <div className="w-full flex justify-center gap-1.5 overflow-hidden pt-1">
            {[...Array(11)].map((_, i) => (
              <div
                key={i}
                className="w-2.5 bg-linear-to-b from-amber-200 via-amber-300 to-amber-600 rounded-t-xs border-r border-amber-900/40"
                style={{
                  height: `${70 + (i % 4) * 8}px`,
                  transform: isShaking
                    ? `translateY(${Math.sin(i * 2 + Date.now() / 100) * 12 - 6}px)`
                    : "translateY(0)",
                  transition: "transform 0.08s ease-in-out",
                }}
              >
                <div className="h-2 bg-red-700 rounded-t-xs" />
              </div>
            ))}
          </div>

          {/* Cylinder Badge Seal */}
          <div className="w-28 py-3 rounded-xl bg-amber-950/85 border border-amber-500/50 text-center shadow-inner">
            <span className="text-[11px] font-black text-amber-200 tracking-widest block">
              {deity.templeHall}
            </span>
            <span className="text-[9px] text-amber-300/80 block mt-0.5">
              靈籤聖筒
            </span>
          </div>

          {/* Base border line */}
          <div className="w-full h-2 border-t-2 border-amber-500/20" />
        </div>

        {/* Shadow under cylinder */}
        <div className={`w-48 h-5 bg-black/25 rounded-full blur-xs mt-2 transition-all ${isShaking ? "scale-90 opacity-60" : ""}`} />
      </div>

      {/* Action Buttons */}
      {!drawnPoem ? (
        <button
          onClick={handleShake}
          disabled={isShaking}
          id="shake-cylinder-btn"
          className="w-full max-w-sm mx-auto py-3.5 px-6 rounded-xl bg-linear-to-r from-red-800 via-amber-800 to-red-900 text-amber-50 font-bold text-base shadow-lg hover:shadow-xl hover:from-red-700 hover:to-amber-700 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-spin" />
          <span>{isShaking ? "感應天人神旨中・籤筒激盪..." : "誠心晃動籤筒抽籤"}</span>
        </button>
      ) : (
        <div className="max-w-md mx-auto space-y-4 animate-in fade-in">
          {/* Drawn Stick Card with Mascot */}
          <div className="bg-[#fffdfa] border-2 border-amber-800/40 rounded-2xl p-5 text-center shadow-md">
            <div className="flex items-center justify-center gap-2 mb-2">
              <DeityMascot deityId={deity.id} size="xs" />
              <span className="text-xs text-amber-900 font-bold">
                【{deity.name} 垂賜靈籤】
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900">
              {drawnPoem.poemNumber}・{drawnPoem.title}
            </h3>
            <p className="text-xs text-stone-700 mt-1">
              籤型：{drawnPoem.cyclicalSign} ｜ 吉凶等第：
              <span className="text-red-700 font-bold text-sm ml-1 px-2 py-0.5 bg-red-50 rounded-md border border-red-200">
                {drawnPoem.rank}
              </span>
            </p>
            <div className="mt-3 p-3 bg-amber-50/80 border border-amber-200/70 rounded-xl text-xs text-stone-700 leading-relaxed">
              「依照台灣正統宮廟道法規矩，抽出籤支後，必須向神明<strong>【擲筊請示】</strong>確認是否為此籤，得聖筊方可正式開籤解析！」
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleShake}
              id="re-shake-btn"
              className="flex-1 py-3 px-4 rounded-xl border border-stone-300 text-stone-700 bg-stone-50 hover:bg-stone-100 text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>重新抽籤</span>
            </button>
            <button
              onClick={() => onPoemDrawn(drawnPoem)}
              id="confirm-to-jiao-btn"
              className="flex-2 py-3 px-5 rounded-xl bg-linear-to-r from-red-800 via-amber-800 to-red-900 text-amber-50 text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>進行擲筊請示</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
