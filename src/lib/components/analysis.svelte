<script lang="ts">
    import Chart from './Chart.svelte'
    import { Button } from '$lib/components/ui/button/index.js'
    import * as Drawer from '$lib/components/ui/drawer/index.js'

    const { openText } = $props()

    const username = '高'
</script>

<Drawer.Root>
    <Drawer.Trigger>
        {openText}
    </Drawer.Trigger>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>{username}さんの分析報告</Drawer.Title>
            <Drawer.Description
                >今月の勤務情報を分析して生成したチャートです。</Drawer.Description
            >
        </Drawer.Header>

        <section class="p-5">
            <Chart />
        </section>

        <Drawer.Footer>
            <Drawer.Close><Button class="w-full">閉じる</Button></Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>
