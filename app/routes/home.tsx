import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export const meta = () => {
  return [
    { title: "Blobby Maker" },
    { name: "description", content: "Create your own custom blobby character!" },
  ];
};

export default function Home() {
  return <Welcome />;
}
