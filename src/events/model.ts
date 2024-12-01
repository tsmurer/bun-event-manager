import type { User } from "../user/model";

export interface Event {
    id: number;
    eventName: string;
    startTime: Date;
    endTime: string;
    eventOwner: User;
    eventAdmins: User[];
    invitees: User[];
    
    createdAt: Date;
    updatedAt: Date;
  }

