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

### Adding the search functionality
**useSearchParams** - allows you to access the parameters of the current URL
**usePathname** - lets you read the current URL's pathname
**useRouter** - enables navigation between routes within client components programmatically

#### Implementation Steps
1. Capture the user's input
2. Update the URL with the search params
3. Keep the URL in sync with the input field
4. Update the table to reflect the search query

### Debouncing
**Debouncing** is a programming practice that limits the rate at which a function can fire. In our case, you only want to query the database when the user has stopped typing.

#### How Debouncing Works
1. **Trigger Event**: when an event that should be debounced (like a keystroke in the search box) occurs, a timer starts.
2. **Wait**: if a new event occurs before the timer expires, the timer is reset.
3. **Execution**: if the timer reaches the end of its countdown, the debounced function is executed.

## Mutating Data

### What are Server Actions?
**React Server Actions** allow you to run asynchronous code directly on the server. They eliminate the need to create API endpoints to mutate your data. Instead, you write asynchronous functions that execute on the server and can be invoked from your Client or Server Components.

Security is a top priority for web apps, as they can be vulnerable to various threats. This is where Server Actions come in. They include features like encrypted closures, strict input checks, error message hashing, host restrictions, and more - all working together to significantly enhance your application security.

### Using forms with Server Actions
In React, you can use the `action` attribute in the `<form>` element to invoke actions. The action will automatically receive the native `FormData` object, containing the captured data.

An advantage of invoking a Server Action within a Server Component is progressive enhancement - forms work even if JavaScript has not yet loaded on the client. (e.g. Without slower internet connections)

### Next.js with Server Actions
Server Actions are also deeply integrated with Next.js caching. When a form is submitted through a Server Action, not only can you use the action to mutate data, but you can also revalidate the associated cache using APIs like revalidatePath and revalidateTag.

### Creating an invoice
1. Create a form to capture the user's input
2. Create a Server Action and invoke it from the form
3. Inside your Server Action, extract the data from the `formData` object
4. Validate and prepare the data to be inserted into your database
5. Insert the data and handle any errors
6. Revalidate the cache and redirect the user back to invoices page

#### Storing values in cents
It's usually a good practice to store monetary values in cents in your database to eliminate JavaScript floating-point errors and ensure greater accuracy

### Updating an invoice
1. Create a new dynamic route segment with the invoice id
2. Read the invoice id from the page params
3. Fetch the specific invoice from your database
4. Pre-populate the form with the invoice data
5. Update the invoice data in your database

### Dynamic Routes
Next.js allows you to create Dynamic Route Segments when you don't know the exact segment name and want to create routes based on data. You can create dynamic route segments by wrapping a folder's name in square brackets (e.g. [id], [post], [slug])

## Error Handling

### Handling all errors with error.tsx
The `error.tsx` file can be used to define a UI boundary for a route segment. It serves as a **catch-all** for unexpected errors and allows you to display a fallback UI to your users.

### Handling 404 errors with the notFound function
Another way you can handle errors gracefully is by using the `notFound` function. `error.tsx` is useful for catching uncaught exceptions, `notFound` can be used when you try to fetch a resource that doesn't exist

## Accessibility

### What is accessibility?
Accessibility refers to designing and implementing web applications that everyone can use, including those with disabilities. It's a vast topic that covers many areas, such as keyboard navigation, semantic HTML, images, colors, videos, etc.

Next.js includes the `eslint-plugin-jsx-ally` plugin in its ESLint config to help catch accessibility issues early

### Improving from accessibility
- **Semantic HTML**: using semantic elements `<input>`, `<option>`, etc. instead of  `<div>`. This allows assistive technologies to focus on the input elements and provide appropriate contextual information to the user, making the form easier to navigate and understand
- **Labelling**: including `<label>` and the `htmlFor` attribute ensures that each form field has a descriptive text label. Provides context and enhances usability by allowing users to click on the label to focus on the corresponding input field
-**Focus Outline**: fields are properly styled to show an outline when they are in focus. Critical for accessibility as it visually indicates the active element on the page, helping both keyboard and screen reader users to understand where they are on the form. You can verify this by pressing *tab*

### Form Validation
Currently, if we submit a blank "create invoice" form, we get an error. This is because we are sending empty form values to the Server Actions. We can prevent this by validating the form on the *client* **OR** *server*

### Server Side Validation
By validating forms on the server, you can:
- Ensure your data is in the expected format before sending it to your database.
- Reduce the risk of malicious users bypassing client-side validation
- Have one source of truth for what is considered *valid* data

## Authentication vs Authorization
- **Authentication** is about making sure the user is who they say they are. You're proving your identity with something you have like a username and password.
- **Authorization** is the next step. Once a user's identity is confirmed, authorization decides what parts of the application they are allowed to use.

### NextAuth.js
We will be using NextAuth.js to add authentication to the application.
NextAuth.js abstracts away much of the complexity involved in managing sessions, sign-in and sign-out, and other aspects of authentication.
While you can manually implement these features, the process can be time-consuming and error-prone.
NextAuth.js simplifies the process, providing a unified solution for auth in Next.js applications.
- Installed *beta* version of NextAuth.js, which is compatible with **Next.js 14+**

### Password hashing
- Good practice to **hash** passwords before storing them in a database.
- Hashing converts a password into a fixed length string of characters, which appears random, providing a layer of security even if the user's data is exposed.

When seeding your database, we used a package called `bcrypt` to has the user's password before storing it in the database. We will need to create a separate file for the `bcrypt` package to compare that password entered by the user matches the one in the database. This is because `bcrypt` relies on Node.js APIs not available in Next.js Middleware.

## Metadata

### What is metadata?
- Metadata provides additional details about a webpage.
- It is not visible to the users visting the page.
- It works behind the scenes, embedded within the page's HTML, usually within the `<head>` element.
- This hidden information is crucial for search engines and other systems that need to understand your webpage's content better.

### Why is metadata important
Metadata plays a significant role in enhancing a webpage's SEO, making it more accessible and understandable for search engines and social media platforms

### Open Graph Metadata
This metadata enhances the way a webpage is represented when shared on social media platforms providing information such as the title, description, and preview image

### Adding Metadata
- **Config-based**: export a *static* `metadata` *object* or a dynamic *generateMetadata* function in a `layout.js` or `page.js` file.
- **File-based**: *Next.js* has a range of special files that are specifically used for metadata purposes

