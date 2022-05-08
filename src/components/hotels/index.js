import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedRate, setSelectedCity } from '../../redux/bookingSlice';
import { CITY_OPTIONS, RATE_OPTIONS } from './constants';
import data from '../../data/data.json';

import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function HotelList() {
  let HOTELS = data[0].hotelData;
  const [hotels, setHotels] = useState(HOTELS);
  const booking = useSelector((state) => state.booking);
  const { selectedCity, selectedRate } = booking;
  const navigate = useNavigate();

  const onHotelClick = (id) => {
    navigate(`/hotels/${id}`);
  };

  const debouncedCallback = useDebouncedCallback((value) => {
    const filtered = HOTELS.filter((hotel) =>
      hotel.name.toLowerCase().includes(value.toLowerCase())
    );
    setHotels(filtered);
  }, 100);

  const handleInputChange = (event) => {
    const query = event.currentTarget.value;
    debouncedCallback(query);
  };

  const onCityChange = (data) => {
    dispatch(setSelectedCity(data));
  };

  const condition = (hotel) => {
    const cityCondition = selectedCity
      ? hotel.city.toLowerCase().includes(selectedCity.toLowerCase())
      : true;
    const rateCondition = selectedRate ? hotel.rate == selectedRate : true;

    return cityCondition && rateCondition;
  };

  const filterHotels = () => {
    const filtered = HOTELS.filter((hotel) => condition(hotel));
    setHotels(filtered);
  };

  const onRateChange = (data) => {
    dispatch(setSelectedRate(data));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    filterHotels();
  }, [selectedCity, selectedRate]);

  return (
    <section className="pt-20 px-20">
      <header>
        <form className="flex justify-center items-center bg-white max-w-min p-6 mx-auto shadow">
          <div>
            <Stack spacing={2} sx={{ width: 300 }}>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={[]}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                      onChange: (event) => handleInputChange(event),
                    }}
                  />
                )}
              />
            </Stack>
          </div>

          <div className="mx-6">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">City</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCity}
                  label="City"
                  onChange={(e) => onCityChange(e.target.value)}
                >
                  {CITY_OPTIONS.map((data) => (
                    <MenuItem value={data.value}>{data.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
          <div>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Rate</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedRate}
                  label="Rate"
                  onChange={(e) => onRateChange(e.target.value)}
                >
                  {RATE_OPTIONS.map((data) => (
                    <MenuItem value={data.value}>{data.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </div>
        </form>
      </header>
      <main className="pt-6 flex  item-center flex-wrap">
        {hotels.length ? (
          hotels.map((hotel) => (
            <Card
              sx={{ maxWidth: '30%', margin: '1rem' }}
              onClick={() => onHotelClick(hotel.id)}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={hotel.cover}
                  alt={hotel.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {hotel.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {hotel.address}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))
        ) : (
          <div>
            <h1 className="font-normal text-2xl">No Results Found</h1>
          </div>
        )}
      </main>
    </section>
  );
}

export default HotelList;
