import {
  InformationCircleIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/solid';

const AlertIcon = ({ type, color }) => {
  type === 'info' ? (
    <InformationCircleIcon
      className={`-5 h-5 text-${color}-400`}
      aria-hidden="true"
    />
  ) : type === 'success' ? (
    <CheckCircleIcon
      className={`-5 h-5 text-${color}-400`}
      aria-hidden="true"
    />
  ) : (
    <XCircleIcon className={`-5 h-5 text-${color}-400`} aria-hidden="true" />
  );
};

const Alert = ({ type = 'info', message }) => {
  const color = type === 'info' ? 'blue' : type === 'success' ? 'green' : 'red';
  return (
    <div className={`p-4 border-l-4 border-${color}-400 bg-${color}-50`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertIcon type={type} color={color} />
        </div>
        <div className="ml-3">
          <p className={`text-sm text-${color}-700`}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
