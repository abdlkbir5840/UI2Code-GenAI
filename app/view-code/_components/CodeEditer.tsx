import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { aquaBlue } from "@codesandbox/sandpack-themes";
import constants from "@/data/constants";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
function CodeEditer({ codeResponse, isReady }: any) {
  return (
    <div className="h-[100%] rounded-lg">
      {isReady ? (
        <Sandpack
          theme={aquaBlue}
          template="react"
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
            showNavigator: true,
            showTabs: true,
            editorHeight: "85vh",
          }}
          customSetup={{
            dependencies: {
              ...constants.DEPENDANCY,
              "lucide-react": "^0.469.0",
            },
          }}
          files={{
            "/App.js": `${codeResponse}`,
          }}
        />
      ) : (
        <SandpackProvider
          template="react"
          theme={aquaBlue}
          customSetup={{
            dependencies: {
              ...constants.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          files={{
            "/App.js": {
              code: `${codeResponse}`,
              active: true,
            },
          }}
        >
          <SandpackLayout>
            <SandpackCodeEditor showTabs={true} style={{height:"85vh"}}/>
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
}

export default CodeEditer;
