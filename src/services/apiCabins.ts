import { TInputs } from '../features/cabins/CreateCabinForm';
import { randomString } from '../utils/helpers';
import { Database } from './database.types';
import supabase, { supabaseUrl } from './supabase';

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

export async function createCabin(
  newCabin: Omit<TInputs, 'image'> & { image: File }
) {
  //  1. создать уникальный имя изображения
  const imgName = `${randomString()}-${newCabin.image.name}`.replace(/\//g, '');
  const imgPath = `${supabaseUrl}/storage/v1/object/public/cabins-image/${imgName}`;
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imgPath }])
    .returns<Database['public']['Tables']['cabins']['Row']>();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. загрузить изображение
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
