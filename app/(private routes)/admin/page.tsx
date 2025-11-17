import AdminTable from "./AdminTable";
import css from './AdminTable.module.css';


export default function AdminCabinetPage() {
  return (
    <main className={css.main}>
      <h1 className={css.title}>Кабінет адміністратора</h1>
      <h2 className={css.subtitle}>Замовлення</h2>
      <AdminTable />
    </main>
  );
}
