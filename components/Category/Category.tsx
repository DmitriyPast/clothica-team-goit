import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import css from './Category.module.css';

interface Category {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoryResponse {
  page: number;
  perPage: number;
  totalCategories: number;
  totalPages: number;
  categories: Category[];
}

export default function Category() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories?page=1&perPage=6');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data: CategoryResponse = await response.json();
        setCategories(data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className={css.categorySection}>
        <div className="container">
          <p>Завантаження...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={css.categorySection}>
        <div className="container">
          <p>Помилка: {error}</p>
        </div>
      </section>
    );
  }

  // Mapped category data with placeholder images
  const categoryData = [
    {
      id: categories[0]?._id || '1',
      name: 'Футболки та сорочки',
      image: '/images/categories/tshirts.jpg',
    },
    {
      id: categories[1]?._id || '2',
      name: 'Худі та світшоти',
      image: '/images/categories/hoodies.jpg',
    },
    {
      id: categories[2]?._id || '3',
      name: 'Джинси та штани',
      image: '/images/categories/jeans.jpg',
    },
    {
      id: categories[3]?._id || '4',
      name: 'Сукні та спідниці',
      image: '/images/categories/dresses.jpg',
    },
    {
      id: categories[4]?._id || '5',
      name: 'Куртки та верхній одяг',
      image: '/images/categories/jackets.jpg',
    },
    {
      id: categories[5]?._id || '6',
      name: 'Домашній та спортивний одяг',
      image: '/images/categories/sportswear.jpg',
    },
  ];

  return (
    <section className={css.categorySection}>
      <div className={`container ${css.categoryContainer}`}>
        <div className={css.categoryHeader}>
          <h2 className={css.categoryTitle}>Популярні категорії</h2>
          <Link href="/categories" className={css.categoryLink}>
            Всі категорії
          </Link>
        </div>

        <div className={css.categoryGrid}>
          <div className={css.categoryRow}>
            {categoryData.slice(0, 3).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className={css.categoryCard}
              >
                <div className={css.categoryImageWrapper}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 33vw, 416px"
                    className={css.categoryImage}
                  />
                </div>
                <div className={css.categoryInfo}>
                  <h3 className={css.categoryName}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>

          <div className={css.categoryRow}>
            {categoryData.slice(3, 6).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.id}`}
                className={css.categoryCard}
              >
                <div className={css.categoryImageWrapper}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1440px) 33vw, 416px"
                    className={css.categoryImage}
                  />
                </div>
                <div className={css.categoryInfo}>
                  <h3 className={css.categoryName}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
