import React, { useState } from "react";
import { FortuneRecord } from "../types";
import { X, BookmarkCheck, Trash2, Calendar, ChevronRight } from "lucide-react";

interface HistoryDrawerProps {
  records: FortuneRecord[];
  onClose: () => void;
  onClearHistory: () => void;
  onSelectRecord: (record: FortuneRecord) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  records,
  onClose,
  onClearHistory,
  onSelectRecord,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filtered =
    selectedCategory === "all"
      ? records
      : records.filter((r) => r.deityId === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in">
      <div className="w-full max-w-md bg-[#fffdfa] h-full shadow-2xl flex flex-col border-l border-amber-900/20">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div className="flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-amber-800" />
            <h3 className="font-bold text-amber-950 text-base">
              解籤典藏簿 ({records.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            id="close-history-drawer"
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {records.length === 0 ? (
            <div className="text-center py-16 text-stone-700">
              <BookmarkCheck className="w-12 h-12 mx-auto mb-3 opacity-30 text-amber-900" />
              <p className="text-sm font-bold">目前尚無收藏的籤詩記錄</p>
              <p className="text-xs mt-1">求籤並解讀後，點擊「收藏此籤」即可存於此處隨時回顧印證。</p>
            </div>
          ) : (
            records.map((rec) => (
              <div
                key={rec.id}
                onClick={() => {
                  onSelectRecord(rec);
                  onClose();
                }}
                className="p-4 rounded-xl border border-stone-200 bg-white hover:border-amber-700/40 hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-amber-900">
                    【{rec.deityName}】
                  </span>
                  <span className="text-stone-700 text-[11px] flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(rec.timestamp).toLocaleDateString("zh-TW")}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <h4 className="font-black text-stone-900 text-sm group-hover:text-red-800 transition-colors font-serif">
                    {rec.poem.poemNumber}・{rec.poem.title}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-sm bg-red-100 text-red-800 font-bold border border-red-200">
                    {rec.poem.rank}
                  </span>
                </div>

                <p className="text-xs text-stone-700 mt-2 line-clamp-1">
                  所問：{rec.userPetition.question}
                </p>

                <div className="mt-2 pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-700">
                  <span>類別：{rec.userPetition.category.split("・")[0]}</span>
                  <span className="text-amber-800 font-bold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                    查看詳解 <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Footer Actions */}
        {records.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
            <button
              onClick={onClearHistory}
              className="text-xs text-stone-700 hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>清空典藏紀錄</span>
            </button>
            <span className="text-[11px] text-stone-700">
              儲存於本機瀏覽器
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
