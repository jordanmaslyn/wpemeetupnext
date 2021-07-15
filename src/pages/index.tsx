import React from 'react';
import { client, RootQueryToUserConnectionEdge } from 'client';
import { UsersMap } from 'components/maps/UsersMap';
import Layout from "components/Layout"
import { UserListEntry } from 'components/UserListEntry';

export default function Page() {
  const { users } = client.useQuery();
  const isNotExcluded = ({ node }: RootQueryToUserConnectionEdge) => !node.meetupInfo.exclude;
  const hasLocation = ({ node }: RootQueryToUserConnectionEdge) => node.meetupInfo?.location != null;
  const displayedUsers = users().edges.filter(isNotExcluded).filter(hasLocation);

  return (
    <Layout>
      <UsersMap users={displayedUsers} />
      <ul>
        {displayedUsers.map(({ node }, index) => {
          return (
            <li key={node?.id ?? index}>
              <UserListEntry user={node} />
            </li>
          )
        })}
      </ul>
    </Layout>
  );
}
