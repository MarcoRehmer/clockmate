import AppProvider from '@/app/provider/appProvider';
import Script from 'next/script';
import React from 'react';
import './styles/globals.scss';

export const metadata = {
  title: 'Clockmate',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" translate="no">
      <body>
        <AppProvider>
          <Script type="importmap" id="extension-dependency-map">
            {`{"imports": 
                {
                  "lit": "https://cdn.jsdelivr.net/gh/lit/dist@3/all/lit-all.min.js",
                  "tslib": "https://cdn.jsdelivr.net/npm/tslib@2.3.1/tslib.min.js",
                  "lit/decorators.js": "https://cdn.jsdelivr.net/npm/lit-element@4.0.4/+esm"
                }
              }`}
          </Script>

          <Script type="module" src="http://localhost:8081/test-esm-greeter.js" crossOrigin="anonymous"></Script>
          {/* <script type="module" src="https://sap.github.io/ui5-webcomponents/assets/js/ui5-webcomponents/bundle.esm.js"></script> */}

          <main>{children}</main>
        </AppProvider>
      </body>
    </html>
  );
}
