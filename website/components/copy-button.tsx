'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type CopyButtonProps = {
  code: string;
  className?: string;
};

export const CopyButton = ({ code, className }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  const Icon = copied ? CheckIcon : CopyIcon;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Copied example code to clipboard');

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Button
      size="icon"
      className={cn('-m-2', className)}
      variant="ghost"
      onClick={handleCopy}
      disabled={copied}
    >
      <Icon size={16} className="text-muted-foreground" />
    </Button>
  );
};
