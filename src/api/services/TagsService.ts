import { Tag } from "../../models/tag";
import http from "./common";

class TagsService {
  async getTags(token: string): Promise<Tag[]> {
    const result = await http.get<Tag[]>("/tags", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(result);

    return result.data;
  }
}

export default new TagsService();
