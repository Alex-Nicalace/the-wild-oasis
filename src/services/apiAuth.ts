import { randomString } from '../utils/helpers';
import supabase, { supabaseUrl } from './supabase';

export async function signup({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  // проверка существования текущего сеанса. Данные из локального хранилища.
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // получение данных пользователя из базы данных Supabase.
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data.user;
}

export type TUserMetaData = {
  fullName?: string;
  avatar?: string;
  password?: string;
};
export type TUserMetaDataForm = Omit<TUserMetaData, 'avatar'> & {
  avatar?: File | null;
};
export async function updateCurrentUser({
  fullName,
  avatar,
  password,
}: TUserMetaDataForm) {
  //  1. создать уникальный имя изображения
  const imgName = avatar
    ? `${randomString()}-${avatar.name}`.replace(/\//g, '')
    : null;
  const imgPath = avatar
    ? `${supabaseUrl}/storage/v1/object/public/avatars/${imgName}`
    : null;

  // обновить пользователя в базе данных
  const { data, error } = await supabase.auth.updateUser({
    ...(password && { password }),
    data: {
      ...(fullName && { fullName }),
      ...(imgPath && { avatar: imgPath }),
    },
  });

  if (error) {
    console.error(error);
    throw new Error('Данные пользователя не обновлены!');
  }

  // 2. загрузить изображение
  if (!imgName || !avatar) return data;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(imgName, avatar);

  if (uploadError) {
    throw new Error('Аватар не загружен!');
  }

  return data;
}
