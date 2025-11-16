import css from './CreateOrder.module.css';

export default function OrderPage() {
  return (
    <section>
      <div className="container">
        <h2 className={css.headTitle}>Оформити замовлення</h2>
        <div className={css.wrapper}>
          <div>
            <p className={css.title}>Товари</p>
            {/* Тут буде компонент зі списком товарів у кошику */}
            {/* GoodsOrderList */}
          </div>
          <div>
            <p className={css.title}>Особиста інформація</p>
            {/*Тут буде форма для введення особистої інформації */}
            {/* userDataForm buttonLabel="Оформити замовлення" onSubmit={handleOrderSubmit}*/}
          </div>
        </div>
      </div>
    </section>
  );
}
