import Footer from '@/components/footer/indexx';
import HeroSection from '@/components/home/hero_section';
import PerksSection from '@/components/home/perks_section';
import ReleasesSection from '@/components/home/releases_section';
import SelectCategories from '@/components/selectCategory';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Bookera | Home',
};
const page = () => {
  return (
    <div>
      <HeroSection />
      <PerksSection />
      <ReleasesSection sectionLabel='New Releases' data={[]}>
        <SelectCategories />
      </ReleasesSection>
      <ReleasesSection sectionLabel='Recommended For You' data={[]} />
    </div>
  );
};

export default page;
