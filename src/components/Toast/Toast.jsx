import { CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Toast.css';

export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  return (
    <div className={`toast show ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}>
      {toast.type === 'error' ? (
        <AlertCircle size={18} />
      ) : (
        <CheckCircle size={18} />
      )}
      {toast.message}
    </div>
  );
}
