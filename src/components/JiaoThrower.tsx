import React, { useState } from "react";
import { Deity, DivinationPoem, JiaoThrowResult, JiaoType } from "../types";
import { CheckCircle2, AlertCircle, HelpCircle, ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { playJiaoDrop, playTempleBell } from "../utils/audio";
import { DeityMascot } from "./DeityMascot";

interface JiaoThrowerProps {
  deity: Deity;
  poem: DivinationPoem;
  onConfirmed: () => void;
  onRedrawPoem: () => void;
  soundEnabled: boolean;
}

export const JiaoThrower: React.FC<JiaoThrowerProps> = ({
  deity,
  poem,
  onConfirmed,
  onRedrawPoem,
  soundEnabled,
}) => {
  const [targetShengCount, setTargetShengCount] = useState<1 | 3>(1);
  const [consecutiveSheng, setConsecutiveSheng] = useState(0);
  const [isThrowing, setIsThrowing] = useState(false);
  const [lastResult, setLastResult] = useState<JiaoThrowResult | null>(null);

  const handleThrow = () => {
    if (isThrowing) return;
    setIsThrowing(true);

    const rand = Math.random();
    let leftFlat = false;
    let rightFlat = false;
    let type: JiaoType = "sheng";
    let label = "聖筊（允杯）";
    let description = "一平一凸，神明感應應允！此籤確實為神明所賜。";

    if (rand < 0.65) {
      // 聖筊 (One flat, one round)
      type = "sheng";
      leftFlat = true;
      rightFlat = false;
      label = "聖筊（允杯）";
      description = "一平一凸，天地交泰，神明首肯應允！此籤確為神聖親賜之靈應。";
    } else if (rand < 0.85) {
      // 笑筊 (Both flat)
      type = "xiao";
      leftFlat = true;
      rightFlat = true;
      label = "笑筊（笑杯）";
      description = "兩面皆平，神明微笑。意指所問尚有隱情、或心中早有決斷，請靜心定氣後再次請示。";
    } else {
      // 陰筊 (Both round)
      type = "yin";
      leftFlat = false;
      rightFlat = false;
      label = "陰筊（怒筊/沒杯）";
      description = "兩面皆凸，神明搖頭不允。此籤非神明欲賜之籤，宜回籤筒重新恭敬搖籤。";
    }

    // Sound effect
    if (soundEnabled) {
      setTimeout(() => playJiaoDrop(type === "sheng"), 450);
    }

    setTimeout(() => {
      setIsThrowing(false);
      const res: JiaoThrowResult = {
        type,
        label,
        description,
        leftIsFlat: leftFlat,
        rightIsFlat: rightFlat,
      };
      setLastResult(res);

      if (type === "sheng") {
        const nextCount = consecutiveSheng + 1;
        setConsecutiveSheng(nextCount);
        if (soundEnabled) {
          playTempleBell(659.25, 2.0); // E5 Bell
        }
      } else {
        setConsecutiveSheng(0);
      }
    }, 850);
  };

  const isComplete = consecutiveSheng >= targetShengCount;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 text-center">
      {/* Step Indicator with Deity Mascot */}
      <div className="flex items-center justify-center gap-3 mb-4">
        <DeityMascot deityId={deity.id} size="sm" showAura />
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>第四步：擲筊請示・領受聖諭</span>
        </div>
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-amber-950 mb-1">
        擲筊請示【{deity.name}】是否為此籤
      </h2>
      <p className="text-xs sm:text-sm text-stone-600 mb-6">
        所抽籤號：
        <span className="font-bold text-amber-950 ml-1">
          【{poem.poemNumber}・{poem.title}】
        </span>
      </p>

      {/* Mode Switcher */}
      <div className="inline-flex p-1 rounded-xl bg-stone-200/80 border border-stone-300 text-xs mb-6">
        <button
          onClick={() => {
            setTargetShengCount(1);
            setConsecutiveSheng(0);
            setLastResult(null);
          }}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            targetShengCount === 1
              ? "bg-white text-amber-950 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          一聖筊定案 (現代便民)
        </button>
        <button
          onClick={() => {
            setTargetShengCount(3);
            setConsecutiveSheng(0);
            setLastResult(null);
          }}
          className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            targetShengCount === 3
              ? "bg-white text-amber-950 shadow-xs"
              : "text-stone-600 hover:text-stone-900"
          }`}
        >
          連三聖筊 (嚴謹古禮)
        </button>
      </div>

      {/* Progress for 3-sheng mode */}
      {targetShengCount === 3 && (
        <div className="flex justify-center items-center gap-2 mb-6">
          <span className="text-xs text-stone-600 font-medium">聖筊進度：</span>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                i < consecutiveSheng
                  ? "bg-red-700 text-white shadow-md scale-110"
                  : "bg-stone-200 text-stone-400"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>
      )}

      {/* 3D Visual Jiao Blocks Arena with Dynamic Toss Physics */}
      <div className="relative w-80 sm:w-96 h-64 mx-auto bg-radial from-amber-100/70 via-stone-100 to-[#e8ded1] rounded-3xl border-2 border-amber-900/30 shadow-inner flex flex-col items-center justify-center p-6 mb-6 overflow-hidden">
        {/* Decorative Temple Floor Tiles Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#78350f_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Floor landing shadow */}
        <div
          className={`absolute bottom-6 w-56 h-8 bg-amber-950/20 rounded-full blur-md transition-all duration-300 ${
            isThrowing ? "scale-50 opacity-20" : "scale-100 opacity-60"
          }`}
        />

        {/* Jiao blocks (Left & Right) with Dynamic Physics Animation */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 z-10">
          {/* Left Block */}
          <div
            className={`transition-all duration-300 ${
              isThrowing ? "animate-jiao-left" : ""
            }`}
          >
            <div
              className={`w-18 h-32 rounded-[50%/25%] border-3 border-amber-950/80 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${
                lastResult?.leftIsFlat
                  ? "bg-linear-to-b from-[#fef3c7] via-[#fae8b0] to-[#fde68a] rotate-12 shadow-amber-900/20" // Flat side (陽)
                  : "bg-linear-to-b from-[#991b1b] via-[#7f1d1d] to-[#450a0a] -rotate-12 shadow-red-950/40" // Curved side (陰)
              }`}
            >
              {/* Wood Grain / Lacquer Texture */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />

              <span
                className={`text-xs font-black tracking-widest z-10 ${
                  lastResult?.leftIsFlat ? "text-amber-950" : "text-amber-200"
                }`}
              >
                {lastResult ? (lastResult.leftIsFlat ? "陽面 (平)" : "陰面 (凸)") : "筊"}
              </span>
              <span
                className={`text-[9px] mt-1 z-10 font-bold ${
                  lastResult?.leftIsFlat ? "text-amber-700" : "text-amber-300/80"
                }`}
              >
                {lastResult?.leftIsFlat ? "仰面受天" : "覆地伏魔"}
              </span>
            </div>
          </div>

          {/* Right Block */}
          <div
            className={`transition-all duration-300 ${
              isThrowing ? "animate-jiao-right" : ""
            }`}
          >
            <div
              className={`w-18 h-32 rounded-[50%/25%] border-3 border-amber-950/80 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${
                lastResult?.rightIsFlat
                  ? "bg-linear-to-b from-[#fef3c7] via-[#fae8b0] to-[#fde68a] -rotate-12 shadow-amber-900/20" // Flat side (陽)
                  : "bg-linear-to-b from-[#991b1b] via-[#7f1d1d] to-[#450a0a] rotate-12 shadow-red-950/40" // Curved side (陰)
              }`}
            >
              {/* Wood Grain / Lacquer Texture */}
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]" />

              <span
                className={`text-xs font-black tracking-widest z-10 ${
                  lastResult?.rightIsFlat ? "text-amber-950" : "text-amber-200"
                }`}
              >
                {lastResult ? (lastResult.rightIsFlat ? "陽面 (平)" : "陰面 (凸)") : "杯"}
              </span>
              <span
                className={`text-[9px] mt-1 z-10 font-bold ${
                  lastResult?.rightIsFlat ? "text-amber-700" : "text-amber-300/80"
                }`}
              >
                {lastResult?.rightIsFlat ? "仰面受天" : "覆地伏魔"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Result Callout with Mascot reaction */}
      {lastResult && (
        <div
          className={`max-w-md mx-auto p-4 rounded-2xl mb-6 text-left border shadow-md flex items-start gap-3 animate-in fade-in ${
            lastResult.type === "sheng"
              ? "bg-emerald-50/90 border-emerald-300 text-emerald-950"
              : lastResult.type === "xiao"
              ? "bg-amber-50/90 border-amber-300 text-amber-950"
              : "bg-rose-50/90 border-rose-300 text-rose-950"
          }`}
        >
          <div className="shrink-0 p-1 bg-white rounded-xl shadow-xs">
            <DeityMascot deityId={deity.id} size="xs" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 font-black text-base mb-1">
              {lastResult.type === "sheng" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              ) : lastResult.type === "xiao" ? (
                <HelpCircle className="w-5 h-5 text-amber-700" />
              ) : (
                <AlertCircle className="w-5 h-5 text-rose-700" />
              )}
              <span>{lastResult.label}</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">{lastResult.description}</p>
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="max-w-md mx-auto space-y-3">
        {isComplete ? (
          <button
            onClick={onConfirmed}
            id="view-poem-btn"
            className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-red-800 via-amber-800 to-red-900 text-amber-50 font-black text-base sm:text-lg shadow-xl hover:shadow-2xl hover:from-red-700 hover:to-amber-700 transition-all cursor-pointer flex items-center justify-center gap-2 animate-pulse"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>神明允准！恭閱籤詩與AI大師解惑</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleThrow}
              disabled={isThrowing}
              id="throw-jiao-btn"
              className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-amber-700 via-red-800 to-amber-800 text-amber-50 font-bold text-base shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
            >
              <span>{isThrowing ? "筊杯翻滾騰空落地中..." : "誠心擲筊請示"}</span>
            </button>

            {lastResult?.type === "yin" && (
              <button
                onClick={onRedrawPoem}
                id="redraw-poem-btn"
                className="w-full py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 bg-stone-50 hover:bg-stone-100 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>神明未允此籤・回筒重新抽籤</span>
              </button>
            )}
          </div>
        )}

        {/* Traditional explanation note */}
        <div className="pt-2 text-[11px] text-stone-600">
          註：聖筊（一平一凸）代表神明應允；笑筊（兩平）可再誠心稟明重擲；陰筊（兩凸）代表非此籤，宜重新搖筒抽籤。
        </div>
      </div>
    </div>
  );
};
