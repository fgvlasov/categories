import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";

export default function ModalForCategory({
  isOpen,
  onClose,
  onCategoryAdd,
  onCategoryEdit,
  editingCategory,
  totalPercentage,
}) {
  const [name, setName] = useState("");
  const [percentage, setPercentage] = useState(0);

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleChangePercentage = (value) => {
    setPercentage(value);
  };

  const handleSubmit = () => {
    const newPercentage = parseInt(percentage);

    if (!editingCategory) {
      onCategoryAdd({ name, percentage: newPercentage });
    } else {
      onCategoryEdit({
        name,
        percentage: newPercentage,
        index: editingCategory.index,
      });
    }

    setName("");
    setPercentage(0);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{editingCategory ? "Edit" : "Add"} Category</ModalHeader>
        <ModalBody>
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={editingCategory ? editingCategory.name : name}
              onChange={handleChangeName}
              placeholder="Category name"
            />
          </FormControl>
          <Box mt={4}>
            <Text>Percentage</Text>
            <Slider
              value={editingCategory ? editingCategory.percentage : percentage}
              onChange={handleChangePercentage}
              min={0}
              max={100}
              step={1}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Text textAlign="center" mt={2}>
              {percentage}%
            </Text>
            <Text textAlign="center" mt={2}>
              Total: {totalPercentage + percentage}%
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            {editingCategory ? "Save" : "Add"}
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
