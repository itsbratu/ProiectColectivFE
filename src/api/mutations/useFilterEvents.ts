import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { EVENTS_KEY } from "../constants";
import { FilterEventsPayload } from "../../models/tag";
import eventsService from "../services/eventsService";
import { Event } from "../../models/event";

type FilterEventsMutationPayload = {
  filterPayload: FilterEventsPayload;
};

export const useFilterEvents = (token: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    Event[],
    AxiosError,
    FilterEventsMutationPayload
  >(({ filterPayload }) => eventsService.filterEvents(filterPayload, token), {
    onSuccess: () => {
      queryClient.invalidateQueries(EVENTS_KEY);
    },
  });

  return { mutate };
};
