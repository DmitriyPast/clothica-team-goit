import css from '@/components/PopularCategories/PopularCategories.module.css';

export default function CategoryCard({
  category,
}: {
  category: { id: string | number; title: string; imageUrl: string };
}) {
  return (
    <li className={css.categoryCard} role="listitem" aria-label={category.title}>
      <figure className={css.categoryCardFigure}>
        <img src={category.imageUrl} alt={category.title} />
        <figcaption>{category.title}</figcaption>
      </figure>
    </li>
  );
}
