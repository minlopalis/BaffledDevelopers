import Link from 'next/link';
import { useRouter } from 'next/router'; 

const ArticleItem = ({article}) => {
  const router = useRouter();

  console.log('articleItem.jsx = ', article);
  
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">

      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {article?.name}
        </h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">
          ID: {article?.id}
        </p>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">
          {article?.known_for}
        </p>
      </div>

      <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">

          {/* Nationality */}
          {article?.nationality ? (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Nationality</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.nationality}
            </dd>
          </div>
          ) : ('')}


          {/* Year */}
          {article?.year ? (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Year</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.year}
            </dd>
          </div>
          ) : ('')}

          {/* Medium */}
          {article?.medium ? (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Medium</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.medium}
            </dd>
          </div>
          ) : ('')}

          {/* Dimensions */}
          {article?.dimensions ? (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Dimensions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.dimensions}
            </dd>
          </div>
          ) : ('')}


          {/* Location */}
          {article?.location ? (
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Location</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.location}
            </dd>
          </div>) : 
          ('')}


          {/* Designed By */}
          {article?.designed_by ? (
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Designed By</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.designed_by}
            </dd>
          </div>) : 
          ('')}


          {/* Developer */}
          {article?.developer ? (
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Developer</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.developer}
            </dd>
          </div>) : 
          ('')}


          {/* About */}
          {article?.about ? (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">About</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.about}
            </dd>
          </div>
          ) : ('')}


          {/* Born / Died */}
          {/* TODO: Adjust into 2 columns on a large screen */}
          {!article?.born && !article?.died ? ('') : (
          <div className="py-4 grid-cols-4 sm:py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
            
            <dt className="text-sm font-medium text-gray-500">Born
            </dt>
            <dd className="mt-1 text-sm text-gray-900 col-span-2 sm:mt-0 sm:col-span-1">
              {article?.born}
            </dd>

            <dt className="text-sm font-medium text-gray-500">Died</dt>
            <dd className="mt-1 text-sm text-gray-900 col-span-2 sm:mt-0 sm:col-span-1">
              {article?.died}
            </dd>
          </div>
          )}

          {/* Topic */}
          {article?.topic.name ? (
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Topic</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.topic.name}
            </dd>
          </div>
          ) : ('')}


          {/* Subject */}
          {article?.subject.name ? (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Subject</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.subject.name}
            </dd>
          </div>
          ) : ('')}


          {/* Noteable Work */}
          {article?.notable_work ? (
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Notable Work</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article?.notable_work}
            </dd>
          </div>) : 
          ('')}


          <div className="col-span-2 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <button onClick={()=>router.back()} 
                className="flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Back
              </button>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ArticleItem;

export const getServerSideProps = (context) => {
  console.log('GSSP=', context.params);
  return {
    props:{
      article: context.params.article
    }
  }
}