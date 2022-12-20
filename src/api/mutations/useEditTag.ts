import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "react-query";
import TagsService from "../services/TagsService";
import {Tag, UpdateTagPayload} from "../../models/tag";
import {TAGS_KEY} from "../constants";

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
      },
    }
  );

  return { mutate };
};
