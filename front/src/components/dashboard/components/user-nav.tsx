'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/features/auth-slice';
import { useRouter } from 'next/navigation';

const UserNav = () => {
  const { user } = useAppSelector((store) => store.authSlice);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8  flex items-center justify-center'>
            <User />
            {/* <AvatarFallback>SC</AvatarFallback> */}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>
              Welcome <span className='font-bold capitalize'>{user?.name}</span>
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href='/home'>
            <DropdownMenuItem>
              Home
              <DropdownMenuShortcut>H</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href='/dashboard'>
            <DropdownMenuItem>
              Dashboard
              <DropdownMenuShortcut>D</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            dispatch(logout());
            router.push('/home');
          }}
        >
          Log out
          <DropdownMenuShortcut>L</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserNav;
