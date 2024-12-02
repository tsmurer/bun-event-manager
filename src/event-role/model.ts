import type { User } from "../user/model";

export interface EventRole {
    id: string,
    event: Event,
    user: User,
    role: EventUserRole
}


export enum EventUserRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    PARTICIPANT = 'participant',
    INVITED = 'invited'
}
  