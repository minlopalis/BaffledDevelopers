import React, { useCallback, useEffect, useState } from "react";
import nookies from "nookies";
import { API_URL } from "../../config";
import axios from "axios";
import { useForm } from "react-hook-form";
import Input from "../../components/input";
import { useRouter } from "next/router";
import { useStore } from "../../store";
import Button from "../../components/button";
import Spinner from "../../components/spinner";

function AddSubject(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [internalError, setInternalError] = useState(null);

  const { subjects, setSubjects, addSubject } = useStore((state) => state);

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

    const existingSubject = subjects.find((s) => s.name === data.Subject);
    if (existingSubject) {
      setInternalError("Subject already exists");
      setLoading(false);
      return;
    }
    try {
      const { data: newSubject } = await axios.post(
        `${API_URL}/subjects`,
        { name: data.Subject },
        {
          headers: {
            Authorization: `Bearer ${props.cookies.jwt}`,
          },
        }
      );

      addSubject(newSubject);
      setLoading(false);
      router.push("/subjects");
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
          label="Subject"
          register={register}
          required
          error={errors.Subject}
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
export default AddSubject;
