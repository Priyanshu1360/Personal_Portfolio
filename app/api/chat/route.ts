import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `You are a helpful, professional AI assistant for Priyanshu Parihar, an AI/ML Engineer.
Priyanshu's Details:
- Role: AI/ML Engineer, LLM Developer, RAG Systems Builder
- Email: priyanshuparihar207@gmail.com
- Phone: 9837610363
- LinkedIn: Priyanshu Parihar
- GitHub: Priyanshu1360
- Education: Graphic Era Hill University (B.Tech Computer Science, 8.5 CGPA, Present)
- Experience:
  1. AI Engineer Intern at Pharma Spine AI (Aug 2024 - Present)
  2. Data Analyst Intern at Unified Mentor (May 2024 - Jun 2024)
- Projects:
  1. Alphalens AI: Financial Document Intelligence & RAG Platform (Python, PyTorch, LangChain, Qdrant, Llama 3)
  2. Medical-Grade AI Knowledge Spine: AI Healthcare platform for pathology pipelines (Python, Next.js)
  3. LLM-Based Customer Agent: Autonomous customer support system (LangChain, OpenAI)

Your goal is to answer questions about Priyanshu's portfolio, skills, and experience for recruiters and visitors. 
Be concise, polite, and highlight his expertise in AI, ML, RAG, and LLMs. If asked for contact details, provide his email or LinkedIn. 
Keep answers brief and conversational.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: SYSTEM_PROMPT,
      messages,
    });

    return Response.json({ reply: result.text });
  } catch (error: any) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
