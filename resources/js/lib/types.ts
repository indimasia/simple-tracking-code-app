export interface Script {
  id: number;
  user_id: number;
  name: string;
  script: string;
  is_success: boolean;
  created_at: Date;
  updated_at: Date;
}