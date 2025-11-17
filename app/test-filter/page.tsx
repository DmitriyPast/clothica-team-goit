'use client';

import CategoriesFilter from '@/components/Filters/CategoriesFilter';
import { useFilterStore } from '@/lib/store/filterStore';
import './TestFilterPage.css';

// ❗️ 'useMemo' та 'useState' видалені (якщо вони не потрібні)

const StoreDebug = () => {
  const filters = useFilterStore(state => state.filters);
  const sortBy = useFilterStore(state => state.sortBy);
  const sortOrder = useFilterStore(state => state.sortOrder);
  const page = useFilterStore(state => state.page);

  return (
    // 2. Повернули оригінальний простий JSX
    <div className="store-debug">
      <h3>Store Debug</h3>{' '}
      <pre>
        {JSON.stringify({ filters, sortBy, sortOrder, page }, null, 2)}
      </pre>{' '}
    </div>
  );
};

export default function TestFilterPage() {
  return (
    <div className="page-container">
      {' '}
      <div className="grid-container">
        {' '}
        <div className="filter-container">
          <CategoriesFilter />{' '}
        </div>{' '}
        <div className="debug-column">
          <StoreDebug />{' '}
        </div>{' '}
      </div>{' '}
    </div>
  );
}
