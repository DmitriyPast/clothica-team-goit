import css from './GoodPage.module.css';

type Props = {
  params: Promise<{ goodId: string }>;
};

export default async function GoodPage({ params }: Props) {
  const { goodId } = await params;

  return (
    <div className={css.container}>
      <h1>Товар {goodId}</h1>
      {/* Тут буде детальна інформація про товар */}
    </div>
  );
}
