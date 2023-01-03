import {useState} from "react";
import {useForm} from "react-hook-form";
import {
  TextField,
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import {Tag} from "../../models/tag";
import {useAddTag} from "../../api/mutations/useAddTag";
import {useEditTag} from "../../api/mutations/useEditTag";
import { HexColorPicker } from "react-colorful";

export interface Inputs {
  name: string;
  colorCode: string;
}

export type AddEditTagFormProps = {
  handleFormClose: () => void;
  editMode: boolean;
  tag?: Tag;
  resetCurrentTag: () => void;
  resetEditMode: () => void;
  openSnackbar: (message: string) => void;
  token: string;
};

type TagError = {
  name: string | null;
};

export const AddEditTagForm = ({
                                 handleFormClose,
                                 editMode,
                                 tag,
                                 resetCurrentTag,
                                 resetEditMode,
                                 openSnackbar,
                                 token,
                               }: AddEditTagFormProps): JSX.Element => {
  const [name, setName] = useState<string>(tag ? tag.name : "");
  const [colorCode, setColorCode] = useState<string>(
    tag ? tag.colorCode : "05445E"
  );
  const {register, handleSubmit, reset} = useForm<Inputs>();
  const {mutate: addTag} = useAddTag(token);
  const {mutate: editTag} = useEditTag(token);
  const [tagError, setTagError] = useState<TagError>({
    name: null,
  });

  const onSubmit = async (data: Inputs) => {
    const nameError =
      name.length === 0
        ? "Name must not be empty"
        : name.length > 20
          ? "Name must be at most 20 characters long"
          : null;

    setTagError({
      name: nameError,
    });

    if (nameError) {
      return;
    }

    if (editMode) {
      editTag({
        updatePayload: {
          id: tag!.id!,
          name: name,
          colorCode: colorCode,
        },
      });
      openSnackbar("Tag successfully edited!");
      resetCurrentTag();
      resetEditMode();
    } else {
      addTag({
        createPayload: {
          name: name,
          colorCode: colorCode,
        },
      });
      openSnackbar("Tag successfully added!");
    }
    reset();
    handleFormClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="30px"
        >
          <TextField
            sx={{marginTop:3}}
            label={"Name"}
            {...register("name")}
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{width: 400}}
            error={tagError.name !== null}
            helperText={tagError.name}
          />
          <TextField
            label={"ColorCode"}
            {...register("colorCode")}
            id="colorCode"
            name="colorCode"
            value={colorCode}
            style={{width: 400}}
          />
          <HexColorPicker
            color={colorCode}
            onChange={(colorCodeHex)=> setColorCode(colorCodeHex.substring(1).toUpperCase())}
          >
          </HexColorPicker>
          <Button
            variant="contained"
            type="submit"
            sx={{width: "25%", textDecoration: "none"}}
          >
            {editMode ? "Edit" : "Add"}
          </Button>
        </Box>
      </form>
    </>
  );
};
