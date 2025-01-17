import { ApolloProvider } from '@apollo/client';
import {
  AppShell,
  ColorScheme,
  ColorSchemeProvider,
  Container,
  MantineProvider,
} from '@mantine/core';
import { useColorScheme, useLocalStorage } from '@mantine/hooks';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import AppHeader from '../web/components/organisms/AppHeader';
import { client } from '../web/lib/apollo';

dayjs.extend(relativeTime);

const App = ({ Component, pageProps }: AppProps) => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: preferredColorScheme,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <>
      <Head>
        <title>Apollo-blog</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme, fontFamily: 'Inter, sans-serif' }}
        >
          <ApolloProvider client={client}>
            <AppShell padding="md" header={<AppHeader />}>
              <Container size="sm">
                <Component {...pageProps} />
              </Container>
            </AppShell>
          </ApolloProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
};

export default App;
