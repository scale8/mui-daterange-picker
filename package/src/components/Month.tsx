import * as React from 'react';
import {Grid, Paper, Typography} from '@mui/material';
import {format, getDate, isSameMonth, isToday, isWithinRange,} from 'date-fns';
import {chunks, getDaysInMonth, inDateRange, isEndOfRange, isRangeSameDay, isStartOfRange,} from '../utils';
import Header from './Header';
import Day from './Day';
import {DateRange, NavigationAction} from '../types';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

interface MonthProps {
  value: Date;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

const Month: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
  } = props;

  // eslint-disable-next-line react/destructuring-assignment
  const [back, forward] = props.navState;

  return (
    <Paper square elevation={0} style={{ width: 290 }}>
      <Grid container>
        <Header
          date={date}
          setDate={setDate}
          nextDisabled={!forward}
          prevDisabled={!back}
          onClickPrevious={() => handlers.onMonthNavigate(marker, NavigationAction.Previous)}
          onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
        />

        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          style={{
            marginTop: 10,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          {WEEK_DAYS.map((day) => (
            <Typography color="textSecondary" key={day} variant="caption">
              {day}
            </Typography>
          ))}
        </Grid>

        <Grid
          item
          container
          direction="column"
          justifyContent="space-between"
          style={{
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 15,
            marginBottom: 20,
          }}
        >
          {chunks(getDaysInMonth(date), 7).map((week, idx) => (
            // eslint-disable-next-line react/no-array-index-key
            <Grid key={idx} container direction="row" justifyContent="center">
              {week.map((day) => {
                const isStart = isStartOfRange(dateRange, day);
                const isEnd = isEndOfRange(dateRange, day);
                const isRangeOneDay = isRangeSameDay(dateRange);
                const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);

                return (
                  <Day
                    key={format(day, 'MM-DD-YYYY')}
                    filled={isStart || isEnd}
                    outlined={isToday(day)}
                    highlighted={highlighted && !isRangeOneDay}
                    disabled={
                      !isSameMonth(date, day)
                      || !isWithinRange(day, minDate, maxDate)
                    }
                    startOfRange={isStart && !isRangeOneDay}
                    endOfRange={isEnd && !isRangeOneDay}
                    onClick={() => handlers.onDayClick(day)}
                    onHover={() => handlers.onDayHover(day)}
                    value={getDate(day)}
                  />
                );
              })}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Month;
