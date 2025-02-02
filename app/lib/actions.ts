'use server'; // By adding this, you mark all the exported functions within this file as Server Actions

import { z } from 'zod'; // You can manually validate types, or you can use a type validation library to save time and effort
import postgres from 'postgres'; // Import postgres to save to the database
import { revalidatePath } from 'next/cache'; // Next.js has a client-side router cache that stores the route segments in the user's browser for a time.
import { redirect } from 'next/navigation'; // Used to redirect the user back to /dashboard/invoices page

// Define the Zod schema that matches the shape of the form object.
// The schema will validate the formData "shape" before saving it to a database.
const FormSchema = z.object({
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(),
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});

const CreateInvoice = FormSchema.omit({id: true, date: true});

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' }); // Set up the SQL object

export async function createInvoice(formData: FormData) {
    // Pass the rawFormData to CreateInvoice to validate the types
    const { customerId, amount, status } = CreateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    // Execute the SQL script to insert a new invoice
    await sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

    // Since we're updating the data displayed in the invoices route, we want to clear this cache and trigger a new request to the server - we do this with revalidatePath
    revalidatePath('/dashboard/invoices');
    // Once the database has been updated, the /dashboard/invoices path will be revalidated and fresh data will be fetched from the server.
    // At this point, we also want to redirect the user back to the /dashboard/invoices page. We can use the redirect function from Next.js
    redirect('/dashboard/invoices');

    // const rawFormData = {
    //     customerId: formData.get('customerId'),
    //     amount: formData.get('amount'),
    //     status: formData.get('status')
    // };

    // // Test it out
    // console.log(rawFormData);
    // console.log(typeof rawFormData.amount);
}

// Use Zod to update the expected type
const UpdateInvoice = FormSchema.omit({ id: true, date: true }); // customerId, amount, status - id & date are being omitted

export async function updateInvoice(id: string, formData: FormData) {
    // Extract the data from formData
    const { customerId, amount, status } = UpdateInvoice.parse({
        customerId: formData.get('customerId'),
        amount: formData.get('amount'),
        status: formData.get('status'),
    });

    // Convert the amount to cents (precision)
    const amountInCents = amount * 100;

    // Build and execute SQL against the database
    await sql`
        UPDATE invoices
        SET customer_id=${customerId}, amount=${amountInCents}, status=${status}
        WHERE id = ${id}
    `;

    // Revalidate path and redirect back to main invoices page
    revalidatePath('/dashboard/invoices'); // Clear client cache and make a new server request
    redirect('/dashboard/invoices'); // Redirect the user to the invoice's page
}

export async function deleteInvoice(id: string) {
    await sql`
        DELETE FROM invoices WHERE id = ${id}
    `;
    // Since this action is being called in the /dashboard/invoices path, we don't need to call redirect. Calling revalidatePath will trigger a new server request and re-render the table.
    revalidatePath('/dashboard/invoices');
}