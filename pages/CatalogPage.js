export class CatalogPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByRole("textbox", { name: /search/i });
    this.cards = page.locator(".card");
  }

  card(name) {
    return this.cards.filter({ hasText: name });
  }

  async search(query) {
    await this.searchInput.fill(query);
  }

  async selectBrand(brand) {
    await this.page.getByRole("checkbox", { name: brand, exact: true }).check();
  }

  async openProduct(name) {
    await this.page.getByRole("link").filter({ hasText: name }).first().click();
  }

  async nextPage() {
    await this.page.getByRole("link", { name: "Next" }).first().click();
  }
}
