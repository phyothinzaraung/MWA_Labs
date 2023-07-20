export interface Course {
  _id: string;
  code: string;
  title: string;
  created_by: {
    user_id: string;
    fullname: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}