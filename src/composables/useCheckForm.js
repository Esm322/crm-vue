export default function useCheckForm(firstName, secondName, errors, action) {
  if (firstName && secondName) {
    action();
  }

  if (!firstName) {
    errors.errorFirstName = 'Требуется указать имя';
  }

  if (!secondName) {
    errors.errorSecondName = 'Требуется указать фамилию';
  }
}
