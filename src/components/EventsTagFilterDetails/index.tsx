import {
  Box,
} from "@mui/material";
import Button from "@mui/material/Button";
import {Tag} from "../../models/tag";

export type EventsTagFilterDetailsProps = {
  allTags?: Tag[];
  selectedTags: string[];
  handleChangeSelectedTags: (newTags: string[]) => void;
};

export const EventsTagFilterDetails = ({
                                         allTags,
                                         selectedTags,
                                         handleChangeSelectedTags,
                                       }: EventsTagFilterDetailsProps): JSX.Element => {

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="3px"
      >
        {allTags?.map(tag =>
          <span>
            <Button
              onClick={() => {
                const tagIndex = selectedTags.indexOf(tag.id);
                let newTags=[...selectedTags]
                if (tagIndex == -1) {
                  newTags.push(tag.id)
                } else {
                  newTags.splice(tagIndex, 1);
                }
                handleChangeSelectedTags(newTags);
              }}
              style={{textTransform: 'none'}}
              sx={{
                width: "200px",
                height: "30px",
                backgroundColor: "#" + tag.colorCode,
                border: selectedTags.indexOf(tag.id) != -1 ? 3 : 0,
                borderColor: "black"
              }}
              variant="contained"
            >
              {tag.name}
            </Button>
          </span>
        )}
      </Box>
    </>
  );
};
