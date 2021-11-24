import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import LoginComponent from '../components/loginComponent';

const Home = () => {
  const router = useRouter();

  return (
    <div className="container flex justify-center">
      <LoginComponent />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (user) {
    return {
      redirect: {
        permanent: false,
        destination: '/articles',
      },
    };
  }

  return {
    props: {},
  };
};

export default Home;
