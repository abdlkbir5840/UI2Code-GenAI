import { RECORD } from "@/app/view-code/[uid]/page";
import { Button } from "@/components/ui/button";
import { aiModelList } from "@/data/constants";
import { Code, ImageUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DesignCard({ item }: any) {
  const modelObj = aiModelList.find((i) => i.name === item?.model);
  return (
    <div className="p-3 border rounded-lg">
      <Image
        src={item.imageUrl}
        alt="image"
        width={300}
        height={200}
        className="w-full h-[200px] object-cover bg-white rounded-lg"
      />
      <div className="mt-2">
        <h2 className="line-clamp-3 text-gray-400 text-sm">
          {" "}
          {item.description}
        </h2>
      </div>
      <div className="flex justify-between items-center mt-2 ">
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-full">
          {modelObj && (
            <Image src={modelObj?.icon} alt="image" width={25} height={25} />
          )}
          <h2>{modelObj?.name}</h2>
        </div>
        <Link href={"/view-code/" + item?.uid}>
          <Button>
            <Code /> View Code
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default DesignCard;
