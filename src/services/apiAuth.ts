import supabase from './supabase';

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
