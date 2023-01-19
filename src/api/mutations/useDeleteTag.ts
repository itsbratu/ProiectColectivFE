import {AxiosError} from "axios";
import {useMutation} from "react-query";
import {queryClient} from "../queryClient";
import {Tag} from "../../models/tag";
import {EVENTS_KEY, TAGS_KEY} from "../constants";
import tagsService from "../services/TagsService";

type useDeleteTagProps = {
  id: string;
};

export const useDeleteTag = (token: string) => {
  const { mutate } = useMutation<Tag, AxiosError, useDeleteTagProps>(
    ({ id }) => tagsService.deleteTag(id, token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([TAGS_KEY]);
        queryClient.invalidateQueries([EVENTS_KEY]);
      }
    }
  );

  return { mutate };
};
