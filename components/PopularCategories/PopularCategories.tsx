import Link from "next/link";
import CategoriesList from '@/components/PopularCategories/CategoriesList';
import css from '@/components/PopularCategories/PopularCategories.module.css';
import { Category } from '@/components/PopularCategories/CategoriesList'; 

interface PopularCategoriesProps {
  categories?: Category[];
}

export default function PopularCategories({ categories= [] }: PopularCategoriesProps) {
  return (
    <section className={css.popularCategories}>
      <div className={css.popularCategoriesHeader}>
        <h2 >Популярні категорії</h2>
        <Link href="/categories" className={css.allCategoriesBtn}>
  Всі категорії
</Link>
      </div>

      <CategoriesList
        
      />
    </section>
  );
}
