-- CreateTable
CREATE TABLE "Aviso" (
    "id" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "raza" TEXT,
    "edad" TEXT,
    "sexo" TEXT,
    "color" TEXT,
    "descripcion" TEXT,
    "zona" TEXT NOT NULL,
    "contactoNombre" TEXT NOT NULL,
    "contactoTel" TEXT NOT NULL,
    "contactoEmail" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Aviso_pkey" PRIMARY KEY ("id")
);
