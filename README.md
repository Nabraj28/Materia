# Building Materials Product Discovery  (Materia)

A web application for discovering building material products, built as a take-home assignment for a Working Student - Full Stack Developer role. To make the application as realistic as possible, I used the catalog structure of a real building materials company (Knauf) as a reference for modeling the product data and filtering logic.

**Live demo:** https://materia-de.vercel.app/

## What it does

A user can:

1. **Browse products** - paginated with a "Load more" button rather than traditional numbered pages, to keep the browsing flow continuous.
2. **Search products** - free-text search across the catalog.
3. **Filter products** - by category and their specific attributes using dynamic filtering.
4. **Open a product** - to view its detailed page with full specifications and information.
---

## Investigation

Before building anything, I spent time understanding the domain rather than guessing at it. The building materials industry was completely new to me, so I needed to figure out how these products are categorized, what technical details matter, and how they should be displayed.

To figure out a realistic approach within the given timeframe, I researched two main sources:

- **Knauf** - I investigated their product sections specifically to understand how they display items and how they handle search and filtering functionalities.
- **Building Material Scout** - I used their platform as a design reference. I noticed their data structure was much larger and more complex than Knauf's.

By comparing the two, I synthesized the essential features and designed my own database schema from scratch. This allowed me to build a structure that was realistic for the industry, but manageable enough to complete within the assignment's time limit.

**Scope decision on data:** I used fictional product data rather than copying real content. This avoids IP/confidentiality concerns while still reflecting realistic categories, naming conventions, and technical specifications.

---

## Scope

**Categories:** Insulation and Adhesives & Sealants — 16 products each, 32 total.

I picked two categories rather than trying to cover a vast catalog. This allowed me to focus deeply on building a fully functional webpage with search, dynamic filters, a clear catalog, and comprehensive product details, rather than spreading my time thin across a massive dataset.

**Built:**
- Product list with search
- Category filters
- Product detail pages
- Load-more pagination
- Responsive layout

**Intentionally left out**
- Category-specific filters (e.g. filtering by an exact thermal conductivity or fire rating value)
- Product comparison feature
- Admin/CMS page
---

## Tech stack

- **Next.js** (App Router)
- **Prisma** ORM
- **Neon** (serverless Postgres)
- **Tailwind CSS**

### Running locally

```bash
npm install
```

Create a `.env` file with:

```
DATABASE_URL=your_neon_postgres_connection_string
```
then

```bash
npm run dev
```