import axios from 'axios';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import LoginComponent from '../components/loginComponent';
import { API_URL } from '../config';

const Home = () => {
  const router = useRouter();

  return (
    <div className="container flex justify-center mx-auto">
      <LoginComponent />
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(`${API_URL}/users/me`, {
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
