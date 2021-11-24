import NavBar from './navbar';
// import Footer from './footer';

export default function Layout({ children, ...pageProps }) {
  return (
    <>
      <NavBar user={pageProps.user} />
      <main className="container flex justify-center mx-auto">{children}</main>
      {/* <Footer /> */}
    </>
  );
}
