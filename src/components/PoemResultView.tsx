import React, { useState, useEffect } from "react";
import { Deity, DivinationPoem, UserPetition, ModernAIInterpretation } from "../types";
import {
  Sparkles,
  Bookmark,
  Check,
  Send,
  MessageSquare,
  Compass,
  Calendar,
  AlertTriangle,
  Lightbulb,
  ShieldAlert,
  RotateCcw,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { playTempleBell } from "../utils/audio";

interface PoemResultViewProps {
  deity: Deity;
  poem: DivinationPoem;
  petition: UserPetition;
  onReset: () => void;
  onSaveRecord: (interpretation?: ModernAIInterpretation) => void;
  soundEnabled: boolean;
}

export const PoemResultView: React.FC<PoemResultViewProps> = ({
  deity,
  poem,
  petition,
  onReset,
  onSaveRecord,
  soundEnabled,
}) => {
  const [aiData, setAiData] = useState<ModernAIInterpretation | null>(null);
  const [loadingAI, setLoadingAI] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [showTraditionalAspects, setShowTraditionalAspects] = useState(false);

  // Deity chat states
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { sender: "user" | "deity"; text: string }[]
  >([]);
  const [isSendingChat, setIsSendingChat] = useState(false);

  // Fetch AI Interpretation on mount
  useEffect(() => {
    let isMounted = true;

    async function fetchInterpretation() {
      setLoadingAI(true);
      try {
        const res = await fetch("/api/interpret-fortune", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            deityName: deity.name,
            deityTitle: deity.title,
            poemIndex: poem.poemNumber,
            poemTitle: poem.title,
            poemVerses: poem.verses,
            historicalStory: poem.historicalStory,
            fortuneRank: poem.rank,
            category: petition.category,
            userQuestion: petition.question,
            userName: petition.userName,
            birthDate: petition.birthDate,
            residence: petition.residence,
          }),
        });
        const result = await res.json();
        if (isMounted && result.success && result.data) {
          setAiData(result.data);
          if (soundEnabled) {
            playTempleBell(440, 2.0);
          }
        }
      } catch (err) {
        console.error("Failed to fetch AI interpretation:", err);
      } finally {
        if (isMounted) setLoadingAI(false);
      }
    }

    fetchInterpretation();
    return () => {
      isMounted = false;
    };
  }, [deity, poem, petition]);

  const handleSave = () => {
    onSaveRecord(aiData || undefined);
    setIsSaved(true);
  };

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isSendingChat) return;

    const userMsg = chatInput.trim();
    setChatInput("");
    setChatMessages((prev) => [...prev, { sender: "user", text: userMsg }]);
    setIsSendingChat(true);

    try {
      const res = await fetch("/api/deity-dialogue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          deityName: deity.name,
          deityTitle: deity.title,
          userQuestion: userMsg,
          poemContext: {
            poemNumber: poem.poemNumber,
            title: poem.title,
            rank: poem.rank,
            userPetition: petition.question,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.reply) {
        setChatMessages((prev) => [
          ...prev,
          { sender: "deity", text: data.reply },
        ]);
        if (soundEnabled) playTempleBell(523.25, 1.5);
      }
    } catch (e) {
      console.error("Chat error:", e);
    } finally {
      setIsSendingChat(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-900/10">
        <button
          onClick={onReset}
          id="poem-new-fortune-btn"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-600 hover:text-amber-950 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>叩謝神恩・求問新事</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            disabled={isSaved}
            id="poem-save-record-btn"
            className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              isSaved
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
            }`}
          >
            {isSaved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>已存入典藏簿</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>收藏此籤</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. Traditional Divine Poem Parchment Scroll */}
      <div className="relative bg-[#fffdf8] border-4 border-amber-900/40 rounded-2xl shadow-xl overflow-hidden mb-8 p-6 sm:p-10">
        {/* Decorative Temple Header Ornament */}
        <div className="text-center mb-6">
          <div className="inline-block px-4 py-1 rounded-full bg-red-800 text-amber-100 text-xs font-bold tracking-widest uppercase mb-2 shadow-xs">
            {deity.templeHall} 賜鑑
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-amber-950 tracking-wider">
            {deity.name} 靈籤
          </h2>
          <p className="text-xs text-stone-700 tracking-widest mt-1">
            {poem.poemNumber}・【{poem.cyclicalSign}】・吉凶：
            <span className="text-red-800 font-bold text-sm ml-1 px-2 py-0.5 bg-red-100 border border-red-300 rounded-sm">
              {poem.rank}
            </span>
          </p>
        </div>

        {/* User Petition Reference Header */}
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-3 text-xs text-stone-700 mb-6 flex flex-wrap items-center justify-between gap-2">
          <span>
            <strong>求籤善信：</strong> {petition.userName} ({petition.gender})
          </span>
          <span>
            <strong>請示事項：</strong> {petition.category.split("・")[0]}
          </span>
          <div className="w-full text-stone-600 text-[11px] pt-1 border-t border-amber-200/50 line-clamp-1">
            「{petition.question}」
          </div>
        </div>

        {/* Four Classical Verses in Traditional Frame */}
        <div className="my-8 py-6 px-4 bg-linear-to-b from-amber-50/70 via-stone-50/30 to-amber-50/70 border-y-2 border-amber-900/20 text-center relative">
          {/* Classical Vermilion Stamp Seal */}
          <div className="absolute right-4 top-4 w-12 h-12 rounded-sm border-2 border-red-700/80 text-red-700 font-serif font-black flex items-center justify-center text-[10px] leading-tight rotate-6 select-none opacity-85">
            神明
            <br />
            印信
          </div>

          <h3 className="text-lg font-bold text-amber-900 mb-4 tracking-widest">
            【 {poem.title} 】
          </h3>

          <div className="space-y-3 font-serif">
            {poem.verses.map((verse, index) => (
              <p
                key={index}
                className="text-lg sm:text-2xl font-black text-stone-900 tracking-widest"
              >
                {verse}
              </p>
            ))}
          </div>
        </div>

        {/* Classical Meaning & Allusion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-6">
          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200">
            <h4 className="font-bold text-amber-950 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-700 inline-block" />
              <span>古人歷史典故</span>
            </h4>
            <p className="text-stone-700 font-semibold mb-1">
              【{poem.historicalStory}】
            </p>
            <p className="text-stone-600 leading-relaxed">
              此籤引述經典傳奇，寓意當事人目前處境若合符節，吉凶轉折皆有古法可循。
            </p>
          </div>

          <div className="bg-stone-50/80 p-4 rounded-xl border border-stone-200">
            <h4 className="font-bold text-amber-950 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-700 inline-block" />
              <span>傳統籤詩解曰</span>
            </h4>
            <p className="text-stone-700 leading-relaxed">
              {poem.classicalMeaning}
            </p>
          </div>
        </div>

        {/* Accordion for Traditional Aspects (事業、財運、婚姻等) */}
        <div>
          <button
            onClick={() => setShowTraditionalAspects(!showTraditionalAspects)}
            className="w-full py-2.5 px-3 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
          >
            <span>展開傳統六大面向細部解曰（事業、財運、感情、健康、官非、家宅）</span>
            {showTraditionalAspects ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>

          {showTraditionalAspects && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-3 pt-3 border-t border-stone-200 text-xs">
              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/60">
                <span className="font-bold text-amber-900 block mb-0.5">
                  💼 求官求職
                </span>
                <span className="text-stone-700">
                  {poem.traditionalAspects.career}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/60">
                <span className="font-bold text-amber-900 block mb-0.5">
                  💰 求財求利
                </span>
                <span className="text-stone-700">
                  {poem.traditionalAspects.wealth}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/60">
                <span className="font-bold text-amber-900 block mb-0.5">
                  ❤️ 婚姻姻緣
                </span>
                <span className="text-stone-700">
                  {poem.traditionalAspects.love}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/60">
                <span className="font-bold text-amber-900 block mb-0.5">
                  🩺 身體健康
                </span>
                <span className="text-stone-700">
                  {poem.traditionalAspects.health}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/60">
                <span className="font-bold text-amber-900 block mb-0.5">
                  ⚖️ 官司爭端
                </span>
                <span className="text-stone-700">
                  {poem.traditionalAspects.lawsuit}
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50/50 border border-amber-200/60">
                <span className="font-bold text-amber-900 block mb-0.5">
                  🏡 闔家安康
                </span>
                <span className="text-stone-700">
                  {poem.traditionalAspects.family}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. Modern AI Fortune Interpretation (結合現代AI運勢分析建議) */}
      <div className="bg-linear-to-b from-[#fcf9f2] to-[#f7f1e6] border-2 border-amber-700/30 rounded-2xl p-6 sm:p-8 shadow-lg mb-8 relative">
        <div className="flex items-center justify-between gap-3 mb-6 pb-3 border-b border-amber-900/15">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-700 text-amber-100 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-amber-950">
                現代 AI 運勢深度戰略解析
              </h3>
              <p className="text-[11px] text-stone-700">
                融合古典籤象、神明天機與現代生活心理學之精闢決策建議
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            Gemini 3.8 智能推演
          </span>
        </div>

        {loadingAI ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-12 h-12 border-4 border-amber-700 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-amber-950 animate-pulse">
              【{deity.name}】聖意融通中，AI 運勢智囊團正為您解剖當前命格與破局良策...
            </p>
            <p className="text-xs text-stone-700">
              結合典故寓意、問題情境與行動指南，稍候片刻即將顯現。
            </p>
          </div>
        ) : aiData ? (
          <div className="space-y-6 animate-in fade-in">
            {/* Modern Empathic Summary */}
            <div className="p-4 sm:p-5 rounded-xl bg-amber-100/50 border border-amber-300/80">
              <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-700" />
                <span>神明當前指引核心白話意涵</span>
              </h4>
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-serif">
                {aiData.modernSummary}
              </p>
            </div>

            {/* Situation Deep Diagnosis */}
            <div className="p-4 sm:p-5 rounded-xl bg-white/80 border border-stone-200">
              <h4 className="text-xs font-bold text-stone-900 mb-2 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-stone-700" />
                <span>現狀情勢與心境盲點診斷</span>
              </h4>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {aiData.situationAnalysis}
              </p>
            </div>

            {/* Two Column: Actionable Steps vs Cautions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Favorable Actions */}
              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                <h4 className="text-xs font-bold text-emerald-950 mb-2.5 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                  <span>破局宜行・具體行動步驟</span>
                </h4>
                <ul className="space-y-2 text-xs text-emerald-900">
                  {aiData.favorableAction.map((act, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 shrink-0">
                        {i + 1}.
                      </span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Caution Points */}
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
                <h4 className="text-xs font-bold text-rose-950 mb-2.5 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>避凶戒惕・當前嚴防陷阱</span>
                </h4>
                <ul className="space-y-2 text-xs text-rose-900">
                  {aiData.cautionPoints.map((caut, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-rose-700 shrink-0">
                        ⚠
                      </span>
                      <span>{caut}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Auspicious Guide Card (時機、方位、貴人、顏色、心法) */}
            <div className="p-4 sm:p-5 rounded-xl bg-linear-to-r from-amber-900 to-stone-900 text-amber-50">
              <h4 className="text-xs font-black tracking-widest text-amber-300 uppercase mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>開運天機與吉利指引</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div className="bg-black/20 p-2.5 rounded-lg border border-amber-500/20">
                  <span className="text-amber-300/70 text-[10px] block">
                    轉機時節
                  </span>
                  <span className="font-bold text-amber-100">
                    {aiData.auspiciousGuide.timing}
                  </span>
                </div>
                <div className="bg-black/20 p-2.5 rounded-lg border border-amber-500/20">
                  <span className="text-amber-300/70 text-[10px] block">
                    吉利方位
                  </span>
                  <span className="font-bold text-amber-100">
                    {aiData.auspiciousGuide.direction}
                  </span>
                </div>
                <div className="bg-black/20 p-2.5 rounded-lg border border-amber-500/20">
                  <span className="text-amber-300/70 text-[10px] block">
                    助益貴人
                  </span>
                  <span className="font-bold text-amber-100">
                    {aiData.auspiciousGuide.noblePerson}
                  </span>
                </div>
                <div className="bg-black/20 p-2.5 rounded-lg border border-amber-500/20">
                  <span className="text-amber-300/70 text-[10px] block">
                    開運吉祥色
                  </span>
                  <span className="font-bold text-amber-100">
                    {aiData.auspiciousGuide.color}
                  </span>
                </div>
              </div>

              {/* Mantra */}
              <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-400/30 text-center">
                <span className="text-[10px] text-amber-300/80 block mb-0.5">
                  【定心開運法語】
                </span>
                <p className="text-sm font-serif font-black text-amber-200 tracking-wider">
                  「{aiData.auspiciousGuide.mantra}」
                </p>
              </div>
            </div>

            {/* Divine Blessing Seal */}
            <div className="text-center pt-2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-red-100 text-red-900 border border-red-300 text-xs font-bold tracking-widest">
                {aiData.divineBlessing}
              </span>
            </div>
          </div>
        ) : null}
      </div>

      {/* 3. Interactive Dialogue with the Deity (向神明請益追問) */}
      <div className="bg-[#fffdfa] border border-amber-900/20 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3 pb-3 border-b border-stone-200">
          <MessageSquare className="w-5 h-5 text-amber-800" />
          <h3 className="text-base font-bold text-amber-950">
            向【{deity.name}】再請益追問
          </h3>
          <span className="text-[11px] text-stone-700">
            針對籤詩未盡之處，懇切請示神明慈悲開示
          </span>
        </div>

        {/* Message Log */}
        {chatMessages.length > 0 && (
          <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 text-xs ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "deity" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-black shrink-0"
                    style={{ backgroundColor: deity.colorHex }}
                  >
                    {deity.name.charAt(0)}
                  </div>
                )}
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-amber-800 text-amber-50 rounded-tr-none"
                      : "bg-stone-100 text-stone-800 border border-stone-200 rounded-tl-none font-serif"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Input Box */}
        <form onSubmit={handleSendChat} className="flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`恭稟${deity.name}：若我想在三個月內做這項決定，神明有何叮嚀？`}
            id="input-deity-chat"
            className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-stone-300 bg-stone-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
          />
          <button
            type="submit"
            disabled={isSendingChat || !chatInput.trim()}
            id="send-deity-chat-btn"
            className="px-4 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-100 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer shrink-0"
          >
            <span>{isSendingChat ? "感應中..." : "請示"}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
