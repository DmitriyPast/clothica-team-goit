import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        {children}
        {modal}
      </main>
      <Footer />
    </>
  );
}
