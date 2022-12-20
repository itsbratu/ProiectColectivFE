import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import TagsService from "../services/TagsService";
import {Tag, UpdateTagPayload} from "../../models/tag";
import {EVENTS_KEY, TAGS_KEY} from "../constants";

type EditTagMutationPayload = {
  updatePayload: UpdateTagPayload;
};

export const useEditTag = (token: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<Tag, AxiosError, EditTagMutationPayload>(
    ({ updatePayload }) => TagsService.editTag(updatePayload, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(TAGS_KEY);
        queryClient.invalidateQueries(EVENTS_KEY);
      }
    }
  );

  return { mutate };
};
