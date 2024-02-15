import UpdateSettingsForm from '../features/settings/UpdateSettingsForm';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Settings(): JSX.Element {
  return (
    <Row>
      <Heading as="h1">Обновить настройки отеля</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
