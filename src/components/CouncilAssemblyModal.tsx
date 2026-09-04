import React, { useState } from "react";
import { Deity, CouncilAssemblyResult } from "../types";
import {
  X,
  Users,
  Flame,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass,
  Crown,
  HeartHandshake,
  GraduationCap,
  Coins,
  Baby,
  Lightbulb,
  CheckCircle2,
  Check,
  Plus,
  Waves,
} from "lucide-react";
import { playTempleBell } from "../utils/audio";
import { DeityMascot } from "./DeityMascot";

interface CouncilAssemblyModalProps {
  deities: Deity[];
  onClose: () => void;
  soundEnabled: boolean;
}

export const CouncilAssemblyModal: React.FC<CouncilAssemblyModalProps> = ({
  deities,
  onClose,
  soundEnabled,
}) => {
  const [userName, setUserName] = useState("");
  const [category, setCategory] = useState("重大人生交叉路口");
  const [question, setQuestion] = useState("");
  const [concernDetails, setConcernDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [councilResult, setCouncilResult] = useState<CouncilAssemblyResult | null>(null);
  const [activeDeityTab, setActiveDeityTab] = useState<string>("jade_emperor");

  // Selected deities for the custom council assembly
  const [selectedDeityIds, setSelectedDeityIds] = useState<string[]>([
    "jade_emperor",
    "guanyin",
    "guan_gong",
    "mazu",
    "wenchang",
    "tudigong",
    "zhusheng",
  ]);

  const toggleDeitySelection = (id: string) => {
    setSelectedDeityIds((prev) => {
      if (prev.includes(id)) {
        if (prev.length <= 1) {
          alert("大會至少需指定一位神明列席指引！");
          return prev;
        }
        return prev.filter((dId) => dId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const applyPreset = (preset: "all" | "traditional" | "water" | "five_religions") => {
    if (preset === "all") {
      setSelectedDeityIds(deities.map((d) => d.id));
    } else if (preset === "traditional") {
      setSelectedDeityIds([
        "jade_emperor",
        "guanyin",
        "guan_gong",
        "mazu",
        "wenchang",
        "tudigong",
        "zhusheng",
      ]);
    } else if (preset === "water") {
      setSelectedDeityIds(
        deities.filter((d) => d.category === "water" || d.element === "水").map((d) => d.id)
      );
    } else if (preset === "five_religions") {
      setSelectedDeityIds(
        deities.filter((d) => d.category === "five_religions").map((d) => d.id)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      alert("請填寫您欲請眾神聯席商討的核心困惑");
      return;
    }

    if (selectedDeityIds.length === 0) {
      alert("請至少指定一位神明聖哲列席大會！");
      return;
    }

    setLoading(true);
    setCouncilResult(null);

    if (soundEnabled) {
      playTempleBell(329.63, 3.0); // E4 deep bell
      setTimeout(() => playTempleBell(440, 2.5), 600);
      setTimeout(() => playTempleBell(587.33, 2.5), 1200);
    }

    const requestedDeities = deities
      .filter((d) => selectedDeityIds.includes(d.id))
      .map((d) => ({
        id: d.id,
        name: d.name,
        title: d.title,
        specialties: d.specialties,
        domain: d.domain,
      }));

    try {
      const res = await fetch("/api/council-assembly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: userName.trim() || "善信緣主",
          category,
          userQuestion: question.trim(),
          concernDetails: concernDetails.trim(),
          requestedDeities,
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setCouncilResult(data.data);
        if (data.data.deityPerspectives?.length > 0) {
          setActiveDeityTab(data.data.deityPerspectives[0].deityId);
        }
        if (soundEnabled) {
          playTempleBell(659.25, 2.5);
        }
      }
    } catch (err) {
      console.error("Council assembly failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-[#fcf9f2] rounded-2xl sm:rounded-3xl border-2 border-amber-500/40 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="bg-linear-to-r from-stone-950 via-red-950 to-amber-950 text-amber-50 px-6 py-5 flex items-center justify-between border-b border-amber-500/30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Users className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black tracking-wider text-amber-100">
                  聯合眾神大會・金闕圓桌解惑
                </h3>
                <span className="text-[10px] bg-amber-500/20 border border-amber-400/50 text-amber-300 px-2 py-0.5 rounded-full font-bold">
                  {selectedDeityIds.length} 位神明列席
                </span>
              </div>
              <p className="text-xs text-amber-200/80 hidden sm:block">
                自由指定特別神明召開大會，集結天庭正神、水德尊神與五教聖哲之合議聖意
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            id="close-council-modal"
            className="p-2 text-amber-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!councilResult ? (
            <div>
              {/* Custom Deities Selection Section */}
              <div className="mb-6 p-4 rounded-2xl bg-amber-50/80 border border-amber-300/70 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-xs sm:text-sm font-black text-amber-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-700" />
                      <span>指定召開大會神明（已指定 {selectedDeityIds.length} / {deities.length} 尊）</span>
                    </h4>
                    <p className="text-[11px] text-stone-600">
                      點選下方卡片可自由新增或移除特定神明，亦可使用快捷組合召開大會：
                    </p>
                  </div>

                  {/* Preset Quick Filters */}
                  <div className="flex flex-wrap gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => applyPreset("all")}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
                    >
                      🌟 全體諸聖 ({deities.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("traditional")}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
                    >
                      👑 宮廟七神 (7)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("water")}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-sky-100 hover:bg-sky-200 text-sky-900 border border-sky-300 transition-colors cursor-pointer"
                    >
                      🌊 五行屬水 (3)
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPreset("five_religions")}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-100 hover:bg-purple-200 text-purple-900 border border-purple-300 transition-colors cursor-pointer"
                    >
                      🕊️ 五教聖人 (5)
                    </button>
                  </div>
                </div>

                {/* Deities Mascot Selection Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-2.5 max-h-56 overflow-y-auto p-1">
                  {deities.map((d) => {
                    const isSelected = selectedDeityIds.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => toggleDeitySelection(d.id)}
                        className={`p-2 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between relative ${
                          isSelected
                            ? "bg-amber-100/90 border-amber-600 shadow-xs ring-2 ring-amber-500/50"
                            : "bg-white/60 border-stone-200 opacity-60 hover:opacity-100"
                        }`}
                      >
                        {/* Checkbox indicator badge */}
                        <div
                          className={`absolute top-1 right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                            isSelected
                              ? "bg-amber-700 text-white shadow-xs"
                              : "bg-stone-200 text-stone-500"
                          }`}
                        >
                          {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                        </div>

                        <div className="my-1 scale-90">
                          <DeityMascot deityId={d.id} size="xs" />
                        </div>

                        <span className="text-xs font-black text-amber-950 block leading-tight mt-1">
                          {d.name}
                        </span>
                        <span className="text-[9px] text-stone-700 block truncate max-w-full">
                          {d.specialties[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Council Petition Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      善信稱謂 / 姓名
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="例如：陳信士 / 林信女"
                      id="council-input-name"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      困惑主軸類別
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      id="council-select-category"
                      className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value="職涯轉換與創業抉擇">
                        職涯轉換與創業抉擇 (工作 vs 機遇)
                      </option>
                      <option value="重大投資與合夥爭議">
                        重大投資與合夥爭議 (利益 vs 風險)
                      </option>
                      <option value="家庭關係與個人志業兩難">
                        家庭關係與個人志業兩難 (親情 vs 前途)
                      </option>
                      <option value="人生卡關與全方位方向迷惘">
                        人生卡關與全方位方向迷惘 (身心靈重整)
                      </option>
                      <option value="考試升等與生涯佈局">
                        考試升等與生涯佈局 (功名 vs 實務)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    叩問之核心兩難難題 <span className="text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="例：我該放棄目前穩定但枯燥的工作，投入朋友邀請的AI合夥創業嗎？"
                    id="council-input-question"
                    className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500/50 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-800 mb-1">
                    詳細背景補充 (越詳實，眾神裁示越精闢)
                  </label>
                  <textarea
                    rows={4}
                    value={concernDetails}
                    onChange={(e) => setConcernDetails(e.target.value)}
                    placeholder="例：現狀有房貸壓力，家中有長輩與幼兒需照顧；新創合夥初期收入不穩但有發展潛力。心中擔心合夥人可靠度，又怕錯過時代風口..."
                    id="council-input-details"
                    className="w-full text-sm p-3.5 rounded-lg border border-stone-300 bg-white focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    id="council-submit-btn"
                    className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-amber-700 via-red-800 to-amber-900 text-amber-50 font-black text-base shadow-xl hover:from-amber-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
                    <span>
                      {loading
                        ? `天門大開・召集指定 ${selectedDeityIds.length} 尊神明會商中...`
                        : `敲響天鼓・召集指定 ${selectedDeityIds.length} 尊神明大會求解`}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Council Output Results View */
            <div className="space-y-6 animate-in fade-in">
              {/* Imperial Decree Header */}
              <div className="relative bg-linear-to-r from-stone-950 via-amber-950 to-stone-900 text-amber-50 rounded-2xl p-6 border-2 border-amber-400/50 shadow-xl overflow-hidden">
                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full text-xs font-black bg-red-800/80 text-amber-200 border border-amber-300/40">
                      金闕諸聖玉旨敕封 ({councilResult.deityPerspectives.length} 尊神聖聯席)
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-200">
                        天時運勢勝算指數：
                      </span>
                      <span className="text-lg font-black text-amber-300">
                        {councilResult.favorableIndex} / 100
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-amber-200 font-serif tracking-wider mb-3">
                    {councilResult.councilDecreeTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-serif">
                    {councilResult.overallVerdict}
                  </p>
                </div>
              </div>

              {/* Deities Dedicated Perspectives Tabs with Mascots */}
              <div>
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>列席神明各自神諭觀點（點選公仔頭像切換聆聽）</span>
                </h4>

                {/* Tab Switcher */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-4">
                  {councilResult.deityPerspectives.map((dp) => (
                    <button
                      key={dp.deityId}
                      onClick={() => setActiveDeityTab(dp.deityId)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2 ${
                        activeDeityTab === dp.deityId
                          ? "bg-amber-800 text-amber-50 border-amber-900 shadow-md ring-2 ring-amber-400/50"
                          : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                      }`}
                    >
                      <div className="shrink-0 scale-75">
                        <DeityMascot deityId={dp.deityId} size="xs" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-xs font-bold truncate block">
                          {dp.deityName}
                        </span>
                        <span
                          className={`text-[9px] block truncate ${
                            activeDeityTab === dp.deityId
                              ? "text-amber-200"
                              : "text-stone-500"
                          }`}
                        >
                          {dp.focusDimension}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Active Deity Detail Card with Mascot */}
                {(() => {
                  const active = councilResult.deityPerspectives.find(
                    (p) => p.deityId === activeDeityTab
                  );
                  if (!active) return null;
                  return (
                    <div className="p-5 rounded-2xl bg-white border-2 border-amber-900/20 shadow-md">
                      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-stone-200">
                        <div className="flex items-center gap-3">
                          <DeityMascot deityId={active.deityId} size="sm" showAura />
                          <div>
                            <h5 className="font-black text-amber-950 text-base">
                              {active.deityName}
                            </h5>
                            <span className="text-xs text-stone-700 font-medium">
                              {active.title} ｜ 主司層面：<strong>{active.focusDimension}</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <span className="text-[10px] font-bold text-amber-800 block mb-1">
                          【神聖原聲諭示】
                        </span>
                        <p className="text-sm sm:text-base font-serif text-stone-800 leading-relaxed italic bg-amber-50/60 p-4 rounded-xl border border-amber-200/60">
                          「{active.divineVoice}」
                        </p>
                      </div>

                      <div className="bg-emerald-50/80 p-3 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">行事實踐指引：</strong>
                          <span>{active.actionTip}</span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* 3-Stage Joint Strategic Roadmap */}
              <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200">
                <h4 className="text-xs font-bold text-amber-950 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Lightbulb className="w-4 h-4 text-amber-700" />
                  <span>眾神大會聯席行動策略路徑圖 (3 階段)</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {councilResult.jointActionPlan.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs"
                    >
                      <span className="font-black text-amber-900 block mb-1 text-xs">
                        {step.stage}
                      </span>
                      <p className="text-stone-700 leading-relaxed">
                        {step.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Imperial Amulet Word & Reset */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-amber-100/60 border border-amber-300">
                <div>
                  <span className="text-[10px] text-amber-900 font-bold block">
                    【諸聖敕賜護身開運真言】
                  </span>
                  <span className="text-base font-black text-red-900 tracking-widest font-serif">
                    {councilResult.amuletWord}
                  </span>
                </div>

                <button
                  onClick={() => setCouncilResult(null)}
                  className="px-4 py-2 rounded-lg bg-stone-800 text-stone-100 hover:bg-stone-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  重新指定神明或叩問另一事項
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
