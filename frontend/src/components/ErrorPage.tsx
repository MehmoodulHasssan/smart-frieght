import React, { FC } from 'react';
import Link from 'next/link';

const ErrorPage: FC<{ code: number; text: string }> = ({ code, text }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>{code.toString()} - Page Not Found</h1>
      <p style={styles.paragraph}>{text}</p>
      <Link href="/" style={styles.link}>
        Go back to the homepage
      </Link>
    </div>
  );
};

export default ErrorPage;

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    textAlign: 'center' as const,
    backgroundColor: '#f8f9fa',
    color: '#333',
  },
  heading: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: '1.25rem',
    margin: '20px 0',
  },
  link: {
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};
