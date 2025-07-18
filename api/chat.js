import OpenAI from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });
    const reply = completion.choices[0]?.message?.content;
    res.status(200).json({ reply });
  } catch (err) {
    console.error("❌ Chat API error:", err);
    res.status(500).json({ reply: "Something went wrong." });
  }
}
