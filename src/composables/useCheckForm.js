export default function useCheckForm(firstName, secondName, errors, change) {
  if (firstName && secondName) {
    change();
  }

  if (!firstName) {
    errors.errorFirstName = 'Требуется указать имя';
  }

  if (!secondName) {
    errors.errorSecondName = 'Требуется указать фамилию';
  }
}
