import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children, viewer }) {
  return (
    <>
      <Header viewer={viewer} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
