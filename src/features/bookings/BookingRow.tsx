import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';

import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBooking';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import ModalDialog from '../../ui/ModalDialog';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';
import { TBookingWithCabinGuests } from '../../services/apiBookings';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

type IBookingRowProps = { booking: TBookingWithCabinGuests };
function BookingRow({
  booking: {
    id: bookingId,
    startDate,
    endDate,
    numNights,
    totalPrice,
    status,
    guests,
    cabins,
  },
}: IBookingRowProps) {
  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();

  const { fullName: guestName, email } = guests || {};
  const { name: cabinName } = cabins || {};

  const statusToTagName = {
    unconfirmed: { color: 'blue', label: 'Не подтвержден' },
    'checked-in': { color: 'green', label: 'Вписан' },
    'checked-out': { color: 'silver', label: 'Выписан' },
  };

  const keyOfStatusToTagName = status as keyof typeof statusToTagName;

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate || ''))
            ? 'Today'
            : formatDistanceFromNow(startDate || '')}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate || ''), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate || ''), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[keyOfStatusToTagName].color}>
        {statusToTagName[keyOfStatusToTagName].label}
      </Tag>

      <Amount>{formatCurrency(totalPrice || 0)}</Amount>

      <ModalDialog>
        <Menus.Menu>
          <Menus.Toggle id={String(bookingId)} />
          <Menus.List id={String(bookingId)}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              Детали бронирования
            </Menus.Button>
            {/* показывать кнопку тольно для неподтвержденных броней */}
            {status === 'unconfirmed' && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/check-in/${bookingId}`)}
              >
                Зарегистрировать
              </Menus.Button>
            )}

            {/* показывать кнопку тольно для вписанных */}
            {status === 'checked-in' && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckingOut}
              >
                Выписать
              </Menus.Button>
            )}

            <ModalDialog.Open
              windowName="delete-booking"
              render={(open) => (
                <Menus.Button
                  icon={<HiTrash />}
                  onClick={() => open()}
                  disabled={isDeletingBooking}
                >
                  Удалить запись
                </Menus.Button>
              )}
            />
          </Menus.List>
        </Menus.Menu>
        <ModalDialog.Window
          windowName="delete-booking"
          render={(close) => (
            <ConfirmDelete
              resourceName={`бронирование # - ${bookingId}`}
              onConfirm={() => deleteBooking(bookingId)}
              onCancel={close}
              disabled={isDeletingBooking}
            />
          )}
        />
      </ModalDialog>
    </Table.Row>
  );
}

export default BookingRow;
