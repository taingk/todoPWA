const TodoDelete = () => {
  const button = document.createElement('button');
  button.classList.add('waves-effect', 'btn');
  button.textContent = 'x';
  return button;
}

export default TodoDelete;
