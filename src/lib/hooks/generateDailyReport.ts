import { getTodayFinishedIssues } from './getTodayIssues'
import { GoogleGenAI } from '@google/genai'

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const apiKey = 'AIzaSyDmzwMtU7bdMdc6TMf-1yuGJPHlYsfc_no' // f**k, i can't do not specify the api key here, the error is still retain so i need to certainly specify it,
const ai = new GoogleGenAI({ apiKey: apiKey })

const unifiedPrompt =
    '```commandこのアカウントの今日のissueやpull requestの歴史を使って、今日しましたタスクをリストに書いてください、リンクとissue番号は不要です、特にissueに対応されたタスクのタイトルを書いてください。そして今日の感想も下に書いてください、フォーマットは下の内容にようにしてください：```\n'

// refers to https://www.reddit.com/r/ChatGPTPro/comments/1fgo5ge/is_there_a_benefit_to_writing_to_chatgpt_with/
// At the very least you need a way to clearly highlight which parts of your prompt are instructions and which parts of your prompt are data (eg reference docs, sample rows, labeled examples). And markdown is expressive enough to give you lots of nice options for that level of distinction (code blocks, headers, etc)
export const generateDailyReport = async (
    githubToken: string,
    model: 'gemini-2.5-flash' | 'gemini-2.5-pro',
    promptsTemplate: string,
) => {
    const todayFinishedIssues = await getTodayFinishedIssues(githubToken)

    const dailyReport = await ai.models.generateContent({
        model: model ?? 'gemini-2.5-flash',
        contents:
            unifiedPrompt +
            promptsTemplate +
            '\n```issue' +
            todayFinishedIssues.title +
            '```' +
            '\n```issue body' +
            todayFinishedIssues.body +
            '```',
    })
    return dailyReport.text
}
