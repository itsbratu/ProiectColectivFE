import { Tag } from "./tag";

export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  description: string;
  tags: Tag[];
};

export type AddEventPayload = Omit<Event, "id">;
