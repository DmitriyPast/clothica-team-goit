import Link from 'next/link';
import css from './Category.module.css';

// Мапінг назв категорій на зображення
const categoryImages: { [key: string]: string } = {
  'Футболки та сорочки': 'tshirts',
  'Худі та світшоти': 'hoodies',
  'Джинси та штани': 'jeans',
  'Сукні та спідниці': 'dresses',
  Куртки: 'jackets',
  'Верхній одяг': 'outerwear',
  'Спортивний одяг': 'sportswear',
  Топи: 'tops',
  Інше: 'other',
};

interface Category {
  _id: string;
  name: string;
}

interface CategoryProps {
  initialCategories?: Category[];
  showAll?: boolean;
}

export default function Category({
  initialCategories = [],
  showAll = false,
}: CategoryProps) {
  // Показуємо тільки 6 категорій, якщо showAll = false
  const displayedCategories = showAll
    ? initialCategories
    : initialCategories.slice(0, 6);

  const getImageName = (categoryName: string): string => {
    return categoryImages[categoryName] || 'other';
  };

  return (
    <section className={css.categoriesSection}>
      <div className={css.container}>
        <div className={css.sectionTitle}>
          <h2 className={css.title}>Категорії</h2>
        </div>

        <div className={css.content}>
          <div className={css.grid}>
            {displayedCategories.map(category => {
              const imageName = getImageName(category.name);

              return (
                <Link
                  href={`/categories/${category._id}`}
                  key={category._id}
                  className={css.categoryCard}
                >
                  <div className={css.imageWrapper}>
                    <picture>
                      <source
                        media="(min-width: 1440px)"
                        srcSet={`
                          /${imageName}-pc.webp 1x,
                          /${imageName}-pc@2x.webp 2x
                        `}
                        type="image/webp"
                        width="416"
                        height="277"
                      />
                      <source
                        media="(min-width: 768px)"
                        srcSet={`
                          /${imageName}-tab.webp 1x,
                          /${imageName}-tab@2x.webp 2x
                        `}
                        type="image/webp"
                        width="336"
                        height="224"
                      />
                      <source
                        media="(max-width: 767px)"
                        srcSet={`
                          /${imageName}-mob.webp 1x,
                          /${imageName}-mob@2x.webp 2x
                        `}
                        type="image/webp"
                        width="335"
                        height="223"
                      />
                      <img
                        src={`/${imageName}-mob.webp`}
                        alt={category.name}
                        width="335"
                        height="223"
                        className={css.categoryImage}
                        loading="lazy"
                      />
                    </picture>
                  </div>
                  <div className={css.categoryContent}>
                    <h3 className={css.categoryName}>{category.name}</h3>
                  </div>
                </Link>
              );
            })}
          </div>

          {!showAll && initialCategories.length > 6 && (
            <div className={css.buttonWrapper}>
              <Link href="/categories" className={css.showMoreButton}>
                Показати більше
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
