"use client";

import { useRouter } from "next/navigation";

const Project = () => {
  const router = useRouter();
  router.push("/not-found");

  return null;
};

export default Project;
