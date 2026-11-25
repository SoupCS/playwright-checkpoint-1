import { expect, test } from "@playwright/test";
import { CatalogPage } from "../pages/CatalogPage.js";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Задание 1", async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  await expect(model.card("Apple").first()).toBeVisible();

  await model.search("Red Lipstick");

  await expect(model.card("Red Lipstick")).toBeVisible();
  await expect(model.card("Apple")).toHaveCount(0);
  // END
});

test("Задание 2", async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  await expect(model.card("Apple").first()).toBeVisible();

  await model.selectBrand("Essence");

  await expect(
    page.getByRole("checkbox", { name: "Essence", exact: true }),
  ).toBeChecked();
  await expect(model.card("Essence Mascara Lash Princess")).toBeVisible();
  await expect(model.card("Apple")).toHaveCount(0);
  // END
});

test("Задание 3", async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  await model.openProduct("Red Lipstick");

  await expect(page).toHaveURL(/\/products\/4$/);
  await expect(
    page.getByRole("heading", { name: "Red Lipstick" }),
  ).toBeVisible();
  // END
});

test("Задание 4", async ({ page }) => {
  const model = new CatalogPage(page);
  // BEGIN
  const firstPageCard = model.card("Essence Mascara Lash Princess");
  await expect(firstPageCard).toBeVisible();

  await model.nextPage();

  await expect(firstPageCard).toHaveCount(0);
  await expect(model.cards.first()).toBeVisible();
  // END
});
