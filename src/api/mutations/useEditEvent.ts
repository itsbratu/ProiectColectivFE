import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Event } from "../../models/event";
import { EVENTS_KEY } from "../constants";
import eventsService from "../services/eventsService";

type EditEventMutationPayload = {
  updatePayload: Event;
};

export const useEditEvent = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<Event, AxiosError, EditEventMutationPayload>(
    ({ updatePayload }) => eventsService.editEvent(updatePayload),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(EVENTS_KEY);
      },
    }
  );

  return { mutate };
};
