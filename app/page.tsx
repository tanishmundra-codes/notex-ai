"use client";
import LandingPage from "@/app/(landing)/page"
import { useMutation } from "convex/react";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { api } from "@/convex/_generated/api";

export default function Home() {
  const { user } = useUser();
  const router = useRouter();

  const createUser = useMutation(api.user.createUser);

  useEffect(() => {
    user && checkUser();
  }, [user]);

  const checkUser = async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress as string,
      userName: user?.firstName as string,
      imageUrl: user?.imageUrl as string,
    });

    console.log(result);
  };

  return (
    <div>
      <LandingPage />
    </div>
  );
}
