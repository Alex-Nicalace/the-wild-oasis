import { SyntheticEvent } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useSettings from './useSettings';
import { TSettings } from '../../services/apiSettings';
import { useEditSettings } from './useEditSettings';
import Spinner from '../../ui/Spinner';

function UpdateSettingsForm(): JSX.Element {
  const { isLoading, settings } = useSettings();
  const { register } = useForm<TSettings>({ values: settings });
  const { isEditing, editSettings } = useEditSettings();

  function registerMod(name: keyof TSettings) {
    return register(name, {
      onBlur: (e: SyntheticEvent) => {
        if (!(e.target instanceof HTMLInputElement)) return;
        const value = e.target.value;
        if (!value) return;
        editSettings({ [name]: value });
      },
    });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...registerMod('minBookLength')}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...registerMod('maxBookLength')}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...registerMod('maxGuestsPerBooking')}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...registerMod('breakfastPrice')}
          disabled={isEditing}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
