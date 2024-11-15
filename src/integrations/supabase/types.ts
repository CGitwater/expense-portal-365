export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      expense_comments: {
        Row: {
          content: string
          created_at: string | null
          expense_id: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          expense_id?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          expense_id?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_comments_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expense_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "expense_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      expense_requests: {
        Row: {
          amount: number
          budget_code: string | null
          client_name: string | null
          created_at: string | null
          date_required: string | null
          date_submitted: string | null
          department: string | null
          expense_type: string | null
          id: string
          payment_type: string | null
          project_ticket: string | null
          reason: string | null
          receipt_urls: string[] | null
          status: Database["public"]["Enums"]["expense_status"] | null
          transaction_date: string | null
          type: Database["public"]["Enums"]["expense_type"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          budget_code?: string | null
          client_name?: string | null
          created_at?: string | null
          date_required?: string | null
          date_submitted?: string | null
          department?: string | null
          expense_type?: string | null
          id?: string
          payment_type?: string | null
          project_ticket?: string | null
          reason?: string | null
          receipt_urls?: string[] | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          transaction_date?: string | null
          type: Database["public"]["Enums"]["expense_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          budget_code?: string | null
          client_name?: string | null
          created_at?: string | null
          date_required?: string | null
          date_submitted?: string | null
          department?: string | null
          expense_type?: string | null
          id?: string
          payment_type?: string | null
          project_ticket?: string | null
          reason?: string | null
          receipt_urls?: string[] | null
          status?: Database["public"]["Enums"]["expense_status"] | null
          transaction_date?: string | null
          type?: Database["public"]["Enums"]["expense_type"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "expense_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          created_at: string | null
          form_data: Json
          form_id: string
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          form_data: Json
          form_id: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          form_data?: Json
          form_id?: string
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "form_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      mileage_claims: {
        Row: {
          created_at: string | null
          expense_id: string | null
          from_postcode: string
          id: string
          journey_type: string
          rate: number
          single_journey_miles: number
          ticket_number: string | null
          to_postcode: string
          total_amount: number
          total_miles: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          expense_id?: string | null
          from_postcode: string
          id?: string
          journey_type: string
          rate: number
          single_journey_miles: number
          ticket_number?: string | null
          to_postcode: string
          total_amount: number
          total_miles: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          expense_id?: string | null
          from_postcode?: string
          id?: string
          journey_type?: string
          rate?: number
          single_journey_miles?: number
          ticket_number?: string | null
          to_postcode?: string
          total_amount?: number
          total_miles?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "mileage_claims_expense_id_fkey"
            columns: ["expense_id"]
            isOneToOne: false
            referencedRelation: "expense_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          can_create_forms: boolean | null
          can_manage_users: boolean | null
          created_at: string | null
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          can_create_forms?: boolean | null
          can_manage_users?: boolean | null
          created_at?: string | null
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          can_create_forms?: boolean | null
          can_manage_users?: boolean | null
          created_at?: string | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_hash: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_hash: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_hash?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      expense_status: "draft" | "pending" | "approved" | "declined"
      expense_type: "mileage" | "prepaid" | "general"
      user_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
