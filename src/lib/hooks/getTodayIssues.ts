import { Octokit } from 'octokit'

const timeStamp = new Date().toISOString()
export const getTodayFinishedIssues = async (githubToken: string) => {
    // https://github.com/octokit/core.js#readme
    const octokit = new Octokit({
        auth: localStorage.getItem('githubToken'),
    })
    const issues = await octokit.request(
        `GET /issues?state=closed&since=${timeStamp}`,
        {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        },
    )
    return issues.data
}
