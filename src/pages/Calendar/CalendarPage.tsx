import {Box, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LabelIcon from '@mui/icons-material/Label';
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "../../models/event";
import { useEvents } from "../../api/queries/useEvents";
import "./CalendarStyle.css";
import { AddEditEventModal } from "./components/AddEditEventModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTags } from "../../api/queries/useTags";
import LogoutIcon from "@mui/icons-material/Logout";
import { USER_STORAGE_KEY } from "../../api/constants";
import { getMixedColor, rgbToHex } from "../../helpers/colorsConvert";
import {TagsModal} from "./components/TagsModal";

const localizer = momentLocalizer(moment);

export type CalendarPageProps = {
  token: string;
  setToken: (token: string | null) => void;
};

const CalendarPage = ({ token, setToken }: CalendarPageProps) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [editModeFlag, setEditModeFlag] = useState<boolean>(true);
  const { events } = useEvents(token);
  const { tags } = useTags(token);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | undefined>();
  const [openTagsModal, setOpenTagsModal] = useState<boolean>(false);


  const eventStyleGetter = (
    event: Event,
    start: Date,
    end: Date,
    isSelected: boolean
  ) => {
    var backgroundColor = "";
    if (event.tags.length === 0) {
      backgroundColor = "#87CEFA";
    } else if (event.tags.length === 1) {
      backgroundColor = `#${event.tags[0].colorCode}`;
    } else {
      const mixedColorRGB = getMixedColor(
        event.tags
          .sort((tagOne, tagTwo) =>
            tagOne.colorCode < tagTwo.colorCode ? 1 : -1
          )
          .map((event) => event.colorCode)
      );
      backgroundColor = rgbToHex(
        mixedColorRGB[0],
        mixedColorRGB[1],
        mixedColorRGB[2]
      );
    }
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  const handleSnackbarOpen = (message: string) => {
    setOpenSnackbar(true);
    setSnackbarMessage(message);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="startDate"
        endAccessor="endDate"
        style={{
          height: "80vh",
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={(event) => {
          setCurrentEvent(event);
          setEditModeFlag(true);
          setOpenModal(true);
        }}
      />
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          width: "75px",
          height: "75px",
          bottom: "20px",
          right: "20px",
          borderRadius: "45px",
          background: "#31b3ce",
          "&:hover": {
            background: "#31b3ce",
          },
        }}
        onClick={() => {
          localStorage.removeItem(USER_STORAGE_KEY);
          setToken(null);
        }}
      >
        <LogoutIcon sx={{ fontSize: 40 }} />
      </Button>
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          width: "75px",
          height: "75px",
          bottom: "20px",
          right: "110px",
          borderRadius: "45px",
          background: "#31b3ce",
          "&:hover": {
            background: "#31b3ce",
          },
        }}
        onClick={() => {
          setOpenModal(true);
          setEditModeFlag(false);
        }}
      >
        <AddIcon sx={{ fontSize: 40 }} />
      </Button>
      <Button
          variant="contained"
          sx={{
              position: "fixed",
              width: "75px",
              height: "75px",
              bottom: "20px",
              right: "200px",
              borderRadius: "45px",
              background: "#31b3ce",
              "&:hover": {
                  background: "#31b3ce",
              },
          }}
          onClick={() => {
              setOpenTagsModal(true);
          }}
      >
        <LabelIcon sx={{ fontSize: 40 }} />
      </Button>

      <AddEditEventModal
        event={currentEvent}
        editMode={editModeFlag}
        open={openModal}
        handleClose={() => {
          setOpenModal(false);
          setEditModeFlag(true);
          setCurrentEvent(undefined);
        }}
        resetCurrentEvent={() => setCurrentEvent(undefined)}
        resetEditMode={() => setEditModeFlag(true)}
        openSnackbar={(snackbarMessage: string) =>
          handleSnackbarOpen(snackbarMessage)
        }
        token={token}
        user_tags_ids={tags ?? []}
      />
      <TagsModal
        open={openTagsModal}
        handleClose={() => {
          setOpenTagsModal(false);
        }}
        openSnackbar={(snackbarMessage: string) =>
          handleSnackbarOpen(snackbarMessage)
        }
        token={token}
        tags={tags ?? []}
      />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CalendarPage;
