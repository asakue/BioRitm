# **App Name**: BioRitm Marketplace

## Core Features:

- Shopping Cart Icon: Display a shopping cart icon in the header that shows the number of items added to the cart.
- Cart Panel: A side panel that appears when the cart icon is clicked, showing the list of products, their quantities, prices, and the total amount.
- Service Card Modification: Add price and 'Add to Cart' button to each 'service-card' web component.
- Cart Logic: Implement pure JavaScript logic to manage adding products to the cart, updating quantities, recalculating the total amount, and displaying/hiding the cart panel.
- Persistent cart data: Store the cart information using Firestore, so a user doesn't lose what's in their cart, even after closing the browser.
- Intelligent Offerings Tool: Leverage AI to provide users with customized offerings based on items added to the cart. Use a tool which evaluates services based on items added to the cart. For example, if a user adds fitness services to the cart, recommend nutritional offerings; if a user selects course services, promote course bundles

## Style Guidelines:

- Primary color: Deep teal (#008080) to evoke a sense of health, tranquility, and trustworthiness.
- Background color: Light teal (#E0F8F8), a desaturated version of the primary color for a calming backdrop.
- Accent color: Sea green (#3CB371), an analogous hue providing contrast and highlighting important interactive elements.
- Headline font: 'Poppins', sans-serif, for headlines and shorter texts; it offers a modern, precise feel. Body font: 'PT Sans', a humanist sans-serif font for body text, as it offers both modernity and readability.
- Use flat, minimalist icons that complement the teal color scheme, focusing on health and wellness themes.
- Maintain a clean and spacious layout to emphasize content and improve user experience. Cart panel should slide in smoothly without disrupting the main layout.
- Subtle animations for button interactions and cart updates, creating a smooth and engaging user experience.