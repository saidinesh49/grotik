<script lang="ts">
    import { theme } from '$lib/stores/theme';
    import { Sun, Moon, Laptop } from 'lucide-svelte';
    import Button from '$lib/components/ui/button/button.svelte';
    import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

    const themes = [
        {
            id: 'light',
            name: 'Light',
            icon: Sun
        },
        {
            id: 'dark',
            name: 'Dark',
            icon: Moon
        },
        {
            id: 'system',
            name: 'System',
            icon: Laptop
        }
    ] as const;
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
        <div slot="trigger" let:builders>
            <Button
                variant="ghost"
                size="icon"
                class="relative size-9 hover:bg-gray-100 dark:hover:bg-gray-800"
                builders={builders}
            >
                <Sun class="size-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                <Moon
                    class="absolute size-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </div>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        {#each themes as { id, name, icon: Icon }}
            <DropdownMenu.Item
                on:click={() => theme.setTheme(id)}
                className="flex cursor-pointer items-center gap-2"
            >
                <Icon class="size-4" />
                <span>{name}</span>
                {#if $theme === id}
                    <span class="ml-auto text-xs text-blue-600 dark:text-blue-400">✓</span>
                {/if}
            </DropdownMenu.Item>
        {/each}
    </DropdownMenu.Content>
</DropdownMenu.Root> 