import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import data from '../../data/data.json';
import Loader from '../common/Loader';
import BookingModel from './BookingModal';
import ImageCarousel from '../common/ImageCarousel';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';

function Hotel() {
  const [hotel, setHotel] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const HOTELS = data[0].hotelData;
  const { id } = useParams();

  useEffect(() => {
    const hotel = HOTELS.find((hotel) => hotel.id === id);
    setHotel(hotel);
  }, []);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!hotel) {
    return (
      <div className="pt-16">
        <Loader />
      </div>
    );
  }
  return (
    <section className="w-2/5  py-24 mt- mx-auto">
      <div className="shadow">
        <ImageCarousel hotel={hotel} />
        <div className="p-4 border-t border-grey-100 bg-white">
          <Rating name="read-only" value={hotel.rate} readOnly />
          <div className="flex justify-between pb-4">
            <address>{hotel.address}</address>
            <h3>₹ {hotel.price}</h3>
          </div>
          <p>
            {hotel.name} Hotel & Spa is a family-friendly hotel that offers a
            wide range of accommodation types, from rooms to suites. All this in
            the peaceful surroundings of our beautiful gardens, will make your
            time at {hotel.city} an unforgettable holiday.
          </p>
          <div className="flex justify-end pt-6">
            <Button
              variant="contained"
              onClick={() => handleModal()}
              size={'large'}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <BookingModel
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        hotel={hotel}
      />
    </section>
  );
}

export default Hotel;
