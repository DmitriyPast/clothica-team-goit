import Link from 'next/link';
import Image from 'next/image';
import css from './Category.module.css';

type CategoryItem = {
  _id: string;
  name: string;
};

type CategoryProps = {
  categories: CategoryItem[];
};

export default function Category({ categories }: CategoryProps) {
  // Мапінг назв категорій до файлів зображень
  const getCategoryImage = (name: string) => {
    const imageMap: { [key: string]: string } = {
      'Dresses': 'dresses',
      'Hoodies': 'hoodies',
      'Jackets': 'jackets',
      'Jeans': 'jeans',
      'Other': 'other',
      'Outerwear': 'outerwear',
      'Sportswear': 'sportswear',
      'Tops': 'tops',
      'T-shirts': 'tshirts',
    };
    return imageMap[name] || 'other';
  };

  const rows: CategoryItem[][] = [];
  for (let i = 0; i < categories.length; i += 3) {
    rows.push(categories.slice(i, i + 3));
  }

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.sectionTitle}>
          <h2 className={css.title}>Категорії</h2>
          <p className={css.subtitle}>Оберіть категорію для перегляду товарів</p>
        </div>

        <div className={css.content}>
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className={css.row}>
              {row.map(category => {
                const imageName = getCategoryImage(category.name);
                return (
                  <Link
                    href={`/categories/${category._id}`}
                    key={category._id}
                    className={css.card}
                  >
                    <div className={css.imageWrapper}>
                      <picture>
                        <source
                          media="(min-width: 1440px)"
                          srcSet={`/${imageName}-pc.webp 1x, /${imageName}-pc@2x.webp 2x`}
                        />
                        <source
                          media="(min-width: 768px)"
                          srcSet={`/${imageName}-tab.webp 1x, /${imageName}-tab@2x.webp 2x`}
                        />
                        <source
                          media="(min-width: 320px)"
                          srcSet={`/${imageName}-mob.webp 1x, /${imageName}-mob@2x.webp 2x`}
                        />
                        <Image
                          src={`/${imageName}-pc.webp`}
                          alt={category.name}
                          width={416}
                          height={277}
                          className={css.image}
                          priority={rowIndex === 0}
                        />
                      </picture>
                    </div>
                    <div className={css.cardContent}>
                      <h3 className={css.cardTitle}>{category.name}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        <div className={css.buttonWrapper}>
          <Link href="/categories" className={css.button}>
            Переглянути всі категорії
          </Link>
        </div>
      </div>
    </section>
  );
}
