import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { Event, UpdateEventPayload } from "../../models/event";
import { EVENTS_KEY } from "../constants";
import eventsService from "../services/eventsService";

type EditEventMutationPayload = {
  updatePayload: UpdateEventPayload;
};

export const useEditEvent = (token: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<Event, AxiosError, EditEventMutationPayload>(
    ({ updatePayload }) => eventsService.editEvent(updatePayload, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(EVENTS_KEY);
      },
    }
  );

  return { mutate };
};
