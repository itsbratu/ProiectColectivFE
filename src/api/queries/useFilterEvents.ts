import {useQuery} from "react-query";
import {EVENTS_KEY} from "../constants";
import eventsService from "../services/eventsService";
import {Event} from "../../models/event";

export const useFilterEvents = (tagsIds: string[], token: string) => {
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery<Event[]>([EVENTS_KEY, tagsIds], () => eventsService.filterEvents({tagsIds}, token));

  return {events, isLoading, isError};
};
