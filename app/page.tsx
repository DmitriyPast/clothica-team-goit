import LastReviews from "@/components/LastReviews/LastReviews";

export default function HomePage() {
  return (
    <main>
      <section style={{ padding: "3rem 1rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
          Clothica — сучасний магазин одягу
        </h1>
        <p style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          Ми дбаємо про якість, комфорт та стиль наших клієнтів. Нижче — відгуки
          покупців, які вже протестували нашу продукцію.
        </p>
      </section>

      <LastReviews />
    </main>
  );
}
