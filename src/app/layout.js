// TailWind.cssの設定をimport
import './globals.css';

// Googleフォントを有効化
import { Inconsolata } from 'next/font/google';
import { Timer } from '@mui/icons-material';
import ClientDrawer from './ClientDrawer';
const fnt = Inconsolata({ subsets: ['latin'] })

// metadataを定義
export const metadata = {
  title: 'React Review App',
  description: 'Reactの学習内容のポートフォリオ',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body className={fnt.className}>
        <ClientDrawer />
        <div className="ml-2">{children}</div>
      </body>
    </html>
  );
}