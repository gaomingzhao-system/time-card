<script lang="ts">
    import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js'
    import { buttonVariants } from '$lib/components/ui/button/index.js'
    import { type Snippet } from 'svelte'

    interface Props {
        isOpen: boolean
        triggerText?: string
        title: string
        description: string
        children?: Snippet
        handleConfirm: () => void
    }
    const {
        isOpen = $bindable(false),
        triggerText,
        title,
        description,
        children,
        handleConfirm,
    } = $props()
</script>

<AlertDialog.Root open={isOpen}>
    {#if isOpen}
        <AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
            {triggerText}
        </AlertDialog.Trigger>
    {/if}
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>{title}</AlertDialog.Title>
            <AlertDialog.Description>
                {description}
            </AlertDialog.Description>

            <section class="my-4">
                {@render children()}
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
