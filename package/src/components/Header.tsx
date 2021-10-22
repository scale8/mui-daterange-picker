import {Grid, IconButton, MenuItem, Select} from '@mui/material';
import React from 'react';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import {getMonth, getYear, setMonth, setYear} from 'date-fns';

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}: HeaderProps) => {
  const handleMonthChange = (event: any) => {
    setDate(setMonth(date, parseInt(event.target.value)));
  };

  const handleYearChange = (event: any) => {
    setDate(setYear(date, parseInt(event.target.value)));
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={prevDisabled}
          onClick={onClickPrevious}
          size="large">
          <ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
      <Grid item>
        <Select
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
        >
          {MONTHS.map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>

      <Grid item>
        <Select
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date, 30).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>

        {/* <Typography>{format(date, "MMMM YYYY")}</Typography> */}
      </Grid>
      <Grid item sx={{ padding: '5px' }}>
        <IconButton
          sx={{
            padding: '10px',
            '&:hover': {
              background: 'none',
            },
          }}
          disabled={nextDisabled}
          onClick={onClickNext}
          size="large">
          <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Header;
