-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('OWNER', 'ADMIN', 'EDITOR', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "refresh_token_hash" TEXT,
    "refresh_token_expires_at" TIMESTAMP(3),
    "role" "Role" NOT NULL DEFAULT 'USER',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsi_images" (
    "id" SERIAL NOT NULL,
    "image_alt" TEXT NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "order" INTEGER,
    "s3_key" TEXT,
    "src" TEXT NOT NULL,

    CONSTRAINT "images_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsi_colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "hex_code" TEXT NOT NULL,
    "caption_code" TEXT,

    CONSTRAINT "nsi_colors_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsi_filter_colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "nsi_filter_colors_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsi_filter_layouts" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "nsi_filter_styles_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsi_filter_styles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "nsi_filter_styles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsi_filter_budgets" (
    "id" SERIAL NOT NULL,
    "min_value" INTEGER,
    "max_value" INTEGER,
    "caption" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "nsi_filter_budget_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsi_filter_types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "card_caption" TEXT,

    CONSTRAINT "nsi_filter_types_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio" (
    "id" SERIAL NOT NULL,
    "type" INTEGER,
    "sizes_room" TEXT,
    "sizes_furniture" TEXT,
    "housing_material" TEXT,
    "facade_material" TEXT,
    "table_top_material" TEXT,
    "body_color" INTEGER,
    "table_top_color" INTEGER,
    "furniture_accessories" TEXT,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "layout" INTEGER,
    "price" INTEGER NOT NULL,
    "description" TEXT,
    "style" INTEGER,
    "color" INTEGER,
    "subtitle" TEXT,

    CONSTRAINT "portfolio_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_colors_list" (
    "id" SERIAL NOT NULL,
    "work" INTEGER,
    "color" INTEGER,

    CONSTRAINT "portfolio_colors_list_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "portfolio_images_list" (
    "id" SERIAL NOT NULL,
    "work" INTEGER,
    "image" INTEGER,

    CONSTRAINT "portfolio_images_list_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nsi_questions_categories" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "categories_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "questions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "categoryId" INTEGER,
    "question_description" TEXT NOT NULL,

    CONSTRAINT "questions_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_body_color_fkey" FOREIGN KEY ("body_color") REFERENCES "nsi_colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_color_fkey" FOREIGN KEY ("color") REFERENCES "nsi_filter_colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_layout_fkey" FOREIGN KEY ("layout") REFERENCES "nsi_filter_layouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_style_fkey" FOREIGN KEY ("style") REFERENCES "nsi_filter_styles"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_table_top_color_fkey" FOREIGN KEY ("table_top_color") REFERENCES "nsi_colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_type_fkey" FOREIGN KEY ("type") REFERENCES "nsi_filter_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_colors_list" ADD CONSTRAINT "portfolio_colors_list_color_fkey" FOREIGN KEY ("color") REFERENCES "nsi_colors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_colors_list" ADD CONSTRAINT "portfolio_colors_list_work_fkey" FOREIGN KEY ("work") REFERENCES "portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_images_list" ADD CONSTRAINT "portfolio_images_list_image_fkey" FOREIGN KEY ("image") REFERENCES "nsi_images"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "portfolio_images_list" ADD CONSTRAINT "portfolio_images_list_work_fkey" FOREIGN KEY ("work") REFERENCES "portfolio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "nsi_questions_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

