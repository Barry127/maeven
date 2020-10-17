import Link from 'next/link';
import React from 'react';

const IndexPage = () => (
  <>
    <h1>Hello Next.js </h1>
    <p>
      <Link href="/test">Test</Link>
    </p>
  </>
);

export default IndexPage;
