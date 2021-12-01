import { XCircleIcon } from '@heroicons/react/solid';

function Alert({ error }) {
  let newError = error;
  if (error.includes('Identifier')) {
    newError = error.replace('Identifier', 'Email');
  }

  return (
    <div className="p-4 mt-2 bg-red-100 rounded-md">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="w-5 h-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <div className="mt-2 text-sm text-red-700">
            <ul role="list" className="pl-5 space-y-1 list-disc">
              <li>{newError}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
