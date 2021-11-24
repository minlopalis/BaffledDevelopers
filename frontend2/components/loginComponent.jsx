import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Input from './input';
import Spinner from './spinner';

const LoginComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post('/api/login', {
        identifier: data.Email,
        password: data.Password,
      });

      router.push('/articles');
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-full py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="w-auto h-12 mx-auto"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              type="text"
              label="Email"
              register={register}
              required
              error={errors.Email}
            />

            <Input
              type="password"
              label="Password"
              register={register}
              required
              error={errors.Password}
            />

            <br />
            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
                {loading && <Spinner />}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
