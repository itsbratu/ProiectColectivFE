import { Tag } from "./tag";

export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  description: string;
  tags: Tag[]; //should be name tagsIds to match BE call/ if rename tags dont work ??
};

export type AddEventPayload = Omit<Event, "id">;
