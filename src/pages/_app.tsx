import React from "react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { headlessConfig } from "@faustjs/core";
import { HeadlessProvider } from "@faustjs/next";
import { client } from "client";

import { AuthorizedContent } from "components/AuthorizedContent";
import "../styles/globals.css";

headlessConfig({
  wpUrl: process.env.WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.WP_HEADLESS_SECRET,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadlessProvider client={client} pageProps={pageProps}>
        <AuthorizedContent>
          <Component {...pageProps} />
        </AuthorizedContent>
      </HeadlessProvider>
    </>
  );
}
