<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js'
    import { Badge } from '$lib/components/ui/badge/index.js'
    import ModeToggle from '$lib/components/ModeToggle.svelte'
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from '$lib/components/ui/card/index.js'
    import { RotateCcw } from 'lucide-svelte'

    const date = new Date()
    const formattedDate = date.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        weekday: 'short',
    })
    const time = date.toLocaleTimeString('ja-JP', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })

    type Status = '出勤中' | '退勤済み' | '休憩中' | '未出勤'
    const status: Status = $state('出勤中')

    interface Member {
        name: string
        status: Status
        start: string
    }
    const members: Member[] = [
        { name: '山田太郎', status: '出勤中', start: '08:11:11' },
        { name: '鈴木花子', status: '退勤済み', start: '09:00:00' },
        { name: '佐藤次郎', status: '休憩中', start: '12:00:00' },
    ]

    const username = '高'

    const getStatusBadgeColor = () => {
        switch (status as Status) {
            case '出勤中':
                return 'bg-green-500'
            case '退勤済み':
                return 'bg-gray-500'
            case '休憩中':
                return 'bg-yellow-500'
            case '未出勤':
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }
    const statusBadgeColor = $derived(getStatusBadgeColor())
</script>

<main class="p-3">
    <header>
        <Card
            class="flex flex-row items-center justify-between bg-gray-800 p-5 text-white dark:bg-gray-600"
        >
            <section>
                <CardContent class="px-0"
                    >{date.getHours() < 12
                        ? `おはよう！${username}さん`
                        : `こんにちは！${username}さん`}</CardContent
                >
                <CardContent class="px-0">今日は：{formattedDate}</CardContent>
            </section>

            <Badge variant="secondary" class={statusBadgeColor}>{status}</Badge>
        </Card>
    </header>

    <main>
        <!-- the section of info card -->
        <!-- started working card -->
        <section
            class="my-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4"
        >
            <Card>
                <CardHeader>
                    <CardTitle>出勤時間</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-xs">2025-09-13</p>
                    <p class="text-xl">08:11:11</p>
                </CardContent>
            </Card>

            <!-- ended working card -->
            <Card>
                <CardHeader>
                    <CardTitle>退勤時間</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-xs">2025-09-13</p>
                    <p class="text-xl">17:11:11</p>
                </CardContent>
            </Card>

            <!-- breaking card -->
            <Card>
                <CardHeader>
                    <CardTitle>休憩時間</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-xl">01:00:00</p>
                </CardContent>
            </Card>

            <!-- total working hours card -->
            <Card>
                <CardHeader>
                    <CardTitle>合計勤務時間</CardTitle>
                </CardHeader>
                <CardContent>
                    <p class="text-xl">08:00:00</p>
                </CardContent>
            </Card>
        </section>

        <!-- the section of action card -->
        <Card>
            <CardHeader class="flex items-center justify-between">
                <CardTitle class="flex items-center gap-2"
                    >オプレーション</CardTitle
                >

                <section class="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                        <RotateCcw
                            class="size-4 transition-transform hover:rotate-180"
                        />
                    </Button>
                    <ModeToggle />
                </section>
            </CardHeader>
            <CardContent class="grid grid-cols-2 gap-2">
                <Button class="grid-item">出勤</Button>
                <Button class="grid-item">退勤</Button>
                <Button class="grid-item">休憩開始</Button>
                <Button class="grid-item">分析報告</Button>
            </CardContent>
        </Card>
    </main>

    <footer class="mt-3">
        <Card>
            <CardTitle>出勤メンバー</CardTitle>

            {#each members as member}
                <CardContent>
                    <header>
                        <h5>{member.name}</h5>
                        <p>開始時間: {member.start}</p>
                    </header>
                    <p>状態: {member.status}</p>
                </CardContent>
            {/each}
        </Card>
    </footer>
</main>
