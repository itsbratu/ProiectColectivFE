import { AddEventPayload, Event, UpdateEventPayload } from "../../models/event";
import { FilterEventsPayload } from "../../models/tag";
import http from "./common";

class EventsService {
  async getEvents(token: string): Promise<Event[]> {
    const result = await http.get<Event[]>("/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return result.data;
  }

  async addEvent(payload: AddEventPayload, token: string): Promise<Event> {
    const result = await http.post<Event>("/events", JSON.stringify(payload), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  }

  async editEvent(payload: UpdateEventPayload, token: string): Promise<Event> {
    const result = await http.put<Event>(
      `/events/${payload.id}`,
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  }

  async deleteEvent(eventId: string, token: string): Promise<Event> {
    const result = await http.delete<Event>(`/events/${eventId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  }

  async filterEvents(
    payload: FilterEventsPayload,
    token: string
  ): Promise<Event[]> {
    const result = await http.post<Event[]>(
      "/filter-events",
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  }
}

export default new EventsService();
