# Introduction
This is the Shopify + TailwindCSS starter theme repository from https://marketlabs.com/articles/how-to-create-a-shopify-theme-with-tailwindcss

This theme is mostly unstyled and without functionality. It will require you to go in and customize updates. However there are a few files to call out

 1. ` theme.liquid` This file does contain all the paths to the assets folder as well as all necessary opengraph and JSON-LD (SEO) tags.
 2. `product-template.liquid` has some pre-build functionality such as changing the featured image depending on the selected variant and updating sale prices.  There is also room for you to customize the toggable tabs. I highly recommend using metafields to manage this.
 3. `cart.liquid` is updated in TailwindCSS styles.
 4. `navbar.liquid` has a predictive search enabled input as well as a cart full/empty state, but you will need to add a loop for the menu links.
 5. `search.liquid` is updated in TailwindCSS styles.
 6. `breadcrumbs.liquid` is updated with the necessary SEO schema

# Getting Started

Be sure to add your `config.yml` file and run `yarn update` to install the dependencies. From there you can log into your store and run `theme watch --allow-live` to see your update in real-time.

Remember, all your styles are built using `npx tailwindcss build css/application.css -o assets/application.css.liquid`. If you add a new class and it's not appearing in your theme, re-run this script.
