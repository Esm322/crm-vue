export default function useSortDateCreated(
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

  dirEdit.value = 0;
  isDirEdit.value = false;

  if (dirCreate.value === 0 && isDirCreate.value === false) {
    dirCreate.value = 1;
    isDirCreate.value = true;
  } else if (dirCreate.value === 1 && isDirCreate.value === true) {
    dirCreate.value = 2;
  } else {
    dirCreate.value = 1;
  }
}
