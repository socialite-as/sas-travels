export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blogs: {
        Row: {
          archived: boolean
          author_id: string | null
          category_id: string | null
          content: string | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published: boolean
          published_at: string | null
          slug: string
          tags: Json
          title: string
          updated_at: string
        }
        Insert: {
          archived?: boolean
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug: string
          tags?: Json
          title: string
          updated_at?: string
        }
        Update: {
          archived?: boolean
          author_id?: string | null
          category_id?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          slug?: string
          tags?: Json
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blogs_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          archived: boolean
          contact_email: string | null
          contact_name: string | null
          contact_phone: string | null
          coupon_id: string | null
          created_at: string
          currency: string
          end_date: string | null
          id: string
          notes: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["booking_status"]
          total_amount: number
          tour_id: string | null
          travellers: number
          updated_at: string
          user_id: string
        }
        Insert: {
          archived?: boolean
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          coupon_id?: string | null
          created_at?: string
          currency?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          tour_id?: string | null
          travellers?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          archived?: boolean
          contact_email?: string | null
          contact_name?: string | null
          contact_phone?: string | null
          coupon_id?: string | null
          created_at?: string
          currency?: string
          end_date?: string | null
          id?: string
          notes?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["booking_status"]
          total_amount?: number
          tour_id?: string | null
          travellers?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          archived: boolean
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          type: Database["public"]["Enums"]["category_type"]
          updated_at: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          type?: Database["public"]["Enums"]["category_type"]
          updated_at?: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          type?: Database["public"]["Enums"]["category_type"]
          updated_at?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          archived: boolean
          country_id: string | null
          created_at: string
          description: string | null
          id: string
          image_url: string | null
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          archived?: boolean
          country_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          archived?: boolean
          country_id?: string | null
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string | null
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      countries: {
        Row: {
          archived: boolean
          code: string | null
          created_at: string
          description: string | null
          featured: boolean
          hero_image: string | null
          id: string
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          archived?: boolean
          code?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          hero_image?: string | null
          id?: string
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          archived?: boolean
          code?: string | null
          created_at?: string
          description?: string | null
          featured?: boolean
          hero_image?: string | null
          id?: string
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      coupons: {
        Row: {
          active: boolean
          archived: boolean
          code: string
          created_at: string
          description: string | null
          discount_type: Database["public"]["Enums"]["coupon_type"]
          discount_value: number
          id: string
          max_uses: number | null
          updated_at: string
          used_count: number
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          active?: boolean
          archived?: boolean
          code: string
          created_at?: string
          description?: string | null
          discount_type?: Database["public"]["Enums"]["coupon_type"]
          discount_value?: number
          id?: string
          max_uses?: number | null
          updated_at?: string
          used_count?: number
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          active?: boolean
          archived?: boolean
          code?: string
          created_at?: string
          description?: string | null
          discount_type?: Database["public"]["Enums"]["coupon_type"]
          discount_value?: number
          id?: string
          max_uses?: number | null
          updated_at?: string
          used_count?: number
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      custom_itinerary_requests: {
        Row: {
          archived: boolean
          budget: number | null
          created_at: string
          currency: string
          destination: string | null
          email: string
          end_date: string | null
          full_name: string
          id: string
          interests: Json
          notes: string | null
          phone: string | null
          start_date: string | null
          status: Database["public"]["Enums"]["itinerary_status"]
          travellers: number
          updated_at: string
          user_id: string | null
        }
        Insert: {
          archived?: boolean
          budget?: number | null
          created_at?: string
          currency?: string
          destination?: string | null
          email: string
          end_date?: string | null
          full_name: string
          id?: string
          interests?: Json
          notes?: string | null
          phone?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["itinerary_status"]
          travellers?: number
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          archived?: boolean
          budget?: number | null
          created_at?: string
          currency?: string
          destination?: string | null
          email?: string
          end_date?: string | null
          full_name?: string
          id?: string
          interests?: Json
          notes?: string | null
          phone?: string | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["itinerary_status"]
          travellers?: number
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      gallery: {
        Row: {
          archived: boolean
          caption: string | null
          category_id: string | null
          created_at: string
          id: string
          image_url: string
          sort_order: number
          title: string | null
          tour_id: string | null
          updated_at: string
        }
        Insert: {
          archived?: boolean
          caption?: string | null
          category_id?: string | null
          created_at?: string
          id?: string
          image_url: string
          sort_order?: number
          title?: string | null
          tour_id?: string | null
          updated_at?: string
        }
        Update: {
          archived?: boolean
          caption?: string | null
          category_id?: string | null
          created_at?: string
          id?: string
          image_url?: string
          sort_order?: number
          title?: string | null
          tour_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "gallery_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          link: string | null
          message: string | null
          read: boolean
          title: string
          type: Database["public"]["Enums"]["notification_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string | null
          read?: boolean
          title: string
          type?: Database["public"]["Enums"]["notification_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          link?: string | null
          message?: string | null
          read?: boolean
          title?: string
          type?: Database["public"]["Enums"]["notification_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          archived: boolean
          booking_id: string
          created_at: string
          currency: string
          id: string
          metadata: Json
          paid_at: string | null
          provider: string | null
          provider_reference: string | null
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount?: number
          archived?: boolean
          booking_id: string
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json
          paid_at?: string | null
          provider?: string | null
          provider_reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          archived?: boolean
          booking_id?: string
          created_at?: string
          currency?: string
          id?: string
          metadata?: Json
          paid_at?: string | null
          provider?: string | null
          provider_reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          country: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          country?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          approved: boolean
          archived: boolean
          booking_id: string | null
          comment: string | null
          created_at: string
          id: string
          rating: number
          title: string | null
          tour_id: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          approved?: boolean
          archived?: boolean
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          rating: number
          title?: string | null
          tour_id?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          approved?: boolean
          archived?: boolean
          booking_id?: string | null
          comment?: string | null
          created_at?: string
          id?: string
          rating?: number
          title?: string | null
          tour_id?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          approved: boolean
          archived: boolean
          author_name: string
          author_role: string | null
          avatar_url: string | null
          content: string
          created_at: string
          id: string
          rating: number
          updated_at: string
        }
        Insert: {
          approved?: boolean
          archived?: boolean
          author_name: string
          author_role?: string | null
          avatar_url?: string | null
          content: string
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
        }
        Update: {
          approved?: boolean
          archived?: boolean
          author_name?: string
          author_role?: string | null
          avatar_url?: string | null
          content?: string
          created_at?: string
          id?: string
          rating?: number
          updated_at?: string
        }
        Relationships: []
      }
      tour_packages: {
        Row: {
          archived: boolean
          availability: Json | null
          cancellation_policy: string | null
          category_id: string | null
          cities: Json | null
          city_id: string | null
          country_id: string | null
          cover_image: string | null
          created_at: string
          currency: string
          description: string | null
          difficulty: string | null
          discount_price: number | null
          duration_days: number
          duration_nights: number
          exclusions: Json
          faqs: Json | null
          featured: boolean
          flights: Json | null
          highlights: Json | null
          hotels: Json | null
          id: string
          images: Json
          inclusions: Json
          is_domestic: boolean
          itinerary: Json
          map_lat: number | null
          map_lng: number | null
          map_zoom: number | null
          max_group_size: number | null
          meals: Json | null
          meta_description: string | null
          meta_title: string | null
          price: number
          slug: string
          summary: string | null
          title: string
          transportation: Json | null
          updated_at: string
        }
        Insert: {
          archived?: boolean
          availability?: Json | null
          cancellation_policy?: string | null
          category_id?: string | null
          cities?: Json | null
          city_id?: string | null
          country_id?: string | null
          cover_image?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          difficulty?: string | null
          discount_price?: number | null
          duration_days?: number
          duration_nights?: number
          exclusions?: Json
          faqs?: Json | null
          featured?: boolean
          flights?: Json | null
          highlights?: Json | null
          hotels?: Json | null
          id?: string
          images?: Json
          inclusions?: Json
          is_domestic?: boolean
          itinerary?: Json
          map_lat?: number | null
          map_lng?: number | null
          map_zoom?: number | null
          max_group_size?: number | null
          meals?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          price?: number
          slug: string
          summary?: string | null
          title: string
          transportation?: Json | null
          updated_at?: string
        }
        Update: {
          archived?: boolean
          availability?: Json | null
          cancellation_policy?: string | null
          category_id?: string | null
          cities?: Json | null
          city_id?: string | null
          country_id?: string | null
          cover_image?: string | null
          created_at?: string
          currency?: string
          description?: string | null
          difficulty?: string | null
          discount_price?: number | null
          duration_days?: number
          duration_nights?: number
          exclusions?: Json
          faqs?: Json | null
          featured?: boolean
          flights?: Json | null
          highlights?: Json | null
          hotels?: Json | null
          id?: string
          images?: Json
          inclusions?: Json
          is_domestic?: boolean
          itinerary?: Json
          map_lat?: number | null
          map_lng?: number | null
          map_zoom?: number | null
          max_group_size?: number | null
          meals?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          price?: number
          slug?: string
          summary?: string | null
          title?: string
          transportation?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tour_packages_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_packages_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tour_packages_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_documents: {
        Row: {
          archived: boolean
          created_at: string
          document_type: string
          file_url: string
          id: string
          name: string
          notes: string | null
          status: Database["public"]["Enums"]["document_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          archived?: boolean
          created_at?: string
          document_type: string
          file_url: string
          id?: string
          name: string
          notes?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          archived?: boolean
          created_at?: string
          document_type?: string
          file_url?: string
          id?: string
          name?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["document_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wishlist: {
        Row: {
          created_at: string
          id: string
          tour_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tour_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tour_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tour_packages"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_editor_or_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "editor" | "user"
      booking_status:
        | "pending"
        | "confirmed"
        | "cancelled"
        | "completed"
        | "refunded"
      category_type: "tour" | "blog"
      coupon_type: "percentage" | "fixed"
      document_status: "pending" | "approved" | "rejected"
      itinerary_status:
        | "new"
        | "in_review"
        | "quoted"
        | "accepted"
        | "rejected"
        | "closed"
      notification_type: "info" | "success" | "warning" | "error"
      payment_status: "pending" | "paid" | "failed" | "refunded"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor", "user"],
      booking_status: [
        "pending",
        "confirmed",
        "cancelled",
        "completed",
        "refunded",
      ],
      category_type: ["tour", "blog"],
      coupon_type: ["percentage", "fixed"],
      document_status: ["pending", "approved", "rejected"],
      itinerary_status: [
        "new",
        "in_review",
        "quoted",
        "accepted",
        "rejected",
        "closed",
      ],
      notification_type: ["info", "success", "warning", "error"],
      payment_status: ["pending", "paid", "failed", "refunded"],
    },
  },
} as const
