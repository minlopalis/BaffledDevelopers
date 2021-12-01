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
import TextArea from "../../../components/textarea";
import Select from "../../../components/select";
import Article from "../[id]";

function EditArticle(props) {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  const article = useStore(
    useCallback(
      (state) => state.articles.find((article) => article.id === id),
      [id]
    )
  );

  const colors = {
    text: "gray",
    border: "indigo",
  };

  const {
    articles,
    topics,
    subjects,
    setArticles,
    setSubjects,
    setTopics,
    updateArticle,
  } = useStore((state) => state);

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

  // Get Topics
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
    try {
      const { data: newArticle } = await axios.put(
        `${API_URL}/articles/${article.id}`,
        {
          name: data.Name,
          about: data.About,
          subject: data.Subjects,
          topic: data.Topics,
          born: data.Born,
          died: data.Died,
          notable_work: data.Noteable_Work,
          year: data.Year,
          medium: data.Medium,
          dimensions: data.Dimensions,
          location: data.Location,
          designed_by: data.Designed_by,
          developer: data.Developer,
        },
        {
          headers: {
            Authorization: `Bearer ${props.cookies.jwt}`,
          },
        }
      );

      updateArticle(newArticle.id, newArticle);
      setLoading(false);
      router.push("/articles");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="container m-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* article name */}
        <Input
          defaultValue={article?.name}
          type="text"
          label="Name"
          register={register}
          required
          error={errors.Article}
        />

        {/* about  */}
        <TextArea
          defaultValue={article?.about}
          type="text"
          label="About"
          register={register}
          required
          error={errors.Article}
        />

        {/* Subjects */}
        <Select
          label="Subjects"
          register={register}
          selectedItem={article?.subject.name}
          required
          error={errors.Article}
          selectID="Subjects"
          data={subjects}
        />

        {/* Topics */}
        <Select
          label="Topics"
          register={register}
          required
          selectedItem={article?.topic.name}
          error={errors.Article}
          selectID="Topics"
          data={topics}
        />

        {/* born */}
        <Input
          defaultValue={article?.born}
          type="text"
          label="Born"
          register={register}
          error={errors.Article}
        />

        {/* death */}
        <Input
          defaultValue={article?.died}
          type="text"
          label="Died"
          register={register}
          error={errors.Article}
        />

        {/* known for */}
        <Input
          defaultValue={article?.known_for}
          type="text"
          label="Known for"
          register={register}
          error={errors.Article}
        />

        {/* nationality */}
        <Input
          defaultValue={article?.nationality}
          type="text"
          label="Nationality"
          register={register}
          error={errors.Article}
        />

        {/* notable work */}
        <Input
          defaultValue={article?.notable_work}
          type="text"
          label="Notable_Work"
          register={register}
          error={errors.Article}
        />

        {/* year */}
        <Input
          defaultValue={article?.year}
          type="text"
          label="Year"
          register={register}
          error={errors.Article}
        />

        {/* medium */}
        <Input
          defaultValue={article?.medium}
          type="text"
          label="Medium"
          register={register}
          error={errors.Article}
        />

        {/* dimensions */}
        <Input
          defaultValue={article?.dimensions}
          type="text"
          label="Dimensions"
          register={register}
          error={errors.Article}
        />

        {/* location */}
        <Input
          defaultValue={article?.location}
          type="text"
          label="Location"
          register={register}
          error={errors.Article}
        />

        {/* designed_by */}
        <Input
          defaultValue={article?.designed_by}
          type="text"
          label="Designed_by"
          register={register}
          error={errors.Article}
        />

        {/* developer */}
        <Input
          defaultValue={article?.developer}
          type="text"
          label="Developer"
          register={register}
          error={errors.Article}
        />

        <Button classes="mt-4" width="32" type="submit">
          Save {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const cookies = nookies.get(context);

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

  if (!user || user.role.type === "student") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
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
export default EditArticle;
