import React from 'react';
import { AuthorizedContent } from 'components/AuthorizedContent';
import { client } from 'client';
import { RootQueryToUserConnectionEdge } from '@faustjs/core';

export default function Page() {
  const { users } = client.useQuery();
  const isNotAdmin = ({ node }: RootQueryToUserConnectionEdge) => !node.roles().nodes.map(n => n.name).includes('administrator');
  const displayedUsers = users().edges.filter(isNotAdmin);

  return (
    <AuthorizedContent>
      <ul>
        {displayedUsers.map(({ node }) => {
          return (
            <li key={node.id}>{node.nicename}</li>
          )
        })}
      </ul>
    </AuthorizedContent>
  );
}
