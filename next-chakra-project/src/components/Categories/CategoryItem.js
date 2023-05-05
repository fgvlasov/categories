import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function CategoryItem({ category, onDelete, onEdit }) {
  const handleDeleteClick = () => {
    onDelete(category);
  };

  const handleEditClick = () => {
    onEdit(category);
  };

  return (
    <Box
      py={2}
      borderBottom="1px"
      borderBottomColor="gray.300"
      display="flex"
      justifyContent="space-between"
    >
      <Flex alignItems="center">
        <Text fontWeight="bold">{category.name}</Text>
        <Text mx={2}>({category.percentage}%)</Text>
      </Flex>
      <Flex>
        <IconButton
          aria-label="Edit"
          icon={<FaEdit />}
          onClick={handleEditClick}
          mr={2}
        />
        <IconButton
          aria-label="Delete"
          icon={<FaTrash />}
          onClick={handleDeleteClick}
        />
      </Flex>
    </Box>
  );
}
