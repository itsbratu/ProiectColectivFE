import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import { AddEventPayload, Event } from "../../models/event";
import { EVENTS_KEY } from "../constants";
import eventsService from "../services/eventsService";

type AddEventMutationPayload = {
  createPayload: AddEventPayload;
};

export const useAddEvent = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<Event, AxiosError, AddEventMutationPayload>(
    ({ createPayload }) => eventsService.addEvent(createPayload),
    {
      onSuccess: () => queryClient.invalidateQueries(EVENTS_KEY),
    }
  );

  return { mutate };
};
