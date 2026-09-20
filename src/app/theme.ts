import { createTheme, Modal, Table } from "@mantine/core";
import { defaultVariantColorsResolver } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "dark",
  components: {
    Modal: Modal.extend({
      defaultProps: {
        centered: true,
      },
    }),
    Table: Table.extend({
      defaultProps: {
        striped: true,
      },
    }),
  },
  variantColorResolver: (input) => {
    if (input.color === "dark" && input.variant === "subtle") {
      return defaultVariantColorsResolver({ ...input, color: "gray" });
    }

    return defaultVariantColorsResolver(input);
  },
});
