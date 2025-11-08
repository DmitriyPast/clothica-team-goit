import React from "react";
import { Link } from 'react-router-dom';
import CategoriesList from '@/components/PopularCategories/CategoriesList';
import './popular-categories.module.css';
import { Category } from '@/components/PopularCategories/CategoriesList'; 

interface PopularCategoriesProps {
  categories: Category[];
}

export default function PopularCategories({ categories }: PopularCategoriesProps) {
  return (
    <section className="popular-categories">
      <div className="popular-categories-header">
        <h2>Популярні категорії</h2>
        <Link to="/categories" className="all-categories-btn">
          Всі категорії
        </Link>
      </div>

      <CategoriesList
        categories={categories}
      />
    </section>
  );
}
