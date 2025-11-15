// import ReviewsList from '@/components/ReviewsList/ReviewsList';
import Hero from '../../components/Hero/Hero';
import Style from '../../components/Style/Style';
import LastReviews from '@/components/LastReviews/LastReviews';

export default function HomePage() {
  return (
    <div className="container">
      <Hero />
      <Style />
      <LastReviews />
    </div>
  );
}
export const dynamic = 'force-dynamic';
