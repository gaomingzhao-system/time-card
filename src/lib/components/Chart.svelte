<script lang="ts">
    import { scaleBand } from 'd3-scale'
    import { BarChart, type ChartContextValue } from 'layerchart'
    import TrendingUpIcon from '@lucide/svelte/icons/trending-up'
    import * as Chart from '$lib/components/ui/chart/index.js'
    import * as Card from '$lib/components/ui/card/index.js'
    import { cubicInOut } from 'svelte/easing'

    const chartData = Array.from({ length: 30 }, (_, i) => ({
        day: `${i + 1}`,
        workTime: Math.floor(Math.random() * 8) + 1, // Random work time between 1 and 8 hours
    }))

    const chartConfig = {
        day: { label: '日付', color: 'var(--chart-1)' },
        workTime: { label: '勤務時間', color: 'var(--chart-2)' },
    } satisfies Chart.ChartConfig

    let context = $state<ChartContextValue>()

    const date = new Date()
    const formattedYear = date.getFullYear() + '年'
    const formattedMonth = date.getMonth() + 1 + '月'

    const getDaysInCurrentMonth = () => {
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth()
        const lastDayOfCurrentMonth = new Date(year, month + 1, 0)

        return lastDayOfCurrentMonth.getDate()
    }
    const lastDayOfCurrentMonth = getDaysInCurrentMonth()
</script>

<Card.Root>
    <Card.Header>
        <Card.Title>今月の勤務時間</Card.Title>
        <Card.Description
            >{formattedYear}
            {formattedMonth}1日 ~ {formattedMonth}{lastDayOfCurrentMonth}日</Card.Description
        >
    </Card.Header>
    <Card.Content>
        <Chart.Container config={chartConfig}>
            <BarChart
                bind:context
                data={chartData}
                xScale={scaleBand().padding(0.25)}
                x="day"
                axis="x"
                series={[
                    {
                        key: 'workTime',
                        label: '勤務時間',
                        color: chartConfig.workTime.color,
                    },
                ]}
                props={{
                    bars: {
                        stroke: 'none',
                        rounded: 'all',
                        radius: 8,
                        // use the height of the chart to animate the bars
                        initialY: context?.height,
                        initialHeight: 0,
                        motion: {
                            x: {
                                type: 'tween',
                                duration: 500,
                                easing: cubicInOut,
                            },
                            width: {
                                type: 'tween',
                                duration: 500,
                                easing: cubicInOut,
                            },
                            height: {
                                type: 'tween',
                                duration: 500,
                                easing: cubicInOut,
                            },
                            y: {
                                type: 'tween',
                                duration: 500,
                                easing: cubicInOut,
                            },
                        },
                    },
                    highlight: { area: { fill: 'none' } },
                    xAxis: { format: (d) => d.slice(0, 3) },
                }}
            >
                {#snippet tooltip()}
                    <Chart.Tooltip hideLabel />
                {/snippet}
            </BarChart>
        </Chart.Container>
    </Card.Content>
    <Card.Footer>
        <h5 class="text-sm text-gray-400">今月もお疲れ様でした！</h5>
    </Card.Footer>
</Card.Root>
