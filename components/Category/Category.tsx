import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Category.module.css';

const Category = [
  { id: 1, name: 'Футболки та сорочки', image: 'tshirts' },
  { id: 2, name: 'Худі та світшоти', image: 'hoodies' },
  { id: 3, name: 'Джинси та штани', image: 'jeans' },
  { id: 4, name: 'Сукні та спідниці', image: 'dresses' },
  { id: 5, name: 'Куртки та верхній одяг', image: 'jackets' },
  { id: 6, name: 'Домашній та спортивний одяг', image: 'sportswear' },
    { id: 7, name: 'Верхній одяг', image: 'outerwear' },
    { id: 7, name: 'Топи та майки', image: 'tops' },
    { id: 7, name: 'Інше', image: 'other' },

];

export default function Categories({ initialLimit = 4 }) {
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        const data = await response.json();
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [initialLimit]);

  const loadMore = () => {
    const nextPageItems = initialLimit * (page + 1);
    const newDisplayed = categories.slice(0, nextPageItems);

    setDisplayedCategories(newDisplayed);
    setPage(page + 1);

    if (newDisplayed.length >= categories.length) {
      setHasMore(false);
    }
  };

  if (loading) {
    return <div className={styles.loading}>Завантаження...</div>;
  }

  return (
    <section className={styles.categories}>
      <h2 className={styles.title}>Категорії</h2>

      <ul className={styles.list}>
        {displayedCategories.map((category) => (
          <li key={category.id} className={styles.item}>
            <Link href={`/categories/${category.id}`} className={styles.link}>
              <div className={styles.imageWrapper}>
                <picture>
                  {/* Desktop */}
                  <source
                    media="(min-width: 1440px)"
                    srcSet={`/images/categories/${category.image}-desktop.webp 1x, /images/categories/${category.image}-desktop@2x.webp 2x`}
                    type="image/webp"
                  />
                  {/* Tablet */}
                  <source
                    media="(min-width: 768px)"
                    srcSet={`/images/categories/${category.image}-tablet.webp 1x, /images/categories/${category.image}-tablet@2x.webp 2x`}
                    type="image/webp"
                  />
                  {/* Mobile */}
                  <source
                    media="(min-width: 375px)"
                    srcSet={`/images/categories/${category.image}-mobile.webp 1x, /images/categories/${category.image}-mobile@2x.webp 2x`}
                    type="image/webp"
                  />
                  {/* Fallback */}
                  <img
                    src={`/images/categories/${category.image}-mobile.jpg`}
                    alt={category.name}
                    width="416"
                    height="277"
                    className={styles.image}
                    loading="lazy"
                  />
                </picture>
              </div>
              <h3 className={styles.categoryName}>{category.name}</h3>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          onClick={loadMore}
          className={styles.loadMoreBtn}
        >
          Показати більше
        </button>
      )}
    </section>
  );
}
