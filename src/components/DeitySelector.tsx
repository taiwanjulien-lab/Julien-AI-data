import React, { useState } from "react";
import { Deity } from "../types";
import {
  ArrowRight,
  Flame,
  Sparkles,
  Users,
  Droplets,
  Landmark,
  Globe2,
} from "lucide-react";
import { DeityMascot } from "./DeityMascot";

interface DeitySelectorProps {
  deities: Deity[];
  onSelectDeity: (deity: Deity) => void;
  onOpenCouncil: () => void;
}

export const DeitySelector: React.FC<DeitySelectorProps> = ({
  deities,
  onSelectDeity,
  onOpenCouncil,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredDeities = deities.filter((deity) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "water") {
      return deity.element === "水" || deity.category === "water";
    }
    if (selectedCategory === "five_religions") {
      return deity.category === "five_religions";
    }
    if (selectedCategory === "traditional") {
      return deity.category === "traditional";
    }
    return true;
  });

  return (
    <div className="py-6 sm:py-10">
      {/* Banner / Hero Statement */}
      <div className="text-center max-w-3xl mx-auto px-4 mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          <span>正統道廟傳承・五行水神・五教聖人會盟</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-amber-950 tracking-wide mb-3">
          請示諸天神聖・賜吉避凶
        </h2>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          人生如行舟，難免逢風浪阻滯。每尊神明皆賦予專屬<strong>公仔版法相</strong>。
          選定相應殿堂，誠心稟報、抽籤擲筊，由神明聖哲垂賜靈籤，並輔以現代智能戰略深度剖析破局之道！
        </p>
      </div>

      {/* Feature Highlight: Grand Council of Deities Card */}
      <div className="max-w-5xl mx-auto px-4 mb-8">
        <div
          onClick={onOpenCouncil}
          id="hero-council-card"
          className="relative overflow-hidden rounded-2xl bg-linear-to-r from-amber-950 via-stone-900 to-blue-950 text-amber-50 p-6 sm:p-8 border-2 border-amber-500/40 shadow-xl hover:shadow-2xl hover:border-amber-400 transition-all cursor-pointer group"
        >
          {/* Decorative traditional cloud corners */}
          <div className="absolute top-2 left-2 text-amber-500/20 text-xs tracking-widest pointer-events-none">
            卍 眾神金闕・自選列席 卍
          </div>
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  重大人生決策專屬
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-200 border border-sky-400/30 flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  可指定特定神明聖人列席召開大會
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black tracking-wide text-amber-100 flex items-center gap-2">
                <span>聯合眾神大會・圓桌智庫會診解惑</span>
                <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed">
                遭遇跨領域難題？支援自選指定列席！玉皇上帝、觀音菩薩、玄天上帝、關公、媽祖、釋迦牟尼佛、耶穌基督、真主阿拉、太上老君、孔子齊聚金闕，
                跨界跨智慧出具多維度「聯合神聖玉旨」！
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="hidden sm:flex -space-x-3 items-center">
                <DeityMascot deityId="jade_emperor" size="xs" animated={false} />
                <DeityMascot deityId="guanyin" size="xs" animated={false} />
                <DeityMascot deityId="xuantian" size="xs" animated={false} />
                <DeityMascot deityId="buddha" size="xs" animated={false} />
                <DeityMascot deityId="jesus" size="xs" animated={false} />
                <DeityMascot deityId="laozi" size="xs" animated={false} />
              </div>
              <button className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 text-stone-950 font-black text-sm shadow-md group-hover:from-amber-400 group-hover:to-amber-500 transition-all flex items-center gap-2">
                <span>指定神明召開大會</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="max-w-5xl mx-auto px-4 mb-6">
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100/90 rounded-2xl border border-stone-200/80">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === "all"
                ? "bg-amber-900 text-amber-50 shadow-sm"
                : "text-stone-700 hover:bg-stone-200/70"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>全部諸神聖人 ({deities.length})</span>
          </button>
          <button
            onClick={() => setSelectedCategory("traditional")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === "traditional"
                ? "bg-amber-800 text-amber-50 shadow-sm"
                : "text-stone-700 hover:bg-stone-200/70"
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>正統宮廟尊神</span>
          </button>
          <button
            onClick={() => setSelectedCategory("water")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === "water"
                ? "bg-blue-800 text-blue-50 shadow-sm"
                : "text-stone-700 hover:bg-stone-200/70"
            }`}
          >
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span>五行水神專區 (玄天・觀音・媽祖)</span>
          </button>
          <button
            onClick={() => setSelectedCategory("five_religions")}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === "five_religions"
                ? "bg-purple-900 text-purple-50 shadow-sm"
                : "text-stone-700 hover:bg-stone-200/70"
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>世界五教聖人 (佛・耶・阿・老・孔)</span>
          </button>
        </div>
      </div>

      {/* Deity Shrine Grid */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg sm:text-xl font-bold text-amber-950 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-700 inline-block" />
            <span>選擇叩拜請示神明 ({filteredDeities.length} 尊)</span>
          </h3>
          <span className="text-xs text-stone-500">
            點選公仔法相進入殿堂進行抽籤擲筊
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDeities.map((deity) => (
            <div
              key={deity.id}
              onClick={() => onSelectDeity(deity)}
              id={`deity-card-${deity.id}`}
              className="group relative bg-[#fdfcf9] rounded-2xl border border-amber-900/15 p-5 shadow-xs hover:shadow-xl hover:border-amber-700/60 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              {/* Card top banner with Chibi Mascot */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    {/* Chibi Mascot Pedestal */}
                    <div className="relative p-1 rounded-2xl bg-amber-50/80 border border-amber-200/60 shadow-inner group-hover:scale-110 transition-transform duration-300">
                      <DeityMascot deityId={deity.id} size="sm" showAura />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-stone-900 group-hover:text-red-800 transition-colors">
                        {deity.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 tracking-wider">
                        {deity.templeHall}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${deity.badgeColor}`}
                  >
                    五行屬{deity.element}
                  </span>
                </div>

                <div className="mb-2.5">
                  <p className="text-xs font-semibold text-amber-900 line-clamp-1">
                    【主司】{deity.domain}
                  </p>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                  {deity.description}
                </p>
              </div>

              {/* Card bottom tags & action */}
              <div className="pt-3 border-t border-stone-200/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {deity.specialties.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="text-xs font-bold text-amber-800 group-hover:text-red-700 inline-flex items-center gap-1 transition-colors">
                  進殿參拜抽籤
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
