import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import ModalDialog from '../../ui/ModalDialog';

function AddCabin(): JSX.Element {
  return (
    <div>
      {/* родительский компонент модального окна с контекстом */}
      <ModalDialog>
        {/* компонент для открытия модального окна */}
        <ModalDialog.Open
          windowName="create-cabin"
          render={(open) => (
            <Button onClick={() => open()}>Добавить номер</Button>
          )}
        />
        {/* компонент для модального окна */}
        <ModalDialog.Window
          windowName="create-cabin"
          render={(close) => <CreateCabinForm onCloseModal={close} />}
        />
      </ModalDialog>
    </div>
  );
}

export default AddCabin;
