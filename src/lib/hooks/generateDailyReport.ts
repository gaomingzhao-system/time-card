import { getTodayFinishedIssues } from './getTodayIssues'
import { GoogleGenAI } from '@google/genai'

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({ apiKey: 'asd' })

// refers to https://www.reddit.com/r/ChatGPTPro/comments/1fgo5ge/is_there_a_benefit_to_writing_to_chatgpt_with/
// At the very least you need a way to clearly highlight which parts of your prompt are instructions and which parts of your prompt are data (eg reference docs, sample rows, labeled examples). And markdown is expressive enough to give you lots of nice options for that level of distinction (code blocks, headers, etc)
export const generateDailyReport = async (
    githubToken: string,
    model: 'gemini-2.5-flash' | 'gemini-2.5-pro',
    promptsTemplate: string,
) => {
    const todayFinishedIssues = getTodayFinishedIssues(githubToken)

    const dailyReport = await ai.models.generateContent({
        model: model,
        contents: promptsTemplate + todayFinishedIssues,
    })
    return dailyReport.text
}
