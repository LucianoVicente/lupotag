import Header from "@/components/Header";
import Link from "next/link";

export default function PublicarPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-6">📝</div>
        <h1 className="font-serif text-3xl font-bold mb-3">Publicar aviso</h1>
        <p className="text-gris mb-8">Próximamente: formulario para publicar un perro perdido o encontrado en el mapa de Málaga.</p>
        <Link href="/" className="text-verde font-semibold hover:underline">← Volver al inicio</Link>
      </main>
    </>
  );
}
