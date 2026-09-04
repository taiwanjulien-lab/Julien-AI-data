export interface Deity {
  id: string;
  name: string;
  title: string;
  pinyin: string;
  domain: string;
  description: string;
  specialties: string[];
  element: string;
  colorHex: string;
  badgeColor: string;
  templeHall: string;
  greetingMantra: string;
  avatarIcon: string;
  category: "traditional" | "water" | "five_religions";
  mascotTag: string;
}

export interface DivinationPoem {
  id: string;
  deityId: string;
  poemNumber: string;
  cyclicalSign: string; // e.g. 甲子, 丙戌
  rank: "籤王" | "上上" | "大吉" | "上吉" | "中吉" | "中平" | "下下";
  title: string;
  verses: [string, string, string, string];
  classicalMeaning: string;
  historicalStory: string;
  traditionalAspects: {
    career: string;
    wealth: string;
    love: string;
    health: string;
    lawsuit: string;
    family: string;
  };
}

export type JiaoType = "sheng" | "xiao" | "yin";

export interface JiaoThrowResult {
  type: JiaoType;
  label: string;
  description: string;
  leftIsFlat: boolean; // true: 平面(陽), false: 凸面(陰)
  rightIsFlat: boolean;
}

export interface UserPetition {
  userName: string;
  gender: string;
  birthDate: string;
  residence: string;
  category: string;
  question: string;
}

export interface ModernAIInterpretation {
  modernSummary: string;
  situationAnalysis: string;
  favorableAction: string[];
  cautionPoints: string[];
  auspiciousGuide: {
    timing: string;
    direction: string;
    noblePerson: string;
    color: string;
    mantra: string;
  };
  divineBlessing: string;
}

export interface DeityCouncilPerspective {
  deityId: string;
  deityName: string;
  title: string;
  divineVoice: string;
  focusDimension: string;
  actionTip: string;
}

export interface CouncilAssemblyResult {
  councilDecreeTitle: string;
  overallVerdict: string;
  favorableIndex: number;
  deityPerspectives: DeityCouncilPerspective[];
  jointActionPlan: {
    stage: string;
    focus: string;
  }[];
  amuletWord: string;
}

export interface FortuneRecord {
  id: string;
  timestamp: number;
  deityId: string;
  deityName: string;
  poem: DivinationPoem;
  userPetition: UserPetition;
  aiInterpretation?: ModernAIInterpretation;
  notes?: string;
}
