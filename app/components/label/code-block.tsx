'use client';
import type { BundledLanguage } from '@/components/ui/shadcn-io/code-block';
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockItem,
} from '@/components/ui/shadcn-io/code-block';

interface CodeItem {
  language: string;
  filename: string;
  code: string;
}

interface CustomCodeBlockProps {
  code: CodeItem[];
  defaultValue: string;
  onCopy?: () => void;
  onError?: () => void;
  copyButtonClassName?: string;
  lineNumbers?: boolean;
}

const CustomCodeBlock = ({
  code,
  defaultValue,
  onCopy,
  onError,
  lineNumbers = false,
  copyButtonClassName = 'absolute top-1 right-2',
}: CustomCodeBlockProps) => (
  <CodeBlock data={code} defaultValue={code[0]?.language}>
    <div className="relative flex justify-end z-10">
      <CodeBlockCopyButton
        className={copyButtonClassName}
        onCopy={onCopy}
        onError={onError}
      />
    </div>
    <CodeBlockBody >
      {(item) => (
        <CodeBlockItem key={item.language} value={item.language} lineNumbers={lineNumbers}>
          <CodeBlockContent language={item.language as BundledLanguage} className='bg-neutral/20'>
            {item.code}
          </CodeBlockContent>
        </CodeBlockItem>
      )}
    </CodeBlockBody>
  </CodeBlock>
);

export default CustomCodeBlock;