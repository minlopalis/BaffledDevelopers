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

  const { articles, setArticles, updateArticles } = useStore((state) => state);

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
        { name: data.Article },
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
    <div className="container mx-auto mt-5">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          defaultValue={article?.name}
          type="text"
          label="Article Name"
          register={register}
          required
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
