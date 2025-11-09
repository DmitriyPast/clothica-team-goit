import Link from "next/link";
import CategoriesList from '@/components/PopularCategories/CategoriesList';
import css from '@/components/PopularCategories/PopularCategories.module.css';

export default function PopularCategories() {
  return (
    <section className={css.popularCategories}>
      <div className={css.popularCategoriesHeader}>
        <h2 >Популярні категорії</h2>
        <Link href="/categories" className={css.allCategoriesBtn}>
  Всі категорії
</Link>
      </div>
      <CategoriesList/>
    </section>
  );
}
