import { ensureAuthorization } from "@faustjs/core";
import { useContext, useEffect, useState } from "react";
import isString from 'lodash/isString';
import { HeadlessContext } from "@faustjs/next";

export function useAuth() {
    const [authToken, setAuthToken] = useState(null as string);

    if (typeof window === 'undefined') {
        return authToken;
    }

    const { useClient } = useContext(HeadlessContext).client;
    const client = useClient();

    useEffect(() => {
        const authResult = ensureAuthorization(window.location.href, {
            request: client.context
        });

        const haveServerContext = client.context?.apiClient != null;

        if (isString(authResult)) {
            setAuthToken(authResult as string);
        }

        if (
            !isString(authResult) &&
            isString((authResult as {redirect: string})?.redirect) &&
            !haveServerContext
          ) {
            setTimeout(() => {
              window.location.replace((authResult as {redirect: string})?.redirect as string);
            }, 200);
          }
    }, [client]);

    return authToken;
}