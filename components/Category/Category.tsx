'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFilterStore } from '@/lib/store/filterStore';
import css from './Category.module.css';
import { Category as CategoryType } from '@/types/category';

type Props = {
  category: CategoryType;
  priority?: boolean;
};

export default function Category({ category, priority = false }: Props) {
  const router = useRouter();
  const setCategory = useFilterStore(state => state.setCategory);

  const handleClick = () => {
    setCategory(category._id);
    router.push('/goods');
  };

  // Мапінг назв з бекенду → зображення
  // const getImageName = (name: string) => {
  //   const normalizedName = name.trim().toLowerCase();

  //   const nameMap: { [key: string]: string } = {
  //     'футболки та сорочки': 'tshirts',
  //     'худі та кофти': 'hoodies',
  //     'худі та світшоти': 'hoodies',
  //     'штани та джинси': 'jeans',
  //     'джинси та штани': 'jeans',
  //     'сукні та спідниці': 'dresses',
  //     'верхній одяг': 'outerwear',
  //     'куртки та верхній одяг': 'outerwear',
  //     'домашній та спортивний одяг': 'sportswear',
  //     топи: 'tops',
  //     'топи та майки': 'tops',
  //     інше: 'other',
  //   };

  //   const result = nameMap[normalizedName] || 'other';

  //   return result;
  // };

  // Мапінг назв з бекенду → правильні назви для відображення
  // const getDisplayName = (name: string) => {
  //   const normalizedName = name.trim().toLowerCase();

  //   const displayMap: { [key: string]: string } = {
  //     'футболки та сорочки': 'Футболки та сорочки',
  //     'худі та кофти': 'Худі та світшоти',
  //     'штани та джинси': 'Джинси та штани',
  //     'сукні та спідниці': 'Сукні та спідниці',
  //     'верхній одяг': 'Куртки та верхній одяг',
  //     'домашній та спортивний одяг': 'Домашній та спортивний одяг',
  //     'топи та майки': 'Топи та майки',
  //     'худі та світшоти': 'Худі та світшоти',
  //     'джинси та штани': 'Джинси та штани',
  //     'куртки та верхній одяг': 'Куртки та верхній одяг',
  //     топи: 'Топи',
  //     інше: 'Інше',
  //   };

  //   return displayMap[normalizedName] || name;
  // };

  // const imageName = getImageName(category.name);
  // const displayName = getDisplayName(category.name);

  return (
    <div
      onClick={handleClick}
      className={css.card}
      style={{ cursor: 'pointer' }}>
      <div className={css.imageWrapper}>
        <Image
          src={`/category-img/${category._id}.webp`}
          alt={category.name}
          fill
          // sizes="(max-width: 767px) 335px, (max-width: 1439px) 336px, 416px"
          className={css.image}
          priority={priority}
        />
      </div>
      <div className={css.content}>
        <h3 className={css.title}>{category.name}</h3>
      </div>
    </div>
  );
}
