import {useState} from "react";
import {useForm} from "react-hook-form";
import {
  TextField,
  Box, Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";

export interface Inputs {
  currentDate: Date;
  endDate: Date;
}

export type ChangeDateFormProps = {
  handleFormClose: () => void;
  isAgenda: boolean;
  length: number;
  currentDay: Date;
  handleDateSubmit:(newLength: number, newCurrentDay: Date) => void;
};

type DateError = {
  endDate: string | null;
};

export const ChangeDateForm = ({
                                 handleFormClose,
                                 isAgenda,
                                 length,
                                 currentDay,
                                 handleDateSubmit
                               }: ChangeDateFormProps): JSX.Element => {
  const [currentDate, setCurrentDate] = useState<Date>(currentDay);
  let auxDate=new Date();
  auxDate.setDate(currentDay.getDate()+length);
  const [endDate, setEndDate] = useState<Date>(auxDate);
  const {handleSubmit, reset} = useForm<Inputs>();
  const [dateError, setDateError] = useState<DateError>({
    endDate: null,
  });

  const onSubmit = async () => {
    if(isAgenda) {
      const dateError =
        endDate < currentDate ? "Start date must be before end date" : null;

      setDateError({
        endDate: dateError,
      });

      if (dateError) {
        return;
      }
      let difference = endDate.getTime() - currentDate.getTime();
      let nrDays = Math.ceil(difference / (1000 * 3600 * 24)) - 1;
      handleDateSubmit(nrDays, currentDate);
    }else{
      let auxEndDate=new Date();
      auxEndDate.setDate(currentDate.getDate()+length);
      setEndDate(auxEndDate);
      handleDateSubmit(length, currentDate);
    }
    reset();
    handleFormClose();
  };

  let label1= isAgenda? "Start Date" : "";

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="30px"
          sx={{marginTop:3}}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={label1}
              inputFormat="MM/DD/YYYY"
              value={currentDate}
              onChange={(date: any) => {
                if (date != undefined) {
                  setCurrentDate(new Date(date!));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} style={{ width: 400 }} />
              )}
            />
            {isAgenda && (<DatePicker
              label="End Date"
              inputFormat="MM/DD/YYYY"
              value={endDate}
              onChange={(date) => {
                if (date != undefined) {
                  setEndDate(new Date(date!));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} style={{ width: 400 }} />
              )}
            />)
            }
            {dateError.endDate !== null && (
              <Typography color="red" alignSelf="start">
                {dateError.endDate}
              </Typography>
            )}
          </LocalizationProvider>
          <Button
            variant="contained"
            type="submit"
            sx={{width: "25%", textDecoration: "none"}}
          >
            {"Apply"}
          </Button>
        </Box>
      </form>
    </>
  );
};
