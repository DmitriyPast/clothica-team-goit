import css from './CategoryPage.module.css';

type Props = {
  params: Promise<{ categoryNumber: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { categoryNumber } = await params;

  return (
    <div className={css.container}>
      <h1>Категорія {categoryNumber}</h1>
      {/* Тут буде список товарів категорії */}
    </div>
  );
}
