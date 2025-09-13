<script lang="ts">
    import * as Card from '$lib/components/ui/card/index.js'
    import * as Dialog from '$lib/components/ui/dialog/index.js'
    import * as Carousel from '$lib/components/ui/carousel/index.js'
</script>

<Dialog.Root>
    <Dialog.Trigger>本日の日報を生成する</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title>日報を生成する</Dialog.Title>
            <Dialog.Description>
                Github
                APIを使って、本日完了されたイシューを基に日報を生成します。
            </Dialog.Description>
        </Dialog.Header>

        <Carousel.Root class="w-full max-w-xs">
            <Carousel.Content>
                {#each Array(5), i}
                    <Carousel.Item>
                        <div class="p-1">
                            <Card.Root>
                                <Card.Content
                                    class="flex aspect-square items-center justify-center p-6"
                                >
                                    <span class="text-4xl font-semibold"
                                        >{i + 1}</span
                                    >
                                </Card.Content>
                            </Card.Root>
                        </div>
                    </Carousel.Item>
                {/each}
            </Carousel.Content>
            <Carousel.Previous />
            <Carousel.Next />
        </Carousel.Root>
    </Dialog.Content>
</Dialog.Root>
