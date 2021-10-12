import "faust.config";
import React from "react";
import { HeadlessProvider } from "@faustjs/next";
import { client } from "client";
import type { AppProps } from "next/app";

import { AuthorizedContent } from "components/AuthorizedContent";
import "../styles/globals.css";

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
