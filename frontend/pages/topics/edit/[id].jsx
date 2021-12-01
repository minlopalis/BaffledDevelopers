import React, { useCallback, useEffect, useState } from "react";
import nookies from "nookies";
import { API_URL } from "../../../config";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../../components/input";
import { useRouter } from "next/router";
import { useStore } from "../../../store";
import Button from "../../../components/button";
import Spinner from "../../../components/spinner";

function EditTopic(props) {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  const topic = useStore(
    useCallback(
      (state) => state.topics.find((t) => t.id === id),
      [id]
    )
  );

  const colors = {
    text: "gray",
    border: "indigo",
  };

  const { 
    topics,
    articles,
    subjects,
    setArticles,
    setSubjects,
    setTopics,
    updateTopic,
  } = useStore((state) => state);

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

  // fetch articles if not already in store
  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await axios.get(`${API_URL}/articles`, {
        headers: {
          Authorization: `Bearer ${props.cookies.jwt}`,
        },
      });
      setArticles(data);
    };

    if (!articles.length) {
      fetchArticles();
    }
  }, [articles]);

  // Get Subjects
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
      const { data: newTopic } = await axios.put(
        `${API_URL}/topics/${topic.id}`,
        { name: data.Topic },
        {
          headers: {
            Authorization: `Bearer ${props.cookies.jwt}`,
          },
        }
      );

      updateTopic(newTopic.id, newTopic);
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
        {/* topic name */}
        <Input
          defaultValue={topic?.name}
          type="text"
          label="Topic"
          register={register}
          required
          error={errors.Topic}
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
export default EditTopic;
