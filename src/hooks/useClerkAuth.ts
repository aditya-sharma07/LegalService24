import { useState, useEffect } from 'react';
import { useClerk, useUser } from '@clerk/clerk-react';

export function useAuth() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(!isLoaded);

  useEffect(() => {
    if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded]);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    isSignedIn: isSignedIn || false,
    loading,
    signOut: handleSignOut,
  };
}