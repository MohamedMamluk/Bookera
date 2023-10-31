'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BookSchema, Categories, bookSchema } from '../_schema/book.schema';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import BookeraBackend from '@/lib/axiosInstance';
import { useAppSelector } from '@/store';
import { toast } from 'react-toastify';
import { categories } from '@/components/selectCategory';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Book } from '@/store/features/dashboard-slice';
import { useRouter } from 'next/navigation';
type Field = {
  label: string;
  type: string;
  placeholder: string;
  field: keyof BookSchema;
};
const fields: Field[] = [
  {
    label: 'Title',
    type: 'text',
    placeholder: 'Rich Dad Poor Dad',
    field: 'title',
  },
  {
    label: 'Author',
    type: 'text',
    placeholder: 'Charles Dickens',
    field: 'author',
  },
  {
    label: 'Description',
    type: 'text',
    placeholder: 'enter description',
    field: 'description',
  },
  {
    label: 'Price',
    type: 'number',
    placeholder: '0',
    field: 'price',
  },
  {
    label: 'Stock',
    type: 'number',
    placeholder: '0',
    field: 'stock',
  },
];
const EditBook = ({ bookDetails }: { bookDetails: BookSchema }) => {
  const { user } = useAppSelector((store) => store.authSlice);
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const editBookForm = useForm<BookSchema>({
    resolver: zodResolver(bookSchema),
  });
  useEffect(() => {
    editBookForm.reset({
      ...bookDetails,
      price: bookDetails.price.toString(),
      stock: bookDetails.stock.toString(),
    });
  }, [bookDetails, editBookForm]);
  const editBook = async (book: BookSchema) => {
    const newBook = { ...book, price: +book.price, stock: +book.stock };
    try {
      const { data } = await toast.promise(
        BookeraBackend.patch('/book/' + bookDetails._id, newBook, {
          headers: { Authorization: 'Bearer ' + user?.access_token },
        }),
        {
          pending: 'Editing Book...',
          success: 'Book edited 👌',
          error: {
            render: ({ data }: any) => {
              console.log(data);
              return data.response.data.message;
            },
          },
        }
      );
      router.push('/dashboard/books');
    } catch (error) {
      return;
    }
    console.log(book);
  };
  const uploadBookCover = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.set('file', file);
      const { data } = await toast.promise(
        BookeraBackend.post('/upload/cover', formData, {
          headers: { Authorization: 'Bearer ' + user?.access_token },
        }),
        {
          pending: 'Started Book cover uploading...',
          success: 'Book Cover Uploaded 👌',
          error: {
            render: ({ data }: any) => {
              console.log(data);
              return data.response.data.message;
            },
          },
        }
      );
      editBookForm.setValue('cover', data.link);
    } catch (error) {
      return;
    } finally {
      setIsUploading(false);
    }
  };
  const uploadBook = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) {
      return;
    }
    setIsUploading(true);
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.set('file', file);
      const { data } = await toast.promise(
        BookeraBackend.post('/upload/file', formData, {
          headers: { Authorization: 'Bearer ' + user?.access_token },
        }),
        {
          pending: 'Started file uploading...',
          success: 'File Uploaded 👌',
          error: {
            render: ({ data }: any) => {
              console.log(data);
              return data.response.data.message;
            },
          },
        }
      );
      editBookForm.setValue('link', data.link);
    } catch (error) {
      return;
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <form onSubmit={editBookForm.handleSubmit(editBook, (e) => console.log(e))}>
      <div className='grid gap-5'>
        {fields.map((field, index) => {
          return (
            <div className='grid gap-1' key={index}>
              <Label htmlFor={field.field}>{field.label}</Label>
              <Input
                id={field.field}
                placeholder={field.placeholder}
                type={field.type}
                autoCapitalize='none'
                autoComplete={field.field}
                autoCorrect='off'
                disabled={isUploading}
                {...editBookForm.register(field.field)}
              />
              <small className='text-red-400 text-center block h-3'>
                {editBookForm?.formState?.errors[field.field]?.message}
              </small>
            </div>
          );
        })}
        <Select
          onValueChange={(value: Categories) =>
            editBookForm.setValue('category', value)
          }
          value={editBookForm.watch('category')}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {categories.map((category, index) => {
                return (
                  <SelectItem
                    key={index}
                    value={category}
                    className='capitalize'
                  >
                    {category.toLowerCase()}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='picture'>Book File (PDF)</Label>
          <Input
            id='book'
            type='file'
            accept='application/pdf'
            onChange={uploadBook}
          />
          <small className='text-red-400 text-center block h-3'>
            {editBookForm?.formState?.errors['link']?.message}
          </small>
        </div>
        <div className='grid w-full max-w-sm items-center gap-1.5'>
          <Label htmlFor='picture'>Book Cover</Label>
          <Input
            id='cover'
            type='file'
            accept='image/*'
            onChange={uploadBookCover}
          />
          <small className='text-red-400 text-center block h-3'>
            {editBookForm?.formState?.errors['cover']?.message}
          </small>
        </div>
      </div>
      <Button type='submit'>edit</Button>
    </form>
  );
};

export default EditBook;
