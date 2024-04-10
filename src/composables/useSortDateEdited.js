export default function useSortDateEdited(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
) {
  dirId.value = 0;
  isDirId.value = false;

  dirFullName.value = 0;
  isDirFullName.value = false;

  dirCreate.value = 0;
  isDirCreate.value = false;

  if (dirEdit.value === 0 && isDirEdit.value === false) {
    dirEdit.value = 1;
    isDirEdit.value = true;
  } else if (dirEdit.value === 1 && isDirEdit.value === true) {
    dirEdit.value = 2;
  } else {
    dirEdit.value = 1;
  }
}
