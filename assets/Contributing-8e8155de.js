import{j as e}from"./jsx-runtime-9c4ae004.js";import"./blocks-2646952b.js";import{u as l}from"./index-2ef8b458.js";import{M as i}from"./index-6e044484.js";import"./index-1b03fe98.js";import"./iframe-5999dd3f.js";import"../sb-preview/runtime.js";import"./chunk-EIRT5I3Z-f0a10e90.js";import"./extends-20258d9b.js";import"./index-6fd5a17b.js";import"./index-d7bb098e.js";import"./index-356e4a49.js";function r(o){const n=Object.assign({h1:"h1",h2:"h2",ul:"ul",li:"li",code:"code",a:"a",p:"p",strong:"strong",h3:"h3",blockquote:"blockquote",h4:"h4",ol:"ol",em:"em"},l(),o.components);return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Docs/Contributing"}),`
`,e.jsx(n.h1,{id:"contributing",children:"Contributing"}),`
`,e.jsx(n.h2,{id:"getting-started",children:"Getting started"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.code,{children:"npm i"})}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:"npm start"})," opens Storybook documentation on ",e.jsx(n.a,{href:"http://localhost:9009",target:"_blank",rel:"nofollow noopener noreferrer",children:"localhost:9009"})]}),`
`]}),`
`,e.jsxs(n.h2,{id:"using-the-reaflow-package-locally-as-a-dependency",children:["Using the ",e.jsx(n.code,{children:"reaflow"})," package locally as a dependency"]}),`
`,e.jsxs(n.p,{children:["If you're working on some app ",e.jsxs(n.strong,{children:["that uses ",e.jsx(n.code,{children:"reaflow"})," as a dependency"]}),", and if you want to quickly update the code of ",e.jsx(n.code,{children:"reaflow"})," locally (without publishing changes to NPM), you basically have two choices:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"https://git-scm.com/book/en/v2/Git-Tools-Submodules",target:"_blank",rel:"nofollow noopener noreferrer",children:"Use Git submodules"})}),`
`,e.jsxs(n.li,{children:["Use ",e.jsx(n.a,{href:"https://docs.npmjs.com/cli/v6/commands/npm-link",target:"_blank",rel:"nofollow noopener noreferrer",children:"NPM"}),"/",e.jsx(n.a,{href:"https://classic.yarnpkg.com/en/docs/cli/link/",target:"_blank",rel:"nofollow noopener noreferrer",children:"Yarn"})," ",e.jsx(n.code,{children:"link"})," feature"]}),`
`]}),`
`,e.jsx(n.p,{children:"At this time, we don't have an official recommandation about which one to use, it's up to you."}),`
`,e.jsxs(n.h3,{id:"using-link",children:["Using ",e.jsx(n.code,{children:"link"})]}),`
`,e.jsxs(n.p,{children:["Using NPM/Yarn link will link your dependencies on your main project to your local ",e.jsx(n.code,{children:"reaflow"})," folder."]}),`
`,e.jsxs(n.blockquote,{children:[`
`,e.jsx(n.p,{children:`:warning: Beware: The "link" might break quite often when installing new dependencies on your main project, and you'll need to unlink and link back again to fix it.`}),`
`]}),`
`,e.jsx(n.h4,{id:"configuration-example-with-yarn",children:"Configuration example (with Yarn):"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["From your local ",e.jsx(n.code,{children:"reaflow"})," folder, run ",e.jsx(n.code,{children:"yarn install"})," and then ",e.jsx(n.code,{children:"yarn link:reaflow"}),", which will create the links in yarn"]}),`
`,e.jsxs(n.li,{children:["From your main project folder, run ",e.jsx(n.code,{children:"yarn link reaflow && yarn link react && yarn link react-dom"})]}),`
`]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsxs(n.em,{children:["We suggest adding it as a command in your package.json: ",e.jsx(n.code,{children:'"link:reaflow": "yarn link reaflow && yarn link react && yarn link react-dom"'})]})," - ",e.jsx(n.a,{href:"https://github.com/Vadorequest/poc-nextjs-reaflow/blob/cf8499008c4b70946d82803741401fac48264a5b/package.json#L8",target:"_blank",rel:"nofollow noopener noreferrer",children:"See example"})]}),`
`]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[e.jsxs(n.strong,{children:["If you edit the ",e.jsx(n.code,{children:"reaflow"})," files"]})," and need to recompile the project then run ",e.jsx(n.code,{children:"yarn build:watch"})," from your local ",e.jsx(n.code,{children:"reaflow"})," folder (changes will be applied immediately, you'll benefit from hot-reloading, etc.)"]}),`
`]}),`
`,e.jsxs(n.p,{children:["Once everything is linked, your main project will use the files in your local ",e.jsx(n.code,{children:"reaflow"}),` folder.
While `,e.jsx(n.code,{children:"yarn build:watch"})," is running, your changes from ",e.jsx(n.code,{children:"reaflow"})," will automatically apply to your main project."]}),`
`,e.jsx(n.h4,{id:"warning-when-the-link-breaks",children:":warning When the link breaks"}),`
`,e.jsxs(n.p,{children:["When you install new dependencies in your main project, it might break the links with ",e.jsx(n.code,{children:"reaflow"}),"."]}),`
`,e.jsxs(n.p,{children:["To fix it, you'll need to remove your ",e.jsx(n.code,{children:"node_modules"})," folder and reinstall all packages ",e.jsx(n.strong,{children:"on both"})," your main project and ",e.jsx(n.code,{children:"reaflow"}),", starting with ",e.jsx(n.code,{children:"reaflow"}),"."]}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:["From ",e.jsx(n.code,{children:"reaflow"})," folder: ",e.jsx(n.code,{children:"rm -rf node_modules && yarn && yarn link:reaflow"})]}),`
`,e.jsxs(n.li,{children:["From your main project folder: ",e.jsx(n.code,{children:"rm -rf node_modules && yarn && yarn link:reaflow"})]}),`
`]})]})}function y(o={}){const{wrapper:n}=Object.assign({},l(),o.components);return n?e.jsx(n,Object.assign({},o,{children:e.jsx(r,o)})):r(o)}export{y as default};
