"use client";
import AppHeader from "@/app/_components/AppHeader";
import constants from "@/data/constants";
import axios from "axios";
import { Loader2, LoaderCircle } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import SelectionDetail from "../_components/SelectionDetail";
import CodeEditer from "../_components/CodeEditer";

export interface RECORD {
  id: number;
  description: string;
  imageUrl: string;
  model: string;
  code: any;
  created_by: string;
  uid: string;
}
function ViewCode() {
  const { uid } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [codeResponse, SetCodeResponse] = useState("");
  const [record, setRecord] = useState<RECORD | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const getRecordInfo = async (forceRegenerate=false) => {
    try {
      SetCodeResponse("");
      setIsReady(false);
      setLoading(true);
      const result = await axios.get(`/api/wireframeToCode?uid=${uid}`);
      const response = result.data;
      setRecord(response);
      console.log("record: " + record);
      if (forceRegenerate || !response?.code) {
        const newCode = await generateCode(response); // Wait for generated code
        await updateCodeToDb(newCode); // Store only after it's fully generated
      } else {
        SetCodeResponse(response.code);
      }
      
      setLoading(false);
      setIsReady(true);
    } catch (error) {
      console.error("Error fetching record:", error);
      setLoading(false);
    }
  };
  
  const generateCode = async (record: RECORD): Promise<string> => {
    try {
      setIsReady(false);
      setLoading(true);
      let generatedCode = "";
  
      const res = await fetch("/api/ai-model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: record.description + " " + constants.NEW_PROMPT,
          imageUrl: record.imageUrl,
          model: record.model,
        }),
      });
  
      if (!res.body) return "";
      setLoading(false);
  
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
  
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder
          .decode(value)
          .replace("```jsx", "")
          .replace("```", "")
          .replace("jsx", "");
        
        generatedCode += text;
      }
  
      SetCodeResponse(generatedCode);
      setIsReady(true);
      return generatedCode;
    } catch (error) {
      console.error("Error generating code:", error);
      setLoading(false);
      setIsReady(false);
      return "";
    }
  };
  
  const updateCodeToDb = async (code: string) => {
    // console.log("the code is:", code);
    console.log(record?.uid);
    // if (!record?.uid || !code){
    //   console.log("from reccord uid not found or code not found");
    //   return;
    // } 
    
    try {
      const result = await axios.put("/api/wireframeToCode", {
        // uid: record.uid,
        uid: uid,
        codeResponse: code,
      });
      console.log("Updated in DB:", result.data);
    } catch (error) {
      console.error("Error updating code in DB:", error);
    }
  };
  
  useEffect(() => {
    uid && getRecordInfo(false);
  }, [uid]);

  return (
    <div>
      <AppHeader hideSideBar={true} />
      <div className="grid grid-cols-1 md:grid-cols-5 p-5 gap-10">
        {/* Selection Details */}
        <div>
          <SelectionDetail
            record={record}
            regenerateCode={getRecordInfo}
            isReady={isReady}
          />
        </div>
        {/* Code Editer */}
        <div className="col-span-4">
          {loading ? (
            <div>
              <h2 className="font-bold text-3xl text-center p-20 flex items-center justify-center bg-slate-100 h-[85vh] rounded-xl">
                <Loader2 className="animate-spin" /> Analyzing The Wireframe
              </h2>
            </div>
          ) : (
            <CodeEditer codeResponse={codeResponse} isReady={isReady} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewCode;
