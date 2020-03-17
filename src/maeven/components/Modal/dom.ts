export function createModalContainer(): HTMLDivElement {
  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  return modalContainer;
}

export function removeModalContainer(modalContainer: HTMLDivElement): void {
  document.body.removeChild(modalContainer);
}
