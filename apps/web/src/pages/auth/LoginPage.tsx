import { useState } from 'react';
import { useAuthStore } from '@/state/auth.store';
import { Button } from '@/components/ui/Button';

export function LoginPage() {
  const { authenticate } = useAuthStore();
  const [isSigning, setIsSigning] = useState(false);

  const handleSignIn = async () => {
    setIsSigning(true);
    try {
      await authenticate();
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <section className="mx-auto mt-16 max-w-lg rounded-3xl border border-white/5 bg-[#111C30]/80 p-10 text-center shadow-lg shadow-black/20">
      <h2 className="text-3xl font-semibold text-slate-50">Sign in with Ethereum</h2>
      <p className="mt-4 text-sm text-slate-400">
        Authenticate using SIWE (ERC-4361) to unlock trading dashboards, wallet operations, and AI monitoring.
      </p>
      <div className="mt-8 flex justify-center">
        <Button variant="primary" loading={isSigning} onClick={handleSignIn}>
          {isSigning ? 'Signing...' : 'Sign In'}
        </Button>
      </div>
    </section>
  );
}
