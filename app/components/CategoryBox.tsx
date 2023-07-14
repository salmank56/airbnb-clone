"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import qs from "query-string";

interface CategoryBoxProps {
  //   key: string;
  label: string;
  icon: IconType;
  selected?: boolean;
  //   description: string;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  //   key,
  label,
  icon: Icon,
  //   description,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`group flex flex-col items-center justify-center hover:border-b-neutral-500 gap-2 p-3 border-b-2 hover:text-neutral-900 transition cursor-pointer mb-2 md:mb-0
       ${selected ? "border-b-neutral-800" : "border-transparent"}
       ${selected ? "text-neutral-900" : "text-neutral-500"}
        `}
    >
      <Icon size={24} />
      <div className="font-medium text-neutral-600 group-hover:text-neutral-900 text-sm">
        {label}
      </div>
    </div>
  );
};

export default CategoryBox;
