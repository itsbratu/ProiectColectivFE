import {AddTagPayload, Tag, UpdateTagPayload} from "../../models/tag";
import http from "./common";

class TagsService {
  async getTags(token: string): Promise<Tag[]> {
    const result = await http.get<Tag[]>("/tags", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  }

  async addTag(payload: AddTagPayload, token: string): Promise<Tag> {
    const result = await http.post<Tag>("/tags", JSON.stringify(payload), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  }

  async editTag(payload: UpdateTagPayload, token: string): Promise<Tag> {
    const result = await http.put<Tag>(
      `/tags/${payload.id}`,
      JSON.stringify(payload),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  }

  async deleteTag(tagId: string, token: string): Promise<Tag> {
    const result = await http.delete<Tag>(`/tags/${tagId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  }
}

export default new TagsService();
