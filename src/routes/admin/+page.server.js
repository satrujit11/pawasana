import { redirect } from '@sveltejs/kit';
import { auth } from '$lib/stores/authStore'

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        let authStatus;
        if (email === "yogaforacause@pawasana.in" && password === "12345678") {
            auth.set(true);
        }

        const unsubscribe = auth.subscribe((value) => {
            authStatus = value
        })

        await Promise.resolve();
        unsubscribe();

        console.log(authStatus);

        if (email === "yogaforacause@pawasana.in" && password === "12345678" && authStatus) {
            throw redirect(302, '/admin/adoptions');
        } else {
            console.log("invalid credentials");
        }
    }
};
