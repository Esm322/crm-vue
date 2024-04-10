export default function useSortId(
  dirId,
  isDirId,
  dirFullName,
  isDirFullName,
  dirCreate,
  isDirCreate,
  dirEdit,
  isDirEdit,
) {
  dirFullName.value = 0;
  isDirFullName.value = false;

  dirCreate.value = 0;
  isDirCreate.value = false;

  dirEdit.value = 0;
  isDirEdit.value = false;

  if (dirId.value === 0 && isDirId.value === false) {
    dirId.value = 1;
    isDirId.value = true;
  } else if (dirId.value === 1 && isDirId.value === true) {
    dirId.value = 2;
  } else {
    dirId.value = 1;
  }
}
