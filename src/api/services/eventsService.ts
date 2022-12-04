import { AddEventPayload, Event } from "../../models/event";
import http from "./common";

class EventsService {
  async getEvents(): Promise<Event[]> {
    const result = await http.get<Event[]>("/events");
    console.log(result);
    
    return result.data;
  }

  async addEvent(payload: AddEventPayload): Promise<Event> {
    const result = await http.post<Event>("/events", JSON.stringify(payload));
    return result.data;
  }

  async editEvent(payload: Event): Promise<Event> {
    const result = await http.put<Event>(
      `/events/${payload.id}`,
      JSON.stringify(payload)
    );
    return result.data;
  }

  async deleteEvent(eventId: string): Promise<Event> {
    const result = await http.delete<Event>(`/events/${eventId}`);
    return result.data;
  }
}

export default new EventsService();
