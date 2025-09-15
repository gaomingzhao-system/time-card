<script lang="ts">
    import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js'
    import { buttonVariants } from '$lib/components/ui/button/index.js'
    import { type Snippet } from 'svelte'

    interface Props {
        isOpen: boolean
        title: string
        description: string
        children?: Snippet
        handleConfirm: () => void
    }
    const {
        isOpen = $bindable(false),
        title,
        description,
        children,
        handleConfirm,
    }: Props = $props()
</script>

<AlertDialog.Root open={isOpen}>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>
                {description}
            </AlertDialog.Description>

            <section class="my-4">
                {#if children}
                    {@render children()}
                {/if}
            </section>
        </AlertDialog.Header>

        <AlertDialog.Footer>
            <AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
            <AlertDialog.Action onclick={handleConfirm}
                >オッケ</AlertDialog.Action
            >
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
