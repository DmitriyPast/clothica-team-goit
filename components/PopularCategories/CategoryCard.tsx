export default function CategoryCard({
  category,
}: {
  category: { id: string | number; title: string; imageUrl: string };
}) {
  return (
    <li className="category-card" role="listitem" aria-label={category.title}>
      <figure className="category-figure">
        <img src={category.imageUrl} alt={category.title} />
        <figcaption>{category.title}</figcaption>
      </figure>
    </li>
  );
}
