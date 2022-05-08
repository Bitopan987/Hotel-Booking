import { NavLink } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux';
import { GUEST_OPTIONS } from '../utils/constants';
import {
  setCheckedInDate,
  setCheckedOutDate,
  setTravellersCount,
} from '../redux/bookingSlice';

import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

function Home() {
  const booking = useSelector((state) => state.booking);
  const { checkedInDate, checkedOutDate, travellersCount } = booking;
  const dispatch = useDispatch();

  return (
    <div className="text-center hero pt-60  h-screen">
      <h2 className="text-5xl font-bold mb-10 text-gray-600">
        A lifetime of discounts? It's Genius.
      </h2>
      <p>
        Get rewarded for your travels – unlock instant savings of 10% or more
        with a free Booking.com account Sign in / Register
      </p>

      <form>
        <div className="flex item-center justify-center my-8">
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Checked In"
                value={checkedInDate}
                onChange={(value) => dispatch(setCheckedInDate(value))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div className="mx-4">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Checked Out"
                value={checkedOutDate}
                onChange={(value) => dispatch(setCheckedOutDate(value))}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </div>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Guest</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={travellersCount}
                  label="Guest"
                  onChange={(e) => dispatch(setTravellersCount(e.target.value))}
                >
                  {GUEST_OPTIONS.map((data) => (
                    <MenuItem value={data.value}>{data.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </div>
      </form>
      <NavLink to="/hotels">
        <Button variant="contained" size={'large'}>
          Search
        </Button>
      </NavLink>
    </div>
  );
}

export default Home;
