export type Tag = {
  id: string;
  name: string;
  colorCode: string;
};

export type UpdateTagPayload = Tag;

export type AddTagPayload = Omit<Tag, "id">;

export type FilterEventsPayload = {
  tagsIds: string[];
};
