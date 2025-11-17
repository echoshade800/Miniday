import { useEffect } from 'react';
import { useRouter } from 'expo-router';

/**
 * Add Tab Screen
 * Purpose: Quick navigation entry point to create event screen
 *
 * This screen immediately redirects to the create-event screen
 * and navigates back to home after completion
 */

export default function AddScreen() {
  const router = useRouter();

  useEffect(() => {
    router.push('/create-event');
  }, []);

  return null;
}
