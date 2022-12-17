export type Tag = {
    id: string;
    name: string;
    colorCode: string;
  };
  

  export type AddTagPayload = Omit<Tag, "id">;
 