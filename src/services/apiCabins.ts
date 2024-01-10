import supabase, { supabaseUrl } from './supabase';

import { TInputs } from '../features/cabins/CreateCabinForm';
import { randomString } from '../utils/helpers';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be loaded');
  }

  return data;
}

export async function deleteCabin(id: number) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }
}

export type TNewCabin = Omit<TInputs, 'image'> & { image: File | string };
export async function createEditCabin(newCabin: TNewCabin, id?: number) {
  //  1. создать уникальный имя изображения
  const imgName =
    newCabin.image instanceof File
      ? `${randomString()}-${newCabin.image.name}`.replace(/\//g, '')
      : '';
  const imgPath =
    typeof newCabin.image === 'string'
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabins-image/${imgName}`;

  let queryTable = supabase.from('cabins');

  // вставить кабину в базу данных или обновить
  const queryOperation = !id
    ? queryTable.insert([{ ...newCabin, image: imgPath }])
    : queryTable.update({ ...newCabin, image: imgPath }).eq('id', id);

  const { data, error } = await queryOperation.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. загрузить изображение
  if (typeof newCabin.image === 'string') return data;

  const { error: uploadError } = await supabase.storage
    .from('cabins-image')
    .upload(imgName, newCabin.image);

  // 3. удалить кабину из базы, если загрузка изображения не удалась
  if (uploadError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error('Image upload failed. Cabin deleted from the database.');
  }

  return data;
}
