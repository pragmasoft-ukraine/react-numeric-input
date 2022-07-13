import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { NumericInput } from ".";
import "../index.css";

export default {
  title: "Pragmasoft / Numeric Input",
  component: NumericInput,
} as ComponentMeta<typeof NumericInput>;

const Template: ComponentStory<typeof NumericInput> = (args) => (
  <NumericInput {...args} />
);

const LOG = console.log.bind(console);

export const Controlled = Template.bind({});
Controlled.args = {
  className:
    "block w-56 rounded-sm text-white bg-gray-700 outline-none focus:bg-gray-900 invalid:outline-red-500 no-spinner",
  placeholder: "$",
  value: 2235,
  formatOptions: {
    style: "currency",
    currency: "USD",
    currencyDisplay: "narrowSymbol",
  },
  lang: "en-US",
  step: "any",
  id: "controlled",
  "aria-label": "controlled",
};

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  className:
    "block w-56 rounded-sm text-white bg-gray-700 outline-none focus:bg-gray-900 invalid:outline-red-500",
  placeholder: "$",
  formatOptions: {
    style: "currency",
    currency: "UAH",
    currencyDisplay: "narrowSymbol",
  },
  id: "uncontrolled",
  "aria-label": "uncontrolled",
  onChange: LOG,
  onBlur: LOG,
  onFocus: LOG,
  ref: LOG,
};
