import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        console.log({ email, password });

        if (email === "satrucreation@gmail.com" && password === "12345678") {
            throw redirect(302, '/admin/adoptions');
        } else {
            console.log("invalid credentials");
        }
    }
};
