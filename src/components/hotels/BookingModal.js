import 'react-datepicker/dist/react-datepicker.css';
import { GUEST_OPTIONS } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import UserContext from '../../context/UserContext';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  setCheckedInDate,
  setCheckedOutDate,
  setGuestsCount,
} from '../../redux/bookingSlice';

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
import Modal from '@mui/material/Modal';
import { formatDate } from '../../utils/styleUtils';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function BookingModel({ hotel, setIsModalOpen, isModalOpen }) {
  const navigate = useNavigate();
  const booking = useSelector((state) => state.booking);
  const { checkedInDate, checkedOutDate, guestsCount } = booking;
  const dispatch = useDispatch();
  const userData = useContext(UserContext);
  const { isLoggedIn } = userData;

  const handleClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert(
      `You have booked  ${hotel.name} from ${formatDate(
        checkedInDate
      )} to ${formatDate(checkedOutDate)}.`
    );
    navigate('/');
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-center text-2xl semibold">{hotel.name}</h2>

          <div className="px-20 ">
            {!isLoggedIn ? (
              <div className="flex justify-center mt-10 mb-5">
                <h3 className="text-xl ">
                  Please
                  <Link
                    to="/login"
                    className="text-blue-900 mx-1 hover:underline"
                  >
                    login
                  </Link>
                  to Book the hotel
                </h3>
              </div>
            ) : (
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
                        <InputLabel id="demo-simple-select-label">
                          Guest
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={guestsCount}
                          label="Guest"
                          onChange={(e) =>
                            dispatch(setGuestsCount(e.target.value))
                          }
                        >
                          {GUEST_OPTIONS.map((data) => (
                            <MenuItem value={data.value}>{data.label}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    style={{ marginRight: '1rem' }}
                  >
                    Cancel
                  </Button>
                  <Button variant="contained" onClick={onSubmit}>
                    Submit
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default BookingModel;
