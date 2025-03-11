import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

type Appointment = Database['public']['Tables']['appointments']['Row'];

export function useAppointments() {
  const [loading, setLoading] = useState(false);

  const createAppointment = async (
    lawyerId: string,
    appointmentType: 'online' | 'home' | 'office',
    scheduledAt: string,
    notes?: string
  ) => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            client_id: userData.user.id,
            lawyer_id: lawyerId,
            appointment_type: appointmentType,
            scheduled_at: scheduledAt,
            notes,
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

  const getAppointments = async () => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          lawyer:lawyers(
            id,
            specialization,
            hourly_rate
          ),
          client:profiles(
            id,
            full_name,
            email
          )
        `)
        .or(`client_id.eq.${userData.user.id},lawyer_id.eq.${userData.user.id}`)
        .order('scheduled_at', { ascending: true });

      if (error) throw error;
      return data;
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (
    appointmentId: string,
    status: Appointment['status']
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status })
        .eq('id', appointmentId)
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
    createAppointment,
    getAppointments,
    updateAppointmentStatus,
  };
}