import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="relative overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
}
