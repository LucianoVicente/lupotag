"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Phone, MapPin, AlertCircle, CheckCircle, Loader2, User, Mail } from "lucide-react";
import Header from "@/components/Header";
import { crearAviso } from "@/lib/actions";

type TipoAviso = "perdido" | "encontrado" | null;

export default function PublicarPage() {
  const [tipo, setTipo]       = useState<TipoAviso>(null);
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError]     = useState<string | null>(null);
  const [form, setForm]       = useState({
    descripcion:    "",
    zona:           "",
    contactoTel:    "",
    contactoNombre: "",
    contactoEmail:  "",
    aceptaPrivacidad: false,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCargando(true);
    setError(null);
    try {
      await crearAviso({
        tipo:           tipo!,
        nombre:         "Sin nombre",
        descripcion:    form.descripcion || undefined,
        zona:           form.zona,
        contactoNombre: form.contactoNombre || "Anónimo",
        contactoTel:    form.contactoTel,
        contactoEmail:  form.contactoEmail || undefined,
      });
      setEnviado(true);
    } catch {
      setError("Ha ocurrido un error al publicar. Inténtalo de nuevo.");
    } finally {
      setCargando(false);
    }
  }

  if (enviado) {
    return (
      <>
        <Header />
        <main className="max-w-lg mx-auto px-6 py-24 text-center">
          <CheckCircle size={56} className="text-verde mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold mb-3">Aviso publicado</h1>
          <p className="text-gris mb-8 leading-relaxed">
            Ya es visible para todos en Málaga. Si alguien tiene información te contactará directamente.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="bg-verde text-white px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
              Ver el mapa
            </Link>
            <button
              onClick={() => { setEnviado(false); setTipo(null); setForm({ descripcion: "", zona: "", contactoTel: "", contactoNombre: "", contactoEmail: "", aceptaPrivacidad: false }); }}
              className="border border-gris-claro text-gris px-6 py-3 rounded-lg font-bold text-sm hover:border-gris transition-colors"
            >
              Publicar otro aviso
            </button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="max-w-xl mx-auto px-6 py-12">

        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gris hover:text-texto transition-colors mb-8">
          <ArrowLeft size={15} />
          Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl font-bold mb-2">Publicar aviso</h1>
        <p className="text-gris mb-10">Gratis · Visible en Málaga al instante · Sin registro</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* PASO 1: Tipo */}
          <section className="bg-blanco border border-gris-claro rounded-2xl p-6">
            <h2 className="font-semibold text-sm mb-4 text-gris uppercase tracking-wider">¿Qué ha pasado?</h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTipo("perdido")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  tipo === "perdido" ? "border-rojo bg-red-50" : "border-gris-claro hover:border-gris"
                }`}
              >
                <div className="text-2xl mb-2">🆘</div>
                <div className="font-bold text-sm">Mi perro se perdió</div>
              </button>
              <button
                type="button"
                onClick={() => setTipo("encontrado")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  tipo === "encontrado" ? "border-verde bg-green-50" : "border-gris-claro hover:border-gris"
                }`}
              >
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-bold text-sm">Encontré un perro</div>
              </button>
            </div>
          </section>

          {tipo && (
            <>
              {/* PASO 2: Info básica */}
              <section className="bg-blanco border border-gris-claro rounded-2xl p-6 flex flex-col gap-4">
                <h2 className="font-semibold text-sm text-gris uppercase tracking-wider">El perro</h2>

                {/* Foto */}
                <div className="border-2 border-dashed border-gris-claro rounded-xl p-6 text-center hover:border-verde transition-colors cursor-pointer">
                  <Upload size={24} className="text-gris mx-auto mb-2" />
                  <p className="text-sm font-medium text-gris">Añadir foto <span className="font-normal">(opcional pero muy útil)</span></p>
                  <p className="text-xs text-gris/60 mt-1">JPG o PNG · Máx. 5MB</p>
                </div>

                {/* Descripción — un solo campo libre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gris uppercase tracking-wider">
                    Descripción del perro
                  </label>
                  <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Raza, color, tamaño, señas especiales, lleva collar, microchip... Todo lo que ayude a reconocerlo."
                    className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors resize-none"
                  />
                </div>

                {/* Zona */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gris uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin size={11} /> Zona *
                  </label>
                  <input
                    name="zona"
                    value={form.zona}
                    onChange={handleChange}
                    required
                    placeholder="Ej: Málaga centro, Fuengirola, Marbella..."
                    className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                  />
                </div>
              </section>

              {/* PASO 3: Contacto mínimo */}
              <section className="bg-blanco border border-gris-claro rounded-2xl p-6 flex flex-col gap-4">
                <h2 className="font-semibold text-sm text-gris uppercase tracking-wider">Contacto</h2>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gris uppercase tracking-wider flex items-center gap-1.5">
                    <Phone size={11} /> Teléfono *
                  </label>
                  <input
                    name="contactoTel"
                    value={form.contactoTel}
                    onChange={handleChange}
                    required
                    type="tel"
                    placeholder="612 345 678"
                    className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider flex items-center gap-1.5">
                      <User size={11} /> Nombre <span className="normal-case font-normal">(opcional)</span>
                    </label>
                    <input
                      name="contactoNombre"
                      value={form.contactoNombre}
                      onChange={handleChange}
                      placeholder="María"
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider flex items-center gap-1.5">
                      <Mail size={11} /> Email <span className="normal-case font-normal">(opcional)</span>
                    </label>
                    <input
                      name="contactoEmail"
                      value={form.contactoEmail}
                      onChange={handleChange}
                      type="email"
                      placeholder="tu@email.com"
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-crema rounded-xl p-3 flex gap-2 items-start text-xs text-gris">
                  <AlertCircle size={13} className="shrink-0 mt-0.5" />
                  Solo el teléfono y nombre serán visibles. El email nunca se muestra.{" "}
                  <Link href="/privacidad" className="text-verde underline">Privacidad</Link>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="aceptaPrivacidad"
                    checked={form.aceptaPrivacidad}
                    onChange={handleChange}
                    className="mt-0.5 accent-verde"
                  />
                  <span className="text-sm text-gris">
                    Acepto los{" "}
                    <Link href="/legal" className="text-verde underline">Términos de uso</Link>{" "}
                    y confirmo que los datos son verídicos.
                  </span>
                </label>
              </section>

              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-rojo">
                  <AlertCircle size={16} className="shrink-0" />
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!form.aceptaPrivacidad || !form.contactoTel || !form.zona || cargando}
                className="w-full py-4 bg-rojo text-white font-bold text-base rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {cargando ? (
                  <><Loader2 size={18} className="animate-spin" /> Publicando...</>
                ) : (
                  tipo === "perdido" ? "Publicar aviso de perro perdido" : "Publicar aviso de perro encontrado"
                )}
              </button>

              <p className="text-center text-xs text-gris -mt-2">
                * Campos obligatorios · El aviso se publica al instante
              </p>
            </>
          )}

        </form>
      </main>
    </>
  );
}
