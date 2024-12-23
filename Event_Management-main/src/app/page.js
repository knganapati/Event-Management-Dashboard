import { redirect } from "next/navigation";

export default function Home() {
  redirect("/signin");
  return null; // This is never rendered because of the redirect
}
