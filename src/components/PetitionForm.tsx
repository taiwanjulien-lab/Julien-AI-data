import React, { useState } from "react";
import { Deity, UserPetition } from "../types";
import { ArrowLeft, Sparkles, HelpCircle, HeartHandshake } from "lucide-react";

interface PetitionFormProps {
  deity: Deity;
  onBack: () => void;
  onSubmit: (petition: UserPetition) => void;
}

const CATEGORIES = [
  "事業職場・升遷轉職",
  "商務財運・合夥投資",
  "感情姻緣・家庭和睦",
  "考試升學・公職證照",
  "求子求嗣・育兒成長",
  "家宅平安・置產搬遷",
  "身心健康・消災化厄",
  "重大轉折・人生方向",
];

export const PetitionForm: React.FC<PetitionFormProps> = ({
  deity,
  onBack,
  onSubmit,
}) => {
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("善信");
  const [birthDate, setBirthDate] = useState("");
  const [residence, setResidence] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) {
      alert("請填寫您欲叩問神明的具體事項或困惑");
      return;
    }
    onSubmit({
      userName: userName.trim() || "虔誠善信",
      gender,
      birthDate: birthDate.trim() || "吉時良辰",
      residence: residence.trim() || "本境善信",
      category,
      question: question.trim(),
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-10">
      {/* Back button */}
      <button
        onClick={onBack}
        id="petition-back-btn"
        className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-amber-950 mb-6 font-medium cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>返回殿堂重選神明</span>
      </button>

      {/* Deity Shrine Header */}
      <div className="bg-[#fcfaf7] border border-amber-900/15 rounded-2xl p-6 mb-6 shadow-xs relative overflow-hidden">
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-md shrink-0"
            style={{ backgroundColor: deity.colorHex }}
          >
            {deity.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-amber-950">
                {deity.templeHall}・{deity.name}
              </h2>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${deity.badgeColor}`}>
                {deity.title.split("・")[0]}
              </span>
            </div>
            <p className="text-xs text-amber-900 mt-1">
              【迎神寶誥】{deity.greetingMantra}
            </p>
          </div>
        </div>
      </div>

      {/* Petition Form */}
      <div className="bg-[#fffdfa] border-2 border-amber-900/20 rounded-2xl p-6 sm:p-8 shadow-md">
        <div className="border-b border-amber-900/10 pb-4 mb-6">
          <h3 className="text-lg font-bold text-amber-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-700" />
            <span>虔心通稟・疏文填報</span>
          </h3>
          <p className="text-xs text-stone-700 mt-1">
            向神明求籤稟報，宜清晰道出自己身分、居所與當前處境，神意自能洞徹如鏡。
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                善信稱謂 / 姓名 <span className="text-amber-800">*</span>
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="例如：王大明（或稱：王信士）"
                id="input-username"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            {/* Gender / Honorific */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                稱謂身分
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                id="select-gender"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 cursor-pointer"
              >
                <option value="信士">信士 (男性)</option>
                <option value="信女">信女 (女性)</option>
                <option value="弟子">弟子 (敬稱)</option>
                <option value="緣主">緣主 (通用)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Birth Info */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                生辰八字 / 出生年月日 (選填)
              </label>
              <input
                type="text"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                placeholder="例：民國80年農曆五月初五吉時"
                id="input-birthdate"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
              />
            </div>

            {/* Residence */}
            <div>
              <label className="block text-xs font-bold text-stone-800 mb-1.5">
                現居城市 / 居住地 (選填)
              </label>
              <input
                type="text"
                value={residence}
                onChange={(e) => setResidence(e.target.value)}
                placeholder="例：台北市大安區 / 海外"
                id="input-residence"
                className="w-full text-sm px-3.5 py-2.5 rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-stone-800 mb-1.5">
              請示範疇 <span className="text-amber-800">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`text-xs px-2.5 py-2 rounded-lg border text-center transition-all cursor-pointer ${
                    category === cat
                      ? "bg-amber-800 text-amber-50 border-amber-900 font-bold shadow-xs"
                      : "bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100"
                  }`}
                >
                  {cat.split("・")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Specific Question */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-stone-800">
                向神明稟報之具體心願或困惑 <span className="text-amber-800">*</span>
              </label>
              <span className="text-[11px] text-stone-700 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                描述愈具體，籤詩指引愈精準
              </span>
            </div>
            <textarea
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="例如：目前在現有科技公司任職五年，正面臨是否轉換跑道至新創公司擔任主管的抉擇；心中擔心薪資穩定度與未來發展，祈請神明指點迷津，賜予吉凶指引與行事建言。"
              id="input-question"
              required
              className="w-full text-sm p-3.5 rounded-lg border border-stone-300 bg-stone-50/50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 leading-relaxed"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              id="submit-petition-btn"
              className="w-full py-3.5 px-6 rounded-xl bg-linear-to-r from-red-800 via-amber-800 to-red-900 text-amber-50 font-bold text-base shadow-md hover:shadow-lg hover:from-red-700 hover:to-amber-700 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-5 h-5 text-amber-300" />
              <span>呈遞稟文・焚香敬拜入殿</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
