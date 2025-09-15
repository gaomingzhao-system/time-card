<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js'
    import * as Dialog from '$lib/components/ui/dialog/index.js'
    import { Button } from './ui/button'
    import { generateDailyReport } from '$lib/hooks/generateDailyReport'

    let { isOpen = $bindable(false) } = $props()

    const generateReport = async () => {
        const githubToken = localStorage.getItem('githubToken')
        if (!githubToken) {
            console.error('githubToken not found in localStorage')
            return
        }
        const report = await generateDailyReport(githubToken)

        console.log(report)
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

        <Dialog.Footer>
            <Button variant="default" onclick={generateReport}>生成する</Button>
            <Dialog.Close onclick={() => (isOpen = false)}
                ><Button variant="secondary">キャンセル</Button></Dialog.Close
            >
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
