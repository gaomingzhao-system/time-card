<script lang="ts">
    import {
        Card,
        CardContent,
        CardHeader,
        CardTitle,
    } from '$lib/components/ui/card/index.js'
    import { Button } from '$lib/components/ui/button/index.js'
    import * as Drawer from '$lib/components/ui/drawer/index.js'

    const { openText } = $props()
</script>

<Drawer.Root>
    <Drawer.Trigger>
        {openText}
    </Drawer.Trigger>
    <Drawer.Content>
        <Drawer.Header>
            <Drawer.Title>Are you sure absolutely sure?</Drawer.Title>
            <Drawer.Description
                >This action cannot be undone.</Drawer.Description
            >
        </Drawer.Header>
        <Drawer.Footer>
            <Button>Submit</Button>
            <Drawer.Close>Cancel</Drawer.Close>
        </Drawer.Footer>
    </Drawer.Content>
</Drawer.Root>
