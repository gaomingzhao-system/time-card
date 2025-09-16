<script lang="ts">
    import { Input } from '$lib/components/ui/input/index.js'
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
    import Analysis from '$lib/components/analysis.svelte'
    import { Bot } from 'lucide-svelte'
    import AlertDialog from '$lib/components/AlertDialog.svelte'
    import AIDialog from '$lib/components/AIDialog.svelte'
    import * as Alert from '$lib/components/ui/alert/index.js'
    import presentationImg from '$lib/assets/presentation.png'

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

    let githubToken = $state('')

    let isOpenAlertDialog = $state(false)
    let isOpenAIDialog = $state(false)
    const openDialog = () => {
        const githubToken = localStorage.getItem('githubToken')

        if (!githubToken) isOpenAlertDialog = true
        else isOpenAIDialog = true
    }
</script>

<main class="p-3 md:px-96">
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
                <CardTitle>オプレーション</CardTitle>

                <section class="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onclick={() => location.reload()}
                    >
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

                <Button class="grid-item">
                    <Analysis openText="分析報告" />
                </Button>
                <Button
                    class="col-span-full"
                    variant="outline"
                    onclick={() => openDialog()}
                >
                    <Bot class="size-5" />本日の日報を生成する</Button
                >
            </CardContent>
        </Card>
    </main>

    <footer class="mt-3">
        <Card>
            <CardHeader class="flex items-center justify-between">
                <CardTitle>出勤メンバー</CardTitle>
            </CardHeader>

            <section class="flex flex-col items-start justify-center gap-3 p-5">
                {#each members as member}
                    <CardContent
                        class="flex w-full items-center justify-between rounded-xl bg-gray-100 py-3 dark:bg-gray-800"
                    >
                        <header>
                            <h5>{member.name}</h5>
                            <p class="text-sm">開始時間: {member.start}</p>
                        </header>
                        <Badge variant="secondary" class={statusBadgeColor}
                            >{member.status}</Badge
                        >
                    </CardContent>
                {/each}
            </section>
        </Card>
    </footer>
</main>

<AIDialog bind:isOpen={isOpenAIDialog} />

<AlertDialog
    bind:isOpen={isOpenAlertDialog}
    title="Github Tokenを設定してください"
    description="Tokenを設定しないとデータ貰えないです"
    handleConfirm={() => {
        localStorage.setItem('githubToken', githubToken)
        isOpenAlertDialog = false
    }}
>
    <!-- get github token steps for suggesting to user -->
    <Alert.Root class="mb-5">
        <Alert.Title>Tokenの獲得方法</Alert.Title>
        <Alert.Description>
            <ul class=" list-inside list-disc text-left text-sm">
                <li>
                    <a href="https://github.com/settings/profile"
                        >Github Settings</a
                    >に移動
                </li>
                <li>
                    左側の <a
                        href="https://github.com/settings/personal-access-tokens"
                        class="text-blue-600 underline">Developer Settings</a
                    >
                    をクリック、Personal Access Tokensで<strong
                        >Fine-grained tokens</strong
                    >を選択
                </li>
                <li>右上の<code>Generate new token</code>をクリック</li>
                <li>
                    Token nameを入力、Expirationは必要に応じて設定、ただし<code
                        >No expiration</code
                    >は不推薦
                </li>
                <li>
                    <code>Repository access欄</code>で
                    <strong>All Repositories</strong>を選択
                </li>
                <li>
                    <code>Permissions</code>欄で
                    <code>Add Permissions</code>をクリックして<strong
                        >Issues</strong
                    >を選択、以下の画像のように設定

                    <img
                        src={presentationImg}
                        alt="展示画像"
                        class="my-2 rounded-lg"
                    />
                </li>
                <li>最後に<code>Generate Token</code>をクリックして完成</li>
            </ul>
        </Alert.Description>
    </Alert.Root>

    <Input
        placeholder="Github Tokenを入力してください"
        type="password"
        bind:value={githubToken}
    />
</AlertDialog>
