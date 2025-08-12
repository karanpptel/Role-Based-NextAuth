// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="text-5xl">
//       <h1>Hello, This is Public Home page</h1>
//     </div>
//   );
// }
import  { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserCard from "./components/UserCard";


export default async function Home() {
  const session = await getServerSession(options);
  return (
    <>
    {session ? (
      <UserCard user={session?.user} pagetype={"Home"} />
    ) : (
      <h2>Not signed in</h2>
    )}
    </>
  );
}



