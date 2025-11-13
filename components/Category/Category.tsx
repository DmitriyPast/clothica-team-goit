import Image from 'next/image';
import Link from 'next/link';
import css from './Category.module.css';
import { Category as CategoryType } from '@/types/category';

type Props = {
  category: CategoryType;
};

export default function Category({ category }: Props) {
  // Функція для отримання назви зображення з назви категорії
  const getImageName = (name: string) => {
    const nameMap: { [key: string]: string } = {
      'Футболки та сорочки': 'tshirts',
      'Худі та світшоти': 'hoodies',
      'Джинси та штани': 'jeans',
      'Сукні та спідниці': 'dresses',
      'Куртки та верхній одяг': 'jackets',
      'Домашній та спортивний одяг': 'sportswear',
      Топи: 'tops',
      'Верхній одяг': 'outerwear',
      Інше: 'other',
    };
    return nameMap[name] || 'other';
  };

  const imageName = getImageName(category.name);

  return (
    <Link href={`/categories/${category._id}`} className={css.card}>
      <div className={css.imageWrapper}>
        <picture>
          <source
            media="(min-width: 1440px)"
            srcSet={`/${imageName}-pc.webp 1x, /${imageName}-pc@2x.webp 2x`}
            width={416}
            height={277}
          />
          <source
            media="(min-width: 768px)"
            srcSet={`/${imageName}-tab.webp 1x, /${imageName}-tab@2x.webp 2x`}
            width={336}
            height={223}
          />
          <source
            media="(min-width: 320px)"
            srcSet={`/${imageName}-mob.webp 1x, /${imageName}-mob@2x.webp 2x`}
            width={335}
            height={223}
          />
          <Image
            src={`/${imageName}-mob.webp`}
            alt={category.name}
            width={335}
            height={223}
            className={css.image}
          />
        </picture>
      </div>
      <div className={css.content}>
        <h3 className={css.title}>{category.name}</h3>
      </div>
    </Link>
  );
}
