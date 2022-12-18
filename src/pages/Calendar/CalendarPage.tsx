import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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

const localizer = momentLocalizer(moment);

export type CalendarPageProps = {
    token: string;
};

const CalendarPage = ({ token }: CalendarPageProps) => {
    const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string>("");
    const [editModeFlag, setEditModeFlag] = useState<boolean>(true);
    const { events } = useEvents(token);
    const { tags } = useTags(token)
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<Event | undefined>();

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
                    setOpenModal(true);
                    setEditModeFlag(false);
                }}
            >
                <AddIcon sx={{ fontSize: 60 }} />
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
