import axios from 'axios';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/button';
import Input from '../../components/input';
import Spinner from '../../components/spinner';
import { API_URL } from '../../config';
import { useStore } from '../../store';

function AddTopic(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [internalError, setInternalError] = useState(null);

  const { topics, setTopics, addTopic } = useStore((state) => state);

  // will fetch topics if not already in store
  useEffect(() => {
    const fetchTopics = async () => {
      const { data } = await axios.get(`${API_URL}/topics`, {
        headers: {
          Authorization: `Bearer ${props.cookies.jwt}`,
        },
      });
      setTopics(data);
    };

    if (!topics.length) {
      fetchTopics();
    }
  }, [topics]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    const existingTopic = topics.find((t) => t.name === data.Topic);
    if (existingTopic) {
      setInternalError('Topic already exists');
      setLoading(false);
      return;
    }
    try {
      const { data: newTopic } = await axios.post(
        `${API_URL}/topics`,
        { name: data.Topic },
        {
          headers: {
            Authorization: `Bearer ${props.cookies.jwt}`,
          },
        }
      );

      addTopic(newTopic);
      setLoading(false);
      router.push('/topics');
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="Topic"
          register={register}
          required
          error={errors.Topic}
          internalError={internalError}
        />
        <Button classes="mt-4" width="32" type="submit">
          Save {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

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

  if (!user || user.role.type === 'student') {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: {
      user,
      cookies,
    },
  };
};
export default AddTopic;
