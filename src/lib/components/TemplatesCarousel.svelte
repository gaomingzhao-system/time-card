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
            template:
                '```command このアカウントの今日のissueやpull requestの歴史を使って、今日しましたタスクをリストに書いてください、リンクとissue番号は不要です、特にissueに対応されたタスクのタイトルを書いてください。そして今日の感想も下に書いてください、フォーマットは下の内容にようにしてください：```\n ```text 9/1（月） 日報 高明昭\n本日の業務内容\n【点検 - 修正】モーダル背景表示のz-index調整によるバグの修正\n【点検 - 修正】コンポーネントのUI改善（カラーやデザインの調整）\n【点検 - 修正】初期設定ポップアップのスライドバグの修正とイベントハンドリング改善\n【点検 - 修正】研究項目のステータスカードスタイルの改善\nお疲れ様です。本日は主にバグ修正とUI向上を中心に作業しました。特にz-indexの設定や、ポップアップのスライド動作の改善に注力しました。また、イベントハンドリングの見直しによるコードの最適化を意識し、システム全体の安定性向上に努めました。小さな調整ですが、今後の作業効率やユーザー体験向上に繋がると感じています。明日も引き続き頑張ります！```',
        },
        {
            id: 1,
            template:
                '```commandこのアカウントの今日のissueやpull requestの歴史を使って、今日しましたタスクをリストに書いてください、リンクとissue番号は不要です、特にissueに対応されたタスクのタイトルを書いてください。そして今日の感想も下に書いてください、フォーマットは下の内容にようにしてください：```\n ```textお疲れ様です。ISM クリエイティブデザイン部 中嶋実里です。\n【日報 9月13日】\n 取り組みタスク\n■ AI新サービスの思案\n\nお疲れ様です。\nコンセプト、売り出したいサービス、ターゲット、改善すべき問題を固めたので、本日より資料作成を行います。\n◾️市場調査\n・既存サービスの主な特徴と面白いと思った点を書き出し、比較\n・これを踏まえてどのようなサービス形態で運用するのが良いか検討\n・企業に共通したサービスを書き出し自社が差別化を図れそうなAI機能を使ったサービスをピックアップ、メリットの書き出し\n・先に提出したコンセプト情報も含めて試しにAIスライドに反映（上限が来て途中で止まってしまいましたが）\nもう少し利益の予想とサービスの外堀（サービス名、キャッチコピー等）を固めてから、資料のデザインに入りたいと思います。```',
        },
        {
            id: 2,
            template:
                '```commandこのアカウントの今日のissueやpull requestの歴史を使って、今日しましたタスクをリストに書いてください、リンクとissue番号は不要です、特にissueに対応されたタスクのタイトルを書いてください。そして今日の感想も下に書いてください、フォーマットは下の内容にようにしてください：```\n ```text本日もお疲れ様です。\n日報提出いたします。\nーー　ISM株式会社　システム開発部　新村　日報　09月13日　ーー\n◆作業内容◆\n・ビギニング管理画面の微修正\n・AIを用いたサービスの考案\n◆翌営業日タスク◆\n ・作成物の確認と取り込み\n・住宅点検：修正タスクの作成\n・住宅点検：修正タスクの割り振り\n◆反省点：改善点：所感◆\n・本日はビギニングで発見した微修正を行いました。\n・また、住宅点検について必要な修正箇所に関して、タスク化し、割り振れるようにリストを作成しました。\n・次回はタスク割り振りし、修正依頼を出せるようにいたします。```',
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
                        'hover:bg-muted h-64 w-full cursor-pointer overflow-y-scroll px-5',
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
