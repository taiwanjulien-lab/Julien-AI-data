import React, { useState, useEffect } from "react";
import { Deity, DivinationPoem, UserPetition, FortuneRecord, ModernAIInterpretation } from "./types";
import { DEITIES } from "./data/deities";
import { POEMS_DB } from "./data/poems";
import { Navbar } from "./components/Navbar";
import { DeitySelector } from "./components/DeitySelector";
import { PetitionForm } from "./components/PetitionForm";
import { IncenseRitual } from "./components/IncenseRitual";
import { DivinationCylinder } from "./components/DivinationCylinder";
import { JiaoThrower } from "./components/JiaoThrower";
import { PoemResultView } from "./components/PoemResultView";
import { CouncilAssemblyModal } from "./components/CouncilAssemblyModal";
import { DailyFortuneModal } from "./components/DailyFortuneModal";
import { HistoryDrawer } from "./components/HistoryDrawer";

type DivinationStep =
  | "select_deity"
  | "petition"
  | "incense"
  | "cylinder"
  | "jiao"
  | "result";

export default function App() {
  const [currentStep, setCurrentStep] = useState<DivinationStep>("select_deity");
  const [selectedDeity, setSelectedDeity] = useState<Deity | null>(null);
  const [petition, setPetition] = useState<UserPetition | null>(null);
  const [drawnPoem, setDrawnPoem] = useState<DivinationPoem | null>(null);

  // Modals
  const [showCouncilModal, setShowCouncilModal] = useState(false);
  const [showDailyModal, setShowDailyModal] = useState(false);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  // Audio preference
  const [soundEnabled, setSoundEnabled] = useState(true);

  // History state in localStorage
  const [historyRecords, setHistoryRecords] = useState<FortuneRecord[]>(() => {
    try {
      const saved = localStorage.getItem("deity_divination_history");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("deity_divination_history", JSON.stringify(historyRecords));
    } catch (e) {
      console.warn("Could not save history to localStorage", e);
    }
  }, [historyRecords]);

  // Step 1: User chooses a Deity
  const handleSelectDeity = (deity: Deity) => {
    setSelectedDeity(deity);
    setCurrentStep("petition");
  };

  // Step 2: User completes Petition form
  const handlePetitionSubmit = (pet: UserPetition) => {
    setPetition(pet);
    setCurrentStep("incense");
  };

  // Step 3: Incense ritual finished
  const handleIncenseComplete = () => {
    setCurrentStep("cylinder");
  };

  // Step 4: Poem drawn from cylinder
  const handlePoemDrawn = (poem: DivinationPoem) => {
    setDrawnPoem(poem);
    setCurrentStep("jiao");
  };

  // Step 5: Jiao confirmed
  const handleJiaoConfirmed = () => {
    setCurrentStep("result");
  };

  // Step 5 Redraw: If Jiao was Yin (disagree), return to cylinder
  const handleRedrawPoem = () => {
    setDrawnPoem(null);
    setCurrentStep("cylinder");
  };

  // Reset to home
  const handleResetToHome = () => {
    setSelectedDeity(null);
    setPetition(null);
    setDrawnPoem(null);
    setCurrentStep("select_deity");
  };

  // Save fortune record
  const handleSaveRecord = (aiInterpretation?: ModernAIInterpretation) => {
    if (!selectedDeity || !drawnPoem || !petition) return;
    const newRecord: FortuneRecord = {
      id: "rec_" + Date.now(),
      timestamp: Date.now(),
      deityId: selectedDeity.id,
      deityName: selectedDeity.name,
      poem: drawnPoem,
      userPetition: petition,
      aiInterpretation,
    };
    setHistoryRecords((prev) => [newRecord, ...prev]);
  };

  // When clicking a past record in HistoryDrawer
  const handleSelectHistoryRecord = (rec: FortuneRecord) => {
    const deity = DEITIES.find((d) => d.id === rec.deityId) || DEITIES[0];
    setSelectedDeity(deity);
    setPetition(rec.userPetition);
    setDrawnPoem(rec.poem);
    setCurrentStep("result");
  };

  // Daily deep dive
  const handleSelectDailyDeepDive = (deity: Deity, poem: DivinationPoem) => {
    setSelectedDeity(deity);
    setPetition({
      userName: "善信 (日籤問卜)",
      gender: "善信",
      birthDate: "吉時",
      residence: "本地",
      category: "今日運勢與生活行事",
      question: "請示今日行事指引與開運心法",
    });
    setDrawnPoem(poem);
    setCurrentStep("result");
  };

  const handleClearHistory = () => {
    if (confirm("確定要清空所有的解籤典藏紀錄嗎？")) {
      setHistoryRecords([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf6f0] text-stone-800">
      {/* Top Navigation */}
      <Navbar
        onOpenCouncil={() => setShowCouncilModal(true)}
        onOpenDaily={() => setShowDailyModal(true)}
        onOpenHistory={() => setShowHistoryDrawer(true)}
        historyCount={historyRecords.length}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((prev) => !prev)}
        onGoHome={handleResetToHome}
      />

      {/* Main View Container */}
      <main className="flex-1">
        {currentStep === "select_deity" && (
          <DeitySelector
            deities={DEITIES}
            onSelectDeity={handleSelectDeity}
            onOpenCouncil={() => setShowCouncilModal(true)}
          />
        )}

        {currentStep === "petition" && selectedDeity && (
          <PetitionForm
            deity={selectedDeity}
            onBack={() => setCurrentStep("select_deity")}
            onSubmit={handlePetitionSubmit}
          />
        )}

        {currentStep === "incense" && selectedDeity && petition && (
          <IncenseRitual
            deity={selectedDeity}
            petition={petition}
            onComplete={handleIncenseComplete}
            onBack={() => setCurrentStep("petition")}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStep === "cylinder" && selectedDeity && (
          <DivinationCylinder
            deity={selectedDeity}
            poems={POEMS_DB}
            onPoemDrawn={handlePoemDrawn}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStep === "jiao" && selectedDeity && drawnPoem && (
          <JiaoThrower
            deity={selectedDeity}
            poem={drawnPoem}
            onConfirmed={handleJiaoConfirmed}
            onRedrawPoem={handleRedrawPoem}
            soundEnabled={soundEnabled}
          />
        )}

        {currentStep === "result" && selectedDeity && drawnPoem && petition && (
          <PoemResultView
            deity={selectedDeity}
            poem={drawnPoem}
            petition={petition}
            onReset={handleResetToHome}
            onSaveRecord={handleSaveRecord}
            soundEnabled={soundEnabled}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-amber-900/10 text-center text-xs text-stone-700 bg-[#f7f2ea]">
        <div className="max-w-4xl mx-auto px-4 space-y-1">
          <p className="font-bold text-amber-950">
            眾神靈籤 ｜ 傳承正統宮廟道法・融合現代 AI 智慧決策
          </p>
          <p className="text-[11px]">
            籤詩之言，在於啟發智慧、端正心術、趨吉避凶。謀事在人，成事在天，以誠行道，百福自臻。
          </p>
        </div>
      </footer>

      {/* Modals */}
      {showCouncilModal && (
        <CouncilAssemblyModal
          deities={DEITIES}
          onClose={() => setShowCouncilModal(false)}
          soundEnabled={soundEnabled}
        />
      )}

      {showDailyModal && (
        <DailyFortuneModal
          deities={DEITIES}
          poems={POEMS_DB}
          onClose={() => setShowDailyModal(false)}
          onSelectPoemForDeepDive={handleSelectDailyDeepDive}
          soundEnabled={soundEnabled}
        />
      )}

      {showHistoryDrawer && (
        <HistoryDrawer
          records={historyRecords}
          onClose={() => setShowHistoryDrawer(false)}
          onClearHistory={handleClearHistory}
          onSelectRecord={handleSelectHistoryRecord}
        />
      )}
    </div>
  );
}
