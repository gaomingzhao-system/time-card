<script lang="ts">
    import {
        Card,
        CardTitle,
        CardContent,
    } from '$lib/components/ui/card/index.js'
    import * as Dialog from '$lib/components/ui/dialog/index.js'
    import { Button } from './ui/button'
    import { TextGenerateEffect } from '$lib/components/ui/TextGenerateEffect/index'
    import { generateDailyReport } from '$lib/hooks/generateDailyReport'
    import { toast } from 'svelte-sonner'
    import { CopyIcon, CheckIcon } from 'lucide-svelte'

    let { isOpen = $bindable(false) } = $props()

    let todayReport = $state('')
    const generateReport = async () => {
        // const githubToken = localStorage.getItem('githubToken')
        // if (!githubToken) {
        //     console.error('githubToken not found in localStorage')
        //     return
        // }
        // const report = await generateDailyReport(githubToken)
        // todayReport = report
    }

    let isCopied = $state(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(todayReport)
        toast.success('内容をコピーしました')
        isCopied = true
    }
    $effect(() => {
        if (isCopied) {
            const timeout = setTimeout(() => {
                isCopied = false
            }, 2000)
            return () => clearTimeout(timeout)
        }
    })
</script>

<Dialog.Root open={isOpen}>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>日報を生成する</Dialog.Title>
            <Dialog.Description>
                本日完了されたイシューを基に日報を生成する
            </Dialog.Description>
        </Dialog.Header>

        <Card class="relative w-full">
            <Button
                variant="ghost"
                size="icon"
                onclick={handleCopy}
                class="absolute top-1 right-1"
            >
                {#if !isCopied}
                    <CopyIcon class="size-5" />
                {:else}
                    <CheckIcon class="size-5" />
                {/if}
            </Button>

            <TextGenerateEffect words={todayReport} className="w-full" />
        </Card>

        <Dialog.Footer>
            <Button variant="default" onclick={generateReport}>生成する</Button>
            <Dialog.Close onclick={() => (isOpen = false)}
                ><Button variant="secondary">キャンセル</Button></Dialog.Close
            >
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
