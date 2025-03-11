import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useContact() {
  const [loading, setLoading] = useState(false);

  const submitContactForm = async (
    name: string,
    email: string,
    message: string
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([
          {
            name,
            email,
            message,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submitContactForm,
  };
}