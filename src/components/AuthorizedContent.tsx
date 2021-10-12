import { client } from 'client';

export function AuthorizedContent({ children }) {
  const { useAuth } = client.auth;
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <p>You must be authorized to view this content.</p>;
}
