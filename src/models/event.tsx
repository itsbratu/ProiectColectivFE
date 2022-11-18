export type Event = {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
};

export type AddEventPayload = Omit<Event, "id">;
