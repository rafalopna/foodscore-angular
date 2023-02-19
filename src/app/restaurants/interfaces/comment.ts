import { User } from "src/app/auth/interfaces/user";

export interface CommentRest {
  id?: number;
  stars: number;
  text: string;
  date?: Date;
  user?: User;
}
