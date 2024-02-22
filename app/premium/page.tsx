import { getSession } from "@/actions";
import Link from "next/link";
import { redirect } from "next/navigation";

const PremiumPage = async () => {
  const session = await getSession();

  if (!session.isLoggedIn) {
    redirect("/");
  }

  if (!session.isPro) {
    return (
      <div className="notPremium">
        <h1>Only Premium users can see the content</h1>

        <Link href={"/profile"}>Go to Profile page tp upgrade to premium</Link>
      </div>
    );
  }

  return (
    <div className="premium">
      <h1>Premium Content</h1>

      <ul>
        <li>A for Apple</li>
        <li>B for Ball</li>
        <li>C for Cat</li>
      </ul>
    </div>
  );
};

export default PremiumPage;
