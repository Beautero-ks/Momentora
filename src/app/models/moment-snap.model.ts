import {User} from "./user.model";

export interface MomentSnap {
  id: string;
  title: string;
  description: string;
  createdDate: string; // ISO string
  authorId: string;
  author?: User; // JSON Server _expand will fill this
  imageUrl: string;
  likes: number;
  views: number;
  downloads: number;
  resolution: string;
  fileType: string;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
  publishedDate: string;
  tags?: string[];
  location?: string;
}
