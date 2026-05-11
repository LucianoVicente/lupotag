import Header from "@/components/Header";
import Link from "next/link";

export default function MiCuentaPage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="text-6xl mb-6">👤</div>
        <h1 className="font-serif text-3xl font-bold mb-3">Mi cuenta</h1>
        <p className="text-gris mb-8">Próximamente: accede a tu perfil, gestiona tus mascotas y descarga el código QR.</p>
        <Link href="/" className="text-verde font-semibold hover:underline">← Volver al inicio</Link>
      </main>
    </>
  );
}
