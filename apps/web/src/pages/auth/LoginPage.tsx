import { useState } from 'react';
import { useAuthStore } from '@/state/auth.store';

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
    <section>
      <header>
        <h2>Sign in with Ethereum</h2>
        <p>Authenticate using SIWE to access trading controls.</p>
      </header>
      <button type="button" onClick={handleSignIn} disabled={isSigning}>
        {isSigning ? 'Signing…' : 'Sign In'}
      </button>
    </section>
  );
}
