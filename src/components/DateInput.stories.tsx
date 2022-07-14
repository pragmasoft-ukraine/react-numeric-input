import { ComponentMeta, ComponentStory } from "@storybook/react";
import * as React from "react";
import { DateInput, htmlDateFormat } from ".";
import "../index.css";

export default {
  title: "Pragmasoft / Date Input",
  component: DateInput,
} as ComponentMeta<typeof DateInput>;

const Template: ComponentStory<typeof DateInput> = (args) => (
  <DateInput {...args} />
);

const LOG = console.log.bind(console);

export const Controlled = Template.bind({});
Controlled.args = {
  className:
    "block w-56 rounded-sm text-white bg-gray-700 outline-none focus:bg-gray-900 invalid:outline-red-500",
  value: htmlDateFormat(),
  id: "controlled",
  onChange: LOG,
  "aria-label": "controlled",
};

export const Uncontrolled = Template.bind({});
Uncontrolled.args = {
  className:
    "block w-56 rounded-sm text-white bg-gray-700 outline-none focus:bg-gray-900 invalid:outline-red-500",
  id: "uncontrolled",
  "aria-label": "uncontrolled",
  onChange: LOG,
  onBlur: LOG,
  onFocus: LOG,
  ref: LOG,
};
