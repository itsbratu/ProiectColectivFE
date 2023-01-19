import {useQuery} from "react-query";
import {Event} from "../../models/event";
import {EVENTS_KEY} from "../constants";
import eventsService from "../services/eventsService";

export const useEvents = (token: string) => {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery<Event[]>([EVENTS_KEY], () => eventsService.getEvents(token));

  return { events, isLoading, isError };
};
