'use client';

import {
    Snippet,
    SnippetCopyButton,
    SnippetHeader,
    SnippetTabsContent,
    SnippetTabsList,
    SnippetTabsTrigger,
} from '@/registry/new-york/ui/codeTabs';
import { useState } from 'react';

type Command = {
    label: string;
    code: string;
};

type CommandSnippetProps = {
    commands: Command[];
};

const CommandSnippet = ({ commands }: CommandSnippetProps) => {
    const [value, setValue] = useState(commands[0].label);
    const activeCommand = commands.find((command) => command.label === value);

    return (
        <Snippet onValueChange={setValue} value={value}>
            <SnippetHeader>
                <SnippetTabsList>
                    {commands.map((command) => (
                        <SnippetTabsTrigger key={command.label} value={command.label}>
                            {command.label}
                        </SnippetTabsTrigger>
                    ))}
                </SnippetTabsList>
            </SnippetHeader>

            <div className='flex flex-row w-full justify-between items-center'>
                {commands.map((command) => (
                    <SnippetTabsContent key={command.label} value={command.label}>
                        {command.code}
                    </SnippetTabsContent>
                ))}

                {activeCommand && (
                    <SnippetCopyButton
                        onCopy={() =>
                            console.log(`Copied "${activeCommand.code}" to clipboard`)
                        }
                        onError={() =>
                            console.error(`Failed to copy "${activeCommand.code}" to clipboard`)
                        }
                        value={activeCommand.code}
                    />
                )}
            </div>
        </Snippet>
    );
};

export default CommandSnippet;
