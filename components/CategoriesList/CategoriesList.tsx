'use client';

import Image from "next/image";
import css from "./CategoriesList.module.css"

export type Category = {
  id: string | number;
  name: string;
  image: string;
};

type CategoriesListProps = {
  categories: Category[];
};

export default function CategoriesList({ categories = [] }: CategoriesListProps) {
  return (
   <ul className={`container ${css.categoriesList}`}>
      {categories.map((category) => (
        <li key={category.id} className={css.itemCategoriesList}>
          <Image
            src={category.image}
            alt={category.name}
            width={416}
            height={277}
            className={css.image}
          />
          <h3 className={css.titleCategoriesList}>{category.name}</h3>
        </li>
      ))}
    </ul>
  );
}
