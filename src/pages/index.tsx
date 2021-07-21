import React from "react";
import { UsersMap } from "components/maps/UsersMap";
import Layout from "components/Layout";
import Head from "next/head";
import { client, RootQueryToUserConnectionEdge } from "client";
import { Suspense as ReactSuspense, SuspenseProps } from 'react';

export const Suspense =
  typeof window !== 'undefined'
    ? ReactSuspense
    : function SuspenseSSR({ children }: SuspenseProps) {
      return <>{children}</>;
    };

const Page = client.graphql(
  function Page() {
    const { id: viewerId, name: viewerName } = client.client.query.viewer;
    const isNotExcluded = ({ node }: RootQueryToUserConnectionEdge) => !node.meetupInfo.exclude;
    const hasLocation = ({ node }: RootQueryToUserConnectionEdge) =>
      node.meetupInfo?.location != null;
    const displayedUsers = client.client.query.users({ first: 100 }).edges.filter(isNotExcluded).filter(hasLocation);
    const populatedUsers = displayedUsers
      .filter(
        ({
          node: {
            id,
            firstName,
            lastName,
            name,
            meetupInfo: { location: { longitude, latitude, city, state, country, countryShort }, exclude, phoneNumber, email },
          },
        }) => !!latitude && !!longitude
      )
      .map((user) => user.node);

    return (
      <Layout viewer={{ id: viewerId, name: viewerName }}>
        <Head>
          <title>WP Engine Meetup</title>
        </Head>
        <Suspense fallback={<p>Loading...</p>}>
          <UsersMap users={populatedUsers} isLoading={false} />
        </Suspense>
      </Layout>
    );
  },
  {
    // boolean | { fallback: NonNullable<ReactNode> | null } | undefined
    suspense: true,

    // ((error: GQlessError) => void) | undefined
    onError(error) { },

    // boolean | undefined
    staleWhileRevalidate: true,
  }
);

export default function Container() {
  return (
    <Suspense fallback="Loading...">
      <Page />
    </Suspense>
  );
}
