'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './layout.module.css';
import AuthHeader from '@/components/AuthHeader/AuthHeader';
import AuthFooter from '@/components/AuthFooter/AuthFooter';

type Props = {
  children: React.ReactNode;
};

export default function PublicLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setLoading(false);
  }, [router]);

  return (
    <>
      {loading ? (
        <div>Завантаження...</div>
      ) : (
        <div className={`${css.pageWrapper} container altBg`}>
          <AuthHeader />
          <section className={css.formContainer}>{children}</section>
          <AuthFooter />
        </div>
      )}
    </>
  );
}
