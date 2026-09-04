import React from "react";
import { Sparkles, Users, Calendar, BookmarkCheck, Volume2, VolumeX } from "lucide-react";

interface NavbarProps {
  onOpenCouncil: () => void;
  onOpenDaily: () => void;
  onOpenHistory: () => void;
  historyCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onGoHome: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCouncil,
  onOpenDaily,
  onOpenHistory,
  historyCount,
  soundEnabled,
  onToggleSound,
  onGoHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#fbf8f3]/90 backdrop-blur-md border-b border-amber-900/10 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <button
          onClick={onGoHome}
          id="nav-brand-btn"
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
        >
          <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-700 via-red-800 to-amber-900 flex items-center justify-center text-amber-100 font-bold shadow-sm ring-2 ring-amber-400/40 group-hover:ring-amber-500 transition-all">
            <span className="text-xl tracking-tighter">神</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-amber-950 tracking-wider">
                眾神靈籤
              </h1>
              <span className="text-[11px] bg-amber-100 text-amber-900 font-semibold px-2 py-0.5 rounded-full border border-amber-300/80">
                天機顯化
              </span>
            </div>
            <p className="text-[11px] text-stone-700 hidden sm:block">
              七大正神靈籤・誠敬擲筊・聯合眾神大會・AI現代釋惑
            </p>
          </div>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Grand Council of Deities CTA */}
          <button
            onClick={onOpenCouncil}
            id="nav-council-btn"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg bg-linear-to-r from-amber-700 via-red-700 to-amber-800 text-amber-50 text-xs sm:text-sm font-bold shadow-sm hover:shadow-md hover:from-amber-600 hover:to-red-700 transition-all cursor-pointer ring-1 ring-amber-300/30"
          >
            <Users className="w-4 h-4 text-amber-200 animate-pulse" />
            <span className="whitespace-nowrap">聯合眾神大會</span>
          </button>

          {/* Daily Fortune */}
          <button
            onClick={onOpenDaily}
            id="nav-daily-btn"
            title="今日靈籤微占"
            className="flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs sm:text-sm font-medium transition-colors border border-stone-200 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-amber-800" />
            <span className="hidden md:inline">今日靈籤</span>
          </button>

          {/* Divination History Book */}
          <button
            onClick={onOpenHistory}
            id="nav-history-btn"
            title="解籤典藏簿"
            className="relative flex items-center gap-1 px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg bg-stone-100 text-stone-700 hover:bg-stone-200 text-xs sm:text-sm font-medium transition-colors border border-stone-200 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4 text-amber-800" />
            <span className="hidden md:inline">典藏簿</span>
            {historyCount > 0 && (
              <span className="ml-0.5 text-[10px] bg-red-700 text-white font-bold w-4 h-4 rounded-full inline-flex items-center justify-center">
                {historyCount}
              </span>
            )}
          </button>

          {/* Audio toggle */}
          <button
            onClick={onToggleSound}
            id="nav-sound-toggle"
            title={soundEnabled ? "關閉廟宇音效" : "開啟廟宇音效"}
            className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
            aria-label="切換音效"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-800" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
