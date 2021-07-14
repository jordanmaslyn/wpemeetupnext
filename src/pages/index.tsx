import React from 'react';
import { AuthorizedContent } from 'components/AuthorizedContent';

export default function Page() {

  return (
    <AuthorizedContent>
      <h1>You are successfully logged in!</h1>
    </AuthorizedContent>
  );
}
