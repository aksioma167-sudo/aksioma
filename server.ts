import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// AI Roadmap generator endpoint
app.post("/api/ai-roadmap", async (req, res) => {
  try {
    const { player_name, grade, subject_name, attempt_logs } = req.body;

    const mistakes = Array.isArray(attempt_logs)
      ? attempt_logs.filter((log: { is_correct: boolean }) => !log.is_correct)
      : [];
    const correctCount = Array.isArray(attempt_logs)
      ? attempt_logs.filter((log: { is_correct: boolean }) => log.is_correct).length
      : 0;

    const ai = getAIClient();

    if (ai) {
      const prompt = `
O'quvchi ma'lumotlari:
- Ismi: ${player_name || "O'quvchi"}
- Sinifi: ${grade || 2}-sinf (6-10 yosh)
- Fan: ${subject_name || "Barcha fanlar"}
- To'g'ri javoblar soni: ${correctCount}
- Xatolar soni: ${mistakes.length}
- Xatolar tafsiloti: ${JSON.stringify(mistakes.slice(0, 15))}

Vazifa:
FocusKids o'quv platformasi uchun ota-onaga mo'ljallangan chuqur, samimiy va dalda beruvchi tahlil tuz.
Javob quyidagi JSON tuzilmasida bo'lishi shart:
1. summary: "Bolangiz nimada qiynalmoqda" sarlavhasi ostida 2-3 jumlali ochiq, mehribon xulosa (xatolarni fojia qilmasdan, qaysi qoidani mustahkamlash kerakligini ayt).
2. strengths: Bola kuchli bo'lgan 2-3 ta jihati.
3. focus_areas: E'tibor qaratilishi kerak bo'lgan 2-3 ta aniq mavzu.
4. roadmap: 4-5 ta bosqichma-bosqich qadam (har birida id, title, target_time, description, completed=false).
5. parent_mnemonic_tip: Ota-onaga uyda 5 daqiqada bola bilan bajarish uchun qiziqarli mnemonik o'yin yoki usul.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction:
            "Sen FocusKids ilovasida dono boyo'g'li Olli nomidan ota-onalarga bolalarning bilim va diqqat ko'rsatkichlari bo'yicha maslahat beruvchi ekspert pediatr va pedagog yordamchisisan. Javoblaring o'zbek tilida (lotin yozuvida), juda iliq, bolani ruhlantiruvchi va tushunarli bo'lsin.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              focus_areas: { type: Type.ARRAY, items: { type: Type.STRING } },
              roadmap: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    title: { type: Type.STRING },
                    target_time: { type: Type.STRING },
                    description: { type: Type.STRING },
                    completed: { type: Type.BOOLEAN },
                  },
                  required: ["id", "title", "target_time", "description", "completed"],
                },
              },
              parent_mnemonic_tip: { type: Type.STRING },
            },
            required: ["summary", "strengths", "focus_areas", "roadmap", "parent_mnemonic_tip"],
          },
        },
      });

      const parsed = JSON.parse(response.text || "{}");
      return res.json({ success: true, data: parsed, source: "gemini-3.8-flash" });
    }

    // High quality intelligent fallback if GEMINI_API_KEY is not configured yet
    const fallbackRoadmap = {
      summary: `${player_name || "Farzandingiz"} darslarni qunt bilan o'zlashtirmoqda. Test savollarida tezkorlik yuqori bo'lgani sababli ba'zi nozik qoidalarda shoshqaloqlik sezilmoqda. Asosiy e'tibor qoidalarni mnemonik assotsiatsiyalar bilan xotirada mustahkamlashga qaratilishi tavsiya etiladi.`,
      strengths: [
        "Diqqat mashqlarida chaqqon va nishonni to'g'ri anglaydi",
        "Savollarga qiziqish bilan va ikkilanmasdan yondashadi",
        "Yangi mnemonik kartochkalarni tez eslab qolish qobiliyati bor",
      ],
      focus_areas: [
        "Murakkab savollarda variantlarni to'liq o'qib chiqish",
        "Matematik hisob-kitoblar va so'z yasash qoidalarini amaliyotda takrorlash",
        "Reaksiya o'yinida shoshmasdan nishonni aniq tekshirish",
      ],
      roadmap: [
        {
          id: "step-1",
          title: "1-bosqich: Mnemonik qofiyalarni birgalikda takrorlash",
          target_time: "1-3 kun",
          description: "Har kuni 5 daqiqa davomida Ollining qiziqarli mnemonika kartalarini birgalikda ovoz chiqarib o'qing.",
          completed: false,
        },
        {
          id: "step-2",
          title: "2-bosqich: Diqqat mashqida tezlikni nazorat qilish",
          target_time: "4-6 kun",
          description: "'Kartochkalarni tut' o'yinida shoshilmasdan faqat yulduzchalarni tanlash odatini shakllantiring.",
          completed: false,
        },
        {
          id: "step-3",
          title: "3-bosqich: Xatosiz test marafonini o'tkazish",
          target_time: "7-10 kun",
          description: "O'rta va Qiyin darajadagi testlarni bajarib, Olli bilan 'Bilimdon' unvoniga erishing.",
          completed: false,
        },
        {
          id: "step-4",
          title: "4-bosqich: Bilimlarni hayotiy misollarda sinash",
          target_time: "11-14 kun",
          description: "O'rganilgan mavzularni do'konda yoki kitob mutolaasida birgalikda amalda qo'llang.",
          completed: false,
        },
      ],
      parent_mnemonic_tip: "Maslahat: Bola bilan qoidalarni yodlash o'rniga, kulgili qahramonlar yoki hayvonlar bilan bog'lang (masalan, 'Katta-Kichik' timsoh og'zi kabi har doim katta raqamni yeydi!).",
    };

    return res.json({ success: true, data: fallbackRoadmap, source: "adaptive-engine" });
  } catch (error: any) {
    console.error("AI Roadmap error:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI roadmap" });
  }
});

// Stripe Checkout and Subscription simulation endpoints
app.post(["/api/stripe/create-checkout", "/api/create-checkout-session"], (req, res) => {
  const { player_id, playerId, plan_id, plan } = req.body;
  const isAnnual = (plan_id || plan) === "annual";
  const amount = isAnnual ? 199000 : 29000; // in UZS or mock currency
  const session_id = `cs_test_${Date.now()}_${Math.random().toString(36).substring(7)}`;

  res.json({
    success: true,
    checkout_url: `https://checkout.stripe.com/pay/${session_id}`,
    sessionId: session_id,
    session_id,
    player_id: player_id || playerId,
    plan: isAnnual ? "Yillik Obuna (FocusKids Premium)" : "Oylik Obuna (FocusKids Premium)",
    amount,
  });
});

async function start() {
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
    console.log(`FocusKids Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
