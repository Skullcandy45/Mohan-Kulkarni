import { toast } from 'sonner';
import AdminToastContent from '../components/admin/ui/AdminToastContent';
import { formatApiError } from './formatApiError';

function show(type, title, message) {
  const text = message != null && String(message).trim() !== '' ? String(message).trim() : undefined;
  toast.custom(
    (id) => <AdminToastContent id={id} type={type} title={title} message={text} />,
    { duration: 4000 },
  );
}

export const adminToast = {
  success(title, message) {
    show('success', title, message);
  },
  error(title, message) {
    show('error', title, message);
  },
  warning(title, message) {
    show('warning', title, message);
  },
  info(title, message) {
    show('info', title, message);
  },
  fromError(title, err) {
    adminToast.error(title, formatApiError(err));
  },
};
