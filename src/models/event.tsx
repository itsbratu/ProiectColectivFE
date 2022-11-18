export type Event = {
    id: string;
    title: string;
    startDate: Date;
    endDate: Date;
    allDay: boolean;
    description: string;
};

export type AddEventPayload = Omit<Event, "id">;
