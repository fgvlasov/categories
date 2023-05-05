import { useState } from "react";
import { Box, Text, useDisclosure, Button } from "@chakra-ui/react";
import CategoryItem from "./Categories/CategoryItem";
import ModalForCategory from "./Categories/ModalForCategory";
import { HiPlus } from "react-icons/hi";

export default function ApplicationsCategories() {
  const [categories, setCategories] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingCategory, setEditingCategory] = useState(null);

  const handleCategoryAdd = (addedData) => {
    const totalPercentage = categories.reduce(
      (acc, category) => acc + category.percentage,
      0
    );
    const remainingPercentage = 100 - totalPercentage;
    const newPercentage = Math.min(remainingPercentage, addedData.percentage);

    setCategories((prevCategories) => [
      ...prevCategories,
      {
        name: addedData.name,
        percentage: newPercentage,
        index: prevCategories.length,
      },
    ]);
    onClose();
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories((prevCategories) =>
      prevCategories.filter(
        (category) => category.index !== categoryToDelete.index
      )
    );
  };

  const handleEditCategory = (index, updatedCategory) => {
    console.log(index);
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.index === index ? updatedCategory : category
      )
    );
    onClose();
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    onOpen();
  };

  console.log(categories);

  const handlePercentageChange = (newPercentage) => {
    const remainingCategories = categories.filter(
      (category) => category.index !== editingCategory.index
    );
    const totalPercentage = remainingCategories.reduce(
      (acc, category) => acc + category.percentage,
      0
    );
    const remainingPercentage =
      100 - totalPercentage - newPercentage + editingCategory.percentage;
    const updatedPercentage =
      remainingPercentage >= 0
        ? newPercentage
        : newPercentage + remainingPercentage;

    const updatedCategory = {
      ...editingCategory,
      percentage: updatedPercentage,
    };
    handleEditCategory(editingCategory.index, updatedCategory);
  };

  return (
    <Box mt={8}>
      {categories.length > 0 ? (
        <Box mt={8}>
          {categories.map((category, key) => (
            <CategoryItem
              key={key}
              category={category}
              onDelete={handleDeleteCategory}
              onEdit={handleEditClick}
            />
          ))}
        </Box>
      ) : (
        <Text mt={4}>No categories added yet.</Text>
      )}
      <Box>
		
        <Button leftIcon={<HiPlus />} onClick={onOpen}>
          Add Category
        </Button>
      </Box>
	  <Text>Добавление категорий, которые можно оценить в процентах. Добавить и изменить категорию - нажимаем кнопку и отображается модальное окно с ползунком процента и вводом для заголовка (это должен быть один компонент ModalForCategory).</Text>
	  <Text> Категории отображаются в списке, слева заголовок, справа: две кнопки - Редактировать и Удалить. Когда проценты одной из категорий изменяются, то можно только число, чтобы сумма всегда равнялась 100%. </Text>
      <ModalForCategory
        isOpen={isOpen}
        onClose={onClose}
        onCategoryAdd={handleCategoryAdd}
        onCategoryEdit={handleEditCategory}
        editingCategory={editingCategory}
        totalPercentage={categories.reduce(
          (acc, category) => acc + category.percentage,
          0
        )}
      />
    </Box>
  );
}
