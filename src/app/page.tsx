import Link from "next/link";
import {
  MapPin, Phone, Clock, AlertCircle,
  ChevronRight, Plus, QrCode, Heart,
} from "lucide-react";
import Header from "@/components/Header";
import { getAvisosRecientes } from "@/lib/actions";

// Adopciones siguen siendo datos de ejemplo hasta conectar protectoras
const perrosAdopcion = [
  { id: 1, nombre: "Tobi",  raza: "Mestizo",  edad: "2 años", protectora: "Protectora Sur Málaga", urgente: true  },
  { id: 2, nombre: "Nala",  raza: "Bichón",   edad: "4 años", protectora: "Adopta Málaga",         urgente: false },
  { id: 3, nombre: "Bruno", raza: "Labrador", edad: "1 año",  protectora: "Huellas Felices",       urgente: false },
];

function tiempoTranscurrido(fecha: Date) {
  const minutos = Math.floor((Date.now() - fecha.getTime()) / 60000);
  if (minutos < 60)   return `Hace ${minutos} min`;
  if (minutos < 1440) return `Hace ${Math.floor(minutos / 60)}h`;
  return `Hace ${Math.floor(minutos / 1440)}d`;
}

export default async function HomePage() {
  const avisos = await getAvisosRecientes(4);
  return (
    <>
      {/* Barra de urgencia */}
      <div className="bg-rojo text-white text-center py-2 px-4 text-sm font-semibold tracking-wide">
        <AlertCircle size={13} className="inline mr-1.5 mb-0.5" />
        284 perros buscando a su familia en Málaga ahora mismo —{" "}
        <Link href="/perdidos" className="underline underline-offset-2 hover:no-underline">
          ver el mapa
        </Link>
      </div>

      <Header />

      {/* HERO */}
      <section className="bg-blanco border-b border-gris-claro">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

          <div>
            <span className="inline-block text-xs font-bold tracking-widest text-terracota uppercase mb-4">
              Málaga · Gratuito
            </span>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-texto leading-tight mb-5">
              ¿Has perdido<br />
              a tu{" "}
              <em className="italic" style={{ color: "#6B7F4F" }}>perro</em>?
            </h1>
            <p className="text-gris text-lg leading-relaxed mb-8 max-w-md">
              Publica un aviso ahora y llega a miles de personas en Málaga en menos de un minuto.
              Sin registro, sin coste.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/publicar"
                className="flex items-center gap-2 bg-rojo text-white px-7 py-3.5 rounded-lg font-bold text-base hover:opacity-90 transition-opacity"
              >
                <Plus size={18} />
                Publicar aviso gratis
              </Link>
              <Link
                href="/perdidos"
                className="flex items-center gap-2 border-2 border-texto text-texto px-7 py-3.5 rounded-lg font-bold text-base hover:bg-texto hover:text-blanco transition-colors"
              >
                <MapPin size={18} />
                Ver el mapa
              </Link>
            </div>
          </div>

          {/* Último aviso urgente */}
          <div className="bg-crema border-2 border-rojo/20 rounded-2xl p-6 relative">
            <div className="absolute -top-3 left-6">
              <span className="bg-rojo text-white text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                ÚLTIMO AVISO — Hace 2 horas
              </span>
            </div>
            <div className="flex gap-5 items-start mt-3">
              <div
                className="w-24 h-24 rounded-xl shrink-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#c8b090,#a08060)" }}
              >
                <span className="text-4xl">🐕</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-2xl font-bold mb-1">Rocky</div>
                <div className="text-sm text-gris mb-1">Pastor Alemán · 3 años · Macho</div>
                <div className="flex items-center gap-1 text-sm font-medium mb-3">
                  <MapPin size={13} className="text-gris" />
                  Málaga centro — Calle Larios
                </div>
                <p className="text-sm text-gris leading-relaxed mb-4">
                  Lleva collar azul con su nombre. Es dócil pero puede asustarse con extraños.
                </p>
                <a
                  href="tel:+34612345678"
                  className="inline-flex items-center gap-2 bg-verde text-white px-5 py-2 rounded-lg text-sm font-bold hover:opacity-90 transition-opacity"
                >
                  <Phone size={14} />
                  612 345 678
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* AVISOS RECIENTES */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="flex justify-between items-baseline mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold">Avisos recientes</h2>
            <p className="text-gris text-sm mt-1">Provincia de Málaga</p>
          </div>
          <Link href="/perdidos" className="flex items-center gap-1 text-sm font-semibold text-verde hover:underline">
            Ver todos <ChevronRight size={15} />
          </Link>
        </div>

        {avisos.length === 0 ? (
          <div className="text-center py-16 text-gris border border-dashed border-gris-claro rounded-2xl">
            <p className="text-4xl mb-4">🐾</p>
            <p className="font-medium mb-1">Aún no hay avisos publicados</p>
            <p className="text-sm">Sé el primero en publicar uno</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {avisos.map((aviso) => (
              <div
                key={aviso.id}
                className="bg-blanco border border-gris-claro rounded-xl flex items-center gap-5 px-5 py-4 hover:border-gris transition-colors cursor-pointer"
              >
                <div
                  className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center text-3xl"
                  style={{ background: "linear-gradient(135deg,#c8b89a,#a89070)" }}
                >
                  🐕
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-base">{aviso.nombre}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        aviso.tipo === "perdido"
                          ? "bg-red-50 text-rojo"
                          : "bg-green-50 text-verde"
                      }`}
                    >
                      {aviso.tipo === "perdido" ? "Perdido" : "Encontrado"}
                    </span>
                  </div>
                  {aviso.descripcion && (
                    <div className="text-sm text-gris truncate">{aviso.descripcion}</div>
                  )}
                  <div className="flex items-center gap-1 text-sm mt-0.5">
                    <MapPin size={12} className="text-gris" />
                    {aviso.zona}
                  </div>
                </div>

                <div className="text-right shrink-0 hidden sm:flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 text-xs text-gris">
                    <Clock size={11} />
                    {tiempoTranscurrido(aviso.createdAt)}
                  </div>
                  <a
                    href={`tel:${aviso.contactoTel.replace(/\s/g, "")}`}
                    className="flex items-center gap-1.5 text-xs font-semibold text-verde border border-verde px-3 py-1.5 rounded-lg hover:bg-verde hover:text-blanco transition-colors"
                  >
                    <Phone size={11} />
                    Llamar
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 border-2 border-dashed border-gris-claro rounded-xl p-6 text-center">
          <p className="text-gris text-sm mb-3">¿Tu perro no está aquí?</p>
          <Link
            href="/publicar"
            className="inline-flex items-center gap-2 bg-texto text-crema px-6 py-2.5 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Plus size={15} />
            Publicar nuevo aviso
          </Link>
        </div>
      </section>

      {/* ADOPCION */}
      <section className="border-t border-gris-claro bg-blanco py-14">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-baseline mb-8">
            <div>
              <h2 className="font-serif text-3xl font-bold">En adopción</h2>
              <p className="text-gris text-sm mt-1">Protectoras de Málaga</p>
            </div>
            <Link href="/adopcion" className="flex items-center gap-1 text-sm font-semibold text-verde hover:underline">
              Ver todos <ChevronRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {perrosAdopcion.map((perro) => (
              <div
                key={perro.id}
                className="border border-gris-claro rounded-xl overflow-hidden hover:border-gris transition-colors cursor-pointer"
              >
                <div
                  className="h-40 flex items-center justify-center text-6xl relative"
                  style={{ background: "linear-gradient(135deg,#e8dcc8,#d4c4a0)" }}
                >
                  🐕
                  {perro.urgente && (
                    <span className="absolute top-3 right-3 bg-terracota text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      Urgente
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-bold text-base mb-0.5">{perro.nombre}</div>
                  <div className="text-sm text-gris mb-2">{perro.raza} · {perro.edad}</div>
                  <div className="flex items-center gap-1 text-xs text-gris">
                    <Heart size={11} />
                    {perro.protectora}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERFIL QR */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="bg-verde rounded-2xl px-8 py-10 flex flex-col md:flex-row items-center gap-8">
          <QrCode size={56} className="text-white/80 shrink-0" />
          <div className="flex-1">
            <h3 className="font-serif text-2xl font-bold text-white mb-2">
              Perfil QR gratuito para tu mascota
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Crea la ficha de tu perro. Si se pierde y alguien escanea la chapa, verá tus datos de contacto al instante. Sin app, sin suscripción.
            </p>
          </div>
          <Link
            href="/mi-cuenta"
            className="shrink-0 flex items-center gap-2 bg-blanco text-verde px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <QrCode size={16} />
            Crear perfil gratis
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-texto py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
          <div className="font-serif text-base font-bold text-white/70">
            Lupo<span className="text-terracota">Tag</span>
          </div>
          <div>Hecho en Málaga · 2026</div>
          <div className="flex gap-6">
            {["Privacidad", "Aviso legal", "Contacto"].map((item) => (
              <Link key={item} href="#" className="hover:text-white/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
