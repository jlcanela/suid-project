import { useAuth0 } from "../auth";

export default function Profile() {
    const { user } = useAuth0();

    return (
        <div>
        <h1>Profile</h1>
        <pre>{JSON.stringify(user(), null, 2)}</pre>
        </div>
    );
}
