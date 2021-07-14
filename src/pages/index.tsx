import React from 'react';
import { AuthorizedContent } from 'components/AuthorizedContent';
import { client, RootQueryToUserConnectionEdge } from 'client';

export default function Page() {
  const { users } = client.useQuery();
  const isNotExcluded = ({ node }: RootQueryToUserConnectionEdge) => !node.meetupInfo.exclude;
  const displayedUsers = users().edges.filter(isNotExcluded);

  return (
    <AuthorizedContent>
      <ul>
        {displayedUsers.map(({ node }, index) => {
          return (
            <li key={node?.id ?? index}>{node.nicename}</li>
          )
        })}
      </ul>
    </AuthorizedContent>
  );
}
