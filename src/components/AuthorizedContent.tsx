import { useAuth } from "hooks/useAuth";

export function AuthorizedContent({ children }) {
    const authToken = useAuth();
    return authToken ? children : <p>You must be authorized to view this content.</p>
}