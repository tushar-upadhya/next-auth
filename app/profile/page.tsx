import { changePremium, changeUserName, getSession } from "@/actions";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  return (
    <div className="profile">
      <p>
        Welcome <b>{session.username}</b>
      </p>

      <span>
        You are a <b>{session.isPro ? "Premium" : "Free"} user</b>
      </span>

      <form action={changePremium}>
        <button>{session.isPro ? "Cancel" : "Buy"} Premium</button>
      </form>

      <form action={changeUserName}>
        <input
          type="text"
          name="username"
          required
          placeholder={session.username}
        />
        <button>Update</button>
      </form>
    </div>
  );
};

export default ProfilePage;
