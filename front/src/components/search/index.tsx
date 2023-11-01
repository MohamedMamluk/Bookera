'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { useRouter, useSearchParams } from 'next/navigation';

const SearchForm = () => {
  const navigate = useRouter();
  const query = useSearchParams();
  const [search, setSearch] = useState('');
  return (
    <form
      className='w-full my-3'
      onSubmit={(e) => {
        e.preventDefault();
        const newParams = new URLSearchParams(query.toString());
        newParams.set('title', search);
        navigate.push('/books?' + newParams.toString());
      }}
    >
      <div className='flex w-full max-w-sm items-center'>
        <Input
          type='text'
          placeholder='What are you looking for?'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type='submit' variant='secondary' size='icon'>
          <Search />
        </Button>
      </div>
    </form>
  );
};

export default SearchForm;
