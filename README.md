## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.

## Navigation

### Why optimize navigation?

To link between pages, you'd traditionally use the `<a>` HTML element. At the moment, the sidebar links use `<a>` elements, but notice what happens when you navigated between the home, invoices, and customers pages on your browser...

There's a FULL page refresh each page navigation! (bad performance)

### `<Link>` component

Allows you to do client-side navigation with JavaScript

## Fetching Data

### API layer
- APIs are an intermediary layer between your application code and database. Use cases:
- If you're using third party services that provide an API
- If you're fetching data from the client, you want to have an API layer that runs on the server to avoid exposing your database secrets to the client

### Database queries
- Postgres is a relational database
- When creating your API endpoints, you need to write logic to interact with your database
- If you are using React Server Components (fetching data on the server), you can skip the API layer, and query your database directly without risking exposing your database secrets to the client

### Using Server Components to fetch data
- By default, Next.js apps use **React Server Components**
- Server components support JavaScript Promises, providing a solution for async tasks like data fetching natively, you can use async/await without useEffect, useState
- Server components run on the server, so you can keep expensive data fetches and logic on the server, only sending the result to the client
- Since Server components run on the server, you can query the database directly without an additional API layer

### Using SQL
- SQL is the industry standard for querying relational databases (ORMs generate SQL under the hood)
- SQL is versatile, allowing you to fetch and manipulate specific data
- the `postgres.js` library provides protection against SQL injections

## Static and Dynamic Rendering

### Static Rendering
- **Faster Websites** - prerendered content can be cached and globally distributed when deployed to platforms like Vercel. This ensures that users around the world can access your website's content more quickly and reliably.
- **Reduced Server Load** - Because the content is cached, your server does not have to dynamically generate content for each user request. This can reduce compute costs.
- **SEO** - prerendered content is easier for search engine crawlers to index, as the content is already available when the page loads. This can lead to improved search engine rankings.

### Dynamic Rendering
- **Real-Time Data** - dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.
- **User-Specific Content** - It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction
- **Request Time Information** - Dyanmic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters

With *dynamic rendering* **your application is only as fast as your slowest data fetch**

## What is streaming?
- **Streaming** is a data transfer technique that allows you to break down a route into smaller "chunks" and progressively stream them from the server to the client as they become ready.
- By *streaming*, you can prevent slow data requests from blocking your whole page. This allows the user to see and interact with parts of the page without waiting for all the data to load before any UI can be shown to the user.
- *Streaming* works well with React's component model, as each component can be considered a *chunk*.

You can implement **streaming** in two ways in `Next.js`
  1. At the **page** level, with the `loading.tsx` file (which creates `<Suspense>` for you).
  2. At the **component** level, with `<Suspense>` for more granular control.

### Loading Skeletons
A **loading skeleton** is a simplified version of the UI.
Many websites use them as a placeholder (or fallback) to indicate to users that the content is loading.
Any UI you add in `loading.tsx` will be embedded as part of the static file and sent first.
Then, the rest of the dynamic content will be streamed from the server to the client.

### Streaming a component
- **Suspense** allows you to defer rendering parts of your application until some condition is met (e.g. data is loaded). You can wrap your dynamic components in **Suspense**, then pass it a fallback component to show while the dynamic component loads.

### Deciding where to place your Suspense boundaries
1. How you want the user to experience the page as it streams.
2. What content you want to prioritize.
3. If the components rely on data fetching.

Look at the **Dashboard** page, is there anything you would've done differently? *(Don't worry. There isn't a right answer)*
- You could stream the **whole page** like we did with `loading.tsx`...but that may lead to a longer loading time if one of the components has a slow data fetch.
- You could stream **every component** individually...but that may lead to UI *popping* into the screen as it becomes ready.
- You could also create a *staggered* effect by streaming **page sections**. But you'll need to create wrapper components.

In general, it's good practice to move your data fetches down to the components that need it, and then wrap those components in Suspense.

## Partial Prerendering

### Static vs. Dynamic Routes
- Most routes are not *fully* static or dynamic.
- In `Next.js` if you call a *dynamic function* in a route (like querying your database), the *entire route* becomes **dynamic**.

### Partial Prerendering (experimental, must install next@canary)
- Introduced in Next.js 14, its a new rendering model that allows you to combine the benefits of static and dynamic rendering in the same route

When a user visits a route:
- A static route shell that includes the navbar and product information is served, ensuring a fast initial load
- The shell leaves holes where dynamic content like the cart and recommended products will load in asynchronously
- The async holes are streamed in parallel, reducing the overall load time of the page

- Partial Prerendering uses React's Suspense to defer rendering parts of your application until some condition is met (e.g. data is loaded)
- The Suspense fallback is embedded into the initial HTML file along with the static content. At build time (or during revalidation), the static content is **prerendered** to create a static shell. The rendering of dynamic content is **postponed** until the user requests the route
- Wrapping a component in `<Suspense>` doesn't make the component itself dynamic, but rather Suspense is used as a boundary between your static and dynamic code