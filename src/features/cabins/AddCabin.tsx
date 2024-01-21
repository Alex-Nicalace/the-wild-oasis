import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin(): JSX.Element {
  return (
    // родительский компонент модального окна с контекстом
    <Modal>
      {/* компонент для открытия модального окна */}
      <Modal.Open
        render={(open) => (
          <Button onClick={() => open('create-cabin')}>Add new cabin</Button>
        )}
      />
      {/* компонент для модального окна */}
      <Modal.Window
        windowName="create-cabin"
        render={(close) => <CreateCabinForm onCloseModal={close} />}
      />
    </Modal>
  );
}

export default AddCabin;
