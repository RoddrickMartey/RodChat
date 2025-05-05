import { UserSearch } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { search, switchToSearch } from "@/features/navView";

function People() {
  const dispatch = useDispatch();
  const { currentView } = useSelector((state) => state.view);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() => dispatch(switchToSearch())}
            className={`flex items-center justify-center w-[60px] h-[60px]   hover:bg-blue-100 hover:text-slate-900 ${
              currentView === search.view
                ? "bg-blue-300 text-slate-900"
                : "text-slate-100"
            }`}
          >
            <UserSearch size={25} />
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>People</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default People;
