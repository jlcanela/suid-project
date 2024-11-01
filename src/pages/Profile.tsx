import { createEffect, createSignal } from "solid-js";
import { useAuth0 } from "../auth";

export default function Profile() {
    const { user, getToken } = useAuth0();
    const [token, setToken] = createSignal<string>("");

    createEffect(async () => {
        const token = await getToken();
        setToken(token);
    }); // Fetch token only once when component mounts

    return (
        <div>
        <h1>Profile</h1>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
        <h2>JWT Token</h2>
        <p>{token()}</p>
        </div>
    );
}

