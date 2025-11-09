import Categories from '@/components/Categories';

export default function HomePage() {
  return (
    <main>
      <Categories initialLimit={3} />
    </main>
  );
}
