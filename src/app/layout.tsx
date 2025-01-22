import type { Metadata } from "next";
import { Epilogue, Manrope, Questrial } from "next/font/google";
import {NextIntlClientProvider} from 'next-intl';
import {getLocale, getMessages} from 'next-intl/server';
import "./globals.css";
import localFont from 'next/font/local'
 
const optim = localFont({ 
  src: './fonts/OptimRegular/OptimRegular.ttf',
  variable: "--font-optim"
 })

const questrial = Questrial({
  variable: "--font-questrial",
  weight: ["400"],
  display: "swap",
  subsets: ["latin"]
});

const manrope = Manrope({
  variable: "--font-manrope",
  weight: ["400"],
  display: "swap",
  subsets: ["latin"]
});

const epilogue = Epilogue({
  variable: "--font-epilogue",
  weight: ["400"],
  display: "swap",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Kesato",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${questrial.variable} ${optim.variable} ${epilogue.variable} ${manrope.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
