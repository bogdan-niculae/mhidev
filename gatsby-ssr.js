/* eslint-disable no-unused-vars */
// Import React so that you can use JSX in HeadComponents
// const React = require("react");

// const BodyAttributes = {
//   "data-theme": "dark",
// };

// exports.onRenderBody = (
//   { setHeadComponents, setHtmlAttributes, setBodyAttributes },
//   pluginOptions
// ) => {
//   setBodyAttributes(BodyAttributes);
// };
import { CountProvider } from "./src/context/AppContext";
// const React = require("react");
import React from "react";

// highlight-start
export const onRenderBody = ({ setHeadComponents, setPreBodyComponents }) => {
  setHeadComponents([
    <script
      key="weglot"
      src="https://cdn.weglot.com/weglot.min.js"
      type="text/javascript"
    />,
    <script
      key="acsbapp"
      dangerouslySetInnerHTML={{
        __html: ` Weglot.initialize({
        api_key: "${process.env.GATSBY_WEGLOT_ID}"
    });`,
      }}
    />,
  ]);
  setPreBodyComponents([
    <script
      key="acsbapp"
      dangerouslySetInnerHTML={{
        __html: `(function(){ var s = document.createElement('script'), e = ! document.body ? document.querySelector('head') : document.body; s.src = 'https://acsbapp.com/apps/app/dist/js/app.js'; s.async = true; s.onload = function(){ acsbJS.init({ statementLink : '', footerHtml : '', hideMobile : false, hideTrigger : false, language : 'en', position : 'right', leadColor : '#f5791f', triggerColor : '#f5791f', triggerRadius : '50%', triggerPositionX : 'left', triggerPositionY : 'bottom', triggerIcon : 'wheels', triggerSize : 'medium', triggerOffsetX : 20, triggerOffsetY : 20, mobile : { triggerSize : 'small', triggerPositionX : 'left', triggerPositionY : 'bottom', triggerOffsetX : 10, triggerOffsetY : 10, triggerRadius : '50%' } }); }; e.appendChild(s); }()); `,
      }}
    />,
  ]);
};
export const wrapPageElement = ({ element, props }) => {
  return <CountProvider {...props}>{element}</CountProvider>;
};
