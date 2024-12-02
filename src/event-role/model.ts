<<<<<<< Updated upstream
import type { Event } from "../events/model";
=======
>>>>>>> Stashed changes
import type { User } from "../user/model";

export interface EventRole {
    id: string,
    event: Event,
    user: User,
<<<<<<< Updated upstream
    participantStatus: EventParticipantStatus,
    role: EventUserRole
}

export enum EventParticipantStatus {
    INVITED = 'invited',
    ACCEPTED = 'accepted',
    DECLINED = 'declined',
    MAYBE = 'maybe'
}
  
=======
    role: EventUserRole
}

>>>>>>> Stashed changes

export enum EventUserRole {
    OWNER = 'owner',
    ADMIN = 'admin',
    PARTICIPANT = 'participant',
    INVITED = 'invited'
}
  