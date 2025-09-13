<script lang="ts">
    import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js'
    import { buttonVariants } from '$lib/components/ui/button/index.js'

    interface Props {
        triggerText: string
        title: string
        description: string
    }
    const props: Props = $props()
</script>

<AlertDialog.Root>
    <AlertDialog.Trigger class={buttonVariants({ variant: 'outline' })}>
        {props.triggerText}
    </AlertDialog.Trigger>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>{props.title}</AlertDialog.Title>
            <AlertDialog.Description>
                {props.description}
            </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>キャンセル</AlertDialog.Cancel>
            <AlertDialog.Action>オッケ</AlertDialog.Action>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>
