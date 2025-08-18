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
  bgColor?: string
  lineNumbers?: boolean;
}

const CustomCodeBlock = ({
  code,
  defaultValue,
  onCopy,
  onError,
  lineNumbers = false,
  copyButtonClassName = 'absolute top-1 right-2',
  bgColor
}: CustomCodeBlockProps) => (
  <CodeBlock data={code} defaultValue={code[0]?.language}>
    <div className="relative flex justify-end z-10">
      <CodeBlockCopyButton
        className={copyButtonClassName}
        onCopy={onCopy}
        onError={onError}
      />
    </div>
    <CodeBlockBody>
      {(item) => (
        <CodeBlockItem key={item.language} value={item.language} lineNumbers={lineNumbers}>
          <CodeBlockContent className={bgColor}  language={item.language as BundledLanguage}>
            {item.code}
          </CodeBlockContent>
        </CodeBlockItem>
      )}
    </CodeBlockBody>
  </CodeBlock>
);

export default CustomCodeBlock;