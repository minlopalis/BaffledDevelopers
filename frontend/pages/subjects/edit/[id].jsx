import axios from 'axios';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/button';
import Input from '../../../components/input';
import Spinner from '../../../components/spinner';
import { API_URL } from '../../../config';
import { useStore } from '../../../store';

function EditSubject(props) {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  const subject = useStore(
    useCallback((state) => state.subjects.find((s) => s.id === id), [id])
  );

  const { subjects, setSubjects, updateSubject } = useStore((state) => state);

  // will fetch subjects if not already in store
  useEffect(() => {
    const fetchSubjects = async () => {
      const { data } = await axios.get(`${API_URL}/subjects`, {
        headers: {
          Authorization: `Bearer ${props.cookies.jwt}`,
        },
      });
      setSubjects(data);
    };

    if (!subjects.length) {
      fetchSubjects();
    }
  }, [subjects]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { data: newSubject } = await axios.put(
        `${API_URL}/subjects/${subject.id}`,
        { name: data.Subject },
        {
          headers: {
            Authorization: `Bearer ${props.cookies.jwt}`,
          },
        }
      );

      updateSubject(newSubject.id, newSubject);
      setLoading(false);
      router.push('/subjects');
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          defaultValue={subject?.name}
          type="text"
          label="Subject"
          register={register}
          required
          error={errors.Subject}
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
export default EditSubject;
