import styled from 'styled-components';

import { TCabin } from '../../pages/Cabins';
import { formatCurrency } from '../../utils/helpers';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import ModalDialog from '../../ui/ModalDialog';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Menus from '../../ui/Menus';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 0.3rem 2.4rem;
  padding-left: 0;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
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

const Dropdown = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
      <Dropdown>
        <ModalDialog>
          <Menus.Menu>
            <Menus.Toggle id={String(cabinId)} />
            <Menus.List id={String(cabinId)}>
              <Menus.Button
                onClick={handleDuplicateCabin}
                disabled={isWorking}
                icon={<HiSquare2Stack />}
              >
                Дублировать
              </Menus.Button>

              <ModalDialog.Open
                windowName="edit-cabin"
                render={(open) => (
                  <Menus.Button
                    icon={<HiPencil />}
                    onClick={() => open()}
                    disabled={isWorking}
                  >
                    Редактировать
                  </Menus.Button>
                )}
              />
              <ModalDialog.Open
                windowName="delete-cabin"
                render={(open) => (
                  <Menus.Button
                    icon={<HiTrash />}
                    onClick={() => open()}
                    disabled={isWorking}
                  >
                    Удалить
                  </Menus.Button>
                )}
              />
            </Menus.List>
          </Menus.Menu>
          <ModalDialog.Window
            windowName="edit-cabin"
            render={(close) => (
              <CreateCabinForm cabinToEdit={cabin} onCloseModal={close} />
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
      </Dropdown>
    </TableRow>
  );
}

export default CabinRow;
