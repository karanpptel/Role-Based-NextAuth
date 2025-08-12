import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserCard from "../components/UserCard";
import { redirect } from "next/navigation";

export default async function ServerPage() {
    const session = await getServerSession(options);
    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/server");
    }
    return (
        <section className="flex flex-col items-center p-6 bg-white rounded-lg font-bold text-5xl text-black">
            <UserCard user={session?.user} pagetype={"Server"} />
        </section>
    )
}


