export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name: string
          email: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      lawyers: {
        Row: {
          id: string
          specialization: string
          hourly_rate: number
          bio: string | null
          years_of_experience: number
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          specialization: string
          hourly_rate: number
          bio?: string | null
          years_of_experience?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          specialization?: string
          hourly_rate?: number
          bio?: string | null
          years_of_experience?: number
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          client_id: string
          lawyer_id: string
          appointment_type: 'online' | 'home' | 'office'
          status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          scheduled_at: string
          duration_minutes: number
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          lawyer_id: string
          appointment_type: 'online' | 'home' | 'office'
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          scheduled_at: string
          duration_minutes?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          lawyer_id?: string
          appointment_type?: 'online' | 'home' | 'office'
          status?: 'pending' | 'confirmed' | 'cancelled' | 'completed'
          scheduled_at?: string
          duration_minutes?: number
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          author_id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          status: 'draft' | 'published'
          category: string
          image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          author_id: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          status?: 'draft' | 'published'
          category: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          author_id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          status?: 'draft' | 'published'
          category?: string
          image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      article_tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
      }
      article_to_tags: {
        Row: {
          article_id: string
          tag_id: string
        }
        Insert: {
          article_id: string
          tag_id: string
        }
        Update: {
          article_id?: string
          tag_id?: string
        }
      }
      documents: {
        Row: {
          id: string
          owner_id: string
          title: string
          description: string | null
          document_type: string
          status: 'draft' | 'under_review' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          title: string
          description?: string | null
          document_type: string
          status?: 'draft' | 'under_review' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          title?: string
          description?: string | null
          document_type?: string
          status?: 'draft' | 'under_review' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_id: string
          text: string
          rating: number
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          text: string
          rating: number
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          text?: string
          rating?: number
          is_published?: boolean
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          message: string
          status: 'unread' | 'read' | 'responded'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          message: string
          status?: 'unread' | 'read' | 'responded'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          message?: string
          status?: 'unread' | 'read' | 'responded'
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}