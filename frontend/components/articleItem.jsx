import Link from 'next/link';
import { useRouter } from 'next/router'; 

const ArticleItem = ({user, article}) => {
  const router = useRouter();
  
  return (
    <>
    {/* Display Article  */}
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6 bg-purple-50 text-gray-500">
        <p className="max-w-2xl mt-1 text-sm">
          ID: {article?.id}
        </p>
        <p className="max-w-2xl mt-3 text-sm">
          <span className="font-bold">{article?.topic.name}</span> | <span>{article?.subject.name}</span>
        </p>
      </div>

      <div className="p-5 border-t border-gray-200">
        {/* <div className="sm:divide-y sm:divide-gray-200"> */}

        <div className="text-gray-600 p-4 sm:p-0">
          {/* About */}
          {article?.about ? (
          <p className="text-gray-900 italic">
            {article?.about}
          </p>
          ) : ('')}

          {/* Known For */}
          {article?.known_for ? (
          <p className="py-4">
              <h3 className="text-lg font-medium text-gray-500">Known For</h3>
              <p>{article?.known_for}</p>
          </p>
          ) : ('')}

          {/* Nationality */}
          {article?.nationality ? (
          <p className="py-4">
              <p className="text-lg font-medium text-gray-500">Nationality</p>
              <p className="text-gray-900">{article?.nationality}</p>
          </p>
          ) : ('')}

          {/* Year */}
          {article?.year ? (
          <p className="py-4">
              <p className="text-lg font-medium text-gray-500">Year</p>
              <p className="text-gray-900">{article?.year}</p>
          </p>
          ) : ('')}

          {/* Medium */}
          {article?.medium ? (
          <p className="py-4">
              <p className="text-lg font-medium text-gray-500">Medium</p>
              <p className="text-gray-900">{article?.medium}</p>
          </p>
          ) : ('')}

          {/* Dimensions */}
          {article?.dimensions ? (
          <p className="py-4">
              <p className="text-lg font-medium text-gray-500">Dimensions</p>
              <p className="text-gray-900">{article?.dimensions}</p>
          </p>
          ) : ('')}


          {/* Location */}
          {article?.location ? (
          <p className="py-4">
              <p className="text-lg font-medium text-gray-500">Location</p>
              <p className="text-gray-900">{article?.location}</p>
          </p>
          ) : ('')}


          {/* Designed By */}
          {article?.designed_by ? (
          <p className="py-4">
              <p className="text-lg font-medium text-gray-500">Designed By</p>
              <p className="text-gray-900">{article?.designed_by}</p>
          </p>
          ) : ('')}


          {/* Developer */}
          {article?.developer ? (
          <p className="py-4">
              <p className="text-lg font-medium text-gray-500">Developer</p>
              <p className="text-gray-900">{article?.developer}</p>
          </p>
          ) : ('')}

          {/* Lifespan */}
          {article?.born || article?.died ? (
          <div className="py-4">
            <p className="text-lg font-medium text-gray-500">Lifespan</p>
            <p className="font-medium text-gray-500">Born: <span className="font-normal text-gray-900">{article?.born}</span></p>
            <p className="font-medium text-gray-500">Died: <span className="font-normal text-gray-900">{article?.died}</span></p>
          </div>
          ) : ('')}

          {/* Noteable Work */}
          {article?.notable_work ? (
          <p className="py-4">
              <p className="text-lg font-medium text-gray-500">Notable Work</p>
              <p className="text-gray-900">{article?.notable_work}</p>
          </p>
          ) : ('')}

        {/* </div> */}

      </div>
    </div>
    </div>

    <div className="my-4 grid grid-cols-2 gap-4">
      <Link href="/articles/">
        <a className="flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          Back
        </a>
      </Link>
      {/* <a className="flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-medium bg-purple-50 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Edit Article
      </a> */}
    </div>
    </>
    
  );
};

export default ArticleItem;

export const getServerSideProps = (context) => {
  console.log('GSSP=', context.params);
  return {
    props:{
      article: context.params.article,
      user
    }
  }
}