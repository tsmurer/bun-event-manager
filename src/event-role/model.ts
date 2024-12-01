import type { Event } from "../events/model";
import type { User } from "../user/model";

export interface EventRole {
    id: string,
    event: Event,
    user: User,
    participantStatus: EventParticipantStatus,
    role: EventUserRole
}

export enum EventParticipantStatus {
    INVITED = 'invited',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    MAYBE = 'maybe'
}
  

export enum EventUserRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    PARTICIPANT = 'participant',
    INVITED = 'invited'
}
  