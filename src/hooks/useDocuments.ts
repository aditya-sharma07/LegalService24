import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Document = Database['public']['Tables']['documents']['Row'];

export function useDocuments() {
  const [loading, setLoading] = useState(false);

  const createDocument = async (
    title: string,
    documentType: string,
    description?: string
  ) => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('documents')
        .insert([
          {
            owner_id: userData.user.id,
            title,
            document_type: documentType,
            description,
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

  const getDocuments = async () => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('documents')
        .select()
        .eq('owner_id', userData.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateDocumentStatus = async (
    documentId: string,
    status: Document['status']
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('documents')
        .update({ status })
        .eq('id', documentId)
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
    createDocument,
    getDocuments,
    updateDocumentStatus,
  };
}