import Link from "next/link";
import { MapPin, Heart, HandshakeIcon, Plus, User } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-blanco border-b border-gris-claro sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="font-serif text-xl font-bold text-verde">
          Lupo<span className="text-terracota">Tag</span>
        </Link>

        <nav className="hidden md:flex gap-1">
          <Link href="/perdidos" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gris hover:bg-crema hover:text-texto transition-colors">
            <MapPin size={15} />
            Perdidos
          </Link>
          <Link href="/adopcion" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gris hover:bg-crema hover:text-texto transition-colors">
            <Heart size={15} />
            Adopción
          </Link>
          <Link href="/acogidas" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gris hover:bg-crema hover:text-texto transition-colors">
            <HandshakeIcon size={15} />
            Acogidas
          </Link>
        </nav>

        <div className="flex gap-2 items-center">
          <Link
            href="/publicar"
            className="flex items-center gap-1.5 px-4 py-2 bg-rojo text-blanco rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={15} />
            Publicar aviso
          </Link>
          <Link
            href="/mi-cuenta"
            className="flex items-center gap-1.5 px-4 py-2 border border-verde text-verde rounded-lg text-sm font-semibold hover:bg-verde hover:text-blanco transition-colors"
          >
            <User size={15} />
            Mi cuenta
          </Link>
        </div>

      </div>
    </header>
  );
}
