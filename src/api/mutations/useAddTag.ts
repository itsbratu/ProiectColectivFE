import {AxiosError} from "axios";
import {useMutation, useQueryClient} from "react-query";
import {EVENTS_KEY, TAGS_KEY} from "../constants";
import {AddTagPayload, Tag} from "../../models/tag";
import tagsService from "../services/TagsService";

type AddTagMutationPayload = {
  createPayload: AddTagPayload;
};

export const useAddTag = (token: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation<Tag, AxiosError, AddTagMutationPayload>(
    ({ createPayload }) => tagsService.addTag(createPayload, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TAGS_KEY]);
        queryClient.invalidateQueries([EVENTS_KEY]);
      }
    }
  );

  return { mutate };
};
