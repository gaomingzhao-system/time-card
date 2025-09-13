<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js'
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
</script>

<header>
    <Card>
        <CardContent
            >{date.getHours() < 12
                ? 'おはよう'
                : 'こんにちは'}今日は：{formattedDate}</CardContent
        >
        <CardContent>今の状態は：{status}</CardContent>
    </Card>
</header>

<main>
    <!-- the section of info card -->
    <!-- started working card -->
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2 text-2xl">
                出勤時間
            </CardTitle>
        </CardHeader>
        <CardContent class="flex items-center justify-between">
            <p>2025/09/13</p>
            <p>08:11:11</p>
        </CardContent>
    </Card>

    <!-- ended working card -->
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2 text-2xl">
                退勤時間
            </CardTitle>
        </CardHeader>
        <CardContent class="flex items-center justify-between">
            <p>2025/09/13</p>
            <p>17:11:11</p>
        </CardContent>
    </Card>

    <!-- breaking card -->
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2 text-2xl">
                休憩時間
            </CardTitle>
        </CardHeader>
        <CardContent class="flex items-center justify-between">
            <p>2025/09/13</p>
            <p>12:00:00</p>
        </CardContent>
    </Card>

    <!-- total working hours card -->
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2 text-2xl">
                本日合計勤務
            </CardTitle>
        </CardHeader>
        <CardContent class="flex items-center justify-between">
            <p>2025/09/13</p>
            <p>08:11:11 - 17:11:11</p>
        </CardContent>
    </Card>

    <!-- the section of action card -->
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2 text-2xl">操作</CardTitle>

            <section>
                <Button variant="outline" size="icon">
                    <RotateCcw class="[1.2rem] w-[1.2rem] !transition-all" />
                </Button>
                <ModeToggle />
            </section>
        </CardHeader>
        <CardContent class="flex items-center justify-between">
            <Button class="w-1/2">出勤</Button>
            <Button class="w-1/2">退勤</Button>
            <Button class="w-1/2">休憩開始</Button>
            <Button class="w-1/2">分析報告</Button>
        </CardContent>
    </Card>
</main>

<footer>
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
