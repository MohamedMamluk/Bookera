'use client';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
export const categories = [
  'HISTORY',
  'FICTION',
  'NON_FICTION',
  'ROMANCE',
  'DRAMA',
  'FINANCE',
];
const SelectCategories = () => {
  const navigate = useRouter();
  const query = useSearchParams();
  const updateCategory = (value: string) => {
    const newParams = new URLSearchParams(query.toString());
    newParams.set('category', value);
    navigate.push('/books?' + newParams.toString());
  };

  return (
    <Select onValueChange={updateCategory}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Select a category' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className='dark:text-gray-100'>Category</SelectLabel>
          {categories.map((category, index) => {
            return (
              <SelectItem key={index} value={category} className='capitalize'>
                {category.toLowerCase()}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectCategories;
