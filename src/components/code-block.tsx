"use client"

import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiClipboardOutline } from "@mdi/js";
import { useState, useEffect } from "react";
import * as shiki from "shiki";

interface CodeBlockProps {
    code: string;
    lang?: string;
    showLineNumbers?: boolean;
}

export function CodeBlock({ code, lang = "tsx", showLineNumbers = true }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);
    const [html, setHtml] = useState<string>("");

    useEffect(() => {
        async function load() {
            const highlighter = await shiki.createHighlighter({ 
                themes: ["github-light"],
                langs: ["typescript", "javascript", "tsx", "jsx", "json", "css", "html"],
            })
            const rawHtml = highlighter.codeToHtml(code, {
                lang,
                theme: "github-light",
            });

            if (showLineNumbers) {
                const numbered = addLineNumbers(rawHtml);
                setHtml(numbered);
            } else {
                setHtml(rawHtml);
            }
        }
        
        load();
    }, [code, lang, showLineNumbers]);

    async function copyToClipboard() {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }

    return (
        <div className="relative rounded-md bg-muted overflow-hidden">
            <Button
                variant="ghost"
                colorScheme="neutral"
                size="icon-sm"
                onClick={copyToClipboard}
                className="absolute top-2 right-2 text-xs text-zinc-400 hover:text-white flex items-center gap-1"
            >
                <Icon path={mdiClipboardOutline} />
            </Button>
            <div
                className="text-sm overflow-x-auto p-4"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    )
}

function addLineNumbers(html: string) {
    const match = html.match(/<code.*?>([\s\S]*?)<\/code>/);
    if (!match) return html;

    const codeContent = match[1];
    const lines = codeContent.split("\n");

    const numbered = lines
        .map(
            (line, i) => `
            <div class="table-row">
                <span class="w-5 table-cell select-none text-zinc-500">${i + 1}</span>
                <span class="table-cell">${line || "&nbsp;"}</span>
            </div>
        `
        )
        .join("");
    
    return `
        <pre class="shiki codeblock table w-full">
            <code class="table-row-group">${numbered}</code>
        </pre>
    `;
}