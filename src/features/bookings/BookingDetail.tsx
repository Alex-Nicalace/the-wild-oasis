import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useBooking } from './useBooking';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import { isKey } from '../../utils/helpers';
import Empty from '../../ui/Empty';
import ModalDialog from '../../ui/ModalDialog';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resource="booking" />;

  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          {status && isKey(statusToTagName, status) && (
            <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
          )}
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ModalDialog>
        <ButtonGroup>
          <ModalDialog.Open
            windowName="delete-booking"
            render={(open) => (
              <Button
                variation="danger"
                onClick={() => open()}
                disabled={isDeletingBooking}
              >
                Удалить запись
              </Button>
            )}
          />

          {/* показывать кнопку тольно для неподтвержденных броней */}
          {status === 'unconfirmed' && (
            <Button onClick={() => navigate(`/check-in/${bookingId}`)}>
              Зарегистрировать
            </Button>
          )}

          {status === 'checked-in' && (
            <Button
              onClick={() => checkout(bookingId)}
              disabled={isCheckingOut}
            >
              Выписать
            </Button>
          )}

          <Button variation="secondary" onClick={moveBack}>
            Назад
          </Button>
        </ButtonGroup>
        <ModalDialog.Window
          windowName="delete-booking"
          render={(close) => (
            <ConfirmDelete
              resourceName={`бронирование # - ${bookingId}`}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
              onCancel={close}
              disabled={isDeletingBooking}
            />
          )}
        />
      </ModalDialog>
    </>
  );
}

export default BookingDetail;
