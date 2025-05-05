import React from "react";
import { Input } from "@/components/ui/input";

function SearchInput() {
  return (
    <Input
      type="text"
      placeholder="Search friends..."
      className="w-full bg-blue-100 border-none focus:ring-0 text-sm focus-visible:bg-white focus-visible:border-2 focus-visible:border-blue-300/70 "
    />
  );
}

export default SearchInput;
