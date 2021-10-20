import React from 'react';
import {Box, Divider, Grid, Paper, Typography,} from '@mui/material';
import {differenceInCalendarMonths, format} from 'date-fns';
import ArrowRightAlt from '@mui/icons-material/ArrowRightAlt';
import Month from './Month';
import DefinedRanges from './DefinedRanges';
import {DateRange, DefinedRange, NavigationAction, Setter,} from '../types';
import {MARKERS} from './Markers';

interface MenuProps {
  dateRange: DateRange;
  ranges: DefinedRange[];
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  setDateRange: Setter<DateRange>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    ranges,
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    setDateRange,
    helpers,
    handlers,
  } = props;

  const { startDate, endDate } = dateRange;
  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };
  return (
    <Paper elevation={5} square>
      <Grid container direction="row" wrap="nowrap">
        <Grid>
          <Grid container style={{ padding: '20px 70px' }} alignItems="center">
            <Grid item style={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">
                {startDate ? format(startDate, 'MMMM DD, YYYY') : 'Start Date'}
              </Typography>
            </Grid>
            <Grid item style={{ flex: 1, textAlign: 'center' }}>
              <ArrowRightAlt color="action" />
            </Grid>
            <Grid item style={{ flex: 1, textAlign: 'center' }}>
              <Typography variant="subtitle1">
                {endDate ? format(endDate, 'MMMM DD, YYYY') : 'End Date'}
              </Typography>
            </Grid>
          </Grid>
          <Divider />
          <Grid container direction="row" justifyContent="center" wrap="nowrap">
            <Month
              {...commonProps}
              value={firstMonth}
              setValue={setFirstMonth}
              navState={[true, canNavigateCloser]}
              marker={MARKERS.FIRST_MONTH}
            />
            <Box style={{
              borderLeft: '1px solid',
              borderColor: 'action.hover',
              marginBottom: 20,
            }} />
            <Month
              {...commonProps}
              value={secondMonth}
              setValue={setSecondMonth}
              navState={[canNavigateCloser, true]}
              marker={MARKERS.SECOND_MONTH}
            />
          </Grid>
        </Grid>
        <Box style={{
          borderLeft: '1px solid',
          borderColor: 'action.hover',
          marginBottom: 20,
        }} />
        <Grid>
          <DefinedRanges
            selectedRange={dateRange}
            ranges={ranges}
            setRange={setDateRange}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Menu;
