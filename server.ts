import express from "express";
import path from "path";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// 1. Single Deity Fortune Interpretation
app.post("/api/interpret-fortune", async (req, res) => {
  try {
    const {
      deityName,
      deityTitle,
      poemIndex,
      poemTitle,
      poemVerses,
      historicalStory,
      fortuneRank,
      category,
      userQuestion,
      userName,
      birthDate,
      residence,
    } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      // Fallback if API key is not yet set in environment
      return res.json({
        success: true,
        data: {
          modernSummary: `【${deityName}靈驗指引】信士${userName || "緣主"}所問之「${userQuestion || "近期運勢"}」，此籤為「${fortuneRank}」。籤詩明示目前處於轉折蓄積之期，不可躁進，守正待時方得圓滿。`,
          situationAnalysis: "眼前看似迷霧盤旋，實為考驗內心定力。古典典故「" + (historicalStory || "古人行道") + "」意指順應天理，蓄勢待發。",
          favorableAction: [
            "理清核心主軸，先把眼前基本功扎實做好",
            "行事秉持誠信與謙遜，多聽取長輩或專業人士建言",
            "保持作息與心境平穩，遇阻力勿正面衝突，宜迂迴守成",
          ],
          cautionPoints: [
            "忌心浮氣躁、急於在三日內看見立竿見影之成果",
            "避免口舌爭辯，合約條款務必逐字核對",
          ],
          auspiciousGuide: {
            timing: "農曆月中或春末夏初之交",
            direction: "東南方或正南方",
            noblePerson: "身邊行事穩健、年長數歲之良師益友",
            color: "絳紅、明黃、米杏色",
            mantra: "心若澄澈，萬境皆安；事順天理，百福自臻。",
          },
          divineBlessing: `奉${deityName}慈悲加持，福蔭信士所求順遂，災厄退散，吉祥如意！`,
        },
      });
    }

    const systemPrompt = `你是一位精通台灣與華人傳統廟宇宮廟信仰、易經卦理、道教與佛教文化的國寶級解籤宗師，同時具備現代心理學諮商與職涯生活教練的開明智慧。
請以【${deityName} (${deityTitle})】的神聖慈悲口吻，為前來叩拜求籤的信徒進行深入、通俗、現代化且充滿建設性的籤詩剖析。
請勿給出籠統虛無的算命套話，必須緊扣該籤詩原文、卦意與歷史典故，並直接針對信徒的真實人生問題給予清晰、溫暖、接地氣的實戰行動指引。`;

    const prompt = `信徒資訊與叩問事項：
- 姓名/稱謂：${userName || "善信"}
- 生辰時辰：${birthDate || "吉時"}
- 現居地：${residence || "台灣"}
- 參拜神明：${deityName} (${deityTitle})
- 叩問類別：${category || "綜合運勢"}
- 祈求請示具體問題：${userQuestion || "請示近期運勢與行事指引"}

神明賜予之靈籤：
- 籤序：${poemIndex || "靈籤"}
- 籤名：${poemTitle}
- 吉凶：${fortuneRank}
- 籤詩詩文：
${Array.isArray(poemVerses) ? poemVerses.join("\n") : poemVerses}
- 歷史典故：${historicalStory}

請以繁體中文 (Traditional Chinese, 台灣用語)，輸出純 JSON 格式的解析，格式要求如下：
{
  "modernSummary": "現代通俗核心意涵：以神明親和溫暖且具啟發性的語氣，200字左右總結此籤對該信徒提問的直指核心回應",
  "situationAnalysis": "現狀局勢深入剖析：結合籤詩隱喻與典故，點出信徒當前心理狀態、盲點與外部局勢",
  "favorableAction": ["具體建議行動步驟1", "具體建議行動步驟2", "具體建議行動步驟3"],
  "cautionPoints": ["此階段應戒除或防範的陷阱1", "應避開的誤區2"],
  "auspiciousGuide": {
    "timing": "轉機時節或最佳行事時機建議",
    "direction": "吉利方位",
    "noblePerson": "貴人類型或尋求助力方向",
    "color": "開運吉祥色",
    "mantra": "一句提振心神之開運心法法語"
  },
  "divineBlessing": "神明賜福之吉祥四字或八字聖誥祝福語"
}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      return res.json({ success: true, data: parsed });
    } catch (aiErr: any) {
      console.warn("Gemini API call failed, generating contextual divine interpretation:", aiErr.message);
      return res.json({
        success: true,
        data: {
          modernSummary: `【${deityName}聖意指引】信士${userName || "緣主"}所叩問之「${userQuestion || "近期運勢"}」，此籤為「${fortuneRank}」。籤意直指目前正值運勢沈潛與轉化之關鍵期；莫為一時之焦慮而慌亂行事，秉持初衷與正念，守成蓄勢方有大成。`,
          situationAnalysis: `當前如同古典典故「${historicalStory || "古人行道"}」之境，局勢看似盤根錯節，實為上天淬鍊心志。詩云「${Array.isArray(poemVerses) ? poemVerses[0] : ""}」，唯有不盲從、不冒進，方能看清局勢真諦。`,
          favorableAction: [
            "理清核心優先順序，把手邊既有基礎做到盡善盡美",
            "行事待人秉持信義與謙和，多聽取身邊有實戰經驗之長輩指點",
            "凡重大契約或承諾，務必白紙黑字審慎考量，留足彈性餘裕",
          ],
          cautionPoints: [
            "切忌因急功近利而涉足未知的偏門或過度投機",
            "防範言語口舌之快，遇到阻礙多以柔克剛，勿硬碰硬",
          ],
          auspiciousGuide: {
            timing: "春末夏初或月圓之時，局勢將漸趨明朗",
            direction: "吉利方位在東南與正南",
            noblePerson: "身邊行事低調、言出必行之踏實好友",
            color: "絳紅、明黃、米杏暖色系",
            mantra: "心若澄澈，萬境皆安；事順天理，百福自臻。",
          },
          divineBlessing: `奉${deityName}慈悲加持，福蔭信士所求順遂，災厄退散，吉祥如意！`,
        },
      });
    }
  } catch (error: any) {
    console.error("Error in /api/interpret-fortune:", error);
    res.status(500).json({ success: false, error: error.message || "解籤運算異常" });
  }
});

// 2. Council of Deities Grand Assembly (聯合眾神大會 - 支援指定特定神明會商)
app.post("/api/council-assembly", async (req, res) => {
  try {
    const {
      userQuestion,
      category,
      userName,
      birthDate,
      concernDetails,
      requestedDeities,
    } = req.body;

    // Determine participating deities (default to jade_emperor, guanyin, guan_gong, mazu, wenchang, tudigong, zhusheng if not specified)
    const deitiesList =
      Array.isArray(requestedDeities) && requestedDeities.length > 0
        ? requestedDeities
        : [
            { id: "jade_emperor", name: "玉皇上帝", title: "玄穹高上帝・天公祖", specialties: ["宏觀大局", "天命機遇"] },
            { id: "guanyin", name: "觀世音菩薩", title: "大慈大悲・救苦救難廣大靈感", specialties: ["情感姻緣", "心靈療癒"] },
            { id: "guan_gong", name: "關聖帝君", title: "伏魔大帝・協天大帝恩主公", specialties: ["職場晉升", "防小人口舌"] },
            { id: "mazu", name: "天上聖母媽祖", title: "天后聖母・護國庇民林默娘", specialties: ["出行平安", "創業拓荒"] },
            { id: "wenchang", name: "文昌帝君", title: "梓潼帝君・司祿保捷祿馬星", specialties: ["升學考運", "專業考照"] },
            { id: "tudigong", name: "福德正神土地公", title: "后土神祇・招財納福福德伯公", specialties: ["店面生意", "日常財帛"] },
            { id: "zhusheng", name: "註生娘娘", title: "育德天尊・授子保幼九天靈應", specialties: ["求子求嗣", "家庭祥和"] },
          ];

    const deityBriefs = deitiesList
      .map(
        (d: any, idx: number) =>
          `${idx + 1}. 【${d.name}】(${d.title || ""})，專精擅長：${
            Array.isArray(d.specialties) ? d.specialties.join("、") : (d.domain || "指點迷津")
          }`
      )
      .join("\n");

    const fallbackPerspectives = deitiesList.map((d: any) => {
      let voice = `信士${userName || "緣主"}所稟之事，吾自當護念加持。天道循環，凡事順理而行，自得圓滿。`;
      let focus = "核心指引";
      let action = "守正待時，落實日常功課，必有回響。";

      if (d.id === "jade_emperor") {
        voice = "天地運轉皆有定數，莫因眼前短暫挫折自亂陣腳。當有承擔大局之胸襟氣度。";
        focus = "天時大局";
        action = "登高望遠，切勿局限於眼前三個月得失，放眼長遠三年人生佈局。";
      } else if (d.id === "guanyin") {
        voice = "心無罣礙，無罣礙故，無有恐怖。汝心太緊，故覺前路荊棘。以慈悲待己，心寬路自寬。";
        focus = "心境放下";
        action = "每日留十五分鐘靜心，寬恕人事糾結，放低執念，前路自然光明。";
      } else if (d.id === "guan_gong") {
        voice = "君子愛財取之有道，行事以忠誠信義為本。利之所在，害亦隨之，慎防浮誇不實承諾。";
        focus = "職場契約與風骨";
        action = "凡重大合作契約必立字為憑，勿輕信口頭虛約，以浩然正氣制邪。";
      } else if (d.id === "mazu") {
        voice = "出海行舟，風浪難測。當順風張帆，遇逆浪拋錨守勢，平安保本方為至寶。";
        focus = "風險避險與平安";
        action = "不可孤注一擲，保留三成以上退路與家庭備用金。";
      } else if (d.id === "xuantian") {
        voice = "水至柔而克剛，北方正水滌蕩晦滯。逆境當如靜水沉澱，以定海神針之志破煞定乾坤。";
        focus = "破除逆阻與玄武定心";
        action = "直面核心矛盾，斬斷不良拖延，果斷落實止損與防禦措施。";
      } else if (d.id === "wenchang") {
        voice = "磨刀不誤砍柴工。當前之短板在於技能與思維視野，勤學苦修可破局。";
        focus = "進修學習與謀略";
        action = "進修相關專業領域知識，整理條理清晰的行動決策筆記。";
      } else if (d.id === "tudigong") {
        voice = "莫嫌步子小，寸步即千里。把手頭現有的飯碗端好，鄰里和睦即是生財之道。";
        focus = "接地實務與現金流";
        action = "顧好當月日常開銷，多與身邊熟絡親友良性互動，互通有無。";
      } else if (d.id === "zhusheng") {
        voice = "凡事如同懷胎十月，急不得。好好調理根本，家庭和樂，自然枝繁葉茂。";
        focus = "健康滋養與家宅根本";
        action = "重視睡眠與家室氛圍，家和萬事興，有健康體魄才有長遠之基。";
      } else if (d.id === "buddha") {
        voice = "諸法因緣生，諸法因緣滅。所見障礙皆由妄念執著所生，觀照自心，隨緣安住即得自在。";
        focus = "明察因果與心靈解脫";
        action = "深究問題的內在根源，不為外在虛榮所役，化解執著方能看清正解。";
      } else if (d.id === "jesus") {
        voice = "不要為明天憂慮，因為明天自有明天的憂慮。心懷信望愛，在黑暗幽谷中我賜你剛強仁愛與盼望。";
        focus = "恩典信德與勇氣新生";
        action = "卸下沉重的擔子，以博愛與原諒重建內在力量，勇敢向前邁步。";
      } else if (d.id === "allah") {
        voice = "真主確與堅忍者同在。一切安排皆有其造化智慧與善意，恪守公義誠實，心靈自獲恬靜。";
        focus = "公義正直與至仁順服";
        action = "處事以公道與誠信為準繩，善待弱小，在堅守美德中迎向明燈。";
      } else if (d.id === "laozi") {
        voice = "上善若水，水善利萬物而不爭。大巧若拙，以退為進，順應自然時序，無為而無不為。";
        focus = "道法自然與以退為進";
        action = "停止無效的硬拚對抗，觀察大勢起伏，順水推舟借力使力。";
      } else if (d.id === "confucius") {
        voice = "君子泰而不驕，威而不猛。見利思義，見危授命。修己以安人，行中庸之道則無咎。";
        focus = "儒門中庸與倫理修身";
        action = "檢視言行分寸與道德義務，先做好本分與修身，名利自會水到渠成。";
      }

      return {
        deityId: d.id,
        deityName: d.name,
        title: d.title || d.name,
        divineVoice: voice,
        focusDimension: focus,
        actionTip: action,
      };
    });

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        data: {
          councilDecreeTitle: "眾神共鑑天誥：靜水流深，正道行之",
          overallVerdict: `眾神齊聚金闕圓桌，針對信士${userName || "緣主"}所困惑之「${userQuestion}」共同商榷。本次大會依信士所請，匯聚諸聖睿智。局勢非困境，而是天地正在為信士淬礪身心，重塑格局之轉折點。`,
          favorableIndex: 85,
          deityPerspectives: fallbackPerspectives,
          jointActionPlan: [
            { stage: "近程 (1-14天)・立心定氣", focus: "心態歸零，排除內耗，做好風險審核與財務盤點。" },
            { stage: "中程 (15-60天)・佈局踐履", focus: "依各神聖策略落實專業技能，步步為營，信義立足。" },
            { stage: "遠程 (60天以上)・順天展驥", focus: "風向轉順之際果斷出手，兼顧內在安康與大業繁盛。" }
          ],
          amuletWord: "浩然清泰・吉星拱照"
        }
      });
    }

    const systemPrompt = `你現在是天庭金闕「眾神聯合大會」的司禮天官與智慧化身。
信徒依其特別需求，特別指定邀請了以下【${deitiesList.length} 位神明聖哲】列席本次圓桌商討：
${deityBriefs}

每一位受邀神明皆有其獨具特色的神職視角與教誨特徵：
- 請確保【所有被指定列席的神明】都在輸出結果的 deityPerspectives 陣列中發表明確的神意開示，絕對不能遺漏或隨意更換神明！
- 神明講話口吻要符合其身分（例如玉帝浩蕩、觀音慈悲、關公忠義、媽祖護佑、玄天水德斬障、老子道法自然、孔子克己復禮中庸、佛陀因緣空性、耶穌信望愛、真主公義慈憫）。
- 請結合信徒提問，由天官總結「眾神聯合玉旨」及實戰行動指引。`;

    const prompt = `信徒提問資料：
- 姓名：${userName || "善信緣主"}
- 生辰時辰：${birthDate || "吉時"}
- 疑難範疇：${category || "重大人生抉擇"}
- 叩問難題：${userQuestion}
- 詳細背景補充：${concernDetails || "無特殊補充，望眾神慈悲指引明燈"}
- 特別指定列席神明名冊：${deitiesList.map((d: any) => d.name).join("、")}

請輸出嚴格的 JSON 格式（使用繁體中文，台灣道地語境與尊稱）：
{
  "councilDecreeTitle": "八至十字的玉旨神諭標題（如：諸聖共鑑天誥：沉潛培元，信義破局）",
  "overallVerdict": "眾神大會聯合裁示綜述（約180-250字，語氣威儀中充滿護念）",
  "favorableIndex": 85 (0-100之運勢勝算吉祥指數),
  "deityPerspectives": [
    ${deitiesList
      .map(
        (d: any) => `{
      "deityId": "${d.id}",
      "deityName": "${d.name}",
      "title": "${d.title || d.name}",
      "divineVoice": "${d.name}專屬口吻之原聲聖意（約60-90字，契合其神職個性）",
      "focusDimension": "主司面向（如：大局時運/心性化解/信義決斷/避險保本/道法自然）",
      "actionTip": "一條精準切實的行動指引"
    }`
      )
      .join(",\n    ")}
  ],
  "jointActionPlan": [
    { "stage": "近程 (1-14天)・立心安定", "focus": "具體要務" },
    { "stage": "中程 (15-60天)・佈局突破", "focus": "具體要務" },
    { "stage": "遠程 (60天以上)・天時收穫", "focus": "具體要務" }
  ],
  "amuletWord": "眾神敕封八字吉祥靈符真言（例如：玄黃朗照・正道萬安）"
}`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
        },
      });

      const parsed = JSON.parse(response.text?.trim() || "{}");
      return res.json({ success: true, data: parsed });
    } catch (aiErr: any) {
      console.warn("Gemini council call failed, returning structured divine resolution:", aiErr.message);
      return res.json({
        success: true,
        data: {
          councilDecreeTitle: "諸聖共鑑天誥：靜水流深，正道行之",
          overallVerdict: `針對信士${userName || "緣主"}所稟報之「${userQuestion}」，本次由信士指定之諸聖神明聯席審度天時地利。當前並非絕境，而是格局轉換之試煉。切莫自亂陣腳，宜以誠信為基石，深耕當下，時機成熟時自得諸神護佑成事。`,
          favorableIndex: 85,
          deityPerspectives: fallbackPerspectives,
          jointActionPlan: [
            {
              stage: "近程 (1-14天)・立心安定",
              focus: "暫緩衝動型決定，盤點個人財務底線與真實資源。",
            },
            {
              stage: "中程 (15-60天)・佈局突破",
              focus: "諮詢信得過之專業前輩，補足關鍵技能，小步測試新方向。",
            },
            {
              stage: "遠程 (60天以上)・天時收穫",
              focus: "順應大環境趨勢果斷行動，嚴守信義，坐收吉果。",
            },
          ],
          amuletWord: "紫微朗照・正道長寧",
        },
      });
    }
  } catch (error: any) {
    console.error("Error in /api/council-assembly:", error);
    res.status(500).json({ success: false, error: error.message || "眾神大會召集失敗" });
  }
});

// 3. Interactive Dialogue with a specific Deity
app.post("/api/deity-dialogue", async (req, res) => {
  try {
    const { deityName, deityTitle, userQuestion, poemContext } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        success: true,
        reply: `【${deityName} 開示】信士毋須焦慮，天下事皆由心造。你所憂慮者，過三月再觀，不過微塵。持正念、盡人力，吾自暗中相護。`,
      });
    }

    const systemPrompt = `你現在是受萬民敬仰的華人正神【${deityName} (${deityTitle})】。
信徒在神龕前向你稟報請益。
請維持尊貴、慈愛、睿智的神明語氣，用繁體中文回答信徒。
回答要點：
1. 長度約120-180字，精煉有力，給予安撫與行動方向。
2. 保持神明的神職個性特徵（如玉帝浩蕩、觀音慈悲、關公剛毅、媽祖溫和護舟、文昌重視學識、土地公親切如長輩、註生娘娘溫柔護兒）。
3. 切記：神明不會要求迷信花費，而是教人正心誠意、行善積德、奮發有為。`;

    const prompt = `信徒先前求得之籤詩背景：
${poemContext ? JSON.stringify(poemContext) : "尚未抽籤或綜合請益"}

信徒當前向您追問：
「${userQuestion}」

請以【${deityName}】身份直接開示：`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        },
      });

      return res.json({ success: true, reply: response.text?.trim() });
    } catch (aiErr: any) {
      console.warn("Gemini deity dialogue failed, providing authentic fallback:", aiErr.message);
      return res.json({
        success: true,
        reply: `【${deityName} 慈誨開示】信士${userQuestion.length > 5 ? "所問甚切" : "莫慌"}。天道酬勤，地道酬善，人道酬誠。行事之成敗，三成在於天命機緣，七成在於心定志堅。切莫為眼前之得失動搖根基，凡事留有餘地，秉持良善，吾自庇佑爾等路途平順。`,
      });
    }
  } catch (error: any) {
    console.error("Error in /api/deity-dialogue:", error);
    res.status(500).json({ success: false, error: error.message || "神明開示異常" });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`眾神靈籤伺服器啟動於 port ${PORT}`);
  });
}

startServer();
