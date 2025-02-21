"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, icons, Loader2Icon, WandSparkles, X } from "lucide-react";
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
//@ts-ignore
import uuid4 from "uuid4";
import { useAuthContext } from "@/app/provider";
import { Result } from "postcss";
import { useRouter } from "next/navigation";
import { aiModelList } from "@/data/constants";
import { toast } from "sonner";

function Imageupload() {
  const router = useRouter()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [file, setFile] = useState<any>(null);
  const [model, setModel] = useState<string>();
  const [description, setDescription] = useState<string>();
  const {user} = useAuthContext();
  const [loading, setLoading] = useState<boolean>(false)
  const onImageSelect = (event: ChangeEvent<HTMLElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageUrl = URL.createObjectURL(file);
      setFile(file);
      setPreviewUrl(imageUrl);
    }
  };
  const onComvertToCodeButtonClick = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    } else if (!model) {
      alert("Please select a model first.");
      return;
    } else if (!description) {
      alert("Please provide a description.");
      return;
    }
    
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload successful:", response.data.url);
      //save to db
      const uid = uuid4()
      const result = await axios.post("/api/wireframeToCode", {
        imageUrl: response.data.url,
        model: model,
        description: description,
        uid: uid,
        email: user?.email,
      });
      console.log(result.data);

      setLoading(false)
      router.push(`/view-code/${uid}`)
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false)
      toast("Not Enough Credits")
      
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {!previewUrl ? (
          <div className="p-7 border border-dashed rounded-md shadow-md flex flex-col items-center justify-center">
            <CloudUpload className="h-10 w-10 text-primary" />
            <h2 className="font-bold text-lg">Upload Image</h2>
            <p className="text-gray-400 mt-3">
              Click Button to Select Wiframe Image
            </p>
            <div className="p-5 border border-dashed w-full flex mt-7 items-center justify-center">
              {/* <Button>Select Image</Button> */}
              <label htmlFor="imageSelect">
                <h2 className="p-2 bg-blue-100 font-medium text-primary rounded-md px-5 cursor-pointer">
                  Select Image
                </h2>
              </label>
            </div>
            <input
              type="file"
              id="imageSelect"
              className="hidden"
              multiple={false}
              onChange={onImageSelect}
            />
          </div>
        ) : (
          <div className="p-5 border border-dashed rounded-md shadow-md">
            <Image
              src={previewUrl}
              alt="preview"
              width={500}
              height={500}
              className="w-full h-[300px] object-contain"
            />
            <X
              className="flex justify-end w-full cursor-pointer"
              onClick={() => setPreviewUrl(null)}
            />
          </div>
        )}
        <div className="p-7 border shadow-md rounded-lg">
          <h2 className="font-bold text-lg">Select AI Model</h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {aiModelList.map((modele, index) => (
                <SelectItem key={index} value={modele.name}>
                  <div className="flex items-center justify-center">
                    <Image
                      src={modele.icon}
                      alt={modele.name}
                      width={25}
                      height={25}
                    />
                    <h2 className="ml-3">{modele.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">
            Enter Description about your page
          </h2>
          <Textarea
            onChange={(event) => setDescription(event.target.value)}
            className="mt-3 h-[200px]"
            placeholder="Write about your web page"
          />
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
        <Button onClick={onComvertToCodeButtonClick} disabled={loading }>
         { loading? <Loader2Icon className="animate-spin"/> : <WandSparkles />} 
          Convert to Code
        </Button>
      </div>
    </div>
  );
}

export default Imageupload;
