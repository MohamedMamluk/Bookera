'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SortAscIcon } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
const SortBy = () => {
  const navigate = useRouter();
  const query = useSearchParams();
  const updateSorting = (value: string) => {
    const newParams = new URLSearchParams(query.toString());
    newParams.set('sortBy', value);
    navigate.push('/books?' + newParams.toString());
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline'>
          <SortAscIcon />
          Sort
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={query.get('sortBy') || 'relevance'}
          onValueChange={updateSorting}
        >
          <DropdownMenuRadioItem value='relevance'>New</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='price-asc'>
            Price: Low to High
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='price-desc'>
            Price: High to Low
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortBy;
