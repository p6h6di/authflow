import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  return (
    <div>
      Protected Settings Page
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
};

export default page;
