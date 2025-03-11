import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function useTestimonials() {
  const [loading, setLoading] = useState(false);

  const createTestimonial = async (text: string, rating: number) => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('testimonials')
        .insert([
          {
            client_id: userData.user.id,
            text,
            rating,
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

  const getPublishedTestimonials = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select(`
          *,
          client:profiles(
            full_name
          )
        `)
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createTestimonial,
    getPublishedTestimonials,
  };
}