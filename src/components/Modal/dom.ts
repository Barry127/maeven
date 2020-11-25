export function createModalContainer(): HTMLDivElement | null {
  if (typeof document === 'undefined') return null;
  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  return modalContainer;
}

export function removeModalContainer(
  modalContainer: HTMLDivElement | null
): void {
  if (modalContainer) document.body.removeChild(modalContainer);
}
