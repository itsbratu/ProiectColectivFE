import {AxiosError} from "axios";
import {useMutation} from "react-query";
import {Event} from "../../models/event";
import {EVENTS_KEY} from "../constants";
import {queryClient} from "../queryClient";
import eventsService from "../services/eventsService";

type useDeleteEventProps = {
  id: string;
};

export const useDeleteEvent = (token: string) => {
  const { mutate } = useMutation<Event, AxiosError, useDeleteEventProps>(
    ({ id }) => eventsService.deleteEvent(id, token),
    {
      onSuccess: () => queryClient.invalidateQueries([EVENTS_KEY]),
    }
  );

  return { mutate };
};
