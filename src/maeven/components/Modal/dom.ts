import { classes } from './styles';

export function toggleBlur(
  isOpen: boolean,
  modalContainer: HTMLDivElement
): void {
  Array.from(document.body.children)
    .filter(child => child !== modalContainer)
    .forEach(child => {
      child.classList.add(classes.blurAnimation);
      isOpen
        ? child.classList.add(classes.blurred)
        : child.classList.remove(classes.blurred);
    });
}

export function createModalContainer(): HTMLDivElement {
  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  return modalContainer;
}

export function removeModalContainer(modalContainer: HTMLDivElement): void {
  document.body.removeChild(modalContainer);
}
