import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    state: {
      options: ["primary", "stroke", "faded"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    state: "primary",
    className: {},
  },
};
