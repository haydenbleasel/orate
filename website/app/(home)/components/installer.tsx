import { CopyButton } from './copy-button';

type SnippetProps = {
  code: string;
};

export const Installer = ({ code }: SnippetProps) => (
  <div className="flex items-center gap-2 rounded-md border py-[9px] pr-[9px] pl-4">
    <pre className="text-sm">{code}</pre>
    <CopyButton name="installer" className="ml-0 rounded-sm" code={code} />
  </div>
);
