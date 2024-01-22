import styled from 'styled-components';

import { TCabin } from '../../pages/Cabins';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import ModalDialog from '../../ui/ModalDialog';
import ConfirmDelete from '../../ui/ConfirmDelete';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

interface ICabinRowProps {
  cabin: TCabin;
}

function CabinRow({ cabin }: ICabinRowProps): JSX.Element {
  const {
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    descr,
    id: cabinId,
  } = cabin;
  // Доступ к данным, которые были созданы с помощью new QueryClient()
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const isWorking = isDeleting || isCreating;

  function handleDuplicateCabin() {
    if (name && maxCapacity && regularPrice && discount && descr && image)
      createCabin({
        image,
        name: `Copy of ${name}`,
        maxCapacity,
        regularPrice,
        discount,
        descr,
      });
  }

  return (
    <TableRow role="row">
      <Img src={image || undefined} alt={name || undefined} />
      <Cabin>{name}</Cabin>
      <div>{maxCapacity}</div>
      <Price>{formatCurrency(regularPrice || 0)}</Price>
      {discount ? (
        <Discount>{formatCurrency(discount)}</Discount>
      ) : (
        <span>&mdash;</span>
      )}
      <div>
        <button onClick={handleDuplicateCabin} disabled={isWorking}>
          <HiSquare2Stack />
        </button>
        <ModalDialog>
          <ModalDialog.Open
            render={(open) => (
              <button onClick={() => open('edit-cabin')}>
                <HiPencil />
              </button>
            )}
          />
          <ModalDialog.Window
            windowName="edit-cabin"
            render={(close) => (
              <CreateCabinForm cabinToEdit={cabin} onCloseModal={close} />
            )}
          />

          <ModalDialog.Open
            render={(open) => (
              <button onClick={() => open('delete-cabin')}>
                <HiTrash />
              </button>
            )}
          />
          <ModalDialog.Window
            windowName="delete-cabin"
            render={(close) => (
              <ConfirmDelete
                resourceName={`cabin - ${name || ''}`}
                onConfirm={() => deleteCabin(cabinId)}
                onCancel={close}
                disabled={isWorking}
              />
            )}
          />
        </ModalDialog>
      </div>
    </TableRow>
  );
}

export default CabinRow;
