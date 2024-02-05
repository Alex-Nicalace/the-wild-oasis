import { useEffect, useState } from 'react';
import styled from 'styled-components';

import BookingDataBox from '../../features/bookings/BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import Empty from '../../ui/Empty';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from '../bookings/useBooking';
import Checkbox from '../../ui/Checkbox';
import { formatCurrency } from '../../utils/helpers';
import { useCheckin } from './useCheckin';
import useSettings from '../settings/useSettings';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isLoading: isBookingLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isSettingsLoading } = useSettings();

  const isLoading = isBookingLoading || isSettingsLoading;

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;

  const optionalBreakfastPrice =
    (settings?.breakfastPrice ?? 0) * (numNights ?? 0) * (numGuests ?? 0);

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin({
      bookingId,
      ...(addBreakfast && {
        bookingRow: {
          hasBreakfast: true,
          extraPrice: optionalBreakfastPrice,
          totalPrice: (totalPrice ?? 0) + optionalBreakfastPrice,
        },
      }),
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast(!addBreakfast);
              setConfirmPaid(false);
            }}
          >
            Добавить стоимость завтрака {formatCurrency(optionalBreakfastPrice)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id={bookingId.toString()}
          checked={confirmPaid}
          onChange={() => setConfirmPaid(!confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
        >
          Я подтверждаю, что {guests?.fullName} оплатил полную стоимость{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice ?? 0)
            : formatCurrency((totalPrice ?? 0) + optionalBreakfastPrice) +
              ' (' +
              formatCurrency(totalPrice ?? 0) +
              ' + ' +
              formatCurrency(optionalBreakfastPrice) +
              ')'}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Регистрация бронирования #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Назад
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
