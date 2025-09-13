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
</script>

<header></header>

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
                本日労働時間
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
                    <RotateCcw h-[1.2rem] w-[1.2rem] !transition-all />
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

<footer></footer>
