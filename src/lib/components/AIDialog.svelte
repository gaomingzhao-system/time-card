<script lang="ts">
    import { Card } from '$lib/components/ui/card/index.js'
    import * as Dialog from '$lib/components/ui/dialog/index.js'
    import { Button } from './ui/button'
    import { TextGenerateEffect } from '$lib/components/ui/TextGenerateEffect/index'
    import { generateDailyReport } from '$lib/hooks/generateDailyReport'
    import { toast } from 'svelte-sonner'
    import { CopyIcon, CheckIcon } from 'lucide-svelte'
    import TemplatesCarousel from '$lib/components/TemplatesCarousel.svelte'
    import { Skeleton } from '$lib/components/ui/skeleton/index.js'

    let { isOpen = $bindable(false) } = $props()

    let todayReport = $state('')
    let selectedId = $state(0)
    let selectedTemplate = $state('')
    let isDisabledGenerateButton = $state(false)
    const generateReport = async () => {
        const githubToken = localStorage.getItem('githubToken')
        if (!githubToken) {
            console.error('githubToken not found in localStorage')
            return
        }
        const report = await generateDailyReport(
            githubToken,
            'gemini-2.5-flash',
            selectedTemplate,
        )
        todayReport = report ?? ''
    }

    let isCopied = $state(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(todayReport)
        toast.success('内容をコピーしました')
        isCopied = true
    }
    // equivalent to vue `watch` and `watchEffect` OR react `useEffect`
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

        <h2 class="text-center font-semibold">日報テンプレートを選択する</h2>
        <TemplatesCarousel bind:selectedId bind:selectedTemplate />

        {#if !isDisabledGenerateButton}
            <Card class="relative max-h-64 min-h-32 w-full overflow-y-scroll">
                <Button variant="ghost" size="icon" onclick={handleCopy}>
                    {#if !isCopied}
                        <CopyIcon class="absolute top-3 right-3 size-5" />
                    {:else}
                        <CheckIcon class="absolute top-3 right-3 size-5" />
                    {/if}
                </Button>

                <TextGenerateEffect
                    words={todayReport}
                    className="w-full break-words text-start text-sm text-gray-800"
                />
            </Card>
        {:else}
            <Card
                class="relative max-h-64 min-h-32 w-full overflow-y-scroll px-5"
            >
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-2/3" />
            </Card>
        {/if}

        <Dialog.Footer>
            <Button
                variant="default"
                disabled={isDisabledGenerateButton}
                onclick={() => {
                    generateReport()
                    isDisabledGenerateButton = true
                    setTimeout(() => {
                        isDisabledGenerateButton = false
                    }, 5000)
                }}>生成する</Button
            >
            <Dialog.Close onclick={() => (isOpen = false)}
                ><Button variant="secondary" class="w-full">キャンセル</Button
                ></Dialog.Close
            >
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
