import {
  Dialog,
  Box,
  DialogTitle,
  Typography,
  DialogContent,
} from "@mui/material";
import {AddCircleOutline, DeleteOutline} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {Tag} from "../../../../models/tag";
import {TagsMasterDetails} from "../../../../components/TagsMasterDetails";
import {AddEditTagModal} from "../AddEditTagModal";
import {useState} from "react";

export type TagsModalProps = {
  open: boolean;
  handleClose: () => void;
  openSnackbar: (message: string) => void;
  token: string;
  tags: Tag[];
};

export const TagsModal = ({
                            open,
                            handleClose,
                            openSnackbar,
                            token,
                            tags,
                          }: TagsModalProps): JSX.Element => {

  const [currentTag, setCurrentTag] = useState<Tag | undefined>();
  const [editModeFlag, setEditModeFlag] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);


  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "600px",
            maxHeight: "900px",
          },
        }}
        open={open}
        onClose={handleClose}
        aria-labelledby="tagsModalLabel"
        aria-describedby="tagsModalDescription"
      >
        <DialogTitle align="center">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              sx={{fontSize: "28px", marginLeft: "0px"}}
            >
              {"Your Tags"}
            </Typography>
            <IconButton
              onClick={() => {
                setOpenModal(true);
                setEditModeFlag(false);
              }}
              sx={{
                width: "10px",
                height: "30px",
                marginLeft: "20px",
              }}
            >
              <AddCircleOutline sx={{fontSize: 30, color: "green"}}/>
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{marginBottom: "35px"}}>
          <TagsMasterDetails
            handleFormOpen={(tag)=>{
              setCurrentTag(tag);
              setEditModeFlag(true);
              setOpenModal(true);
            }}
            openSnackbar={openSnackbar}
            token={token}
            tags={tags}
          />
        </DialogContent>
      </Dialog>
      <AddEditTagModal
        tag={currentTag}
        editMode={editModeFlag}
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setCurrentTag(undefined);
        }}
        resetCurrentTag={() => setCurrentTag(undefined)}
        resetEditMode={() => setEditModeFlag(true)}
        openSnackbar={openSnackbar}
        token={token}
      ></AddEditTagModal>
    </>
  );
};
