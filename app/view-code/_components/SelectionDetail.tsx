import React from "react";
import { RECORD } from "../[uid]/page";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { aiModelList } from "@/data/constants";
import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

function SelectionDetail({ record, regenerateCode, isReady }: any) {
  const modelIcon = aiModelList.find(
    (item) => item.name === record?.model
  )?.icon;

  return (
    record && (
      <div className="p-5 bg-gray-200 h-[100%] rounded-lg">
        <h2 className="font-bold my-2">Wireframe</h2>
        <Image
          src={record.imageUrl}
          alt="Image wireframe"
          width={300}
          height={300}
          className="rounded-lg object-contain h-[200px] w-full border border-dashed p-2 bg-white"
        />
        <h2 className="font-bold mt-4 mb-2">AI Model</h2>
        <div className="flex items-center space-x-4 bg-white p-2 rounded-md">
          {modelIcon && (
            <>
              <Image
                src={modelIcon}
                alt="Model Icon"
                width={25}
                height={25}
                className="object-contain"
              />
              <span className="font-semibold">{record.model}</span>
            </>
          )}
        </div>
        <h2 className="font-bold mt-4 mb-2">Description</h2>
        <Textarea
          defaultValue={record.description}
          disabled={true}
          className="bg-white p-2 cursor-not-allowed h-[180px]"
        />
        <Button
          className="mt-7 w-full"
          onClick={regenerateCode}
          disabled={!isReady}
        >
          <RefreshCcw /> Regenerate Code
        </Button>
      </div>
    )
  );
}

export default SelectionDetail;
