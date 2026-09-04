import React, { useState } from "react";
import { Deity, DivinationPoem } from "../types";
import { X, Sparkles, Calendar, RotateCcw, ArrowRight } from "lucide-react";
import { playTempleBell } from "../utils/audio";

interface DailyFortuneModalProps {
  deities: Deity[];
  poems: DivinationPoem[];
  onClose: () => void;
  onSelectPoemForDeepDive: (deity: Deity, poem: DivinationPoem) => void;
  soundEnabled: boolean;
}

export const DailyFortuneModal: React.FC<DailyFortuneModalProps> = ({
  deities,
  poems,
  onClose,
  onSelectPoemForDeepDive,
  soundEnabled,
}) => {
  const [dailyDrawn, setDailyDrawn] = useState<{
    deity: Deity;
    poem: DivinationPoem;
  } | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const drawDaily = () => {
    setIsDrawing(true);
    if (soundEnabled) playTempleBell(523.25, 2.0);

    setTimeout(() => {
      const randomDeity = deities[Math.floor(Math.random() * deities.length)];
      const deityPoems = poems.filter((p) => p.deityId === randomDeity.id);
      const randomPoem =
        deityPoems.length > 0
          ? deityPoems[Math.floor(Math.random() * deityPoems.length)]
          : poems[Math.floor(Math.random() * poems.length)];

      setDailyDrawn({ deity: randomDeity, poem: randomPoem });
      setIsDrawing(false);
      if (soundEnabled) playTempleBell(659.25, 2.0);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="relative w-full max-w-lg bg-[#fffdfa] rounded-2xl sm:rounded-3xl border-2 border-amber-900/20 shadow-2xl p-6 sm:p-8">
        <button
          onClick={onClose}
          id="close-daily-modal"
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>今日神明指引・日運微占</span>
          </div>
          <h3 className="text-xl font-black text-amber-950">
            晨鐘啟智・每日隨緣一籤
          </h3>
          <p className="text-xs text-stone-700 mt-1">
            抽出一張今日守護神明與行事提醒，定心安神。
          </p>
        </div>

        {!dailyDrawn ? (
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-linear-to-br from-amber-600 via-red-700 to-amber-900 flex items-center justify-center text-amber-100 shadow-xl ring-4 ring-amber-300/40 mb-6">
              <Sparkles className="w-10 h-10 animate-spin" />
            </div>

            <button
              onClick={drawDaily}
              disabled={isDrawing}
              id="draw-daily-btn"
              className="py-3.5 px-8 rounded-xl bg-linear-to-r from-red-800 via-amber-800 to-red-900 text-amber-50 font-black text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {isDrawing ? "神念感應中..." : "誠心抽取今日日籤"}
            </button>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in">
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
              <span className="text-xs font-bold text-red-800 block mb-1">
                今日守護：【{dailyDrawn.deity.name}】
              </span>
              <h4 className="text-lg font-black text-amber-950 mb-1 font-serif">
                {dailyDrawn.poem.poemNumber}・{dailyDrawn.poem.title}
              </h4>
              <span className="inline-block text-[11px] px-2 py-0.5 rounded-sm bg-red-100 text-red-800 font-bold border border-red-200 mb-3">
                {dailyDrawn.poem.rank}
              </span>

              {/* 4 verses */}
              <div className="space-y-1.5 my-3 text-stone-800 font-serif text-sm sm:text-base font-semibold">
                {dailyDrawn.poem.verses.map((v, i) => (
                  <p key={i}>{v}</p>
                ))}
              </div>

              <p className="text-xs text-stone-700 mt-3 border-t border-amber-200/60 pt-2 leading-relaxed">
                {dailyDrawn.poem.classicalMeaning}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={drawDaily}
                id="redraw-daily-btn"
                className="flex-1 py-2.5 px-3 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重感應</span>
              </button>
              <button
                onClick={() => {
                  onSelectPoemForDeepDive(dailyDrawn.deity, dailyDrawn.poem);
                  onClose();
                }}
                id="deep-dive-daily-btn"
                className="flex-2 py-2.5 px-4 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>進入全方位 AI 深度解析</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
