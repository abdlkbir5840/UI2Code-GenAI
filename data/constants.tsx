import dedent from "dedent";
export default {
  PROMPT_OLD: dedent`
    You are an expert frontend React developer. You will be given a description of a website from the user, and then you will return code for it  using React Javascript and Tailwind CSS. Follow the instructions carefully, it is very important for my job. I will tip you $1 million if you do a good job:

- Think carefully step by step about how to recreate the UI described in the prompt.
- Create a React component for whatever the user asked you to create and make sure it can run by itself by using a default export
- Feel free to have multiple components in the file, but make sure to have one main component that uses all the other components
- Make sure to describe where everything is in the UI so the developer can recreate it and if how elements are aligned
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- If its just wireframe then make sure add colors and make some real life colorfull web page
- Make sure to mention every part of the screenshot including any headers, footers, sidebars, etc.
- Make sure to use the exact text from the screenshot.
- Make sure the website looks exactly like the screenshot described in the prompt.
- Pay close attention to background color, text color, font size, font family, padding, margin, border, etc. Match the colors and sizes exactly.
- Make sure to code every part of the description including any headers, footers, etc.
- Use the exact text from the description for the UI elements.
- Do not add comments in the code such as "<!-- Add other navigation links as needed -->" and "<!-- ... other news items ... -->" in place of writing the full code. WRITE THE FULL CODE.
- Repeat elements as needed to match the description. For example, if there are 15 items, the code should have 15 items. DO NOT LEAVE comments like "<!-- Repeat for each news item -->" or bad things will happen.
- For all images, please use image placeholder from :https://redthread.uoregon.edu/files/original/affd16fd5264cab9197da4cd1a996f820e601ee4.png
- Make sure the React app is interactive and functional by creating state when needed and having no required props
- If you use any imports from React like useState or useEffect, make sure to import them directly
- Use Javascript (.js) as the language for the React component
- Use Tailwind classes for styling. DO NOT USE ARBITRARY VALUES (e.g. \h-[600px]\). Make sure to use a consistent color palette.
- Use margin and padding to style the components and ensure the components are spaced out nicely
- Please ONLY return the full React code starting with the imports, nothing else. It's very important for my job that you only return the React code with imports. 
- DO NOT START WITH \\\jsx or \\\`typescript or \\\`javascript or \\\`tsx or \\\.`,
  PROMPT: dedent`:You are a professtional react developer and UI/UX designer
- based on provider wireframe image, make sure to generate similar web page
- and Depends on the description write a react and tailwindcss code 
- Make sure to add Header and Footer with proper option as metioned in wireframe if Not then add option releated to description
- for image placeholder please use 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'
- Add All small details and make UI UX design more professtional
- Make sure to keep same color combination across the page
- Add Some Colors to make it more modern UI UX
- Use lucid library for icons
- Do not use any third party library
- Do not use react router dom
- Do not use tailwind-merge
- Only give react+ tailwindcss code and do not write any text other than code
  Required dependencies for this project:
  - postcss: "^8"
  - tailwindcss: "^3.4.1"
  - autoprefixer: "^10.0.0"
  - uuid4: "^2.0.3"
  - "tailwind-merge": "^2.4.0"
  - "tailwindcss-animate": "^1.0.7"
  - "lucide-react": "^0.469.0"
  - "react-router-dom": "^7.1.1"
  - firebase: "^11.1.0"
  - "@google/generative-ai": "^0.21.0"
  - "date-fns": "^4.1.0"
  - "react-chartjs-2": "^5.3.0"
  - "chart.js": "^4.4.7"
  
  Please make sure to use only these dependencies.
`,
NEW_PROMPT: dedent`

You are a professional React developer and UI/UX designer. Based on the wireframe image and provided description, create a visually appealing and functional webpage using React and Tailwind CSS. 

- Pay close attention to every small detail in the design and ensure the webpage matches the wireframe in both layout and color scheme.
- Add a header and footer with relevant links and sections as described in the wireframe or based on the description provided. Make sure to include essential components like navigation menus, branding, and footers, aligning with the theme of the page.
- For any placeholder images, use this URL: 'https://www.svgrepo.com/show/508699/landscape-placeholder.svg'.
- Maintain a modern and professional UI/UX design: Use consistent colors, proper alignment, and padding/margin. Ensure the design feels intuitive and user-friendly.
- Use Tailwind CSS for styling, and avoid arbitrary values. Follow best practices with margin and padding to ensure proper spacing and responsive behavior.
- Integrate Lucide icons from the lucide-react library where needed for actions or buttons.
- Ensure that the page is fully functional with interactive elements where necessary, using React's built-in state management (like useState and useEffect), and make sure no required props are left undefined.
- DO NOT use any third-party libraries other than those explicitly listed in the dependencies (like postcss, tailwindcss, lucide-react, etc.). Avoid using react-router-dom or tailwind-merge and ensure the code is free from unnecessary comments or placeholder text.
- Please provide only the full React component code with Tailwind CSS styling, starting from the imports. The code should be ready to be dropped directly into a React project.
- If an icon does not exist in Lucide React, display a model (fallback UI) in the prompt, or use a simple image placeholder instead.
- Ensure the following:
  - React should be imported only once in the file.
  - There should be only one export default in the file. If there are multiple components, use named exports for others.
  - Group imports from the same library or module together to avoid redundant imports.
  - Make sure there is no repetition in importing the same modules, especially React, state management hooks, or icon libraries.
Required dependencies:
- postcss: "^8"
- tailwindcss: "^3.4.1"
- autoprefixer: "^10.0.0"
- uuid4: "^2.0.3"
- tailwind-merge: "^2.4.0"
- tailwindcss-animate: "^1.0.7"
- lucide-react: "^0.469.0"
- firebase: "^11.1.0"
- date-fns: "^4.1.0"
- react-chartjs-2: "^5.3.0"
- chart.js: "^4.4.7"


`,
  DEPENDANCY: {
    postcss: "^8",
    tailwindcss: "^3.4.1",
    autoprefixer: "^10.0.0",
    uuid4: "^2.0.3",
    "tailwind-merge": "^2.4.0",
    "tailwindcss-animate": "^1.0.7",
    "lucide-react": "^0.469.0",
    "react-router-dom": "^7.1.1",
    firebase: "^11.1.0",
    "@google/generative-ai": "^0.21.0",
    "date-fns": "^4.1.0",
    "react-chartjs-2": "^5.3.0",
    "chart.js": "^4.4.7",
  },
  FILES: {
    "/App.css": {
      code: `
      @tailwind base;
@tailwind components;
@tailwind utilities;`,
    },
    "/tailwind.config.js": {
      code: `
      /** @type {import('tailwindcss').Config} */
module.exports = {
content: [
"./src/**/*.{js,jsx,ts,tsx}",
],
theme: {
extend: {},
},
plugins: [],
}`,
    },
    "/postcss.config.js": {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
plugins: {
tailwindcss: {},
},`,
    },
  },
};

export const aiModelList = [
  {
    name: "Gemini Google",
    icon: "/google.png",
    modelName: "google/gemini-2.0-flash-lite-preview-02-05:free",
  },
  {
    name: "Llama Meta",
    icon: "/meta.png",
    modelName: "meta-llama/llama-3.2-90b-vision-instruct",
  },
  {
    name: "DeepSeek ",
    icon: "/deepseek.png",
    modelName: "deepseek/deepseek-r1-distill-llama-70b:free",
  },
];
