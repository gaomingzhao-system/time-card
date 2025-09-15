<script lang="ts">
    import { Card, CardContent } from '$lib/components/ui/card/index.js'
    import * as Dialog from '$lib/components/ui/dialog/index.js'
    import { Button } from './ui/button'
    import { TextGenerateEffect } from '$lib/components/ui/TextGenerateEffect/index'
    import { generateDailyReport } from '$lib/hooks/generateDailyReport'

    let { isOpen = $bindable(false) } = $props()

    let todayReport = $state(
        'aag aga ga gdag ag da gagad ga gag agad gd ddddddddddddddddddd',
    )
    const generateReport = async () => {
        const githubToken = localStorage.getItem('githubToken')
        if (!githubToken) {
            console.error('githubToken not found in localStorage')
            return
        }
        const report = await generateDailyReport(githubToken)
        todayReport = report
    }
</script>

<Dialog.Root open={isOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>日報を生成する</Dialog.Title>
            <Dialog.Description>
                本日完了されたイシューを基に日報を生成する
            </Dialog.Description>
        </Dialog.Header>

        <Card>
            <CardContent>
                <TextGenerateEffect words={todayReport} />
            </CardContent>
        </Card>

        <Dialog.Footer>
            <Button variant="default" onclick={generateReport}>生成する</Button>
            <Dialog.Close onclick={() => (isOpen = false)}
                ><Button variant="secondary">キャンセル</Button></Dialog.Close
            >
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
