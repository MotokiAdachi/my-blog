import "./globals.css";
import "highlight.js/styles/github.css"; // コードハイライト用のスタイル

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
