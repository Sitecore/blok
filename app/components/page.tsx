'use client'

import CommandSnippet from '@/components/ui/commandSnippet';

const commands = [
    {
        label: 'npm',
        code: 'npx next-forge@latest init',
    },
    {
        label: 'yarn',
        code: 'yarn dlx next-forge@latest init',
    },
    {
        label: 'pnpm',
        code: 'pnpx next-forge@latest init',
    },
    {
        label: 'bun',
        code: 'bunx next-forge@latest init',
    },
];

const ComponentsPage = () => {

    return (
        <div className="flex w-full flex-row bg-secondary min-h-screen">

            <div className='flex flex-col w-[70%] gap-4 p-4'>
                <h1 className='text-5xl font-semibold text-foreground'>Button</h1>
                <p className='text-lg text-muted-foreground'>Displays a button or a component that looks like a button.</p>
                <h2 className='text-3xl text-foreground font-semibold'>Installation</h2>

                <CommandSnippet commands={commands} />
            </div>

        </div>


    )
}

export default ComponentsPage