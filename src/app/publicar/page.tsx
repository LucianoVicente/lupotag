"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Upload, Phone, Mail, User, MapPin, AlertCircle, CheckCircle } from "lucide-react";
import Header from "@/components/Header";

// "useState" es la herramienta de React para recordar información mientras el usuario interactúa.
// Cada vez que cambia, la pantalla se actualiza automáticamente.

type TipoAviso = "perdido" | "encontrado" | null;

export default function PublicarPage() {
  // Estado del formulario — React "recuerda" estos valores mientras el usuario escribe
  const [tipo, setTipo] = useState<TipoAviso>(null);
  const [enviado, setEnviado] = useState(false);
  const [form, setForm] = useState({
    nombre:      "",
    raza:        "",
    edad:        "",
    sexo:        "",
    color:       "",
    descripcion: "",
    zona:        "",
    contactoNombre: "",
    contactoTel:    "",
    contactoEmail:  "",
    aceptaPrivacidad: false,
  });

  // Esta función actualiza el estado cuando el usuario escribe en un campo
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  }

  // Por ahora solo simulamos el envío — en la siguiente fase guardará en la base de datos
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviado(true);
  }

  // Pantalla de confirmación después de enviar
  if (enviado) {
    return (
      <>
        <Header />
        <main className="max-w-lg mx-auto px-6 py-24 text-center">
          <CheckCircle size={56} className="text-verde mx-auto mb-6" />
          <h1 className="font-serif text-3xl font-bold mb-3">Aviso publicado</h1>
          <p className="text-gris mb-8 leading-relaxed">
            Tu aviso ya está visible para todos los usuarios de Málaga. Te avisaremos por email si alguien contacta.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/" className="bg-verde text-white px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity">
              Ver el mapa
            </Link>
            <button
              onClick={() => { setEnviado(false); setTipo(null); setForm({ nombre: "", raza: "", edad: "", sexo: "", color: "", descripcion: "", zona: "", contactoNombre: "", contactoTel: "", contactoEmail: "", aceptaPrivacidad: false }); }}
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
      <main className="max-w-2xl mx-auto px-6 py-12">

        {/* Cabecera */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-gris hover:text-texto transition-colors mb-8">
          <ArrowLeft size={15} />
          Volver al inicio
        </Link>

        <h1 className="font-serif text-4xl font-bold mb-2">Publicar aviso</h1>
        <p className="text-gris mb-10">Gratis · Visible en Málaga al instante · Sin registro</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">

          {/* PASO 1: Tipo de aviso */}
          <section className="bg-blanco border border-gris-claro rounded-2xl p-6">
            <h2 className="font-semibold text-base mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-texto text-crema rounded-full text-xs flex items-center justify-center font-bold">1</span>
              ¿Qué ha pasado?
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTipo("perdido")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  tipo === "perdido"
                    ? "border-rojo bg-red-50"
                    : "border-gris-claro hover:border-gris"
                }`}
              >
                <div className="text-2xl mb-2">🆘</div>
                <div className="font-bold text-sm">Mi perro se ha perdido</div>
                <div className="text-xs text-gris mt-1">Quiero que la gente me ayude a encontrarlo</div>
              </button>
              <button
                type="button"
                onClick={() => setTipo("encontrado")}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  tipo === "encontrado"
                    ? "border-verde bg-green-50"
                    : "border-gris-claro hover:border-gris"
                }`}
              >
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-bold text-sm">He encontrado un perro</div>
                <div className="text-xs text-gris mt-1">Quiero encontrar a su dueño</div>
              </button>
            </div>
          </section>

          {/* PASO 2 y 3 — solo aparecen cuando se elige un tipo */}
          {tipo && (
            <>
              {/* PASO 2: Info del perro */}
              <section className="bg-blanco border border-gris-claro rounded-2xl p-6">
                <h2 className="font-semibold text-base mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 bg-texto text-crema rounded-full text-xs flex items-center justify-center font-bold">2</span>
                  Datos del perro
                </h2>
                <div className="grid grid-cols-2 gap-4">

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider">Nombre</label>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      placeholder="Rocky"
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider">Raza</label>
                    <input
                      name="raza"
                      value={form.raza}
                      onChange={handleChange}
                      placeholder="Pastor Alemán, Mezcla..."
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider">Edad aproximada</label>
                    <select
                      name="edad"
                      value={form.edad}
                      onChange={handleChange}
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    >
                      <option value="">Seleccionar</option>
                      <option value="cachorro">Cachorro (menos de 1 año)</option>
                      <option value="joven">Joven (1-3 años)</option>
                      <option value="adulto">Adulto (3-8 años)</option>
                      <option value="senior">Senior (más de 8 años)</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider">Sexo</label>
                    <select
                      name="sexo"
                      value={form.sexo}
                      onChange={handleChange}
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    >
                      <option value="">Seleccionar</option>
                      <option value="macho">Macho</option>
                      <option value="hembra">Hembra</option>
                      <option value="desconocido">No sé</option>
                    </select>
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider">Color y señas</label>
                    <input
                      name="color"
                      value={form.color}
                      onChange={handleChange}
                      placeholder="Marrón con manchas blancas, lleva collar azul..."
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider">Descripción</label>
                    <textarea
                      name="descripcion"
                      value={form.descripcion}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Cuánto más detalle mejor: dónde se perdió exactamente, comportamiento, si tiene microchip..."
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors resize-none"
                    />
                  </div>

                  {/* Foto — por ahora solo visual, se conecta en la siguiente fase */}
                  <div className="col-span-2">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider block mb-1.5">Fotos</label>
                    <div className="border-2 border-dashed border-gris-claro rounded-xl p-8 text-center hover:border-gris transition-colors cursor-pointer">
                      <Upload size={28} className="text-gris mx-auto mb-2" />
                      <p className="text-sm font-medium text-gris">Añadir fotos del perro</p>
                      <p className="text-xs text-gris/60 mt-1">JPG o PNG · Hasta 5 fotos · Máx. 5MB cada una</p>
                    </div>
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin size={12} />
                      Zona donde ocurrió
                    </label>
                    <input
                      name="zona"
                      value={form.zona}
                      onChange={handleChange}
                      placeholder="Ej: Málaga centro, cerca del Parque de la Alameda"
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>

                </div>
              </section>

              {/* PASO 3: Contacto */}
              <section className="bg-blanco border border-gris-claro rounded-2xl p-6">
                <h2 className="font-semibold text-base mb-1 flex items-center gap-2">
                  <span className="w-6 h-6 bg-texto text-crema rounded-full text-xs flex items-center justify-center font-bold">3</span>
                  Tus datos de contacto
                </h2>
                <p className="text-xs text-gris mb-6 ml-8">Solo el nombre y teléfono serán visibles públicamente.</p>

                <div className="grid grid-cols-2 gap-4">

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider flex items-center gap-1.5">
                      <User size={11} /> Nombre
                    </label>
                    <input
                      name="contactoNombre"
                      value={form.contactoNombre}
                      onChange={handleChange}
                      placeholder="María García"
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider flex items-center gap-1.5">
                      <Phone size={11} /> Teléfono
                    </label>
                    <input
                      name="contactoTel"
                      value={form.contactoTel}
                      onChange={handleChange}
                      placeholder="612 345 678"
                      type="tel"
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs font-bold text-gris uppercase tracking-wider flex items-center gap-1.5">
                      <Mail size={11} /> Email <span className="normal-case font-normal">(privado, no se muestra)</span>
                    </label>
                    <input
                      name="contactoEmail"
                      value={form.contactoEmail}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      type="email"
                      className="border border-gris-claro rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-verde bg-crema focus:bg-blanco transition-colors"
                    />
                  </div>

                </div>

                {/* RGPD */}
                <div className="mt-6 bg-crema rounded-xl p-4 flex gap-3 items-start">
                  <AlertCircle size={15} className="text-gris shrink-0 mt-0.5" />
                  <div className="text-xs text-gris leading-relaxed">
                    Tus datos se usan solo para gestionar este aviso. Puedes pedir su eliminación en cualquier momento.{" "}
                    <Link href="/privacidad" className="text-verde underline">Política de privacidad</Link>.
                  </div>
                </div>

                <label className="flex items-start gap-3 mt-4 cursor-pointer">
                  <input
                    type="checkbox"
                    name="aceptaPrivacidad"
                    checked={form.aceptaPrivacidad}
                    onChange={handleChange}
                    className="mt-0.5 accent-verde"
                  />
                  <span className="text-sm text-gris">
                    He leído y acepto los{" "}
                    <Link href="/legal" className="text-verde underline">Términos de uso</Link>{" "}
                    y la{" "}
                    <Link href="/privacidad" className="text-verde underline">Política de privacidad</Link>.
                    Confirmo que los datos son verídicos.
                  </span>
                </label>
              </section>

              {/* BOTÓN ENVIAR */}
              <button
                type="submit"
                disabled={!form.aceptaPrivacidad || !form.contactoTel || !form.zona}
                className="w-full py-4 bg-rojo text-white font-bold text-base rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {tipo === "perdido" ? "Publicar aviso de perro perdido" : "Publicar aviso de perro encontrado"}
              </button>
              <p className="text-center text-xs text-gris -mt-4">
                El aviso se publica al instante y es visible para toda Málaga.
              </p>
            </>
          )}

        </form>
      </main>
    </>
  );
}
