// import ReviewsList from '@/components/ReviewsList/ReviewsList';
import Hero from '../../components/Hero/Hero';
import Style from '../../components/Style/Style';
import LastReviews from '@/components/LastReviews/LastReviews';
import PopularGoods from '@/components/PopularGoods/PopularGoods';

import PopularCategories from '@/components/PopularCategories/PopularCategories';

export default function HomePage() {
  return (
    <div className="container">
      <Hero />
      <Style />
      <PopularCategories />
      <PopularGoods />
      <LastReviews />
    </div>
  );
}
export const dynamic = 'force-dynamic';
