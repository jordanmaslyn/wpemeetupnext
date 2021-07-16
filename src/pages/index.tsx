import React from "react";
import { UsersMap } from "components/maps/UsersMap";
import Layout from "components/Layout";
import Head from "next/head";

export default function Page() {
  return (
    <Layout>
      <Head>
        <title>WP Engine Meetup</title>
      </Head>
      <UsersMap />
    </Layout>
  );
}
