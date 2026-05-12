"use server";

import { prisma } from "@/lib/prisma";

// Esta función corre en el servidor cuando el usuario envía el formulario.
// Recibe los datos del formulario y los guarda en la base de datos.
export async function crearAviso(data: {
  tipo: string;
  nombre: string;
  raza?: string;
  edad?: string;
  sexo?: string;
  color?: string;
  descripcion?: string;
  zona: string;
  contactoNombre: string;
  contactoTel: string;
  contactoEmail?: string;
}) {
  const aviso = await prisma.aviso.create({ data });
  return aviso;
}

// Devuelve los avisos activos más recientes para mostrar en la home
export async function getAvisosRecientes(limite = 4) {
  const avisos = await prisma.aviso.findMany({
    where: { activo: true },
    orderBy: { createdAt: "desc" },
    take: limite,
  });
  return avisos;
}
