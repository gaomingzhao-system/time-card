<script lang="ts">
    import * as Carousel from '$lib/components/ui/carousel/index.js'
    import { Card, CardContent } from '$lib/components/ui/card/index'
    import { cn } from '$lib/utils'

    interface DefaultTemplate {
        id: number
        template: string
    }
    const defaultTemplates = [
        {
            id: 0,
            template: `# 今日の進捗\n\n## 完了したタスク\n- タスク1: 詳細な説明\n- タスク2: 詳細な説明\n\n## 明日の予定\n- タスク1: 詳細な説明\n- タスク2: 詳細な説明\n\n## 課題と懸念点\n- 課題1: 詳細な説明\n- 課題2: 詳細な説明\n\n## その他連絡事項\n- 連絡事項1: 詳細な説明\n- 連絡事項2: 詳細な説明`,
        },
        {
            id: 1,
            template: `# 今日の進捗\n\n## 完了したタスク\n- タスク1\n- タスク2\n\n## 明日の予定\n- タスク1\n- タスク2`,
        },
        {
            id: 2,
            template: `# 今日の進捗\n\n## 完了したタスク\n- タスク1: 詳細な説明、所要時間、使用したリソースなど\n- タスク2: 詳細な説明、所要時間、使用したリソースなど\n\n## 明日の予定\n- タスク1: 詳細な説明、目標、必要なリソースなど\n- タスク2: 詳細な説明、目標、必要なリソースなど\n\n## 課題と懸念点\n- 課題1: 詳細な説明、影響範囲、対策案など\n- 課題2: 詳細な説明、影響範囲、対策案など\n\n## その他連絡事項\n- 連絡事項1: 詳細な説明、関連する情報など\n- 連絡事項2: 詳細な説明、関連する情報など`,
        },
    ] satisfies DefaultTemplate[]

    let isActive = $state(0)
    interface Props {
        selectedId?: number
        selectedTemplate?: string
    }
    let {
        selectedId = $bindable(0),
        selectedTemplate = $bindable(defaultTemplates[0].template),
    }: Props = $props()
    const handleClickTemplate = (id: number, template: string) => {
        isActive = id
        selectedId = id
        selectedTemplate = template
    }
</script>

<!-- 50% on small screens and 33% on larger screens. -->
<Carousel.Root>
    <Carousel.Content>
        {#each defaultTemplates as item}
            <Carousel.Item
                class="w-full text-start text-sm"
                onclick={() => handleClickTemplate(item.id, item.template)}
            >
                <Card
                    class={cn(
                        'hover:bg-muted h-64 w-full cursor-pointer',
                        isActive === item.id && 'border-primary border-2',
                    )}
                >
                    <CardContent>
                        {item.template}
                    </CardContent>
                </Card>
            </Carousel.Item>
        {/each}
    </Carousel.Content>

    <Carousel.Previous class="absolute top-1/2 left-2" />
    <Carousel.Next class="absolute top-1/2 right-2" />
</Carousel.Root>
