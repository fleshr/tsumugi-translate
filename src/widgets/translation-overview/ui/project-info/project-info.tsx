import { Stack, Text } from "@mantine/core";

export const ProjectInfo = () => {
  return (
    <Stack gap={0}>
      <Text fw="bold">Project Name</Text>
      <Text size="xs" c="dimmed">
        engine | /path/to/project
      </Text>
    </Stack>
  );
};
