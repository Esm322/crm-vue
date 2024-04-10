export default function useSortFullName(
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

  dirCreate.value = 0;
  isDirCreate.value = false;

  dirEdit.value = 0;
  isDirEdit.value = false;

  if (isDirFullName.value === false && dirFullName.value === 0) {
    isDirFullName.value = true;
    dirFullName.value = 1;
  } else if (isDirFullName.value === true && dirFullName.value === 1) {
    dirFullName.value = 2;
  } else {
    dirFullName.value = 1;
  }
}
