import {useQuery} from "react-query";
import {Tag} from "../../models/tag";
import {TAGS_KEY} from "../constants";
import TagsService from "../services/TagsService";

export const useTags = (token: string) => {
  const {
    data: tags,
    isLoading,
    isError,
  } = useQuery<Tag[]>([TAGS_KEY], () => TagsService.getTags(token));

  return { tags, isLoading, isError };
};
