import Link from "next/link";
import LogoutForm from "./LogoutForm";
import { getSession } from "@/actions";

const Navbar = async () => {
  const session = await getSession();
  // console.log("session:", session);

  return (
    <nav>
      <Link href={"/"}>Navbar</Link>
      <Link href={"/premium"}>Premium</Link>
      <Link href={"/profile"}>Profile</Link>
      <Link href={"/login"}>Login</Link>

      {session.isLoggedIn && <LogoutForm />}
    </nav>
  );
};

export default Navbar;
