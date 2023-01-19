import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Event } from "../../models/event";
import "./CalendarStyle.css";
import { AddEditEventModal } from "./components/AddEditEventModal";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useTags } from "../../api/queries/useTags";
import LogoutIcon from "@mui/icons-material/Logout";
import FilterListIcon from "@mui/icons-material/FilterList";
import { USER_STORAGE_KEY } from "../../api/constants";
import { getMixedColor, rgbToHex } from "../../helpers/colorsConvert";
import { TagsModal } from "./components/TagsModal";
import { CalendarToday, LabelImportant } from "@mui/icons-material";
import { ChangeDateModal } from "./components/ChangeDateModal";
import { FilterEventsModal } from "./components/FilterEventsModal";
import { useFilterEvents } from "../../api/queries/useFilterEvents";

const localizer = momentLocalizer(moment);

export type CalendarPageProps = {
  token: string;
  setToken: (token: string | null) => void;
};

function getAfterDays(currentDate: Date, length: number): Date {
  let auxDay = new Date(currentDate);
  auxDay.setDate(currentDate.getDate() + length);
  return auxDay;
}

function getDaysInBetween(start: Date, end: Date): number {
  start.setUTCHours(0, 0, 0, 0);
  end.setUTCHours(0, 0, 0, 0);
  const timeDifference = end.getTime() - start.getTime();
  return timeDifference / (1000 * 3600 * 24);
}

const CalendarPage = ({ token, setToken }: CalendarPageProps) => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const [currentEvent, setCurrentEvent] = useState<Event | undefined>();
  const [eventEditModeFlag, setEventEditModeFlag] = useState<boolean>(true);
  const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { events } = useFilterEvents(selectedTags,token);

  const { tags } = useTags(token);
  const [openTagsModal, setOpenTagsModal] = useState<boolean>(false);

  const [openDateModal, setOpenDateModal] = useState<boolean>(false);
  const [isAgenda, setIsAgenda] = useState<boolean>(false);
  const [currentDay, setCurrentDay] = useState<Date>(new Date());
  const [length, setLength] = useState(30);
  const [endDay, setEndDay] = useState<Date>(getAfterDays(currentDay, length));

  const [openFilterModal, setOpenFilterModal] = useState<boolean>(false);

  const eventStyleGetter = (event: Event) => {
    let backgroundColor: string;
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
    const style = {
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
          setEventEditModeFlag(true);
          setOpenAddEditModal(true);
        }}
        onNavigate={(newDate) => {
          setCurrentDay(newDate);
          setEndDay(getAfterDays(newDate, length));
        }}
        onView={(newView) => setIsAgenda(newView === "agenda")}
        date={currentDay}
        length={length}
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
          setOpenTagsModal(true);
        }}
      >
        <LabelImportant sx={{ fontSize: 40 }} />
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
          setOpenDateModal(true);
        }}
      >
        <CalendarToday sx={{ fontSize: 40 }} />
      </Button>
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          width: "75px",
          height: "75px",
          bottom: "20px",
          right: "290px",
          borderRadius: "45px",
          background: "#31b3ce",
          "&:hover": {
            background: "#31b3ce",
          },
        }}
        onClick={() => {
          setOpenFilterModal(true);
        }}
      >
        <FilterListIcon sx={{ fontSize: 40 }} />
      </Button>
      <Button
        variant="contained"
        sx={{
          position: "fixed",
          width: "75px",
          height: "75px",
          bottom: "20px",
          right: "380px",
          borderRadius: "45px",
          background: "#31b3ce",
          "&:hover": {
            background: "#31b3ce",
          },
        }}
        onClick={() => {
          setEventEditModeFlag(false);
          setOpenAddEditModal(true);
        }}
      >
        <AddIcon sx={{ fontSize: 40 }} />
      </Button>

      <AddEditEventModal
        event={currentEvent}
        editMode={eventEditModeFlag}
        open={openAddEditModal}
        handleClose={() => {
          setOpenAddEditModal(false);
          setCurrentEvent(undefined);
        }}
        resetCurrentEvent={() => setCurrentEvent(undefined)}
        resetEditMode={() => setEventEditModeFlag(true)}
        openSnackbar={(snackbarMessage: string) =>
          handleSnackbarOpen(snackbarMessage)
        }
        token={token}
        user_tags_ids={tags ?? []}
        defaultDate={currentDay}
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
      <ChangeDateModal
        open={openDateModal}
        isAgenda={isAgenda}
        handleClose={() => {
          setOpenDateModal(false);
        }}
        endDay={endDay}
        currentDay={currentDay}
        handleSubmit={(newEndDay: Date | null, newCurrentDay: Date) => {
          setCurrentDay(newCurrentDay);
          if (newEndDay == null) {
            setEndDay(getAfterDays(newCurrentDay, length));
          } else {
            setEndDay(newEndDay);
            setLength(getDaysInBetween(newCurrentDay, newEndDay));
          }
        }}
      />
      <FilterEventsModal
        open={openFilterModal}
        handleClose={() => {
          setOpenFilterModal(false);
        }}
        selectedTags={selectedTags}
        allTags={tags}
        handleChangeSelectedTags={(tagsIds: string[]) => {
          setSelectedTags(tagsIds);
        }}
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
