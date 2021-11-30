import Link from 'next/link';

const ArticleListItem = ({ article }) => {
  return (
    <div className="overflow-hidden bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {article.name}
        </h3>
        <p className="max-w-2xl mt-1 text-sm text-gray-500">
          {article.known_for}
        </p>
      </div>
      <div className="px-4 py-5 border-t border-gray-200 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Topic</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article.topic?.name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Subject</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article.subject?.name}
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Notable Work</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {article.notable_work}
            </dd>
          </div>
          <div className="col-span-2 py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <Link href={`/articles/${article._id}`}>
              <a className="flex items-center justify-center w-full px-4 py-2 mx-auto text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Read More
              </a>
            </Link>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default ArticleListItem;
