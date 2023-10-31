import Link from 'next/link';

import { cn } from '@/lib/utils';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn(
        'flex items-start flex-wrap justify-start gap-4',
        className
      )}
      {...props}
    >
      <Link
        href='/dashboard'
        className='text-sm font-medium transition-colors hover:text-primary'
      >
        Overview
      </Link>
      <Link
        href='/dashboard/books'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Books Sold
      </Link>
      <Link
        href='/dashboard/bought'
        className='text-sm font-medium text-muted-foreground transition-colors hover:text-primary'
      >
        Books Bought
      </Link>
    </nav>
  );
}
