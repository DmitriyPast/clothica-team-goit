import ReviewsList from '@/components/ReviewsList/ReviewsList';
import Hero from '../../components/Hero/Hero';
import Style from '../../components/Style/Style';

export default function HomePage() {
  return (
    <div className="container">
      <Hero />
      <Style />
      <ReviewsList />
    </div>
  );
}
