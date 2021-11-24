import NavBar from './navbar';
// import Footer from './footer';

export default function Layout({ children, ...pageProps }) {
  return (
    <>
      <NavBar user={pageProps.user} />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
