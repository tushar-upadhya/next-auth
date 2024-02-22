"use server";

import { getIronSession } from "iron-session";
import { sessionOptions, SessionData, defaultSession } from "./lib";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

let userName = "tushar";
let isPro = true;
let isBlocked = true;
export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  // check the user in the database
  session.isBlocked = isBlocked;
  session.isPro = isPro;

  return session;
};

export const login = async (
  prevState: { error: undefined | string },
  formData: FormData
) => {
  const session = await getSession();

  const formUsername = formData.get("username") as string;
  const formPassword = formData.get("password") as string;

  // check user in the database
  // const user = await user = await db.getUser({username, password})

  if (formUsername !== userName) {
    return { error: "Wrong Credentials" };
  }

  session.userId = "1";
  session.username = formUsername;
  session.isPro = isPro;
  session.isLoggedIn = true;

  await session.save();

  redirect("/");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();

  redirect("/");
};

export const changePremium = async () => {
  const session = await getSession();

  isPro = !session.isPro;
  session.isPro = isPro;
  await session.save();

  revalidatePath("/profile");
};

export const changeUserName = async (formData: FormData) => {
  const session = await getSession();
  const newUserName = formData.get("username") as string;

  userName = newUserName;

  session.username = userName;
  await session.save();

  revalidatePath("/profile");
};
