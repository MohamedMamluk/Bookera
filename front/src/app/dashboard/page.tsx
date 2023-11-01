import { Metadata } from 'next';
import { CalendarDateRangePicker } from '@/components/dashboard/components/date-range-picker';
import Stats from './_components/Stats';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View and edit your books and check your revenue.',
};

export default function DashboardPage() {
  return (
    <>
      <div className=' flex-col md:flex w-full mt-10'>
        <div className='flex-1 space-y-4 p-3 pt-6 relative'>
          <div className='flex items-center justify-between space-y-2 flex-wrap'>
            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
            <div className='flex items-center space-x-2'>
              <CalendarDateRangePicker />
            </div>
          </div>
          <Stats />
        </div>
      </div>
    </>
  );
}
