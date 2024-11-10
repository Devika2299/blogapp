// src/app/models/user.model.ts

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    isFollowed?: boolean; // Optional, used for tracking follow status
  }
  