import React from "react";
import useFetch from "../resources/useFetch";

export const HookDemo = (props) => {
  const { data, loading, error } = useFetch("users");
  if (loading) return "Loading...";
  if (error) return "Oops!";
  return data[0].username;
}
