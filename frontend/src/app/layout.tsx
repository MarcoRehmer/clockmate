import { AppHeader } from '@/app/components/AppHeader/AppHeader';
import { AppFooter } from '@/app/components/AppFooter/AppFooter';
import '../../../frontend/src/app/global.scss';
import ReduxProvider from './provider/reduxProvider';
import { ApiContextProvider } from '@/app/provider/api.context';

export const metadata = {
  title: 'Clockmate',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ApiContextProvider>
            <div>
              <header>
                <AppHeader />
              </header>
              <main>{children}</main>
              <footer>
                <AppFooter />
              </footer>
            </div>
          </ApiContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
