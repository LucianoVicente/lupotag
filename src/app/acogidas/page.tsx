import Header from "@/components/Header";
import Link from "next/link";

export default function AcogidosPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-6">🤝</div>
        <h1 className="font-serif text-3xl font-bold mb-3">Acogidas temporales</h1>
        <p className="text-gris mb-8">Próximamente: familias de acogida y perros que necesitan un hogar temporal en Málaga.</p>
        <Link href="/" className="text-verde font-semibold hover:underline">← Volver al inicio</Link>
      </main>
    </>
  );
}
