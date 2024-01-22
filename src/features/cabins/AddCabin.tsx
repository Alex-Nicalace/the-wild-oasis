import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import ModalDialog from '../../ui/ModalDialog';

function AddCabin(): JSX.Element {
  return (
    // родительский компонент модального окна с контекстом
    <>
      <ModalDialog>
        {/* компонент для открытия модального окна */}
        <ModalDialog.Open
          render={(open) => (
            <Button onClick={() => open('create-cabin')}>Add new cabin</Button>
          )}
        />
        {/* компонент для модального окна */}
        <ModalDialog.Window
          windowName="create-cabin"
          render={(close) => <CreateCabinForm onCloseModal={close} />}
        />
      </ModalDialog>
    </>
  );
}

export default AddCabin;
