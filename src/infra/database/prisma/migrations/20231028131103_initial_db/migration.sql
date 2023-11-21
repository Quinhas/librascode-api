-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateTable
CREATE TABLE "signs" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pk_signs" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modules" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pk_modules" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_signs" (
    "module_id" UUID NOT NULL,
    "sign_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pk_module_signs" PRIMARY KEY ("module_id","sign_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR NOT NULL,
    "is_disabled" BOOLEAN NOT NULL DEFAULT false,
    "roles" "user_roles"[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "pk_users" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_favorite_modules" (
    "user_id" UUID NOT NULL,
    "module_id" UUID NOT NULL,

    CONSTRAINT "user_favorite_modules_pkey" PRIMARY KEY ("module_id","user_id")
);

-- CreateTable
CREATE TABLE "user_favorite_signs" (
    "user_id" UUID NOT NULL,
    "sign_id" UUID NOT NULL,

    CONSTRAINT "user_favorite_signs_pkey" PRIMARY KEY ("sign_id","user_id")
);

-- AddForeignKey
ALTER TABLE "module_signs" ADD CONSTRAINT "module_signs_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_signs" ADD CONSTRAINT "module_signs_sign_id_fkey" FOREIGN KEY ("sign_id") REFERENCES "signs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_modules" ADD CONSTRAINT "user_favorite_modules_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_modules" ADD CONSTRAINT "user_favorite_modules_module_id_fkey" FOREIGN KEY ("module_id") REFERENCES "modules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_signs" ADD CONSTRAINT "user_favorite_signs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_favorite_signs" ADD CONSTRAINT "user_favorite_signs_sign_id_fkey" FOREIGN KEY ("sign_id") REFERENCES "signs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
